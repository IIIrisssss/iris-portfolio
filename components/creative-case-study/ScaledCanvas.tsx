import type { CSSProperties, ReactNode } from "react";

type ScaledCanvasProps = {
  designWidth?: number;
  designHeight: number;
  className?: string;
  children: ReactNode;
};

/**
 * Fixed-ratio artboard that scales with container width (no transform: scale).
 */
export function ScaledCanvas({
  designWidth = 1920,
  designHeight,
  className,
  children,
}: ScaledCanvasProps) {
  return (
    <div
      className={["wc-scaled-canvas", className].filter(Boolean).join(" ")}
      style={
        {
          "--wc-design-w": designWidth,
          "--wc-design-h": designHeight,
        } as CSSProperties
      }
    >
      <div className="wc-scaled-canvas__viewport">
        <div className="wc-scaled-canvas__inner">{children}</div>
      </div>
    </div>
  );
}
