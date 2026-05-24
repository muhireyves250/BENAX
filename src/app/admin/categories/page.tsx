import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
          Catalog
        </p>
        <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)]">
          Categories
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-dim)]">
          {categories.length} {categories.length === 1 ? "category" : "categories"} configured.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-5"
          >
            <h3 className="font-headline font-bold text-[var(--color-text)]">{c.name}</h3>
            <p className="mt-1 text-xs text-[var(--color-text-faint)]">{c.id}</p>
            <p className="mt-4 text-sm text-[var(--color-text-dim)]">
              <span className="font-headline text-2xl font-extrabold text-[var(--color-text)]">
                {c._count.products}
              </span>{" "}
              products
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
