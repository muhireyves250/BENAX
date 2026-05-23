import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
            Products
          </h1>
          <p className="text-sm text-secondary dark:text-slate-400 mt-1">
            {products.length} total
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>New product</Button>
        </Link>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-container dark:bg-slate-900/40 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-secondary uppercase text-xs tracking-wider">Name</th>
              <th className="px-4 py-3 font-semibold text-secondary uppercase text-xs tracking-wider">Category</th>
              <th className="px-4 py-3 font-semibold text-secondary uppercase text-xs tracking-wider text-right">Price</th>
              <th className="px-4 py-3 font-semibold text-secondary uppercase text-xs tracking-wider text-right">Stock</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-800">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-surface-container-low dark:hover:bg-slate-900/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-contain bg-white" />
                    <div>
                      <div className="font-headline font-semibold text-on-surface dark:text-inverse-on-surface">{p.name}</div>
                      <div className="text-xs text-secondary dark:text-slate-500">{p.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-secondary dark:text-slate-400">{p.category.name}</td>
                <td className="px-4 py-3 text-right font-mono">RWF {p.price.toLocaleString()}</td>
                <td className={`px-4 py-3 text-right font-mono ${p.stock < 20 ? "text-error" : ""}`}>
                  {p.stock}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="p-2 rounded-lg hover:bg-surface-container dark:hover:bg-slate-800 text-secondary"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
