"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { updateProfile, type AccountActionState } from "./actions";

const initial: AccountActionState = {};

export function ProfileForm({
  name,
  email,
  phone,
  address,
}: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  const [state, formAction, pending] = useActionState(updateProfile, initial);

  return (
    <form action={formAction} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-headline font-bold text-[var(--color-text)]">Profile details</h2>
      <Input label="Email" value={email} readOnly disabled />
      <Input label="Full name" name="name" defaultValue={name} required />
      <Input label="Phone" name="phone" type="tel" defaultValue={phone} required />
      <Input label="Delivery address" name="address" defaultValue={address} required />
      {state.error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {state.error}
        </p>
      )}
      {state.ok && <p className="text-sm text-emerald-500">Saved.</p>}
      <Button type="submit" isLoading={pending} className="self-start">
        Save changes
      </Button>
    </form>
  );
}
