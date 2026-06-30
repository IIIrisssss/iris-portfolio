import { FeaturedWork } from "@/components/FeaturedWork";
import { HeroSlider } from "@/components/HeroSlider";
import { CollageBoard } from "@/components/CollageBoard";
import { PortfolioFolders } from "@/components/PortfolioFolders";
import { MoreWork } from "@/components/MoreWork";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative z-10 flex flex-col gap-20 bg-[var(--color-primary)] pb-20 md:gap-28 md:pb-28">
        {/* <FeaturedWork variant="hero" /> */}
        <HeroSlider />
        {/* <CollageBoard /> */}
        <PortfolioFolders />
        <MoreWork />
      </main>

      <Footer />
    </>
  );
}
