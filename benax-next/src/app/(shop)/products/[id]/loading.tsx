export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-md py-lg grid grid-cols-1 md:grid-cols-2 gap-lg animate-pulse">
      <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl" />
      <div className="flex flex-col gap-3">
        <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-8 w-3/4 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-20 w-full bg-slate-100 dark:bg-slate-800 rounded mt-2" />
        <div className="h-12 w-full bg-slate-100 dark:bg-slate-800 rounded mt-4" />
      </div>
    </div>
  );
}
