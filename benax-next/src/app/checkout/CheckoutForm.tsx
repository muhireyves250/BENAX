"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/stores/useCartStore";
import { placeOrder } from "./actions";

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.getCartTotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (items.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <p className="text-secondary dark:text-slate-400">
          Your cart is empty. Add a product to check out.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await placeOrder({
      address,
      items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    clearCart();
    router.push(`/checkout/success?order=${result.orderId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="glass-card rounded-2xl p-6 flex flex-col gap-2">
        <h2 className="font-headline font-bold text-on-surface dark:text-inverse-on-surface">
          Order summary
        </h2>
        <ul className="divide-y divide-outline-variant/30 dark:divide-slate-800">
          {items.map((i) => (
            <li key={i.product.id} className="py-2 flex justify-between text-sm">
              <span className="text-on-surface dark:text-slate-200">
                {i.product.name} × {i.quantity}
              </span>
              <span className="font-mono text-secondary dark:text-slate-400">
                RWF {(i.product.price * i.quantity).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold pt-2">
          <span>Total</span>
          <span className="font-headline text-primary dark:text-inverse-primary">
            RWF {total.toLocaleString()}
          </span>
        </div>
      </div>

      <Input
        label="Delivery address"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        placeholder="House #, Street, Sector, Kigali"
      />

      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" isLoading={pending} className="self-start">
        Place order
      </Button>
    </form>
  );
}
