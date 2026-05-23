"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

const productSchema = z.object({
  id: z.string().min(1, "ID is required").regex(/^[a-z0-9-]+$/, "Lowercase, digits, hyphens only"),
  name: z.string().min(2),
  categoryId: z.string().min(1),
  price: z.coerce.number().int().nonnegative(),
  stock: z.coerce.number().int().nonnegative(),
  rating: z.coerce.number().min(0).max(5).default(0),
  tag: z.string().optional().nullable(),
  image: z.url(),
  description: z.string().min(1),
  specs: z.string().optional(),
});

export type ProductFormState = {
  error?: string;
  fieldErrors?: Partial<Record<keyof z.input<typeof productSchema>, string>>;
};

function parseSpecs(raw?: string): Record<string, string> {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, String(v)]));
    }
    return {};
  } catch {
    throw new Error("Specs must be valid JSON object");
  }
}

export async function createProduct(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0] as string, i.message])
      ),
    };
  }
  const { specs, ...rest } = parsed.data;
  let parsedSpecs: Record<string, string>;
  try {
    parsedSpecs = parseSpecs(specs);
  } catch (e) {
    return { fieldErrors: { specs: (e as Error).message } };
  }

  try {
    await prisma.product.create({
      data: { ...rest, slug: rest.id, specs: parsedSpecs, tag: rest.tag || null },
    });
  } catch (e) {
    return { error: (e as Error).message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = productSchema.safeParse({ ...Object.fromEntries(formData), id });
  if (!parsed.success) {
    return {
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0] as string, i.message])
      ),
    };
  }
  const { specs, id: _ignored, ...rest } = parsed.data;
  let parsedSpecs: Record<string, string>;
  try {
    parsedSpecs = parseSpecs(specs);
  } catch (e) {
    return { fieldErrors: { specs: (e as Error).message } };
  }

  try {
    await prisma.product.update({
      where: { id },
      data: { ...rest, specs: parsedSpecs, tag: rest.tag || null },
    });
  } catch (e) {
    return { error: (e as Error).message };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}
