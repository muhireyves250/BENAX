export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Star, Truck, Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AddToCartButton } from "./AddToCartButton";
import { ProductCard } from "@/components/product/ProductCard";

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
  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 4,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-12 md:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-dim)]">
        <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
        <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-faint)]" />
        <Link href={`/products?category=${product.categoryId}`} className="hover:text-[var(--color-accent)]">
          {product.category.name}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-faint)]" />
        <span className="text-[var(--color-text)]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={`aspect-square overflow-hidden rounded-2xl border bg-[var(--color-surface-1)] p-2 ${
                  i === 0 ? "border-[var(--color-accent)]" : "border-[var(--color-border-soft)]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt="" className="h-full w-full object-contain opacity-80" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <span className="pill self-start">{product.category.name}</span>
          <h1 className="font-headline text-3xl font-extrabold leading-tight text-[var(--color-text)] md:text-4xl">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[var(--color-text-dim)]">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 text-[var(--color-star)]" fill="currentColor" />
              <span className="font-semibold text-[var(--color-text)]">{product.rating.toFixed(1)}</span>
            </span>
            <span>·</span>
            <span>(124 Reviews)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-headline text-4xl font-extrabold text-[var(--color-text)]">
              RWF {product.price.toLocaleString()}
            </span>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-success)_30%,transparent)] bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)] px-3 py-1.5 text-xs font-semibold text-[var(--color-success)]">
            <Truck className="h-3.5 w-3.5" />
            {product.stock > 0 ? `In Stock & Ready to Ship` : "Out of stock"}
          </div>

          <p className="text-[var(--color-text-dim)] leading-relaxed">
            {product.description}
          </p>

          <div className="mt-2 flex items-center gap-3">
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
            <button
              aria-label="Add to wishlist"
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-1)] p-3 text-[var(--color-text-dim)] hover:text-[var(--color-error)] transition-colors"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs (static, expanded) */}
          <div className="mt-4 panel divide-y divide-[var(--color-border-soft)]">
            {Object.keys(specs).length > 0 && (
              <details open className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between font-headline font-bold text-[var(--color-text)]">
                  Specifications
                  <ChevronRight className="h-4 w-4 text-[var(--color-text-faint)] transition-transform group-open:rotate-90" />
                </summary>
                <dl className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  {Object.entries(specs).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-start justify-between gap-3 border-b border-[var(--color-border-soft)] py-2 text-sm"
                    >
                      <dt className="text-[var(--color-text-dim)]">{k}</dt>
                      <dd className="text-right font-medium text-[var(--color-text)]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            )}
            <details className="group p-5">
              <summary className="flex cursor-pointer items-center justify-between font-headline font-bold text-[var(--color-text)]">
                Key Features
                <ChevronRight className="h-4 w-4 text-[var(--color-text-faint)] transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-[var(--color-text-dim)]">
                Engineered for reliability and easy integration into your maker projects.
              </p>
            </details>
            <details className="group p-5">
              <summary className="flex cursor-pointer items-center justify-between font-headline font-bold text-[var(--color-text)]">
                Documentation
                <ChevronRight className="h-4 w-4 text-[var(--color-text-faint)] transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-[var(--color-text-dim)]">
                Datasheets and pinout diagrams are available on request via WhatsApp Support.
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-headline text-2xl font-extrabold text-[var(--color-text)]">
            Complete Your Setup
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}