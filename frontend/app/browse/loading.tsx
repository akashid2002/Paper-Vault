export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-muted mb-6" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
            <div className="h-4 w-32 bg-muted animate-pulse" />
            <div className="h-3 w-24 bg-muted animate-pulse" />
            <div className="h-8 w-full bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
