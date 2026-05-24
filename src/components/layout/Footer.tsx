import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] bg-[var(--color-bg-2)] mt-12">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 py-8 md:flex-row md:items-center md:px-12">
        <div className="font-headline text-sm font-extrabold tracking-[0.22em] text-[var(--color-text-dim)]">
          BENAX
        </div>
        <nav className="flex flex-wrap gap-8 text-sm">
          <Link href="/support" className="text-[var(--color-text-dim)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline">
            Product Guarantee
          </Link>
          <Link href="/support" className="text-[var(--color-text-dim)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline">
            Delivery Info
          </Link>
          <Link href="/support" className="font-semibold text-[var(--color-text)] underline underline-offset-4 decoration-[var(--color-accent)]">
            WhatsApp Support
          </Link>
        </nav>
        <p className="text-xs text-[var(--color-text-faint)]">
          © {new Date().getFullYear()} Benax Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
