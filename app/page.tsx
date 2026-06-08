import { Hero } from "@/components/Hero";
import { CollectionsOverview } from "@/components/CollectionsOverview";
import { FeaturedWork } from "@/components/FeaturedWork";
import { MoreWork } from "@/components/MoreWork";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative z-10 flex flex-col gap-20 bg-[var(--color-primary)] pb-20 md:gap-28 md:pb-28">
        <Hero />
        <CollectionsOverview />
        <FeaturedWork />
        <MoreWork />
      </main>

      <Footer />
    </>
  );
}
