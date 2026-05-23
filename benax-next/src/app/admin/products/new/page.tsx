import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="flex flex-col gap-md">
      <Link
        href="/admin/products"
        className="text-sm text-secondary hover:text-primary dark:hover:text-inverse-primary inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>
      <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
        New product
      </h1>
      <ProductForm action={createProduct} categories={categories} mode="create" />
    </div>
  );
}
