import { randomBytes } from "node:crypto";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function saveProductImage(file: File, prefix: string): Promise<string> {
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error("Image must be PNG, JPEG, WEBP, or GIF");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be smaller than 5MB");
  }

  const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const safePrefix = prefix.replace(/[^a-z0-9-]/gi, "").slice(0, 32) || "product";
  const filename = `${safePrefix}-${randomBytes(6).toString("hex")}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);
  return `/uploads/${filename}`;
}
