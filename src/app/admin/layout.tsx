import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { auth, signOut } from "@/auth";
import { AdminSidebarNav } from "./AdminNavLink";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-bg-2)] md:flex">
        <div className="flex items-center gap-2.5 border-b border-[var(--color-border-soft)] px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-extrabold">
            B
          </span>
          <div className="leading-tight">
            <span className="block font-headline text-sm font-extrabold tracking-[0.18em]">
              BENAX
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
              Admin
            </span>
          </div>
        </div>

        <AdminSidebarNav />

        <div className="border-t border-[var(--color-border-soft)] p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-3 flex items-center justify-between rounded-xl px-3 py-2 text-xs text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
          >
            <span>View storefront</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] font-bold text-[var(--color-accent)]">
                {session.user.email?.[0]?.toUpperCase() ?? "A"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{session.user.name ?? "Admin"}</p>
                <p className="truncate text-[10px] text-[var(--color-text-faint)]">
                  {session.user.email}
                </p>
              </div>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
              className="mt-3"
            >
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] py-2 text-xs font-semibold text-[var(--color-text-dim)] hover:border-[var(--color-error)] hover:text-[var(--color-error)]"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="md:ml-64">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">{children}</div>
      </main>
    </div>
  );
}
