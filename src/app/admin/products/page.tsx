import Link from "next/link";
import { Pencil, Plus, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
            Catalog
          </p>
          <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)]">
            Products
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-dim)]">
            {products.length} {products.length === 1 ? "item" : "items"} in your catalog.
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

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-faint)]" />
        <input
          type="search"
          placeholder="Search products…"
          className="w-full rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-bg-2)] text-left">
              <tr>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
                  Product
                </th>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
                  Category
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
                  Price
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
                  Stock
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-soft)]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--color-bg-2)]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-bg-2)] p-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                      </div>
                      <div>
                        <div className="font-headline font-semibold text-[var(--color-text)]">
                          {p.name}
                        </div>
                        <div className="text-xs text-[var(--color-text-faint)]">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--color-text-dim)]">{p.category.name}</td>
                  <td className="px-5 py-3 text-right font-mono text-[var(--color-text)]">
                    RWF {p.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${
                        p.stock === 0
                          ? "bg-[color-mix(in_oklab,var(--color-error)_18%,transparent)] text-[var(--color-error)]"
                          : p.stock < 20
                            ? "bg-[color-mix(in_oklab,var(--color-warning)_18%,transparent)] text-[var(--color-warning)]"
                            : "bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[var(--color-success)]"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="rounded-lg p-2 text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-[var(--color-text-dim)]">
                    No products yet. <Link href="/admin/products/new" className="font-semibold text-[var(--color-accent)] hover:underline">Add your first one</Link>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
