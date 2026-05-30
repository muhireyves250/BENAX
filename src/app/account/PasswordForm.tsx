"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { changePassword, type AccountActionState } from "./actions";

const initial: AccountActionState = {};

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, initial);

  return (
    <form action={formAction} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-headline font-bold text-[var(--color-text)]">Change password</h2>
      <Input
        label="Current password"
        name="current"
        type="password"
        required
        autoComplete="current-password"
        placeholder="••••••••"
      />
      <Input
        label="New password"
        name="next"
        type="password"
        required
        autoComplete="new-password"
        placeholder="••••••••"
      />
      {state.error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {state.error}
        </p>
      )}
      {state.ok && <p className="text-sm text-emerald-500">Password updated.</p>}
      <Button type="submit" isLoading={pending} className="self-start">
        Update password
      </Button>
    </form>
  );
}
