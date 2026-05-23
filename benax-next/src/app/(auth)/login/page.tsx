import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="glass-card rounded-2xl p-8 shadow-lg">
      <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface mb-1">
        Welcome back
      </h1>
      <p className="text-sm text-secondary dark:text-slate-400 mb-6">
        Sign in to manage your BENAX storefront.
      </p>
      <LoginForm />
    </div>
  );
}
