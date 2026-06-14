import Link from "next/link";
import { notFound } from "next/navigation";

const creativeProjects: Record<string, { title: string; date: string }> = {
  "spring-dango-points": { title: "Spring Dango Points", date: "2026.2–2026.3" },
  "new-year-osechi": {
    title: "New Year Osechi Collection",
    date: "2025.12–2026.1",
  },
  "mava-social-media": {
    title: "Mava Social Media Templates",
    date: "2025.7",
  },
  "worldcup-campaign": { title: "Worldcup Campaign", date: "2026.5–2026.6" },
  "manekineko-meme": { title: "Manekineko Meme", date: "2026.1–2026.2" },
  "early-creations": { title: "Early Creations", date: "2022.1–2023.1" },
};

export function generateStaticParams() {
  return Object.keys(creativeProjects).map((slug) => ({ slug }));
}

type CreativePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CreativeProjectPage({
  params,
}: CreativePageProps) {
  const { slug } = await params;
  const project = creativeProjects[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-4 bg-[var(--color-primary)] px-[var(--padding)] text-center">
      <p className="font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.04em] text-[rgba(44,44,44,0.55)]">
        {project.date}
      </p>
      <h1 className="font-[family-name:var(--font-headline)] text-[clamp(2rem,7vw,4rem)] uppercase tracking-[-0.02em] text-[#2c2c2c]">
        {project.title}
      </h1>
      <Link
        href="/"
        className="mt-2 font-[family-name:var(--font-body)] text-sm underline decoration-[rgba(44,44,44,0.35)] underline-offset-4"
      >
        ← Back to projects
      </Link>
    </main>
  );
}
