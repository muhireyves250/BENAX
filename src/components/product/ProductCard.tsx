import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/ecommerce.types'
import { useCartStore } from '../../app/store/useCartStore'
import { useAuthStore } from '../../app/store/useAuthStore'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore()
  const { wishlist, addToWishlist, removeFromWishlist, isAuthenticated } = useAuthStore()
  const [isAdded, setIsAdded] = useState(false)

  const isWishlisted = wishlist.some((p) => p.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) return // Ignore or redirect if wanted, but keep silent or simple
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Card className="flex flex-col group h-full relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-0 rounded-2xl shadow-[0px_4px_20px_rgba(26,43,74,0.02)] transition-all">
      {/* Category Tag & Wishlist */}
      <div className="absolute top-3 left-3 z-10 flex items-center justify-between w-[calc(100%-24px)]">
        {product.tag ? (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-primary dark:bg-inverse-primary text-white dark:text-primary px-2.5 py-1 rounded-full select-none shadow-sm">
            {product.tag}
          </span>
        ) : (
          <span />
        )}

        {isAuthenticated && (
          <button
            onClick={handleWishlist}
            className={`material-symbols-outlined p-1.5 rounded-full backdrop-blur-md shadow-sm transition-colors duration-150
              ${
                isWishlisted
                  ? 'bg-rose-500/10 text-rose-500 dark:bg-rose-500/20'
                  : 'bg-white/80 dark:bg-slate-950/80 text-slate-400 hover:text-rose-500'
              }
            `}
          >
            favorite
          </button>
        )}
      </div>

      <Link to={`/products/${product.id}`} className="flex flex-col flex-grow">
        {/* Cover image container */}
        <div className="aspect-square w-full bg-slate-50 dark:bg-slate-950 p-gutter flex items-center justify-center overflow-hidden border-b border-outline-variant/10 dark:border-slate-800/60 rounded-t-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Product Meta details */}
        <div className="p-md flex flex-col flex-grow text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1 block">
            {product.category.replace('-', ' ')}
          </span>
          <h3 className="font-headline font-bold text-[16px] text-primary dark:text-white leading-tight group-hover:text-primary/85 dark:group-hover:text-primary-fixed-dim transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1.5 mb-4">
            <span className="material-symbols-outlined text-[16px] text-amber-500 font-variation-settings-fill">
              star
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400">Price</span>
              <span className="font-headline font-extrabold text-primary dark:text-inverse-primary text-[18px]">
                RWF {product.price.toLocaleString()}
              </span>
            </div>

            <Button
              variant={isAdded ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleAddToCart}
              leftIcon={
                <span className="material-symbols-outlined text-[16px]">
                  {isAdded ? 'check' : 'add_shopping_cart'}
                </span>
              }
              className="px-3 py-2 text-xs font-headline shadow-sm hover:shadow"
            >
              {isAdded ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCard
