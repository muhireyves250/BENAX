import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--color-bg)]">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-extrabold">
          B
        </span>
        <span className="font-headline text-lg font-extrabold tracking-[0.22em] text-[var(--color-text)]">
          BENAX
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
