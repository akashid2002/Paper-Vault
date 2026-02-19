import { FileText } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">PYQPapers</span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          A community-driven platform by students, for students.
        </p>
        <nav className="flex gap-4">
          <Link href="/browse" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Browse
          </Link>
          <Link href="/upload" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Upload
          </Link>
        </nav>
      </div>
    </footer>
  )
}
