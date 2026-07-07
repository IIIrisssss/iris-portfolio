import { ScaledCanvas } from "../ScaledCanvas";

type WorldcupFullbleedSectionProps = {
  designHeight: number;
  imageSrc: string;
  alt: string;
  className?: string;
};

/** Full-width section rendered as a single scaled composite image. */
export function WorldcupFullbleedSection({
  designHeight,
  imageSrc,
  alt,
  className,
}: WorldcupFullbleedSectionProps) {
  return (
    <ScaledCanvas designHeight={designHeight} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className="wc-fullbleed-section__image"
        loading="lazy"
        decoding="async"
      />
    </ScaledCanvas>
  );
}
