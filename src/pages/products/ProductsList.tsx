import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { productService } from '../../services/products/productService'
import { MOCK_CATEGORIES } from '../../constants/products'
import type { Product } from '../../types/ecommerce.types'
import ProductCard from '../../components/product/ProductCard'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'

export const ProductsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const selectedCategory = searchParams.get('category') || 'all'
  const searchQuery = searchParams.get('search') || ''
  const selectedSort = searchParams.get('sort') || 'default'

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true)
      try {
        const data = await productService.getProducts({
          category: selectedCategory,
          search: searchQuery,
          sort: selectedSort,
        })
        setProducts(data)
      } catch (err) {
        console.error('Failed fetching catalog:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFiltered()
  }, [selectedCategory, searchQuery, selectedSort])

  const handleCategoryChange = (category: string) => {
    setSearchParams((prev) => {
      if (category === 'all') {
        prev.delete('category')
      } else {
        prev.set('category', category)
      }
      return prev
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (!e.target.value) {
        prev.delete('search')
      } else {
        prev.set('search', e.target.value)
      }
      return prev
    })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => {
      if (e.target.value === 'default') {
        prev.delete('sort')
      } else {
        prev.set('sort', e.target.value)
      }
      return prev
    })
  }

  return (
    <div className="flex flex-col gap-6 py-6 w-full text-left">
      <div>
        <h1 className="font-headline font-bold text-3xl text-primary dark:text-white">
          Component Catalog
        </h1>
        <p className="text-sm text-on-surface-variant dark:text-slate-400 mt-1">
          Explore premium microcontrollers, sensors, IoT modules, and accessories.
        </p>
      </div>

      {/* Filter and Search Bar Pane */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center w-full">
        {/* Search */}
        <div className="w-full lg:max-w-xs">
          <Input
            placeholder="Search parts, chips..."
            value={searchQuery}
            onChange={handleSearchChange}
            leftIcon={<span className="material-symbols-outlined text-[20px]">search</span>}
            className="w-full rounded-2xl bg-white dark:bg-slate-900 border-outline-variant/30"
          />
        </div>

        {/* Sorting selection */}
        <div className="flex items-center gap-2 w-full lg:w-auto self-stretch lg:self-auto justify-end">
          <span className="text-xs font-semibold text-secondary dark:text-slate-400 uppercase select-none">
            Sort:
          </span>
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="rounded-xl border border-outline-variant/40 dark:border-slate-800 dark:bg-slate-900 dark:text-white text-xs px-3 py-2 focus:ring-1 focus:ring-primary dark:focus:ring-inverse-primary"
          >
            <option value="default">Default Sort</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        {/* Category Sidebars Filter (Desktop) / Carousel (Mobile) */}
        <aside className="w-full lg:w-60 shrink-0">
          <Card className="p-4 flex flex-col gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary dark:text-slate-400 mb-2 block border-b border-outline-variant/20 dark:border-slate-800 pb-2">
              Categories
            </span>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`text-left px-3 py-2 rounded-xl text-xs font-headline font-semibold transition-colors duration-150 flex items-center justify-between
                ${
                  selectedCategory === 'all'
                    ? 'bg-primary dark:bg-inverse-primary text-white dark:text-primary'
                    : 'text-secondary dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }
              `}
            >
              <span>All Products</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-headline font-semibold transition-colors duration-150 flex items-center justify-between
                  ${
                    selectedCategory === cat.id
                      ? 'bg-primary dark:bg-inverse-primary text-white dark:text-primary'
                      : 'text-secondary dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }
                `}
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  {cat.name}
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            ))}
          </Card>
        </aside>

        {/* Product Cards Pane */}
        <div className="flex-1 w-full">
          {loading ? (
            /* Skeleton Loading */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 animate-pulse flex flex-col gap-4"
                >
                  <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mt-auto" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl w-full">
              <span className="material-symbols-outlined text-[64px] text-slate-300 dark:text-slate-700">
                search_off
              </span>
              <div>
                <h3 className="font-headline font-bold text-lg text-slate-800 dark:text-slate-200">
                  No matching parts found
                </h3>
                <p className="text-sm text-secondary dark:text-slate-400 mt-1 max-w-[280px] mx-auto">
                  Try adjusting your search criteria, selecting another category, or resetting filters.
                </p>
              </div>
              <button
                onClick={() => setSearchParams({})}
                className="text-xs font-bold text-primary dark:text-inverse-primary hover:underline"
              >
                Reset All Filters
              </button>
            </Card>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
