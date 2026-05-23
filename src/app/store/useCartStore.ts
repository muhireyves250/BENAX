import { create } from 'zustand'
import type { Product, CartItem } from '../../types/ecommerce.types'

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleDrawer: (isOpen?: boolean) => void
  getCartTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: localStorage.getItem('benax_cart')
    ? JSON.parse(localStorage.getItem('benax_cart')!)
    : [],
  isDrawerOpen: false,

  addItem: (product, quantity = 1) => {
    const items = get().items
    const existingIndex = items.findIndex((item) => item.product.id === product.id)
    let newItems: CartItem[] = []

    if (existingIndex > -1) {
      newItems = items.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      newItems = [...items, { product, quantity }]
    }

    localStorage.setItem('benax_cart', JSON.stringify(newItems))
    set({ items: newItems, isDrawerOpen: true })
  },

  removeItem: (productId) => {
    const newItems = get().items.filter((item) => item.product.id !== productId)
    localStorage.setItem('benax_cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }

    const newItems = get().items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    )
    localStorage.setItem('benax_cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  clearCart: () => {
    localStorage.removeItem('benax_cart')
    set({ items: [] })
  },

  toggleDrawer: (isOpen) => {
    set((state) => ({
      isDrawerOpen: isOpen !== undefined ? isOpen : !state.isDrawerOpen,
    }))
  },

  getCartTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },
}))
