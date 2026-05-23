import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface-container-low dark:bg-slate-950">
      <Link
        href="/"
        className="mb-8 font-headline text-2xl font-bold text-primary dark:text-inverse-primary"
      >
        BENAX
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
