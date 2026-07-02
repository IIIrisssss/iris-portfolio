type SectionTitleMarkProps = {
  src: string;
  aspect: `${number}/${number}`;
  alt: string;
  size?: "default" | "large";
  className?: string;
};

export function SectionTitleMark({
  src,
  aspect,
  alt,
  size = "default",
  className = "",
}: SectionTitleMarkProps) {
  const sizeClass =
    size === "large" ? "section-title-mark--large" : "section-title-mark";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} ${className}`.trim()}
      style={{ aspectRatio: aspect }}
    />
  );
}
