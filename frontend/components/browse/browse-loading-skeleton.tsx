import { Skeleton } from "@/components/ui/skeleton"

export function BrowseLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Skeleton className="h-5 w-48" />

      <div className="mt-6">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="mt-2 h-5 w-80" />
      </div>

      <div className="mt-6 rounded-xl border bg-card p-4 md:p-6">
        <Skeleton className="h-4 w-16" />
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="mt-4">
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <div className="flex items-start justify-between">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-32" />
            <Skeleton className="mt-3 h-3 w-24" />
            <Skeleton className="mt-4 h-9 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
