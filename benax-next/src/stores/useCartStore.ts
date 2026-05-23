import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, ProductLite } from "@/types/ecommerce";

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: ProductLite, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: (isOpen?: boolean) => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const idx = items.findIndex((i) => i.product.id === product.id);
        const next =
          idx > -1
            ? items.map((i, j) => (j === idx ? { ...i, quantity: i.quantity + quantity } : i))
            : [...items, { product, quantity }];
        set({ items: next, isDrawerOpen: true });
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleDrawer: (isOpen) =>
        set((s) => ({ isDrawerOpen: isOpen !== undefined ? isOpen : !s.isDrawerOpen })),

      getCartTotal: () =>
        get().items.reduce((t, i) => t + i.product.price * i.quantity, 0),

      getItemCount: () => get().items.reduce((c, i) => c + i.quantity, 0),
    }),
    {
      name: "benax_cart",
      skipHydration: true,
      partialize: (s) => ({ items: s.items }),
    }
  )
);
