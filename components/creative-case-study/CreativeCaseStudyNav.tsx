import Link from "next/link";

import { getCreativeProjectNeighbors } from "@/lib/creativeCaseStudies/navigation";

type CreativeCaseStudyNavProps = {
  slug: string;
};

export function CreativeCaseStudyNav({ slug }: CreativeCaseStudyNavProps) {
  const { prev, next } = getCreativeProjectNeighbors(slug);

  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="creative-case-study__pager" aria-label="Adjacent projects">
      {prev ? (
        <Link
          href={`/creative/${prev.slug}`}
          className="creative-case-study__pager-btn creative-case-study__pager-btn--prev"
          aria-label={`Previous project: ${prev.title}`}
        >
          <span className="creative-case-study__pager-arrow" aria-hidden="true">
            ←
          </span>
          <span className="creative-case-study__pager-text">Prev</span>
        </Link>
      ) : null}
      {next ? (
        <Link
          href={`/creative/${next.slug}`}
          className="creative-case-study__pager-btn creative-case-study__pager-btn--next"
          aria-label={`Next project: ${next.title}`}
        >
          <span className="creative-case-study__pager-text">Next</span>
          <span className="creative-case-study__pager-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
