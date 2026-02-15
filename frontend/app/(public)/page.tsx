import { HeroSection } from "@/components/home/hero-section";
import { RecentPapers } from "@/components/home/recent-papers";
import { UploadCTA } from "@/components/home/upload-cta";
import { fetchAllPapers } from "@/lib/api";

export default async function HomePage() {
  // fetch papers from backend
  const papers = await fetchAllPapers();

  return (
    <>
      <HeroSection />
      <RecentPapers papers={papers} />
      <UploadCTA />
    </>
  );
}
