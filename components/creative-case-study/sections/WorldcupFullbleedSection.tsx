import type { CSSProperties } from "react";

import {
  CaseStudyJpFlag,
  JP_FLAG_PRESET_STANDARD,
  type CaseStudyJpFlagProps,
} from "../CaseStudyJpFlag";
import { ScaledCanvas } from "../ScaledCanvas";

type JpFlagConfig = boolean | Partial<CaseStudyJpFlagProps>;

type WorldcupFullbleedSectionProps = {
  designHeight: number;
  imageSrc: string;
  alt: string;
  className?: string;
  designWidth?: number;
  /** Extra top padding in design px — grows canvas, offsets image down. */
  topInset?: number;
  /** Overlay JP pill flag when Figma emoji export is missing from the composite. */
  jpFlag?: JpFlagConfig;
};

function resolveJpFlag(
  jpFlag: JpFlagConfig | undefined,
  designHeight: number,
  designWidth: number,
): CaseStudyJpFlagProps | null {
  if (!jpFlag) return null;

  const preset = {
    designHeight,
    designWidth,
    pillX: JP_FLAG_PRESET_STANDARD.pillX,
    bottomOffset: JP_FLAG_PRESET_STANDARD.bottomOffset,
  };

  if (jpFlag === true) return preset;

  return { ...preset, ...jpFlag };
}

/** Full-width section rendered as a single scaled composite image. */
export function WorldcupFullbleedSection({
  designHeight,
  imageSrc,
  alt,
  className,
  designWidth = 1920,
  topInset = 0,
  jpFlag,
}: WorldcupFullbleedSectionProps) {
  const canvasHeight = designHeight + topInset;
  const flagProps = resolveJpFlag(jpFlag, designHeight, designWidth);

  return (
    <ScaledCanvas
      designWidth={designWidth}
      designHeight={canvasHeight}
      className={className}
    >
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
          loading="lazy"
          decoding="async"
        />
      </div>
      {flagProps ? <CaseStudyJpFlag {...flagProps} /> : null}
    </ScaledCanvas>
  );
}
