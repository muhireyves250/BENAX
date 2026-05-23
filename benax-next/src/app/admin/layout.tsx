import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/Button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-surface-container-low dark:bg-slate-950">
      <header className="border-b border-outline-variant/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-md py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-headline font-bold text-primary dark:text-inverse-primary">
              BENAX Admin
            </Link>
            <nav className="hidden md:flex gap-4 text-sm">
              <Link href="/admin" className="text-secondary hover:text-primary dark:hover:text-inverse-primary">
                Overview
              </Link>
              <Link
                href="/admin/products"
                className="text-secondary hover:text-primary dark:hover:text-inverse-primary"
              >
                Products
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-secondary dark:text-slate-400 hidden sm:inline">
              {session.user.email}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-md">{children}</main>
    </div>
  );
}
