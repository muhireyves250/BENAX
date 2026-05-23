import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-md text-center gap-md">
      <span className="font-headline text-7xl font-extrabold text-primary dark:text-inverse-primary">
        404
      </span>
      <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
        Page not found
      </h1>
      <p className="text-secondary dark:text-slate-400 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
