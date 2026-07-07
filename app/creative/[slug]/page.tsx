import { notFound } from "next/navigation";

import { CreativeCaseStudy } from "@/components/creative-case-study/CreativeCaseStudy";
import { creativeProjectDetails } from "@/lib/data";
import { getCaseStudyConfig } from "@/lib/creativeCaseStudies";

export function generateStaticParams() {
  return Object.keys(creativeProjectDetails).map((slug) => ({ slug }));
}

type CreativePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CreativeProjectPage({ params }: CreativePageProps) {
  const { slug } = await params;
  const project = creativeProjectDetails[slug];

  if (!project) {
    notFound();
  }

  const config = getCaseStudyConfig(slug);

  if (!config) {
    notFound();
  }

  return (
    <main className="min-h-[100svh] bg-[var(--color-primary)]">
      <CreativeCaseStudy config={config} />
    </main>
  );
}
