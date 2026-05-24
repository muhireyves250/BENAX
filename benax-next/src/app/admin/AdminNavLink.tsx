"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Boxes, Tags, ShoppingBag } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Overview", Icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", Icon: Boxes },
  { href: "/admin/categories", label: "Categories", Icon: Tags },
  { href: "/admin/orders", label: "Orders", Icon: ShoppingBag },
];

export function AdminSidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex-1 space-y-1 px-3 py-5">
      {LINKS.map(({ href, label, Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] text-[var(--color-accent)] font-semibold"
                : "text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
