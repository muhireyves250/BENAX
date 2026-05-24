"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { Upload, ImagePlus, X } from "lucide-react";
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
  const [preview, setPreview] = useState<string | null>(initial?.image ?? null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(initial?.image ?? null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]"
      encType="multipart/form-data"
    >
      {/* Left column — fields */}
      <div className="flex flex-col gap-6">
        <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-6">
          <h2 className="mb-4 font-headline font-bold text-[var(--color-text)]">Basic info</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="ID (slug)"
              name="id"
              required
              defaultValue={initial?.id}
              readOnly={mode === "edit"}
              error={f.id}
              helperText="lowercase-with-hyphens"
              placeholder="arduino-uno"
            />
            <Input
              label="Name"
              name="name"
              required
              defaultValue={initial?.name}
              error={f.name}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
                Category
              </label>
              <select
                name="categoryId"
                required
                defaultValue={initial?.categoryId}
                className="w-full rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-2)] px-4 py-2.5 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {f.categoryId && (
                <p className="text-xs text-[var(--color-error)]">{f.categoryId}</p>
              )}
            </div>
            <Input
              label="Badge / tag"
              name="tag"
              defaultValue={initial?.tag ?? ""}
              error={f.tag}
              placeholder="POPULAR"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-6">
          <h2 className="mb-4 font-headline font-bold text-[var(--color-text)]">Pricing & stock</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
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
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-6">
          <h2 className="mb-4 font-headline font-bold text-[var(--color-text)]">Description</h2>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={initial?.description}
              className="w-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-2)] px-4 py-3 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
            />
            {f.description && (
              <p className="text-xs text-[var(--color-error)]">{f.description}</p>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
              Specs (JSON object)
            </label>
            <textarea
              name="specs"
              rows={6}
              defaultValue={initial ? JSON.stringify(initial.specs ?? {}, null, 2) : "{}"}
              className="w-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-2)] px-4 py-3 font-mono text-xs text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
            />
            {f.specs && <p className="text-xs text-[var(--color-error)]">{f.specs}</p>}
          </div>
        </section>

        {state.error && (
          <p className="rounded-2xl border border-[color-mix(in_oklab,var(--color-error)_30%,transparent)] bg-[color-mix(in_oklab,var(--color-error)_12%,transparent)] px-4 py-3 text-sm text-[var(--color-error)]" role="alert">
            {state.error}
          </p>
        )}
      </div>

      {/* Right column — image upload + actions */}
      <aside className="flex flex-col gap-6">
        <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-6">
          <h2 className="mb-4 font-headline font-bold text-[var(--color-text)]">Product image</h2>

          <label
            htmlFor="imageFile"
            className="group relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-2)] transition-colors hover:border-[var(--color-accent)]"
          >
            {preview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain p-4"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text)]">
                    <Upload className="h-3.5 w-3.5" />
                    Replace
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center text-[var(--color-text-dim)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] text-[var(--color-accent)]">
                  <ImagePlus className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Click to upload
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-text-faint)]">
                    PNG, JPG, WEBP or GIF · up to 5MB
                  </p>
                </div>
              </div>
            )}
          </label>

          <input
            ref={fileInputRef}
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            onChange={onFile}
            required={mode === "create"}
          />

          {fileName && (
            <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-2)] px-3 py-2 text-xs">
              <span className="truncate text-[var(--color-text-dim)]">{fileName}</span>
              <button
                type="button"
                onClick={clearImage}
                className="rounded-full p-1 text-[var(--color-text-faint)] hover:text-[var(--color-error)]"
                aria-label="Remove selection"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          {mode === "edit" && (
            <p className="mt-3 text-xs text-[var(--color-text-faint)]">
              Leave empty to keep the current image.
            </p>
          )}
          {f.image && (
            <p className="mt-2 text-xs text-[var(--color-error)]">{f.image}</p>
          )}
        </section>

        <section className="sticky top-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-6">
          <Button type="submit" isLoading={pending} className="w-full">
            {mode === "create" ? "Create product" : "Save changes"}
          </Button>
          <Link
            href="/admin/products"
            className="mt-3 block text-center text-xs font-semibold text-[var(--color-text-dim)] hover:text-[var(--color-accent)]"
          >
            Cancel
          </Link>
        </section>
      </aside>
    </form>
  );
}
