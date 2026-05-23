"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const checkoutSchema = z.object({
  address: z.string().min(4, "Delivery address is required"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "Cart is empty"),
});

export type CheckoutResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function placeOrder(input: {
  address: string;
  items: { productId: string; quantity: number }[];
}): Promise<CheckoutResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, error: "Sign in to check out (admin-only for now)." };
  }

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const productIds = parsed.data.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true, stock: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));

  for (const item of parsed.data.items) {
    const p = byId.get(item.productId);
    if (!p) return { ok: false, error: `Product ${item.productId} not found` };
    if (p.stock < item.quantity) {
      return { ok: false, error: `Insufficient stock for ${item.productId}` };
    }
  }

  const total = parsed.data.items.reduce((sum, i) => {
    const p = byId.get(i.productId)!;
    return sum + p.price * i.quantity;
  }, 0);

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId: session.user.id,
        total,
        deliveryAddress: parsed.data.address,
        items: {
          create: parsed.data.items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            unitPrice: byId.get(i.productId)!.price,
          })),
        },
      },
    });

    for (const i of parsed.data.items) {
      await tx.product.update({
        where: { id: i.productId },
        data: { stock: { decrement: i.quantity } },
      });
    }

    return created;
  });

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  return { ok: true, orderId: order.id };
}
