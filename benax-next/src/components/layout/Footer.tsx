import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/40 dark:border-slate-800 bg-surface-container-low dark:bg-slate-950 mt-lg">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col md:flex-row gap-md items-start md:items-center justify-between">
        <div>
          <div className="font-headline text-lg font-extrabold text-primary dark:text-inverse-primary">BENAX</div>
          <p className="text-xs text-secondary dark:text-slate-400">
            Components, kits & modules for builders in Kigali.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-secondary dark:text-slate-400">
          <Link href="/products" className="hover:text-primary dark:hover:text-inverse-primary">Shop</Link>
          <Link href="/categories" className="hover:text-primary dark:hover:text-inverse-primary">Categories</Link>
          <Link href="/support" className="hover:text-primary dark:hover:text-inverse-primary">Support</Link>
        </nav>
        <p className="text-xs text-secondary dark:text-slate-500">© {new Date().getFullYear()} BENAX</p>
      </div>
    </footer>
  );
}

export default Footer;
