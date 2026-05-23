import { create } from 'zustand'
import type { UserProfile, Order, Product } from '../../types/ecommerce.types'

interface AuthState {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  orders: Order[]
  wishlist: Product[]
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updated: Partial<UserProfile>) => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  createOrder: (items: any[], total: number, address: string) => Order
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: localStorage.getItem('benax_user')
    ? JSON.parse(localStorage.getItem('benax_user')!)
    : null,
  token: localStorage.getItem('benax_token') || null,
  isAuthenticated: !!localStorage.getItem('benax_token'),
  isLoading: false,
  error: null,
  orders: localStorage.getItem('benax_orders')
    ? JSON.parse(localStorage.getItem('benax_orders')!)
    : [],
  wishlist: localStorage.getItem('benax_wishlist')
    ? JSON.parse(localStorage.getItem('benax_wishlist')!)
    : [],

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (email && password === 'password123') {
      const mockUser: UserProfile = {
        id: 'usr-001',
        username: email.split('@')[0],
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role: 'user',
        phone: '+250 788 123 456',
        address: 'Nyarugenge, Kigali, Rwanda',
      }
      const token = 'mock-benax-jwt-token'

      localStorage.setItem('benax_user', JSON.stringify(mockUser))
      localStorage.setItem('benax_token', token)

      set({
        user: mockUser,
        token: token,
        isAuthenticated: true,
        isLoading: false,
      })
      return true
    } else {
      set({
        isLoading: false,
        error: 'Invalid email or password. Hint: use password123',
      })
      return false
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (name && email && password) {
      const mockUser: UserProfile = {
        id: `usr-${Math.floor(Math.random() * 1000)}`,
        username: email.split('@')[0],
        email: email,
        name: name,
        role: 'user',
        phone: '',
        address: '',
      }
      const token = 'mock-benax-jwt-token'

      localStorage.setItem('benax_user', JSON.stringify(mockUser))
      localStorage.setItem('benax_token', token)

      set({
        user: mockUser,
        token: token,
        isAuthenticated: true,
        isLoading: false,
      })
      return true
    } else {
      set({ isLoading: false, error: 'Registration failed. Fill out all fields.' })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('benax_user')
    localStorage.removeItem('benax_token')
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },

  updateProfile: (updated) => {
    const user = get().user
    if (!user) return
    const newUser = { ...user, ...updated }
    localStorage.setItem('benax_user', JSON.stringify(newUser))
    set({ user: newUser })
  },

  addToWishlist: (product) => {
    const list = get().wishlist
    if (list.some((p) => p.id === product.id)) return
    const newList = [...list, product]
    localStorage.setItem('benax_wishlist', JSON.stringify(newList))
    set({ wishlist: newList })
  },

  removeFromWishlist: (productId) => {
    const newList = get().wishlist.filter((p) => p.id !== productId)
    localStorage.setItem('benax_wishlist', JSON.stringify(newList))
    set({ wishlist: newList })
  },

  createOrder: (items, total, address) => {
    const order: Order = {
      id: `BNX-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items,
      total,
      status: 'pending',
      deliveryAddress: address,
    }
    const newOrders = [order, ...get().orders]
    localStorage.setItem('benax_orders', JSON.stringify(newOrders))
    set({ orders: newOrders })
    return order
  },

  clearError: () => set({ error: null }),
}))
