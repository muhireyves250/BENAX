"use client";

import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { addWishlist, removeWishlist } from "@/app/account/wishlist/actions";
import type { ProductLite } from "@/types/ecommerce";

/**
 * Single API for wishlist toggles. Updates the Zustand store optimistically for
 * instant UI, and persists to the DB via server actions when authenticated.
 */
export function useWishlist() {
  const { status } = useSession();
  const items = useWishlistStore((s) => s.items);
  const add = useWishlistStore((s) => s.add);
  const remove = useWishlistStore((s) => s.remove);

  const has = (id: string) => items.some((p) => p.id === id);

  const toggle = (product: ProductLite) => {
    if (has(product.id)) {
      remove(product.id);
      if (status === "authenticated") void removeWishlist(product.id);
    } else {
      add(product);
      if (status === "authenticated") void addWishlist(product.id);
    }
  };

  return { items, has, toggle };
}
