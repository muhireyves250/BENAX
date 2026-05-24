export function Spinner() {
  return (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center">
      <span className="block h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)]" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-6 flex flex-col gap-2">
      <div className="aspect-square w-full animate-pulse rounded-xl bg-[var(--color-surface-2)]" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--color-surface-2)]" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--color-surface-2)]" />
    </div>
  );
}

export default Spinner;
