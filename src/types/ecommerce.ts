/**
 * Client-side shapes shared by stores and components.
 * Server/DB shapes come from `@prisma/client`.
 */

export interface ProductLite {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  stock: number;
  tag?: string | null;
}

export interface CartItem {
  product: ProductLite;
  quantity: number;
}
