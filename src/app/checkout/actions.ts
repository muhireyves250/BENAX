"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

const checkoutSchema = z.object({
  name: z.string().min(2, "Your name is required"),
  email: z.email("A valid email is required"),
  phone: z.string().min(7, "A valid phone number is required"),
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
  | { ok: true; orderId: string; setupToken?: string }
  | { ok: false; code?: "EXISTS"; error: string };

export async function placeOrder(input: {
  name: string;
  email: string;
  phone: string;
  address: string;
  items: { productId: string; quantity: number }[];
}): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { name, email, phone, address, items } = parsed.data;

  // Account resolution. An account that already has a password must sign in.
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.passwordHash) {
    return {
      ok: false,
      code: "EXISTS",
      error: "An account with this email already exists. Please sign in to continue.",
    };
  }

  // Validate stock against live product data.
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true, stock: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));
  for (const item of items) {
    const p = byId.get(item.productId);
    if (!p) return { ok: false, error: `Product ${item.productId} not found` };
    if (p.stock < item.quantity) {
      return { ok: false, error: `Insufficient stock for ${item.productId}` };
    }
  }
  const total = items.reduce((sum, i) => sum + byId.get(i.productId)!.price * i.quantity, 0);

  // The resolved account is always passwordless here, so always mint a setup token.
  const setupToken = crypto.randomBytes(32).toString("hex");
  const setupTokenHash = sha256(setupToken);
  const setupTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const userId = existing
    ? (
        await prisma.user.update({
          where: { id: existing.id },
          data: { name, phone, address, setupTokenHash, setupTokenExpiresAt },
        })
      ).id
    : (
        await prisma.user.create({
          data: { email, name, phone, address, role: "USER", setupTokenHash, setupTokenExpiresAt },
        })
      ).id;

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        total,
        deliveryAddress: address,
        contactName: name,
        contactPhone: phone,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            unitPrice: byId.get(i.productId)!.price,
          })),
        },
      },
    });

    for (const i of items) {
      await tx.product.update({
        where: { id: i.productId },
        data: { stock: { decrement: i.quantity } },
      });
    }

    return created;
  });

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  return { ok: true, orderId: order.id, setupToken };
}

const setPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SetPasswordResult = { ok: false; error: string };

// On success this calls signIn, which throws a redirect that must propagate —
// so the success path returns nothing.
export async function setPassword(input: {
  token: string;
  password: string;
}): Promise<SetPasswordResult | void> {
  const parsed = setPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const tokenHash = sha256(parsed.data.token);
  const user = await prisma.user.findFirst({ where: { setupTokenHash: tokenHash } });
  if (
    !user ||
    user.passwordHash ||
    !user.setupTokenExpiresAt ||
    user.setupTokenExpiresAt < new Date()
  ) {
    return { ok: false, error: "This setup link is invalid or has expired." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash, setupTokenHash: null, setupTokenExpiresAt: null },
  });

  // Logs the user in and redirects to "/" (throws NEXT_REDIRECT).
  await signIn("credentials", {
    email: user.email,
    password: parsed.data.password,
    redirectTo: "/",
  });
}
