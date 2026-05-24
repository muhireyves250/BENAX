import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";
import { updateProduct } from "../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product) notFound();

  const bound = updateProduct.bind(null, product.id);

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
          Edit
        </p>
        <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)]">
          {product.name}
        </h1>
      </header>
      <ProductForm
        action={bound}
        categories={categories}
        mode="edit"
        initial={{
          id: product.id,
          name: product.name,
          categoryId: product.categoryId,
          price: product.price,
          stock: product.stock,
          rating: product.rating,
          tag: product.tag,
          image: product.image,
          description: product.description,
          specs: product.specs,
        }}
      />
    </div>
  );
}
