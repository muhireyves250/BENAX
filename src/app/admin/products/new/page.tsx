import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-dim)] hover:text-[var(--color-accent)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to products
      </Link>
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
          Catalog
        </p>
        <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)]">
          New product
        </h1>
      </header>
      <ProductForm action={createProduct} categories={categories} mode="create" />
    </div>
  );
}
