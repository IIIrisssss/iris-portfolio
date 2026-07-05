import Link from "next/link";
import { notFound } from "next/navigation";

import { PolaroidCard } from "@/components/PolaroidCard";
import { creativeCards } from "@/lib/creativeProjects";

type CreativeProject = {
  title: string;
  date: string;
  description: string;
};

const creativeProjects: Record<string, CreativeProject> = {
  "spring-dango-points": {
    title: "Spring Dango Points",
    date: "2026.2–2026.3",
    description: "A playful seasonal set built around bright motion, soft character poses, and a light collectible feel.",
  },
  "new-year-osechi": {
    title: "New Year Osechi Collection",
    date: "2025.12–2026.1",
    description: "A festive illustration system with a celebratory palette and stacked compositions for social sharing.",
  },
  "mava-social-media": {
    title: "Mava Social Media Templates",
    date: "2025.7",
    description: "A compact social kit designed for quick updates, clear hierarchy, and bright branded moments.",
  },
  "worldcup-campaign": {
    title: "Worldcup Campaign",
    date: "2026.5–2026.6",
    description: "A high-energy campaign set with bold color, layered motion, and strong sports-event contrast.",
  },
  "manekineko-meme": {
    title: "Manekineko Meme",
    date: "2026.1–2026.2",
    description: "A mascot-driven sticker pack that balances humor, gesture, and a loud, collectible composition.",
  },
  "early-creations": {
    title: "Early Creations",
    date: "2022.1–2023.1",
    description: "An early archive of experiments that leans into collage, contrast, and rough-edged visual play.",
  },
};

export function generateStaticParams() {
  return Object.keys(creativeProjects).map((slug) => ({ slug }));
}

type CreativePageProps = {
  params: Promise<{ slug: string }>;
};

function getHeroCard(slug: string) {
  return creativeCards.find((card) => card.href === `/creative/${slug}`);
}

export default async function CreativeProjectPage({
  params,
}: CreativePageProps) {
  const { slug } = await params;
  const project = creativeProjects[slug];

  if (!project) {
    notFound();
  }

  const heroCard = getHeroCard(slug);

  return (
    <main className="min-h-[100svh] bg-[var(--color-primary)] px-[var(--padding)] pb-20 pt-28 md:pb-28 md:pt-32">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="flex flex-col gap-5">
            <p className="font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.04em] text-[rgba(44,44,44,0.55)]">
              {project.date}
            </p>
            <h1 className="max-w-[10ch] font-[family-name:var(--font-headline)] text-[clamp(2.2rem,7vw,5rem)] font-bold uppercase tracking-[-0.02em] text-[#2c2c2c]">
              {project.title}
            </h1>
            <p className="max-w-[34rem] font-[family-name:var(--font-body)] text-[clamp(1rem,2vw,1.125rem)] leading-[1.7] text-[rgba(44,44,44,0.72)]">
              {project.description}
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex w-fit items-center gap-2 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.04em] text-[#2c2c2c] underline decoration-[rgba(44,44,44,0.28)] underline-offset-4"
            >
              Back to projects
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[30rem]">
              <PolaroidCard
                alt={heroCard?.alt ?? project.title}
                image={heroCard?.image}
                placeholderColor={heroCard?.placeholderColor ?? "#d4d4d4"}
                innerAspect={heroCard?.innerAspect}
                caption={heroCard?.caption}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
