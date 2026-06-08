import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { BrandMarquee } from "@/components/BrandMarquee";
import { MoreWork } from "@/components/MoreWork";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative z-10 flex flex-col gap-32 bg-[var(--color-primary)] pb-32 md:gap-48">
        <Hero />
        <FeaturedWork />
        <BrandMarquee />
        <MoreWork />
      </main>

      <Footer />
    </>
  );
}
