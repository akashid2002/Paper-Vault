"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AdminPapersPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">(
    "pending",
  );
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [processingType, setProcessingType] = useState<
    "approve" | "reject" | "delete" | null
  >(null);

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

  async function handleAction(
    id: string,
    type: "approve" | "reject" | "delete",
  ) {
    try {
      setProcessingId(id);
      setProcessingType(type);

      const res = await fetch(`/api/admin/papers/${id}`, {
        method: type === "delete" ? "DELETE" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: type !== "delete" ? JSON.stringify({ action: type }) : undefined,
      });

      if (!res.ok) throw new Error("Action failed");

      // Optimistic update (no full refetch)
      setPapers((prev) =>
        prev
          .map((p) =>
            p.id === id
              ? {
                  ...p,
                  approved:
                    type === "approve"
                      ? true
                      : type === "reject"
                        ? false
                        : p.approved,
                }
              : p,
          )
          .filter((p) => (type === "delete" ? p.id !== id : true)),
      );
      toast.success(
        type === "approve"
          ? "Paper approved successfully"
          : type === "reject"
            ? "Paper rejected"
            : "Paper deleted",
      );
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setProcessingId(null);
      setProcessingType(null);
    }
  }

  const filtered = papers.filter((p) => {
    if (activeTab === "pending") return !p.approved;
    if (activeTab === "approved") return p.approved;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading papers...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Papers</h1>
        <p className="text-muted-foreground">
          Review, approve or remove uploaded papers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["all", "pending", "approved"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Semester</th>
              <th className="px-4 py-3">Session</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No papers found.
                </td>
              </tr>
            ) : (
              filtered.map((paper) => (
                <tr key={paper.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{paper.subject}</td>
                  <td className="px-4 py-3">{paper.course}</td>
                  <td className="px-4 py-3">Sem {paper.semester}</td>
                  <td className="px-4 py-3">
                    {paper.session} {paper.year}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={paper.approved ? "default" : "secondary"}>
                      {paper.approved ? "Approved" : "Pending"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/paper/${paper.id}`} target="_blank">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Button>

                    {!paper.approved && (
                      <Button
                        size="sm"
                        disabled={processingId === paper.id}
                        onClick={() => handleAction(paper.id, "approve")}
                      >
                        {processingId === paper.id &&
                        processingType === "approve" ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    )}

                    {paper.approved && (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={processingId === paper.id}
                        onClick={() => handleAction(paper.id, "reject")}
                      >
                        {processingId === paper.id &&
                        processingType === "reject" ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <X className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    )}

                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={processingId === paper.id}
                      onClick={() => handleAction(paper.id, "delete")}
                    >
                      {processingId === paper.id &&
                      processingType === "delete" ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
