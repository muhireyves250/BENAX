import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, user: { select: { name: true, email: true } } },
    take: 50,
  });

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
          Commerce
        </p>
        <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)]">
          Orders
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-dim)]">
          {orders.length} recent {orders.length === 1 ? "order" : "orders"}.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-bg-2)] text-left">
              <tr>
                {["Order", "Customer", "Phone", "Address", "Items", "Total", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-soft)]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-[var(--color-text-dim)]">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[var(--color-bg-2)]">
                    <td className="px-5 py-3 font-mono text-xs text-[var(--color-text)]">
                      {o.id.slice(0, 8)}
                    </td>
                    <td className="px-5 py-3 text-[var(--color-text-dim)]">
                      {o.contactName || o.user?.name || o.user?.email || "—"}
                    </td>
                    <td className="px-5 py-3 text-[var(--color-text-dim)]">{o.contactPhone || "—"}</td>
                    <td className="px-5 py-3 text-[var(--color-text-dim)] max-w-[16rem] truncate">
                      {o.deliveryAddress}
                    </td>
                    <td className="px-5 py-3 text-[var(--color-text-dim)]">{o.items.length}</td>
                    <td className="px-5 py-3 font-mono text-[var(--color-text)]">
                      RWF {o.total.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] px-2.5 py-0.5 text-xs font-bold text-[var(--color-accent)]">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-[var(--color-text-faint)]">
                      {o.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
