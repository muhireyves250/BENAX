"use client";

import { useActionState } from "react";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="admin@benax.local"
        leftIcon={<Mail className="w-4 h-4" />}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="••••••••"
        leftIcon={<Lock className="w-4 h-4" />}
      />
      {state.error && (
        <p className="text-sm text-error font-medium" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" isLoading={pending} className="mt-2 w-full">
        Sign in
      </Button>
      <p className="text-center text-xs text-secondary dark:text-slate-500 mt-2">
        Admin access only for now.
      </p>
    </form>
  );
}
