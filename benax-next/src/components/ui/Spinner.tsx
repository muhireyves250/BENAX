export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin dark:border-slate-800 dark:border-t-inverse-primary" />
        <span className="text-xs text-secondary font-semibold dark:text-slate-400">{label}</span>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-100 dark:bg-slate-800" />
      <div className="p-md flex flex-col gap-2">
        <div className="h-3 w-1/4 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-3 w-1/3 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-8 w-full bg-slate-100 dark:bg-slate-800 rounded mt-2" />
      </div>
    </div>
  );
}
