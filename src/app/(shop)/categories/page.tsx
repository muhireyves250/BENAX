import Link from "next/link";
import { ArrowRight, Cpu, Radio, Wifi, Bot, Sliders, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";

const ICONS: Record<string, { Icon: typeof Cpu; tint: string }> = {
  microcontrollers: { Icon: Cpu, tint: "var(--color-accent)" },
  sensors: { Icon: Radio, tint: "#7dd3fc" },
  "iot-modules": { Icon: Wifi, tint: "#fcd34d" },
  "robotics-kits": { Icon: Bot, tint: "#a78bfa" },
  "motors-actuators": { Icon: Sliders, tint: "#f9a8d4" },
  accessories: { Icon: Wrench, tint: "#cbd5e1" },
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-12 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)] md:text-4xl">
          Browse Categories
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-dim)]">
          Essential building blocks for your next innovation.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {categories.map((c) => {
          const meta = ICONS[c.id] ?? { Icon: Cpu, tint: "var(--color-accent)" };
          const { Icon, tint } = meta;
          return (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-5 transition-all hover:border-[var(--color-border)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `color-mix(in oklab, ${tint} 18%, transparent)`, color: tint }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-headline font-bold text-[var(--color-text)]">{c.name}</h2>
                  <p className="text-xs text-[var(--color-text-dim)]">
                    {c._count.products} {c._count.products === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--color-text-faint)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
