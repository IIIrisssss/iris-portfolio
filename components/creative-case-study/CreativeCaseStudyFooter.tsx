import Link from "next/link";

export function CreativeCaseStudyFooter() {
  return (
    <footer className="creative-case-study__footer">
      <div className="creative-case-study__footer-inner">
        <Link href="/#portfolio-folders" className="creative-case-study__back-link">
          ← Back to projects
        </Link>
      </div>
    </footer>
  );
}
