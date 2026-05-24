"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Sun, Moon } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useTheme } from "@/app/providers";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Support", path: "/support" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const itemCount = useCartStore((s) => s.getItemCount());
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[color-mix(in_oklab,var(--color-bg)_82%,transparent)] backdrop-blur-xl border-b border-[var(--color-border-soft)]">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 md:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[0_6px_22px_-8px_rgba(189,180,255,0.7)]">
            <span className="font-headline text-lg font-extrabold">B</span>
          </div>
          <span className="font-headline text-[1.05rem] font-extrabold tracking-[0.18em] text-[var(--color-text)]">
            BENAX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const active =
              link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className="group relative font-headline text-[0.95rem]"
              >
                <span
                  className={
                    active
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-dim)] group-hover:text-[var(--color-text)] transition-colors"
                  }
                >
                  {link.name}
                </span>
                <span
                  className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] transition-all duration-300 ${
                    active ? "w-6" : "w-0 group-hover:w-3"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {mounted &&
              (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
          </button>
          <button
            onClick={() => toggleDrawer(true)}
            className="relative rounded-full p-2 text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-bold text-[var(--color-accent-ink)]">
                {itemCount}
              </span>
            )}
          </button>
          <Link
            href="/login"
            className="rounded-full p-2 text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
