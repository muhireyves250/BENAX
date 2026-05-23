import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  const session = await auth();
  if (!orderId || !session?.user) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });
  if (!order || order.userId !== session.user.id) notFound();

  return (
    <div className="max-w-2xl mx-auto px-md py-lg flex flex-col gap-md text-center items-center">
      <CheckCircle2 className="w-16 h-16 text-emerald-500" />
      <h1 className="font-headline text-3xl font-bold text-on-surface dark:text-inverse-on-surface">
        Order placed
      </h1>
      <p className="text-secondary dark:text-slate-400">
        Order <span className="font-mono font-bold">{order.id}</span> · RWF{" "}
        {order.total.toLocaleString()}
      </p>
      <div className="glass-card rounded-2xl p-md w-full text-left">
        <h2 className="font-headline font-bold mb-2">Items</h2>
        <ul className="divide-y divide-outline-variant/30 dark:divide-slate-800">
          {order.items.map((i) => (
            <li key={i.id} className="py-2 flex justify-between text-sm">
              <span>
                {i.product.name} × {i.quantity}
              </span>
              <span className="font-mono">
                RWF {(i.unitPrice * i.quantity).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-secondary dark:text-slate-500 mt-3">
          Delivery to: {order.deliveryAddress}
        </p>
      </div>
      <Link href="/products">
        <Button variant="outline">Keep shopping</Button>
      </Link>
    </div>
  );
}
