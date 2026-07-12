import { creativeProjectDetails, foldersData } from "@/lib/data";

export type CreativeProjectNeighbor = {
  slug: string;
  title: string;
};

/** Portfolio folder order — only slugs with a /creative/[slug] page. */
export const creativeProjectSlugs = foldersData
  .map((folder) => folder.slug)
  .filter((slug) => slug in creativeProjectDetails);

export function getCreativeProjectNeighbors(slug: string): {
  prev: CreativeProjectNeighbor | null;
  next: CreativeProjectNeighbor | null;
} {
  const slugs = creativeProjectSlugs;
  const index = slugs.indexOf(slug);

  if (index === -1 || slugs.length <= 1) {
    return { prev: null, next: null };
  }

  const prevSlug = slugs[(index - 1 + slugs.length) % slugs.length];
  const nextSlug = slugs[(index + 1) % slugs.length];

  return {
    prev: {
      slug: prevSlug,
      title: creativeProjectDetails[prevSlug].title,
    },
    next: {
      slug: nextSlug,
      title: creativeProjectDetails[nextSlug].title,
    },
  };
}
