import crypto from "node:crypto";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { SetPasswordForm } from "./SetPasswordForm";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; setup?: string }>;
}) {
  const { order: orderId, setup } = await searchParams;
  if (!orderId) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } }, user: true },
  });
  if (!order) notFound();

  let showSetup = false;
  if (
    setup &&
    order.user &&
    !order.user.passwordHash &&
    order.user.setupTokenHash &&
    order.user.setupTokenExpiresAt &&
    order.user.setupTokenExpiresAt > new Date()
  ) {
    const tokenHash = crypto.createHash("sha256").update(setup).digest("hex");
    showSetup = tokenHash === order.user.setupTokenHash;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-6 text-center items-center">
      <CheckCircle2 className="w-16 h-16 text-emerald-500" />
      <h1 className="font-headline text-3xl font-bold text-[var(--color-text)]">Order placed</h1>
      <p className="text-[var(--color-text-dim)]">
        Order <span className="font-mono font-bold">{order.id.slice(0, 8)}</span> · RWF{" "}
        {order.total.toLocaleString()}
      </p>
      <p className="text-sm text-[var(--color-text-dim)]">
        We&apos;ll reach out on {order.contactPhone} to arrange delivery and payment.
      </p>

      {showSetup && setup && order.user && (
        <SetPasswordForm token={setup} email={order.user.email} />
      )}

      <div className="glass-card rounded-2xl p-6 w-full text-left">
        <h2 className="font-headline font-bold mb-2 text-[var(--color-text)]">Items</h2>
        <ul className="divide-y divide-[var(--color-border-soft)]">
          {order.items.map((i) => (
            <li key={i.id} className="py-2 flex justify-between text-sm text-[var(--color-text)]">
              <span>
                {i.product.name} × {i.quantity}
              </span>
              <span className="font-mono">
                RWF {(i.unitPrice * i.quantity).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--color-text-faint)] mt-3">
          Delivery to: {order.deliveryAddress}
        </p>
      </div>

      <Link href="/products">
        <Button variant="outline">Keep shopping</Button>
      </Link>
    </div>
  );
}
