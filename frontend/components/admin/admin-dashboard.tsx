"use client";

import { useEffect, useState } from "react";
import { FileText, CheckCircle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminDashboard() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPapers() {
    try {
      const res = await fetch("/api/admin/papers", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const { data } = await res.json();
      setPapers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPapers();
  }, []);

  const total = papers.length;
  const pending = papers.filter((p) => !p.approved).length;
  const approved = papers.filter((p) => p.approved).length;

  const recent = papers
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform activity.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Papers</p>
              <p className="text-2xl font-bold">{total}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{pending}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold">{approved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Papers */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recently Uploaded Papers</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/papers">
              Manage All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {recent.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No papers available.
            </p>
          ) : (
            recent.map((paper) => (
              <div
                key={paper.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{paper.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.course} | Sem {paper.semester}
                  </p>
                </div>

                <Badge variant={paper.approved ? "default" : "secondary"}>
                  {paper.approved ? "Approved" : "Pending"}
                </Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
