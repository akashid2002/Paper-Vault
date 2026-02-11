"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { courses, semesters, subjects } from "@/lib/data"

export function HeroSection() {
  const router = useRouter()
  const [course, setCourse] = useState("")
  const [semester, setSemester] = useState("")
  const [subject, setSubject] = useState("")

  const availableSubjects = course ? subjects[course] || [] : []

  function handleSearch() {
    const params = new URLSearchParams()
    if (course) params.set("course", course)
    if (semester) params.set("semester", semester)
    if (subject) params.set("subject", subject)
    router.push(`/browse?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(217_91%_60%_/_0.3),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Previous Year Exam Question Papers
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
            Find exam papers instantly. Browse by course, semester
            and subject — or upload papers to help fellow students.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-xl bg-card p-4 shadow-xl md:p-6">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Course
                </label>
                <Select value={course} onValueChange={(val) => { setCourse(val); setSubject("") }}>
                  <SelectTrigger>
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
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Semester
                </label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger>
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
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Subject
                </label>
                {course ? (
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
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
                ) : (
                  <Input
                    placeholder="Select a course first"
                    disabled
                  />
                )}
              </div>
            </div>
            <Button className="mt-4 w-full" size="lg" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search Papers
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
