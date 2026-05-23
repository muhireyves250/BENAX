"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.getCartTotal());

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="absolute inset-0 bg-slate-900"
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
            >
              <div className="px-6 py-5 border-b border-outline-variant/30 dark:border-slate-800 flex items-center justify-between">
                <h2 className="font-headline text-xl font-bold text-primary dark:text-white">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => toggleDrawer(false)}
                  className="text-secondary hover:text-primary dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-300 dark:text-slate-700" />
                    <div>
                      <p className="font-headline font-bold text-slate-700 dark:text-slate-300 text-lg">
                        Your cart is empty
                      </p>
                      <p className="text-sm text-secondary dark:text-slate-500 mt-1 max-w-[240px]">
                        Add items from the catalog to get started.
                      </p>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      className="flex gap-4 p-4 border border-outline-variant/30 dark:border-slate-800/80 rounded-2xl bg-surface-container-lowest dark:bg-slate-900/50"
                    >
                      <div className="h-16 w-16 bg-white rounded-xl p-1 shrink-0 border border-outline-variant/20 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="flex-grow flex flex-col text-left">
                        <h4 className="font-headline font-semibold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 capitalize mb-1">
                          {item.product.categoryId}
                        </span>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-outline-variant/50 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-950">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary"
                            >
                              −
                            </button>
                            <span className="px-3 text-xs font-semibold text-primary dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary"
                            >
                              +
                            </button>
                          </div>
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
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-1 rounded-lg self-start"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="px-6 py-6 border-t border-outline-variant/30 dark:border-slate-800 bg-surface-container-low dark:bg-slate-950/50 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-secondary dark:text-slate-400 block font-medium">
                        Total
                      </span>
                      <span className="text-xs text-slate-400">VAT incl.</span>
                    </div>
                    <span className="font-headline font-extrabold text-2xl text-primary dark:text-inverse-primary">
                      RWF {total.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      toggleDrawer(false);
                      router.push("/checkout");
                    }}
                    className="w-full py-3.5"
                  >
                    Proceed to checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
