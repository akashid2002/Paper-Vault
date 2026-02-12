export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="h-8 w-64 bg-muted animate-pulse rounded" />
      <div className="h-40 w-full bg-muted animate-pulse rounded-xl" />
      <div className="h-96 w-full bg-muted animate-pulse rounded-xl" />
    </div>
  );
}
