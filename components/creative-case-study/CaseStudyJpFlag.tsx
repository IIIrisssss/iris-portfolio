import { FigmaPlacement } from "./FigmaPlacement";

export const JP_PILL_SRC =
  "/creative/mava-social-media/jp-pill-overlay.webp";

/** Figma pill row defaults — 1920-wide incentive sections. */
export const JP_FLAG_PRESET_STANDARD = {
  designWidth: 1920,
  pillX: 60,
  bottomOffset: 117,
} as const;

/** Mava video section — 1935-wide frame, footer shifted 8px right / 8px lower. */
export const JP_FLAG_PRESET_MAVA_WIDE = {
  designWidth: 1935,
  pillX: 68,
  bottomOffset: 125,
} as const;

const PILL_W = 114;
const PILL_H = 56;

export type CaseStudyJpFlagProps = {
  designHeight: number;
  designWidth?: number;
  pillX?: number;
  bottomOffset?: number;
};

/** Overlays flag + JP pill graphic at the Figma footer coordinates. */
export function CaseStudyJpFlag({
  designHeight,
  designWidth = JP_FLAG_PRESET_STANDARD.designWidth,
  pillX = JP_FLAG_PRESET_STANDARD.pillX,
  bottomOffset = JP_FLAG_PRESET_STANDARD.bottomOffset,
}: CaseStudyJpFlagProps) {
  const y = designHeight - bottomOffset;

  return (
    <FigmaPlacement
      designWidth={designWidth}
      designHeight={designHeight}
      x={pillX}
      y={y}
      w={PILL_W}
      h={PILL_H}
      className="wc-jp-pill-placement"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={JP_PILL_SRC}
        alt=""
        className="wc-jp-pill-overlay"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </FigmaPlacement>
  );
}
