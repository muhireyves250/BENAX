"use client";

import { useState } from "react";
import Link from "next/link";
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [pending, setPending] = useState(false);

  if (items.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <p className="text-[var(--color-text-dim)]">
          Your cart is empty. Add a product to check out.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNeedsLogin(false);
    setPending(true);
    const result = await placeOrder({
      name,
      email,
      phone,
      address,
      items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      setNeedsLogin(result.code === "EXISTS");
      return;
    }
    clearCart();
    const params = new URLSearchParams({ order: result.orderId });
    if (result.setupToken) params.set("setup", result.setupToken);
    router.push(`/checkout/success?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="glass-card rounded-2xl p-6 flex flex-col gap-2">
        <h2 className="font-headline font-bold text-[var(--color-text)]">Order summary</h2>
        <ul className="divide-y divide-[var(--color-border-soft)]">
          {items.map((i) => (
            <li key={i.product.id} className="py-2 flex justify-between text-sm">
              <span className="text-[var(--color-text)]">
                {i.product.name} × {i.quantity}
              </span>
              <span className="font-mono text-[var(--color-text-dim)]">
                RWF {(i.product.price * i.quantity).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold pt-2">
          <span className="text-[var(--color-text)]">Total</span>
          <span className="font-headline text-[var(--color-accent)]">
            RWF {total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="font-headline font-bold text-[var(--color-text)]">Your details</h2>
        <Input
          label="Full name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          placeholder="Jane Uwase"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="jane@example.com"
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="tel"
          placeholder="+250 7.. ... ..."
        />
        <Input
          label="Delivery address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="House #, Street, Sector, Kigali"
        />
      </div>

      {error && (
        <div className="flex flex-col gap-2" role="alert">
          <p className="text-sm text-[var(--color-error)]">{error}</p>
          {needsLogin && (
            <Link
              href="/login?callbackUrl=/checkout"
              className="text-sm font-semibold text-[var(--color-accent)] hover:underline"
            >
              Sign in to continue →
            </Link>
          )}
        </div>
      )}

      <Button type="submit" isLoading={pending} className="self-start">
        Place order
      </Button>
    </form>
  );
}
