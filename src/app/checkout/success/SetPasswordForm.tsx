"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { setPassword } from "../actions";

export function SetPasswordForm({ token, email }: { token: string; email: string }) {
  const [password, setPasswordValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setPending(true);
    // On success setPassword signs in and redirects, so control won't return.
    const result = await setPassword({ token, password });
    setPending(false);
    if (result && !result.ok) setError(result.error);
  };

  return (
    <div className="glass-card rounded-2xl p-6 w-full text-left">
      <h2 className="font-headline font-bold text-[var(--color-text)]">Finish your account</h2>
      <p className="mt-1 text-sm text-[var(--color-text-dim)]">
        We created an account for <span className="font-semibold">{email}</span>. Set a password
        to track future orders.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="••••••••"
        />
        <Input
          label="Confirm password"
          name="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="••••••••"
        />
        {error && (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" isLoading={pending} className="self-start">
          Set password &amp; sign in
        </Button>
      </form>
    </div>
  );
}
