"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "./actions";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();

  const handle = () => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.set("id", id);
    startTransition(() => {
      void deleteProduct(fd);
    });
  };

  return (
    <button
      type="button"
      onClick={handle}
      disabled={pending}
      className="rounded-lg p-2 text-[var(--color-text-faint)] hover:bg-[color-mix(in_oklab,var(--color-error)_15%,transparent)] hover:text-[var(--color-error)] disabled:opacity-50"
      aria-label={`Delete ${name}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
