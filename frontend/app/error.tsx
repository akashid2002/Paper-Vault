"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">Please try again.</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-primary px-4 py-2 text-white"
      >
        Retry
      </button>
    </div>
  );
}
