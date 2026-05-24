export const dynamic = "force-dynamic";

import Link from "next/link";
import { Search, ChevronRight, Cpu, Radio, Wifi, Bot, Sliders, Wrench, Boxes } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";

const ICONS: Record<string, typeof Cpu> = {
  microcontrollers: Cpu,
  sensors: Radio,
  "iot-modules": Wifi,
  "robotics-kits": Bot,
  "motors-actuators": Sliders,
  accessories: Wrench,
};

interface SearchParams {
  category?: string;
  q?: string;
  sort?: "price-low" | "price-high" | "rating";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category, q, sort } = await searchParams;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        ...(category && category !== "all" ? { categoryId: category } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy:
        sort === "price-low"
          ? { price: "asc" }
          : sort === "price-high"
            ? { price: "desc" }
            : sort === "rating"
              ? { rating: "desc" }
              : { name: "asc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-12 md:py-10">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)] md:text-5xl">
          Component Catalog
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-dim)]">
          Explore premium microcontrollers, sensors, IoT modules, and accessories.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form className="relative w-full max-w-md" action="/products">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-faint)]" />
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search parts, chips…"
            className="w-full rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] focus:outline-none"
          />
        </form>
        <form className="flex items-center gap-2 text-xs text-[var(--color-text-dim)]">
          <label className="uppercase tracking-widest">Sort:</label>
          <select
            name="sort"
            defaultValue={sort ?? ""}
            className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
          >
            <option value="">Default Sort</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
        <aside className="panel hidden h-fit p-5 md:block">
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
            Categories
          </h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/products"
                className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-sm transition-colors ${
                  !category
                    ? "bg-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] text-[var(--color-accent)] font-semibold"
                    : "text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
                }`}
              >
                <span className="inline-flex items-center gap-2.5">
                  <Boxes className="h-4 w-4" /> All Products
                </span>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </Link>
            </li>
            {categories.map((c) => {
              const Icon = ICONS[c.id] ?? Cpu;
              const active = category === c.id;
              return (
                <li key={c.id}>
                  <Link
                    href={`/products?category=${c.id}`}
                    className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] text-[var(--color-accent)] font-semibold"
                        : "text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Icon className="h-4 w-4" /> {c.name}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        <div>
          {products.length === 0 ? (
            <div className="panel-inset flex items-center justify-center p-12 text-center text-sm text-[var(--color-text-dim)]">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    categoryId: p.categoryId,
                    stock: p.stock,
                    tag: p.tag,
                    rating: p.rating,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}