import { AboutPageContent } from "@/components/about/AboutPageContent";
import { CollectionsOverview } from "@/components/CollectionsOverview";
import { ProjectsList } from "@/components/ProjectsList";
import { about } from "@/lib/data";

/** Set to true to restore the previous About page modules. */
const SHOW_LEGACY_ABOUT_MODULES = false;

export default function AboutPage() {
  return (
    <main className="relative z-10 flex flex-col gap-20 bg-[var(--color-primary)] pb-20 md:gap-28 md:pb-28">
      <AboutPageContent />

      {SHOW_LEGACY_ABOUT_MODULES ? (
        <>
          {/* 1. AboutIntroSection — Spencer Gabor bio header */}
          <section className="px-[var(--padding)] py-[max(calc(var(--padding)*6),env(safe-area-inset-top))]">
            <div className="mx-auto flex w-full max-w-[var(--max-width)] flex-col gap-8 text-center">
              <h1 className="font-display text-[clamp(3rem,10vw,4.125rem)] leading-[0.82] text-[var(--color-on-primary)]">
                {about.title}
              </h1>

              <div className="flex flex-col gap-6">
                {about.bio.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1rem] font-medium leading-[1.3] text-[var(--color-on-primary)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* 2. CollectionsOverview — Floema-style collections carousel */}
          <CollectionsOverview />

          {/* 3. ProjectsList — scatter-style projects list */}
          <ProjectsList />
        </>
      ) : null}
    </main>
  );
}
