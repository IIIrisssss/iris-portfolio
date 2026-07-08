import type { CSSProperties } from "react";

import { ScaledCanvas } from "../ScaledCanvas";

type WorldcupFullbleedSectionProps = {
  designHeight: number;
  imageSrc: string;
  alt: string;
  className?: string;
  /** Extra top padding in design px (1920 base) — grows canvas, offsets image down. */
  topInset?: number;
};

/** Full-width section rendered as a single scaled composite image. */
export function WorldcupFullbleedSection({
  designHeight,
  imageSrc,
  alt,
  className,
  topInset = 0,
}: WorldcupFullbleedSectionProps) {
  const canvasHeight = designHeight + topInset;

  return (
    <ScaledCanvas designHeight={canvasHeight} className={className}>
      <div
        className="wc-fullbleed-section__frame"
        style={
          {
            "--wc-content-h": designHeight,
            "--wc-top-inset": topInset,
          } as CSSProperties
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={alt}
          className="wc-fullbleed-section__image"
          data-wc-parallax="fullbleed"
          loading="lazy"
          decoding="async"
        />
      </div>
    </ScaledCanvas>
  );
}
