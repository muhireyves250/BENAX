import { CardSkeleton } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-6">
        <div className="h-8 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse mt-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
