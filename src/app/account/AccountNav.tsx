"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart } from "lucide-react";

const LINKS = [
  { name: "Profile", path: "/account", Icon: User },
  { name: "Orders", path: "/account/orders", Icon: Package },
  { name: "Wishlist", path: "/account/wishlist", Icon: Heart },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-2 overflow-x-auto md:w-56 md:shrink-0 md:flex-col">
      {LINKS.map(({ name, path, Icon }) => {
        const active = path === "/account" ? pathname === "/account" : pathname.startsWith(path);
        return (
          <Link
            key={path}
            href={path}
            className={`inline-flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              active
                ? "bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] text-[var(--color-accent)]"
                : "text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
            }`}
          >
            <Icon className="h-4 w-4" />
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
