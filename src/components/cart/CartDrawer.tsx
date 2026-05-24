"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";

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
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="absolute inset-0 bg-black backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="flex w-screen max-w-md flex-col border-l border-[var(--color-border-soft)] bg-[var(--color-bg)] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border-soft)] px-6 py-5">
                <h2 className="font-headline text-xl font-extrabold text-[var(--color-text)]">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => toggleDrawer(false)}
                  className="rounded-full p-2 text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-faint)]">
                      <ShoppingCart className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="font-headline text-lg font-bold text-[var(--color-text)]">
                        Your cart is empty
                      </p>
                      <p className="mt-1 max-w-[240px] text-sm text-[var(--color-text-dim)]">
                        Add items from the catalog to get started.
                      </p>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      className="flex gap-4 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-4"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-bg-2)] p-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex flex-grow flex-col text-left">
                        <h4 className="font-headline text-sm font-semibold text-[var(--color-text)] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="mb-1 text-[10px] uppercase tracking-widest text-[var(--color-text-faint)]">
                          {item.product.categoryId.replace(/-/g, " ")}
                        </span>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center overflow-hidden rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-2)]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)]"
                            >
                              −
                            </button>
                            <span className="px-3 text-xs font-bold text-[var(--color-text)]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)]"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="block text-[10px] uppercase tracking-widest text-[var(--color-text-faint)]">
                              RWF {item.product.price.toLocaleString()}
                            </span>
                            <span className="font-headline text-sm font-bold text-[var(--color-accent)]">
                              RWF {(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="self-start rounded-lg p-1 text-[var(--color-text-faint)] hover:bg-[color-mix(in_oklab,var(--color-error)_15%,transparent)] hover:text-[var(--color-error)]"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="flex flex-col gap-4 border-t border-[var(--color-border-soft)] bg-[var(--color-bg-2)] px-6 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-medium text-[var(--color-text-dim)]">
                        Total
                      </span>
                      <span className="text-xs text-[var(--color-text-faint)]">VAT incl.</span>
                    </div>
                    <span className="font-headline text-2xl font-extrabold text-[var(--color-text)]">
                      RWF {total.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      toggleDrawer(false);
                      router.push("/checkout");
                    }}
                    className="btn-accent py-3.5 text-sm"
                  >
                    Proceed to checkout
                  </button>
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
