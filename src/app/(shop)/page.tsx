export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Truck, Headphones, Cpu, Radio, Wifi, Bot, Sliders, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";

const CATEGORY_ICONS: Record<string, { Icon: typeof Cpu; tint: string; label: string }> = {
  microcontrollers: { Icon: Cpu, tint: "var(--color-accent)", label: "Microcontrollers" },
  sensors: { Icon: Radio, tint: "#7dd3fc", label: "Sensors" },
  "iot-modules": { Icon: Wifi, tint: "#fcd34d", label: "IoT Modules" },
  "robotics-kits": { Icon: Bot, tint: "#a78bfa", label: "Robotics Kits" },
  "motors-actuators": { Icon: Sliders, tint: "#f9a8d4", label: "Motors & Actuators" },
  accessories: { Icon: Wrench, tint: "#cbd5e1", label: "Accessories" },
};

export default async function Home() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ take: 4, orderBy: { rating: "desc" } }),
    prisma.category.findMany({ take: 6 }),
  ]);

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-6 md:px-12 md:py-10">
      {/* Hero panel */}
      <section className="panel-inset relative overflow-hidden">
        <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:p-12">
          <div className="flex flex-col gap-6">
            <h1 className="font-headline text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-text)] md:text-6xl">
              Smart Electronics
              <br />
              for Every Project
            </h1>
            <p className="max-w-md text-[var(--color-text-dim)]">
              The leading destination for professional-grade IoT components and robotics in Rwanda. Reliable parts for makers, students, and engineers.
            </p>
            <div>
              <Link
                href="/products"
                className="btn-accent inline-flex items-center gap-2 px-6 py-3 text-sm"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square w-full overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-gradient-to-br from-white/5 to-[var(--color-surface-2)] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={products[0]?.image || "/placeholder.svg"}
                alt="Featured component"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 hidden h-24 w-24 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-2)] md:block" />
          </div>
        </div>
      </section>

      {/* Browse categories */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-headline text-2xl font-extrabold text-[var(--color-text)]">
              Browse Categories
            </h2>
            <p className="text-sm text-[var(--color-text-dim)]">
              Essential building blocks for your next innovation.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:underline underline-offset-4 md:inline-flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
          {categories.map((c) => {
            const meta = CATEGORY_ICONS[c.id] ?? { Icon: Cpu, tint: "var(--color-accent)", label: c.name };
            const { Icon, tint } = meta;
            return (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className="group flex flex-col items-center gap-3 rounded-[1.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-4 transition-colors hover:border-[var(--color-border)]"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: `color-mix(in oklab, ${tint} 18%, transparent)`, color: tint }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-center text-xs font-semibold leading-tight text-[var(--color-text)]">
                  {c.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular components */}
      <section className="panel-inset p-5 md:p-8">
        <h2 className="mb-5 font-headline text-xl font-extrabold text-[var(--color-text)] md:text-2xl">
          Popular Components
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="grid grid-cols-1 gap-6 border-y border-[var(--color-border-soft)] py-8 md:grid-cols-3">
        {[
          { Icon: BadgeCheck, title: "Genuine Products", desc: "We source directly from manufacturers to ensure authenticity." },
          { Icon: Truck, title: "Fast Delivery", desc: "Next-day shipping across Kigali and provincial hubs." },
          { Icon: Headphones, title: "Expert Support", desc: "Need help choosing a sensor? Our engineers are here." },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--color-accent)_15%,transparent)] text-[var(--color-accent)]">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-headline font-bold text-[var(--color-text)]">{title}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-dim)]">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Newsletter */}
      <section className="panel flex flex-col items-start gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <h3 className="font-headline text-xl font-extrabold text-[var(--color-text)] md:text-2xl">
            Stay Updated on Stock Arrivals
          </h3>
          <p className="mt-1 max-w-md text-sm text-[var(--color-text-dim)]">
            Subscribe to our newsletter to receive stock notifications and special offers directly in Kigali.
          </p>
        </div>
        <form className="flex w-full max-w-md gap-2 md:w-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-2)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] focus:outline-none"
          />
          <button className="btn-accent px-5 py-2.5 text-sm whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}