export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Optional admin header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      <div>{children}</div>
    </div>
  );
}
