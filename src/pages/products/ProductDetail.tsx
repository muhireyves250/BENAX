import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { productService } from '../../services/products/productService'
import type { Product } from '../../types/ecommerce.types'
import { useCartStore } from '../../app/store/useCartStore'
import { useAuthStore } from '../../app/store/useAuthStore'
import ProductCard from '../../components/product/ProductCard'
import Button from '../../components/ui/Button'

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const { addItem } = useCartStore()
  const { wishlist, addToWishlist, removeFromWishlist, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return
      setLoading(true)
      try {
        const item = await productService.getProductById(id)
        if (item) {
          setProduct(item)
          // Fetch related items (same category, excluding current)
          const allProducts = await productService.getProducts({ category: item.category })
          setRelated(allProducts.filter((p) => p.id !== item.id).slice(0, 3))
        } else {
          setProduct(null)
        }
      } catch (err) {
        console.error('Error fetching details:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
    // Reset quantity on page navigation
    setQuantity(1)
  }, [id])

  if (loading) {
    return (
      <div className="w-full py-10 flex flex-col gap-8 animate-pulse text-left">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center gap-4">
        <span className="material-symbols-outlined text-[64px] text-rose-500">
          error
        </span>
        <div>
          <h2 className="font-headline font-bold text-2xl text-slate-800 dark:text-slate-100">
            Product Not Found
          </h2>
          <p className="text-sm text-secondary dark:text-slate-400 mt-1 max-w-sm">
            We couldn't locate the microcontroller or component you requested. It might be out of stock or renamed.
          </p>
        </div>
        <Button onClick={() => navigate('/products')} variant="outline" size="sm">
          Browse Catalog
        </Button>
      </div>
    )
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id)

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="w-full py-6 flex flex-col gap-10 text-left">
      {/* Back button */}
      <div>
        <Link
          to="/products"
          className="text-xs font-semibold text-secondary hover:text-primary dark:hover:text-primary-fixed-dim flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Catalog
        </Link>
      </div>

      {/* Main product pane */}
      <section className="flex flex-col lg:flex-row gap-10 items-start w-full">
        {/* Left Image View */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-12 flex items-center justify-center overflow-hidden shadow-[0px_4px_20px_rgba(26,43,74,0.01)] relative aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain select-none transform hover:scale-105 transition-transform duration-500"
          />
          {product.tag && (
            <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-primary dark:bg-inverse-primary text-white dark:text-primary px-3 py-1 rounded-full shadow-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Right Product Details Pane */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
              {product.category.replace('-', ' ')}
            </span>
            <h1 className="font-headline font-bold text-3xl text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-amber-500 font-variation-settings-fill">
                  star
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350">
                  {product.rating.toFixed(1)} / 5.0 Rating
                </span>
              </div>
              <span className="h-3 w-px bg-slate-300 dark:bg-slate-800" />
              <span className={`text-xs font-semibold
                ${product.stock > 10 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}
              `}>
                {product.stock} items available in Kigali
              </span>
            </div>
          </div>

          <p className="text-body-md text-slate-600 dark:text-slate-300 leading-relaxed border-t border-outline-variant/20 dark:border-slate-850 pt-4">
            {product.description}
          </p>

          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4">
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase">Unit Price</span>
              <span className="font-headline font-extrabold text-2xl text-primary dark:text-inverse-primary mt-0.5">
                RWF {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Checkout Panel */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-b border-outline-variant/20 dark:border-slate-850 pb-6">
            {/* Quantity */}
            <div className="flex items-center border border-outline-variant/50 dark:border-slate-850 rounded-xl overflow-hidden bg-white dark:bg-slate-950">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3.5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary font-bold text-sm"
              >
                -
              </button>
              <span className="px-5 text-sm font-semibold text-primary dark:text-white select-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3.5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary font-bold text-sm"
              >
                +
              </button>
            </div>

            {/* Add to Cart button */}
            <Button
              variant={isAdded ? 'secondary' : 'primary'}
              onClick={handleAddToCart}
              leftIcon={
                <span className="material-symbols-outlined text-[20px]">
                  {isAdded ? 'check' : 'add_shopping_cart'}
                </span>
              }
              className="px-6 py-3 shadow-md"
            >
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </Button>

            {/* Wishlist toggle */}
            {isAuthenticated && (
              <button
                onClick={handleWishlistToggle}
                className={`material-symbols-outlined border p-3 rounded-xl transition-colors duration-150
                  ${
                    isWishlisted
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                      : 'border-outline-variant hover:border-rose-500 hover:text-rose-500 text-secondary'
                  }
                `}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                favorite
              </button>
            )}
          </div>

          {/* Specs Sheet */}
          <div className="text-left mt-2">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary dark:text-slate-400 mb-3">
              Hardware Specifications
            </h3>
            <div className="border border-outline-variant/30 dark:border-slate-850 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-white dark:bg-slate-950/20'}
                    >
                      <td className="px-4 py-3 font-semibold text-secondary dark:text-slate-400 w-1/3 border-r border-outline-variant/20 dark:border-slate-850">
                        {key}
                      </td>
                      <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Recommendation */}
      {related.length > 0 && (
        <section className="text-left mt-8 border-t border-outline-variant/20 dark:border-slate-850 pt-8">
          <h2 className="font-headline font-bold text-xl text-primary dark:text-white mb-6">
            Recommended Components
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail
