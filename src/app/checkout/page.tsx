import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { CheckoutForm } from "./CheckoutForm";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-6">
      <Link
        href="/products"
        className="text-sm text-secondary hover:text-primary dark:hover:text-inverse-primary inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Keep shopping
      </Link>
      <h1 className="font-headline text-3xl font-bold text-on-surface dark:text-inverse-on-surface">
        Checkout
      </h1>
      <p className="text-sm text-secondary dark:text-slate-400">
        Signed in as <span className="font-semibold">{session.user.email}</span>
      </p>
      <CheckoutForm />
    </div>
  );
}
