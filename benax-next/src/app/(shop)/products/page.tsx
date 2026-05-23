import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";

interface SearchParams {
  category?: string;
  q?: string;
  sort?: "price-low" | "price-high" | "rating";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category, q, sort } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      ...(category && category !== "all" ? { categoryId: category } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy:
      sort === "price-low"
        ? { price: "asc" }
        : sort === "price-high"
          ? { price: "desc" }
          : sort === "rating"
            ? { rating: "desc" }
            : { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-md py-lg">
      <header className="mb-md">
        <h1 className="font-headline text-3xl font-bold text-on-surface dark:text-inverse-on-surface">
          Shop
        </h1>
        <p className="text-sm text-secondary dark:text-slate-400 mt-1">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </header>

      {products.length === 0 ? (
        <p className="text-secondary dark:text-slate-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image,
                categoryId: p.categoryId,
                stock: p.stock,
                tag: p.tag,
                rating: p.rating,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
