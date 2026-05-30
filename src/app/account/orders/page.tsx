import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  if (orders.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center flex flex-col items-center gap-4">
        <p className="text-[var(--color-text-dim)]">You have no orders yet.</p>
        <Link href="/products">
          <Button variant="outline">Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((o) => (
        <div key={o.id} className="glass-card rounded-2xl p-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--color-text-dim)]">
                {o.id.slice(0, 8)}
              </span>
              <span className="rounded-full bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] px-2.5 py-0.5 text-xs font-bold text-[var(--color-accent)]">
                {o.status}
              </span>
            </div>
            <span className="text-xs text-[var(--color-text-faint)]">
              {o.createdAt.toLocaleDateString()}
            </span>
          </div>
          <ul className="divide-y divide-[var(--color-border-soft)]">
            {o.items.map((i) => (
              <li key={i.id} className="py-2 flex justify-between text-sm text-[var(--color-text)]">
                <span>
                  {i.product.name} × {i.quantity}
                </span>
                <span className="font-mono text-[var(--color-text-dim)]">
                  RWF {(i.unitPrice * i.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-[var(--color-border-soft)] pt-3 font-bold">
            <span className="text-[var(--color-text)]">Total</span>
            <span className="font-headline text-[var(--color-accent)]">
              RWF {o.total.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
