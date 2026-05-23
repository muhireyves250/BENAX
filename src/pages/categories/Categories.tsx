import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../constants/products'
import Card from '../../components/ui/Card'

export const Categories: React.FC = () => {
  const navigate = useNavigate()

  // Function to calculate product count for each category
  const getProductCount = (categoryId: string) => {
    return MOCK_PRODUCTS.filter((p) => p.category === categoryId).length
  }

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`)
  }

  return (
    <div className="flex flex-col gap-6 py-6 w-full text-left">
      <div>
        <h1 className="font-headline font-bold text-3xl text-primary dark:text-white">
          Hardware Categories
        </h1>
        <p className="text-sm text-on-surface-variant dark:text-slate-400 mt-1">
          Select a category to view compatible components and modules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {MOCK_CATEGORIES.map((cat) => {
          const count = getProductCount(cat.id)
          
          return (
            <Card
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm shrink-0`}>
                <span className="material-symbols-outlined text-[28px]">
                  {cat.icon}
                </span>
              </div>
              
              <div className="flex-grow flex flex-col justify-center">
                <h3 className="font-headline font-bold text-[18px] text-primary dark:text-white group-hover:text-primary/80 dark:group-hover:text-primary-fixed-dim transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-secondary dark:text-slate-400 mt-1 leading-relaxed">
                  High quality component designs for robotics, breadboards, and IoT sensor setups.
                </p>
                <span className="text-[10px] font-bold text-primary dark:text-inverse-primary bg-primary/5 dark:bg-inverse-primary/10 px-2.5 py-1 rounded-full self-start mt-3">
                  {count} {count === 1 ? 'Product' : 'Products'} Available
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Categories
