export default function Loading() {
  return (
    <div className="px-4 py-20 text-center">
      <div className="h-10 w-40 mx-auto bg-muted animate-pulse rounded" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
  );
}
