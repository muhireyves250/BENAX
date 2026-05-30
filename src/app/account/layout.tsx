import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import { AccountNav } from "./AccountNav";

export const dynamic = "force-dynamic";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account");

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 md:px-12 py-10 flex flex-col gap-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
            My account
          </p>
          <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)]">
            {session.user.name ?? session.user.email}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-dim)]">{session.user.email}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </header>

      <div className="flex flex-col gap-8 md:flex-row">
        <AccountNav />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
