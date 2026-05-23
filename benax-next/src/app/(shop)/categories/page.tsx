import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-md py-lg">
      <h1 className="font-headline text-3xl font-bold text-on-surface dark:text-inverse-on-surface mb-md">
        Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.id}`}
            className="glass-card rounded-2xl p-md flex items-center justify-between hover:-translate-y-1 transition-transform"
          >
            <div>
              <h2 className="font-headline font-bold text-lg text-primary dark:text-inverse-primary">
                {c.name}
              </h2>
              <p className="text-sm text-secondary dark:text-slate-400">
                {c._count.products} {c._count.products === 1 ? "product" : "products"}
              </p>
            </div>
            <span className="text-2xl">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
