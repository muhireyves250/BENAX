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
      className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 disabled:opacity-50"
      aria-label={`Delete ${name}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
