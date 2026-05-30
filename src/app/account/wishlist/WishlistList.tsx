"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlist } from "@/hooks/useWishlist";
import type { ProductLite } from "@/types/ecommerce";

export function WishlistList({ initial }: { initial: ProductLite[] }) {
  const { items, toggle } = useWishlist();
  const addItem = useCartStore((s) => s.addItem);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Server-rendered list until the store hydrates/syncs, then live store.
  const list = mounted ? items : initial;

  if (list.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-[var(--color-text-dim)]">Your wishlist is empty.</p>
        <Link
          href="/products"
          className="mt-2 inline-block text-sm font-semibold text-[var(--color-accent)] hover:underline"
        >
          Browse products →
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {list.map((p) => (
        <li key={p.id} className="glass-card flex items-center gap-4 rounded-2xl p-4">
          <Link href={`/products/${p.id}`} className="flex min-w-0 flex-1 items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg-2)] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-headline font-bold text-[var(--color-text)]">{p.name}</p>
              <p className="text-sm text-[var(--color-text-dim)]">RWF {p.price.toLocaleString()}</p>
            </div>
          </Link>
          <button
            onClick={() => addItem(p)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] px-3.5 py-2 text-xs font-bold text-[var(--color-accent)] hover:bg-[color-mix(in_oklab,var(--color-accent)_32%,transparent)]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
          <button
            onClick={() => toggle(p)}
            aria-label="Remove from wishlist"
            className="rounded-full p-2 text-[var(--color-error)] hover:bg-[color-mix(in_oklab,var(--color-error)_14%,transparent)]"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
          </button>
        </li>
      ))}
    </ul>
  );
}
