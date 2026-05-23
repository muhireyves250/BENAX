import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AddToCartButton } from "./AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!product) notFound();

  const specs = (product.specs ?? {}) as Record<string, string>;

  return (
    <div className="max-w-6xl mx-auto px-md py-lg grid grid-cols-1 md:grid-cols-2 gap-lg">
      <div className="aspect-square bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/30 dark:border-slate-800 p-md flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="w-3/4 h-3/4 object-contain" />
      </div>

      <div className="flex flex-col gap-md">
        <span className="text-xs uppercase tracking-widest font-semibold text-secondary dark:text-slate-400">
          {product.category.name}
        </span>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-surface dark:text-inverse-on-surface">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
          <span className="text-sm font-semibold text-secondary dark:text-slate-400">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-sm text-secondary dark:text-slate-400">·</span>
          <span className="text-sm text-secondary dark:text-slate-400">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
        <p className="text-base text-on-surface-variant dark:text-slate-300 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-end justify-between gap-md mt-md">
          <div>
            <span className="text-xs text-slate-400">Price</span>
            <div className="font-headline text-3xl font-extrabold text-primary dark:text-inverse-primary">
              RWF {product.price.toLocaleString()}
            </div>
          </div>
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              categoryId: product.categoryId,
              stock: product.stock,
              tag: product.tag,
            }}
          />
        </div>

        {Object.keys(specs).length > 0 && (
          <div className="mt-md border-t border-outline-variant/40 dark:border-slate-800 pt-md">
            <h2 className="font-headline text-lg font-bold mb-2 text-on-surface dark:text-inverse-on-surface">
              Specifications
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-md gap-y-1 text-sm">
              {Object.entries(specs).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2 py-1 border-b border-outline-variant/20 dark:border-slate-800/60">
                  <dt className="text-secondary dark:text-slate-400">{k}</dt>
                  <dd className="text-on-surface dark:text-slate-200 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
