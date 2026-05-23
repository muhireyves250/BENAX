"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Check, Plus, Star } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import type { ProductLite } from "@/types/ecommerce";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: ProductLite & { rating: number };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const has = useWishlistStore((s) => s.has(product.id));
  const addWl = useWishlistStore((s) => s.add);
  const removeWl = useWishlistStore((s) => s.remove);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    has ? removeWl(product.id) : addWl(product);
  };

  return (
    <div className="relative group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-[0px_4px_20px_rgba(26,43,74,0.02)] hover:shadow-[0px_10px_30px_rgba(26,43,74,0.08)] transition-all overflow-hidden">
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.tag ? (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-primary dark:bg-inverse-primary text-white dark:text-primary px-2.5 py-1 rounded-full shadow-sm pointer-events-auto">
            {product.tag}
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={handleWishlist}
          className={`pointer-events-auto p-1.5 rounded-full backdrop-blur-md shadow-sm transition-colors ${
            has
              ? "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20"
              : "bg-white/80 dark:bg-slate-950/80 text-slate-400 hover:text-rose-500"
          }`}
          aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="w-4 h-4" fill={has ? "currentColor" : "none"} />
        </button>
      </div>

      <Link href={`/products/${product.id}`} className="flex flex-col">
        <div className="aspect-square w-full bg-slate-50 dark:bg-slate-950 p-gutter flex items-center justify-center overflow-hidden border-b border-outline-variant/10 dark:border-slate-800/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-md flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">
            {product.categoryId.replace("-", " ")}
          </span>
          <h3 className="font-headline font-bold text-base text-primary dark:text-white leading-tight line-clamp-1 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-4">
            <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400">Price</span>
              <span className="font-headline font-extrabold text-primary dark:text-inverse-primary text-lg">
                RWF {product.price.toLocaleString()}
              </span>
            </div>
            <Button
              variant={added ? "secondary" : "primary"}
              size="sm"
              onClick={handleAdd}
              leftIcon={added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            >
              {added ? "Added" : "Add"}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
