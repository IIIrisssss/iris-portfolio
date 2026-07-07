"use client";

import type { CSSProperties, ReactNode } from "react";

type FigmaPlacementProps = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  designWidth?: number;
  designHeight?: number;
  className?: string;
  children: ReactNode;
};

/** Places content at exact Figma coordinates inside the scaled artboard. */
export function FigmaPlacement({
  x,
  y,
  w,
  h,
  designWidth = 1920,
  designHeight = 845,
  className,
  children,
}: FigmaPlacementProps) {
  const style: CSSProperties = {
    left: `${(x / designWidth) * 100}%`,
    top: `${(y / designHeight) * 100}%`,
    ...(w != null ? { width: `${(w / designWidth) * 100}%` } : {}),
    ...(h != null ? { height: `${(h / designHeight) * 100}%` } : {}),
  };

  return (
    <div
      className={["wc-figma-placement", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
