"use client";

import React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  FileUp,
  CheckCircle,
  Info,
  X,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { courses, semesters, subjects } from "@/lib/data";
import { uploadPaper } from "@/lib/api";
import { toast } from "sonner";

export function UploadForm() {
  const [course, setCourse] = useState("");
  const [customCourse, setCustomCourse] = useState("");
  const [showCustomCourse, setShowCustomCourse] = useState(false);
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [showCustomSubject, setShowCustomSubject] = useState(false);
  const [session, setSession] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCourse = showCustomCourse ? customCourse : course;
  const availableSubjects =
    course && !showCustomCourse ? subjects[course] || [] : [];
  const activeSubject = showCustomSubject ? customSubject : subject;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const MAX_FILE_SIZE_MB = 5;

  const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  function validateFile(selectedFile: File | null | undefined) {
    if (!selectedFile) return false;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error("Invalid file type", {
        description: "Only PDF, JPG and PNG files are allowed.",
      });
      return false;
    }

    const fileSizeMB = selectedFile.size / 1024 / 1024;

    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error("File too large", {
        description: "Maximum file size is 10MB.",
      });
      return false;
    }

    return true;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!validateFile(selected)) return;

    setFile(selected);
    toast.success("File selected", {
      description: selected.name,
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (!dropped) return;

    if (!validateFile(dropped)) return;

    setFile(dropped);

    toast.success("File selected", {
      description: dropped.name,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();

      if (file) formData.append("file", file);
      formData.append("course", activeCourse);
      formData.append("semester", semester);
      formData.append("subject", activeSubject);
      formData.append("exam_session", session);
      formData.append("year", year);

      await uploadPaper(formData, (percent: number) => {
        setUploadProgress(percent);
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  const isFormValid =
    activeCourse &&
    semester &&
    activeSubject &&
    session &&
    year &&
    file &&
    !isUploading;

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center animate-in fade-in duration-300">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">
          Paper Submitted Successfully
        </h1>
        <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted-foreground">
          Thank you for your contribution! Your paper has been submitted for
          review. An admin will approve it shortly and it will appear on the
          platform.
        </p>
        {(showCustomCourse || showCustomSubject) && (
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Since you entered a custom {showCustomCourse ? "course" : "subject"}
            , our team will verify and add it to the platform.
          </p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/browse">Browse Papers</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setCourse("");
              setCustomCourse("");
              setShowCustomCourse(false);
              setSemester("");
              setSubject("");
              setCustomSubject("");
              setShowCustomSubject(false);
              setSession("");
              setYear("");
              setFile(null);
            }}
          >
            Upload Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 animate-in fade-in duration-300">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Upload Paper</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Upload a Paper
        </h1>
        <p className="mt-1 text-muted-foreground">
          Share question papers with the student community.
        </p>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-foreground">
          All uploaded papers are reviewed by an admin before being published.
          Please ensure you upload genuine question papers only.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="course">Course</Label>
            {showCustomCourse ? (
              <div className="mt-1.5 flex gap-2">
                <Input
                  id="course"
                  placeholder="Enter your course name"
                  value={customCourse}
                  onChange={(e) => setCustomCourse(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => {
                    setShowCustomCourse(false);
                    setCustomCourse("");
                  }}
                  aria-label="Switch back to course list"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Select
                  value={course}
                  onValueChange={(val) => {
                    setCourse(val);
                    setSubject("");
                    setShowCustomSubject(false);
                    setCustomSubject("");
                  }}
                >
                  <SelectTrigger id="course" className="mt-1.5">
                    <SelectValue placeholder="Select course" />
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
                  onClick={() => {
                    setShowCustomCourse(true);
                    setCourse("");
                    setSubject("");
                    setShowCustomSubject(true);
                    setCustomSubject("");
                  }}
                >
                  <Plus className="h-3 w-3" />
                  {"Course not listed? Enter manually"}
                </button>
              </>
            )}
          </div>

          <div>
            <Label htmlFor="semester">Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger id="semester" className="mt-1.5">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    Semester {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          {showCustomSubject || showCustomCourse ? (
            <div className="mt-1.5 flex gap-2">
              <Input
                id="subject"
                placeholder="Enter your subject name"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
              />
              {!showCustomCourse && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => {
                    setShowCustomSubject(false);
                    setCustomSubject("");
                  }}
                  aria-label="Switch back to subject list"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : course ? (
            <>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject" className="mt-1.5">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                className="mt-1.5 flex items-center gap-1 text-xs text-primary hover:underline"
                onClick={() => {
                  setShowCustomSubject(true);
                  setSubject("");
                }}
              >
                <Plus className="h-3 w-3" />
                {"Subject not listed? Enter manually"}
              </button>
            </>
          ) : (
            <Input
              className="mt-1.5"
              placeholder="Select a course first"
              disabled
            />
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="session">Exam Session</Label>
            <Select value={session} onValueChange={setSession}>
              <SelectTrigger id="session" className="mt-1.5">
                <SelectValue placeholder="Select session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Winter">Winter</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="year">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year" className="mt-1.5">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Upload File</Label>
          <div
            className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 px-6 py-10 text-center transition-colors hover:border-primary/40 hover:bg-muted"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                fileInputRef.current?.click();
            }}
            aria-label="Upload file"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            {file ? (
              <div className="flex items-center gap-3">
                <FileUp className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="ml-2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PDF, JPG or PNG (max 10MB)
                </p>
              </>
            )}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!isFormValid || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading {uploadProgress}%
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Submit Paper for Review
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
