import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductLite } from "@/types/ecommerce";

interface WishlistState {
  items: ProductLite[];
  add: (product: ProductLite) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        if (get().items.some((p) => p.id === product.id)) return;
        set({ items: [...get().items, product] });
      },
      remove: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),
      has: (productId) => get().items.some((p) => p.id === productId),
      clear: () => set({ items: [] }),
    }),
    {
      name: "benax_wishlist",
      skipHydration: true,
    }
  )
);
