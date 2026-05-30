import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CheckoutForm } from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-6">
      <Link
        href="/products"
        className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-accent)] inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Keep shopping
      </Link>
      <h1 className="font-headline text-3xl font-bold text-[var(--color-text)]">Checkout</h1>
      <p className="text-sm text-[var(--color-text-dim)]">
        No account needed — we&apos;ll set one up for you after you order.
      </p>
      <CheckoutForm />
    </div>
  );
}
