import Link from "next/link";
import {
  Boxes,
  Tags,
  AlertTriangle,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, lowStock, totalStockAgg, recent, lowStockList] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.product.count({ where: { stock: { lt: 20 } } }),
      prisma.product.aggregate({ _sum: { stock: true } }),
      prisma.product.findMany({
        orderBy: { name: "asc" },
        take: 5,
        include: { category: true },
      }),
      prisma.product.findMany({
        where: { stock: { lt: 20 } },
        orderBy: { stock: "asc" },
        take: 5,
        include: { category: true },
      }),
    ]);

  const totalStock = totalStockAgg._sum.stock ?? 0;

  const stats = [
    {
      label: "Products",
      value: productCount.toString(),
      Icon: Boxes,
      tint: "var(--color-accent)",
    },
    {
      label: "Categories",
      value: categoryCount.toString(),
      Icon: Tags,
      tint: "#7dd3fc",
    },
    {
      label: "Total units in stock",
      value: totalStock.toLocaleString(),
      Icon: TrendingUp,
      tint: "#6ee7b7",
    },
    {
      label: "Low stock items",
      value: lowStock.toString(),
      hint: "< 20 units",
      Icon: AlertTriangle,
      tint: "#fbbf24",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
            Dashboard
          </p>
          <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)] md:text-4xl">
            Overview
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-dim)]">
            A snapshot of your BENAX catalog and inventory health.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-accent inline-flex items-center gap-2 self-start px-5 py-2.5 text-sm md:self-auto"
        >
          <Plus className="h-4 w-4" />
          New product
        </Link>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, hint, Icon, tint }) => (
          <div
            key={label}
            className="relative overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-5"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
                {label}
              </span>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in oklab, ${tint} 18%, transparent)`,
                  color: tint,
                }}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-headline text-3xl font-extrabold text-[var(--color-text)]">
              {value}
            </p>
            {hint && (
              <p className="mt-1 text-xs text-[var(--color-text-faint)]">{hint}</p>
            )}
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)]">
          <header className="flex items-center justify-between border-b border-[var(--color-border-soft)] px-5 py-4">
            <h2 className="font-headline font-bold text-[var(--color-text)]">
              Recent products
            </h2>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:underline underline-offset-4"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </header>
          <ul className="divide-y divide-[var(--color-border-soft)]">
            {recent.length === 0 ? (
              <li className="p-6 text-center text-sm text-[var(--color-text-dim)]">
                No products yet.
              </li>
            ) : (
              recent.map((p) => (
                <li key={p.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-bg-2)] p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-headline text-sm font-semibold text-[var(--color-text)]">
                      {p.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-faint)]">{p.category.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-headline text-sm font-bold text-[var(--color-text)]">
                      RWF {p.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-[var(--color-text-faint)]">{p.stock} in stock</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)]">
          <header className="border-b border-[var(--color-border-soft)] px-5 py-4">
            <h2 className="font-headline font-bold text-[var(--color-text)]">
              Low stock
            </h2>
            <p className="text-xs text-[var(--color-text-faint)]">Restock soon</p>
          </header>
          <ul className="divide-y divide-[var(--color-border-soft)]">
            {lowStockList.length === 0 ? (
              <li className="p-6 text-center text-sm text-[var(--color-text-dim)]">
                Nothing low. ✨
              </li>
            ) : (
              lowStockList.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex h-2 w-2 rounded-full bg-[var(--color-warning)]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[var(--color-text)]">
                      {p.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-faint)]">{p.category.name}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      p.stock === 0
                        ? "bg-[color-mix(in_oklab,var(--color-error)_18%,transparent)] text-[var(--color-error)]"
                        : "bg-[color-mix(in_oklab,var(--color-warning)_18%,transparent)] text-[var(--color-warning)]"
                    }`}
                  >
                    {p.stock}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
