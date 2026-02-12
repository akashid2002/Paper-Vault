"use client";

import { useState } from "react";
import {
  Check,
  X,
  FileText,
  Calendar,
  BookOpen,
  User,
  Shield,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { mockPapers, type Paper } from "@/lib/data";

export function AdminDashboard() {
  const [papers, setPapers] = useState<Paper[]>(
    mockPapers.filter((p) => p.status === "pending"),
  );
  const [actionLog, setActionLog] = useState<
    { id: string; action: "approved" | "rejected" }[]
  >([]);

  function handleApprove(id: string) {
    setPapers((prev) => prev.filter((p) => p.id !== id));
    setActionLog((prev) => [...prev, { id, action: "approved" }]);
  }

  function handleReject(id: string) {
    setPapers((prev) => prev.filter((p) => p.id !== id));
    setActionLog((prev) => [...prev, { id, action: "rejected" }]);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-in fade-in duration-300">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Review and moderate uploaded question papers.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <span className="text-sm text-muted-foreground">Pending Review</span>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {papers.length}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <span className="text-sm text-muted-foreground">
            Approved This Session
          </span>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {actionLog.filter((a) => a.action === "approved").length}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <span className="text-sm text-muted-foreground">
            Rejected This Session
          </span>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {actionLog.filter((a) => a.action === "rejected").length}
          </p>
        </div>
      </div>

      {/* Pending papers */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">
          Papers Awaiting Approval
        </h2>

        {papers.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Check className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              All caught up
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No papers pending review right now.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="rounded-xl border bg-card p-5 transition-all hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                      <FileText className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {paper.subject}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {paper.course}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">
                          <Calendar className="mr-1 h-3 w-3" />
                          Sem {paper.semester}
                        </Badge>
                        <Badge variant="secondary">
                          {paper.session} {paper.year}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {paper.uploadedBy}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {paper.created_at
                            ? new Date(paper.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:shrink-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/paper/${paper.id}`}>
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        Preview
                      </Link>
                    </Button>
                    <Button size="sm" onClick={() => handleApprove(paper.id)}>
                      <Check className="mr-1 h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(paper.id)}
                    >
                      <X className="mr-1 h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
