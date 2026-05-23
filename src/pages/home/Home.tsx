import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../constants/products'
import ProductCard from '../../components/product/ProductCard'
import Button from '../../components/ui/Button'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  
  // Show first 4 products as popular components
  const popularProducts = MOCK_PRODUCTS.slice(0, 4)

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`)
  }

  return (
    <div className="flex flex-col gap-xl w-full pb-lg">
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden rounded-3xl mt-6 border border-outline-variant/20 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col md:flex-row items-center gap-lg text-left">
          <div className="w-full md:w-1/2 z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-headline font-bold text-display-lg md:text-[56px] text-primary dark:text-white mb-md leading-tight"
            >
              Smart Electronics for Every Project
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-body-lg text-on-surface-variant dark:text-slate-300 mb-lg max-w-[500px]"
            >
              The leading destination for professional-grade IoT components and robotics in Rwanda. Reliable parts for makers, students, and engineers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/products')}
                className="shadow-lg shadow-primary/10 dark:shadow-none"
              >
                Shop Now
              </Button>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 dark:border-slate-850"
            >
              <img
                alt="Arduino Board Layout"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 select-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgynNRg5RBBL8wGEdvMge9RKzJ11wH9mp8aooEetUt7vWPXUxT0Xj7liieHkYOOeAzrfeNVFmdi7DAPemQbsdJYFx9LTJCcvDbyrF3CxLNxr5zmCZVWZbp6qY9McIHEws7LGCki6xAzTEqzboE-tGxgPnoijdS7PmxB-4YhreDH7oNTQ3jbCFZXxaKzZXaErLKHGTnL-q1Xtwdql4w-mcc2tay4SmIPUevTgOevchNKZ2mgFX11RJnBfv7h8S4F4ZyXILDRLvu6FI"
              />
            </motion.div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-container rounded-full opacity-20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Featured Categories (Bento Style) */}
      <section className="w-full text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-4">
          <div>
            <h2 className="font-headline text-headline-lg font-bold text-primary dark:text-white">
              Browse Categories
            </h2>
            <p className="text-on-surface-variant dark:text-slate-400 mt-1">
              Essential building blocks for your next innovation.
            </p>
          </div>
          <Button
            variant="text"
            onClick={() => navigate('/categories')}
            rightIcon={<span className="material-symbols-outlined">arrow_forward</span>}
            className="p-0 font-bold"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
          {MOCK_CATEGORIES.map((cat) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-md shadow-[0px_4px_20px_rgba(26,43,74,0.01)] hover:shadow-[0px_8px_30px_rgba(26,43,74,0.05)] transition-all flex flex-col items-center text-center gap-3"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
              </div>
              <span className="font-headline text-sm font-semibold text-primary dark:text-slate-200">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Components Grid */}
      <section className="bg-surface-container-low dark:bg-slate-900/30 rounded-3xl p-6 md:p-10 text-left border border-outline-variant/10 dark:border-slate-800/50">
        <h2 className="font-headline text-headline-lg font-bold text-primary dark:text-white mb-lg">
          Popular Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Guarantee Section (Trust Signals) */}
      <section className="w-full text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg border-y border-outline-variant/30 dark:border-slate-800/80 py-lg">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-[32px]">
              verified
            </span>
            <div>
              <h4 className="font-headline font-bold text-primary dark:text-white text-sm mb-1">
                Genuine Products
              </h4>
              <p className="text-on-surface-variant dark:text-slate-400 text-xs leading-relaxed">
                We source directly from manufacturers to ensure authenticity.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-[32px]">
              local_shipping
            </span>
            <div>
              <h4 className="font-headline font-bold text-primary dark:text-white text-sm mb-1">
                Fast Delivery
              </h4>
              <p className="text-on-surface-variant dark:text-slate-400 text-xs leading-relaxed">
                Next-day shipping across Kigali and provincial hubs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-[32px]">
              support_agent
            </span>
            <div>
              <h4 className="font-headline font-bold text-primary dark:text-white text-sm mb-1">
                Expert Support
              </h4>
              <p className="text-on-surface-variant dark:text-slate-400 text-xs leading-relaxed">
                Need help choosing a sensor? Our engineers are here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="max-w-md">
          <h3 className="font-headline font-bold text-xl md:text-2xl text-primary dark:text-white mb-2">
            Stay Updated on Stock Arrivals
          </h3>
          <p className="text-sm text-on-surface-variant dark:text-slate-400">
            Subscribe to our newsletter to receive stock notifications and special offers directly in Kigali.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Thank you for subscribing!')
          }}
          className="flex w-full md:w-auto shrink-0 gap-2 items-center"
        >
          <input
            type="email"
            placeholder="Your email address"
            required
            className="px-4 py-2.5 rounded-xl border border-outline-variant dark:border-slate-800 dark:bg-slate-950 dark:text-white text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-inverse-primary"
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      </section>
    </div>
  )
}

export default Home
