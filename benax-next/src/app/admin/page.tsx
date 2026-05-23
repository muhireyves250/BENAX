import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { stock: { lt: 20 } } }),
  ]);

  const stats = [
    { label: "Products", value: productCount },
    { label: "Categories", value: categoryCount },
    { label: "Low stock", value: lowStock, hint: "< 20 in stock" },
  ];

  return (
    <div className="flex flex-col gap-lg">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
          Overview
        </h1>
        <p className="text-sm text-secondary dark:text-slate-400 mt-1">
          A quick snapshot of the BENAX catalog.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-card rounded-2xl p-md flex flex-col gap-1"
          >
            <span className="text-xs uppercase tracking-wider font-semibold text-secondary dark:text-slate-400">
              {s.label}
            </span>
            <span className="font-headline text-3xl font-bold text-primary dark:text-inverse-primary">
              {s.value}
            </span>
            {s.hint && (
              <span className="text-xs text-secondary dark:text-slate-500">{s.hint}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
