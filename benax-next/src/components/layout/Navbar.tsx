"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="sticky top-0 w-full z-40 bg-white dark:bg-slate-900 border-b border-outline-variant/30 dark:border-slate-800 shadow-[0px_4px_20px_rgba(26,43,74,0.02)]">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1280px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary dark:bg-inverse-primary flex items-center justify-center shadow-md">
            <span className="text-white dark:text-primary font-bold text-lg select-none">B</span>
          </div>
          <span className="font-headline text-xl font-extrabold tracking-tight text-primary dark:text-white">
            BENAX
          </span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => {
            const active =
              link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-headline text-sm transition-colors hover:text-primary dark:hover:text-primary-fixed-dim ${
                  active
                    ? "text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-0.5"
                    : "text-secondary dark:text-secondary-fixed-dim"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => toggleDrawer(true)}
            className="relative text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-error text-on-error text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <Link
            href="/login"
            className="text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
