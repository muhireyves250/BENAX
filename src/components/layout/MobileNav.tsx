"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, LayoutGrid, LifeBuoy, User } from "lucide-react";

const TABS = [
  { name: "Home", path: "/", Icon: Home },
  { name: "Shop", path: "/products", Icon: Store },
  { name: "Categories", path: "/categories", Icon: LayoutGrid },
  { name: "Support", path: "/support", Icon: LifeBuoy },
  { name: "Profile", path: "/account", Icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border-soft)] bg-[color-mix(in_oklab,var(--color-bg)_92%,transparent)] backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ name, path, Icon }) => {
          const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <li key={path}>
              <Link
                href={path}
                className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold"
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    active ? "text-[var(--color-accent)]" : "text-[var(--color-text-faint)]"
                  }`}
                />
                <span className={active ? "text-[var(--color-accent)]" : "text-[var(--color-text-faint)]"}>
                  {name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MobileNav;
