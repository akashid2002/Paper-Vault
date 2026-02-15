"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Shield, LogOut, LayoutDashboard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/admin-login";
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Admin Panel</span>
        </div>

        <nav className="mt-8 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/admin/papers"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            Papers
          </Link>
        </nav>

        <div className="mt-10">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-8 animate-in fade-in duration-300">
        {children}
      </main>
    </div>
  );
}
