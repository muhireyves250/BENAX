"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Check, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlist } from "@/hooks/useWishlist";
import type { ProductLite } from "@/types/ecommerce";

interface ProductCardProps {
  product: ProductLite & { rating: number };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { has: wlHas, toggle: toggleWl } = useWishlist();
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const has = mounted && wlHas(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWl(product);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-3 transition-all hover:border-[var(--color-border)] hover:-translate-y-0.5"
    >
      {product.tag && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent-ink)]">
          {product.tag}
        </span>
      )}
      <button
        onClick={handleWishlist}
        className={`absolute right-5 top-5 z-10 rounded-full p-2 backdrop-blur-md transition-colors ${
          has
            ? "bg-[color-mix(in_oklab,var(--color-error)_18%,transparent)] text-[var(--color-error)]"
            : "bg-[var(--color-bg-2)]/70 text-[var(--color-text-faint)] hover:text-[var(--color-error)]"
        }`}
        aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className="h-4 w-4" fill={has ? "currentColor" : "none"} />
      </button>

      <div className="aspect-square w-full overflow-hidden rounded-[1.25rem] bg-[var(--color-bg-2)] p-6 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-1.5 px-2 pt-4 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
          {product.categoryId.replace(/-/g, " ")}
        </span>
        <h3 className="font-headline text-[1.05rem] font-bold leading-tight text-[var(--color-text)] line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-[var(--color-star)]" fill="currentColor" />
          <span className="text-xs font-semibold text-[var(--color-text-dim)]">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-faint)]">
              Price
            </span>
            <span className="font-headline text-[1.05rem] font-extrabold text-[var(--color-text)]">
              RWF {product.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] px-3.5 py-2 text-xs font-bold text-[var(--color-accent)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-accent)_32%,transparent)]"
          >
            {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
