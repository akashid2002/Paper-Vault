import { PaperViewContent } from "@/components/paper/paper-view-content";
import { fetchPaperById } from "@/lib/api";
import { mockPapers } from "@/lib/data";

export default async function PaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paper = await fetchPaperById(id);

  return <PaperViewContent paper={paper} />;
}
