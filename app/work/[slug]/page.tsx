import { notFound } from "next/navigation";
import { featured, getFeaturedBySlug } from "@/lib/data";

export function generateStaticParams() {
  return featured.map((work) => ({ slug: work.slug! }));
}

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getFeaturedBySlug(slug);

  if (!work) {
    notFound();
  }

  return <main className="min-h-[100svh] bg-[var(--color-primary)]" />;
}
