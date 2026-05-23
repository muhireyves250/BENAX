import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../../app/store/useCartStore'
import { useAuthStore } from '../../app/store/useAuthStore'
import Button from '../ui/Button'

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    toggleDrawer,
    updateQuantity,
    removeItem,
    getCartTotal,
    clearCart,
  } = useCartStore()

  const { isAuthenticated, createOrder, user } = useAuthStore()
  const navigate = useNavigate()

  const handleCheckout = () => {
    toggleDrawer(false)
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/dashboard' } } })
      return
    }

    // Mock placing order
    const address = user?.address || 'Kigali, Rwanda'
    createOrder(items, getCartTotal(), address)
    clearCart()
    navigate('/dashboard', { state: { orderSuccess: true } })
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="absolute inset-0 bg-slate-900"
          />

          {/* Cart Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-outline-variant/30 dark:border-slate-800 flex items-center justify-between">
                <h2 className="font-headline text-headline-md font-bold text-primary dark:text-white">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => toggleDrawer(false)}
                  className="material-symbols-outlined text-secondary hover:text-primary dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  close
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                    <span className="material-symbols-outlined text-[64px] text-slate-300 dark:text-slate-700">
                      shopping_cart
                    </span>
                    <div>
                      <p className="font-headline font-bold text-slate-700 dark:text-slate-300 text-lg">
                        Your cart is empty
                      </p>
                      <p className="text-sm text-secondary dark:text-slate-500 mt-1 max-w-[240px]">
                        Add items from our catalog to get started on your hardware build.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toggleDrawer(false)
                        navigate('/products')
                      }}
                      className="mt-2"
                    >
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      className="flex gap-4 p-4 border border-outline-variant/30 dark:border-slate-800/80 rounded-2xl bg-surface-container-lowest dark:bg-slate-900/50 hover:shadow-sm transition-shadow duration-200"
                    >
                      {/* Image */}
                      <div className="h-16 w-16 bg-white rounded-xl p-1 shrink-0 border border-outline-variant/20 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex-grow flex flex-col text-left">
                        <h4 className="font-headline font-semibold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 capitalize mb-1">
                          {item.product.category}
                        </span>
                        
                        <div className="flex items-center justify-between mt-auto">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-outline-variant/50 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-950">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-semibold text-primary dark:text-white select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary"
                            >
                              +
                            </button>
                          </div>

                          {/* Price details */}
                          <div className="text-right">
                            <span className="text-xs text-slate-400 block">
                              RWF {item.product.price.toLocaleString()}
                            </span>
                            <span className="text-sm font-bold text-primary dark:text-primary-fixed-dim">
                              RWF {(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="material-symbols-outlined text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-1 rounded-lg self-start transition-colors"
                        aria-label="Remove item"
                      >
                        delete
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Bottom Summary Panel */}
              {items.length > 0 && (
                <div className="px-6 py-6 border-t border-outline-variant/30 dark:border-slate-800 bg-surface-container-low dark:bg-slate-950/50 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <span className="text-sm text-secondary dark:text-slate-400 block font-medium">
                        Total Amount
                      </span>
                      <span className="text-xs text-slate-400">
                        Including local delivery taxes
                      </span>
                    </div>
                    <span className="font-headline font-extrabold text-2xl text-primary dark:text-inverse-primary">
                      RWF {getCartTotal().toLocaleString()}
                    </span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full py-3.5 shadow-lg shadow-primary-container/10 dark:shadow-none"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
