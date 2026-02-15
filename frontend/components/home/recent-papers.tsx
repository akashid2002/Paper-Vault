import Link from "next/link";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPapers } from "@/lib/data";
import { Paper } from "@/lib/types/paper";

export function RecentPapers({ papers }: { papers: Paper[] }) {
  const recentPapers = papers
    // .filter((p) => p.approved === true)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 6);

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Recently Uploaded
            </h2>
            <p className="mt-1 text-muted-foreground">
              The latest papers added by the community
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/browse">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentPapers.map((paper) => (
            <Link
              key={paper?.id}
              href={`/paper/${paper?.id}`}
              className="group rounded-xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary">
                  {paper?.exam_session} {paper?.year}
                </Badge>
              </div>
              <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
                {paper?.subject}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {paper?.course}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Sem {paper?.semester}
                </span>
                <span>
                  Uploaded{" "}
                  {new Date(paper?.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/browse">
              View all papers
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
