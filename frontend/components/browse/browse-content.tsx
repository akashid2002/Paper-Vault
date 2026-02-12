"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useTransition, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Calendar,
  Filter,
  X,
  Loader2,
  Plus,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { mockPapers, courses, semesters, subjects } from "@/lib/data";
import ClientOnly from "@/components/client-only";

function PaperCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-5 w-40" />
      <Skeleton className="mt-2 h-4 w-32" />
      <Skeleton className="mt-3 h-3 w-24" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}

export function BrowseContent({ papers }: { papers: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [course, setCourse] = useState(searchParams.get("course") || "");
  const [semester, setSemester] = useState(searchParams.get("semester") || "");
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [isSearching, setIsSearching] = useState(false);

  // Request dialog states
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState<"course" | "subject">(
    "course",
  );
  const [requestValue, setRequestValue] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const availableSubjects = course ? subjects[course] || [] : [];

  const filteredPapers = useMemo(() => {
    return papers
      .filter((p) => p.approved === true)
      .filter((p) => !course || p.course === course)
      .filter((p) => !semester || p.semester === Number(semester))
      .filter((p) => !subject || p.subject === subject)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }, [course, semester, subject, papers]);

  const simulateSearch = useCallback(() => {
    setIsSearching(true);
    // Simulate network delay for search
    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  }, []);

  function updateFilters(
    newCourse: string,
    newSemester: string,
    newSubject: string,
  ) {
    setCourse(newCourse);
    setSemester(newSemester);
    setSubject(newSubject);
    simulateSearch();
    const params = new URLSearchParams();
    if (newCourse) params.set("course", newCourse);
    if (newSemester) params.set("semester", newSemester);
    if (newSubject) params.set("subject", newSubject);
    startTransition(() => {
      router.replace(`/browse?${params.toString()}`, { scroll: false });
    });
  }

  function clearFilters() {
    updateFilters("", "", "");
  }

  function openRequestDialog(type: "course" | "subject") {
    setRequestType(type);
    setRequestValue("");
    setRequestSubmitted(false);
    setRequestDialogOpen(true);
  }

  function handleRequestSubmit() {
    if (!requestValue.trim()) return;
    setRequestSubmitted(true);
  }

  const hasFilters = course || semester || subject;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-in fade-in duration-300">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Browse Papers</BreadcrumbPage>
          </BreadcrumbItem>
          {course && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{course}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Browse Papers
        </h1>
        <p className="mt-1 text-muted-foreground">
          Filter by course, semester and subject to find the papers you need.
        </p>
      </div>

      {/* Filters */}
      <ClientOnly>
        <div className="mt-6 rounded-xl border bg-card p-4 md:p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Filter className="h-4 w-4" />
            Filters
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div>
              <Select
                value={course}
                onValueChange={(val) => {
                  updateFilters(val, semester, "");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                className="mt-1.5 flex items-center gap-1 text-xs text-primary hover:underline"
                onClick={() => openRequestDialog("course")}
              >
                <Plus className="h-3 w-3" />
                {"Can't find your course?"}
              </button>
            </div>

            <Select
              value={semester}
              onValueChange={(val) => updateFilters(course, val, subject)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    Semester {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <Select
                value={subject}
                onValueChange={(val) => updateFilters(course, semester, val)}
                disabled={!course}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      course ? "All Subjects" : "Select course first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {course && (
                <button
                  type="button"
                  className="mt-1.5 flex items-center gap-1 text-xs text-primary hover:underline"
                  onClick={() => openRequestDialog("subject")}
                >
                  <Plus className="h-3 w-3" />
                  {"Can't find your subject?"}
                </button>
              )}
            </div>
          </div>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-muted-foreground"
              onClick={clearFilters}
            >
              <X className="mr-1 h-3 w-3" />
              Clear filters
            </Button>
          )}
        </div>
      </ClientOnly>

      {/* Results count with loading indicator */}
      <ClientOnly>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {isSearching ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Searching...
              </span>
            ) : (
              <>
                {filteredPapers.length} paper
                {filteredPapers.length !== 1 ? "s" : ""} found
              </>
            )}
          </p>
        </div>
      </ClientOnly>

      {/* Results */}
      {isSearching ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PaperCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            No papers found
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {hasFilters
              ? "Try adjusting your filters or request missing courses/subjects."
              : "No papers have been uploaded yet. Be the first to contribute!"}
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/upload">Upload a Paper</Link>
            </Button>
            {hasFilters && (
              <Button
                variant="outline"
                onClick={() => openRequestDialog(course ? "subject" : "course")}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Request {course ? "Subject" : "Course"}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper, index) => (
            <Link
              key={paper.id}
              href={`/paper/${paper.id}`}
              className="group rounded-xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary">
                  {paper.session} {paper.year}
                </Badge>
              </div>
              <h3 className="mt-4 font-semibold text-foreground transition-colors group-hover:text-primary">
                {paper.subject}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {paper.course}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Sem {paper.semester}
                </span>
                <span>
                  {new Date(paper.uploadedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full bg-transparent"
                tabIndex={-1}
              >
                View Paper
              </Button>
            </Link>
          ))}
        </div>
      )}

      {/* Request Course/Subject Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {requestSubmitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <AlertCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Request Submitted
              </h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Thank you! We have received your request to add{" "}
                <span className="font-medium text-foreground">
                  {requestValue}
                </span>{" "}
                as a new {requestType}. Our team will review and add it shortly.
              </p>
              <Button
                className="mt-6"
                onClick={() => setRequestDialogOpen(false)}
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  Request a New{" "}
                  {requestType === "course" ? "Course" : "Subject"}
                </DialogTitle>
                <DialogDescription>
                  {requestType === "course"
                    ? "Can't find your course in the list? Let us know and we will add it."
                    : "Can't find your subject for this course? Let us know and we will add it."}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 space-y-4">
                {requestType === "subject" && course && (
                  <div>
                    <Label className="text-muted-foreground">Course</Label>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {course}
                    </p>
                  </div>
                )}
                <div>
                  <Label htmlFor="request-name">
                    {requestType === "course" ? "Course Name" : "Subject Name"}
                  </Label>
                  <Input
                    id="request-name"
                    className="mt-1.5"
                    placeholder={
                      requestType === "course"
                        ? "e.g. B.Sc. Physics"
                        : "e.g. Quantum Mechanics"
                    }
                    value={requestValue}
                    onChange={(e) => setRequestValue(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={!requestValue.trim()}
                  onClick={handleRequestSubmit}
                >
                  Submit Request
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
