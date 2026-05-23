import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="flex flex-col">
      <section className="px-md md:px-margin-desktop py-xl flex flex-col gap-md items-center text-center bg-surface-container-low dark:bg-slate-950">
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-on-surface dark:text-inverse-on-surface max-w-3xl">
          Components, kits and modules for builders.
        </h1>
        <p className="max-w-xl text-secondary dark:text-slate-400">
          BENAX is your local source for microcontrollers, sensors and IoT gear in Kigali.
        </p>
        <div className="flex gap-3">
          <Link href="/products">
            <Button>Browse products</Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline">Categories</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl w-full mx-auto px-md py-lg">
        <h2 className="font-headline text-2xl font-bold mb-md text-on-surface dark:text-inverse-on-surface">
          Top picks
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="glass-card rounded-2xl p-md flex flex-col gap-2 hover:-translate-y-1 transition-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="w-full aspect-square object-cover rounded-xl bg-surface-container"
              />
              <h3 className="font-headline font-semibold text-on-surface dark:text-inverse-on-surface line-clamp-1">
                {p.name}
              </h3>
              <p className="text-sm text-secondary dark:text-slate-400">
                RWF {p.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
