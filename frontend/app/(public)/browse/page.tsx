import { fetchAllPapers } from "@/lib/api.js";
import { BrowseContent } from "@/components/browse/browse-content";

export default async function BrowsePage() {
  const papers = await fetchAllPapers();

  return <BrowseContent papers={papers} />;
}
