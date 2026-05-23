"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ProductFormState } from "./actions";

type Category = { id: string; name: string };

type ActionFn = (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;

interface ProductFormProps {
  action: ActionFn;
  categories: Category[];
  initial?: {
    id: string;
    name: string;
    categoryId: string;
    price: number;
    stock: number;
    rating: number;
    tag: string | null;
    image: string;
    description: string;
    specs: Record<string, string> | unknown;
  };
  mode: "create" | "edit";
}

export function ProductForm({ action, categories, initial, mode }: ProductFormProps) {
  const [state, formAction, pending] = useActionState<ProductFormState, FormData>(action, {});
  const f = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-md max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <Input
          label="ID (slug)"
          name="id"
          required
          defaultValue={initial?.id}
          readOnly={mode === "edit"}
          error={f.id}
          helperText="lowercase-with-hyphens, used in URLs"
          placeholder="arduino-uno"
        />
        <Input
          label="Name"
          name="name"
          required
          defaultValue={initial?.name}
          error={f.name}
        />
        <div>
          <label className="text-[length:var(--text-label-sm)] font-semibold uppercase tracking-wider text-secondary dark:text-slate-400 block mb-1">
            Category
          </label>
          <select
            name="categoryId"
            required
            defaultValue={initial?.categoryId}
            className="block w-full rounded-xl border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-3.5 text-sm"
          >
            <option value="">Select…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {f.categoryId && <p className="text-xs text-error mt-1">{f.categoryId}</p>}
        </div>
        <Input
          label="Tag (optional)"
          name="tag"
          defaultValue={initial?.tag ?? ""}
          error={f.tag}
        />
        <Input
          label="Price (RWF)"
          name="price"
          type="number"
          min={0}
          required
          defaultValue={initial?.price}
          error={f.price}
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          min={0}
          required
          defaultValue={initial?.stock}
          error={f.stock}
        />
        <Input
          label="Rating"
          name="rating"
          type="number"
          min={0}
          max={5}
          step={0.1}
          defaultValue={initial?.rating ?? 0}
          error={f.rating}
        />
        <Input
          label="Image URL"
          name="image"
          type="url"
          required
          defaultValue={initial?.image}
          error={f.image}
        />
      </div>

      <div>
        <label className="text-[length:var(--text-label-sm)] font-semibold uppercase tracking-wider text-secondary dark:text-slate-400 block mb-1">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={initial?.description}
          className="block w-full rounded-xl border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-3.5 text-sm"
        />
        {f.description && <p className="text-xs text-error mt-1">{f.description}</p>}
      </div>

      <div>
        <label className="text-[length:var(--text-label-sm)] font-semibold uppercase tracking-wider text-secondary dark:text-slate-400 block mb-1">
          Specs (JSON object)
        </label>
        <textarea
          name="specs"
          rows={6}
          defaultValue={initial ? JSON.stringify(initial.specs ?? {}, null, 2) : "{}"}
          className="block w-full rounded-xl border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-3.5 text-xs font-mono"
        />
        {f.specs && <p className="text-xs text-error mt-1">{f.specs}</p>}
      </div>

      {state.error && (
        <p className="text-sm text-error" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 mt-2">
        <Button type="submit" isLoading={pending}>
          {mode === "create" ? "Create product" : "Save changes"}
        </Button>
        <Link
          href="/admin/products"
          className="text-sm text-secondary dark:text-slate-400 hover:text-primary dark:hover:text-inverse-primary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
