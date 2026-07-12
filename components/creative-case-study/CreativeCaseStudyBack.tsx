import Link from "next/link";

type CreativeCaseStudyBackProps = {
  href?: string;
};

export function CreativeCaseStudyBack({
  href = "/#portfolio-folders",
}: CreativeCaseStudyBackProps) {
  return (
    <Link href={href} className="creative-case-study__back">
      <span className="creative-case-study__back-arrow" aria-hidden="true">
        ←
      </span>
      Back
    </Link>
  );
}
