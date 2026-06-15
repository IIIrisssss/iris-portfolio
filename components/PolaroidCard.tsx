"use client";

import type { CSSProperties } from "react";

type PolaroidCardProps = {
  alt: string;
  image?: string;
  placeholderColor: string;
  /** Inner image w / h — placeholder keeps this ratio inside the frame */
  innerAspect?: number;
  caption?: string;
  style?: CSSProperties;
};

/**
 * Polaroid frame from Figma (@1440 px):
 *   border 1.5px #969696 · outer radius 8px · inner radius 6px · padding 13px
 *   box-shadow 0 3.17px 1.585px rgba(0,0,0,0.25)
 *
 * Base rotation on `.polaroid-card`; breeze sway on `.polaroid-card__sway`.
 */
export function PolaroidCard({
  alt,
  image,
  placeholderColor,
  innerAspect,
  caption,
  style,
}: PolaroidCardProps) {
  return (
    <div className="polaroid-card" style={style}>
      <div className="polaroid-card__sway">
        <div
          className="polaroid-image"
          role="img"
          aria-label={alt}
          style={innerAspect ? { aspectRatio: `${innerAspect}` } : undefined}
        >
          {image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image}
              alt={alt}
              className="polaroid-image__img"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              className="polaroid-placeholder"
              style={{ backgroundColor: placeholderColor }}
            />
          )}
        </div>

        {caption ? <p className="polaroid-caption">{caption}</p> : null}
      </div>
    </div>
  );
}
