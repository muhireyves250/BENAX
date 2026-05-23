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
    <div className="flex flex-col gap-md">
      <Link
        href="/admin/products"
        className="text-sm text-secondary hover:text-primary dark:hover:text-inverse-primary inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>
      <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
        Edit {product.name}
      </h1>
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
