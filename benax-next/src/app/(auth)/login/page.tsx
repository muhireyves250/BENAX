import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
      <h1 className="font-headline text-2xl font-extrabold text-[var(--color-text)]">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-dim)]">
        Sign in to manage your BENAX storefront.
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
