"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { ProductLite } from "@/types/ecommerce";

type ProductRow = {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  stock: number;
  tag: string | null;
};

function toLite(p: ProductRow): ProductLite {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    categoryId: p.categoryId,
    stock: p.stock,
    tag: p.tag,
  };
}

export async function getWishlist(): Promise<ProductLite[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  const rows = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => toLite(r.product));
}

export async function addWishlist(productId: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;
  await prisma.wishlistItem.createMany({
    data: [{ userId: session.user.id, productId }],
    skipDuplicates: true,
  });
  revalidatePath("/account/wishlist");
}

export async function removeWishlist(productId: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;
  await prisma.wishlistItem.deleteMany({
    where: { userId: session.user.id, productId },
  });
  revalidatePath("/account/wishlist");
}

export async function mergeWishlist(productIds: string[]): Promise<ProductLite[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  if (productIds.length) {
    // Filter to products that still exist to avoid FK violations.
    const existing = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });
    if (existing.length) {
      await prisma.wishlistItem.createMany({
        data: existing.map((p) => ({ userId: session.user.id, productId: p.id })),
        skipDuplicates: true,
      });
    }
  }
  revalidatePath("/account/wishlist");
  return getWishlist();
}
