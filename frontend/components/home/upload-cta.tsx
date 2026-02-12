import Link from "next/link"
import { Upload, Users, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Papers Uploaded", value: "2,500+", icon: FileText },
  { label: "Active Students", value: "10,000+", icon: Users },
  { label: "Courses Covered", value: "30+", icon: TrendingUp },
]

export function UploadCTA() {
  return (
    <section className="bg-muted px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Have question papers?
              <br />
              Share them with the community.
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              Help fellow students ace their exams. Upload the question papers you
              already have and contribute to a growing collection of exam
              papers.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload a Paper
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-xl border bg-card p-6 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="mt-3 text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
