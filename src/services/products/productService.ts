import type { Product } from '../../types/ecommerce.types'
import { MOCK_PRODUCTS } from '../../constants/products'

export const productService = {
  getProducts: async (filters?: {
    category?: string
    search?: string
    sort?: string
  }): Promise<Product[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    let products = [...MOCK_PRODUCTS]

    // Apply category filter
    if (filters?.category && filters.category !== 'all') {
      products = products.filter((p) => p.category === filters.category)
    }

    // Apply search search query
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // Apply sorting
    if (filters?.sort) {
      if (filters.sort === 'price-low') {
        products.sort((a, b) => a.price - b.price)
      } else if (filters.sort === 'price-high') {
        products.sort((a, b) => b.price - a.price)
      } else if (filters.sort === 'rating') {
        products.sort((a, b) => b.rating - a.rating)
      }
    }

    return products
  },

  getProductById: async (id: string): Promise<Product | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const item = MOCK_PRODUCTS.find((p) => p.id === id)
    return item || null
  },
}
