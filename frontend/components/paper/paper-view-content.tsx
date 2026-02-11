"use client";

import Link from "next/link";
import {
  Download,
  Upload,
  Calendar,
  User,
  BookOpen,
  ArrowLeft,
  FileText,
} from "lucide-react";
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
import { useState } from "react";
import { Paper } from "@/lib/types/paper";

export function PaperViewContent({ paper }: { paper: Paper }) {
  const [showPreview, setShowPreview] = useState(false);

  if (!paper) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center animate-in fade-in duration-300">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-muted">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Paper not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The paper you are looking for does not exist or has been removed.
        </p>
        <Button asChild className="mt-6">
          <Link href="/browse">Browse Papers</Link>
        </Button>
      </div>
    );
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
            <BreadcrumbLink href="/browse">Browse</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{paper?.subject}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button variant="ghost" size="sm" asChild className="mt-4">
        <Link href="/browse">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Browse
        </Link>
      </Button>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Main content area */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  {paper?.subject}
                </h1>
                <p className="mt-1 text-muted-foreground">{paper?.course}</p>
              </div>
              <Badge className="text-sm">
                {paper?.exam_session} {paper?.year}
              </Badge>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-muted p-3">
                <span className="text-xs text-muted-foreground">Course</span>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {paper?.course ?? "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="text-xs text-muted-foreground">Semester</span>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  Semester {paper?.semester ?? "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="text-xs text-muted-foreground">Year</span>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {paper?.year ?? "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="text-xs text-muted-foreground">Session</span>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {paper?.exam_session ?? "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* PDF Preview with teaser */}
          <div className="mt-6 rounded-xl border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <span className="text-sm font-medium">Document Preview</span>

              <Button size="sm" asChild>
                <a href={paper.file_url} target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>

            <div className="relative">
              {/* BLUR OVERLAY BEFORE PREVIEW */}
              {!showPreview && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-md bg-white/60">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-3 font-medium">Preview locked</p>
                  <p className="text-sm text-muted-foreground">
                    Click preview to view first pages
                  </p>

                  <Button className="mt-4" onClick={() => setShowPreview(true)}>
                    Preview Paper
                  </Button>
                </div>
              )}

              {/* LIMITED HEIGHT PDF VIEW */}
              <iframe
                src={`${paper.file_url}#toolbar=0`}
                className={`w-full transition-all duration-500 ${
                  showPreview ? "h-[500px]" : "h-[700px] blur-md"
                }`}
              />

              {/* DOWNLOAD CTA after preview */}
              {showPreview && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent p-6 text-center">
                  <p className="text-sm font-medium">
                    Download to view the complete paper
                  </p>
                  <Button className="mt-3" asChild>
                    <a href={paper.file_url} target="_blank">
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Paper
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold text-foreground">Paper Details</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground">Subject</span>
                  <p className="font-medium text-foreground">
                    {paper?.subject ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground">Uploaded</span>
                  <p className="font-medium text-foreground">
                    {new Date(paper?.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground">Uploaded by</span>
                  <p className="font-medium text-foreground">
                    Community member
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-primary/5 p-6">
            <h3 className="font-semibold text-foreground">Have more papers?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Help fellow students by sharing the question papers you have.
              Every upload makes a difference.
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload a Paper
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
