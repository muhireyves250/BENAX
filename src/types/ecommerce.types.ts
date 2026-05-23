export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  rating: number
  image: string
  specs: Record<string, string>
  stock: number
  tag?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface UserProfile {
  id: string
  username: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatarUrl?: string
  phone?: string
  address?: string
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  deliveryAddress: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}
