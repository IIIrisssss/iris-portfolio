"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { sectionTitleLetters, type MagneticTitleConfig } from "@/lib/sectionTitleLetters";

type SectionTitleMarkProps = {
  title: keyof typeof sectionTitleLetters;
  alt: string;
  className?: string;
};

type LetterState = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  seed: number;
};

const prefersReducedMotionQuery = "(prefers-reduced-motion: reduce)";

const titleWidth = "min(100%, clamp(480px, 116vw, 56rem))";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createSeed(index: number, key: string) {
  let seed = 0;
  for (let i = 0; i < key.length; i += 1) {
    seed = (seed * 31 + key.charCodeAt(i)) >>> 0;
  }
  return ((seed + index * 97) % 1000) / 1000;
}

function getResponsiveSettings(width: number) {
  if (width <= 640) {
    return { radius: 36, maxTranslation: 8, spring: 0.14, damping: 0.18 };
  }
  if (width <= 1024) {
    return { radius: 60, maxTranslation: 12, spring: 0.12, damping: 0.16 };
  }
  return { radius: 88, maxTranslation: 18, spring: 0.1, damping: 0.14 };
}

function isInlineTitleAsset(src: string) {
  return src.startsWith("data:");
}

function TitlePieceImage({
  piece,
  config,
}: {
  piece: MagneticTitleConfig["letters"][number]["pieces"][number];
  config: MagneticTitleConfig;
}) {
  if (isInlineTitleAsset(piece.src) || !config.svgSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={piece.src} alt="" className="magnetic-scatter-title__image" />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={config.svgSrc}
      alt=""
      className="magnetic-scatter-title__image magnetic-scatter-title__image--slice"
      style={{
        position: "absolute",
        maxWidth: "none",
        width: `${(config.viewBoxWidth / piece.width) * 100}%`,
        height: `${(config.viewBoxHeight / piece.height) * 100}%`,
        left: `${-(piece.x / piece.width) * 100}%`,
        top: `${-(piece.y / piece.height) * 100}%`,
      } satisfies CSSProperties}
    />
  );
}

function MagneticLetter({
  letter,
  config,
}: {
  letter: MagneticTitleConfig["letters"][number];
  config: MagneticTitleConfig;
}) {
  return (
    <span
      className="magnetic-scatter-title__letter"
      data-letter={letter.key}
      style={{
        left: `${(letter.x / config.viewBoxWidth) * 100}%`,
        top: `${(letter.y / config.viewBoxHeight) * 100}%`,
        width: `${(letter.width / config.viewBoxWidth) * 100}%`,
        height: `${(letter.height / config.viewBoxHeight) * 100}%`,
      } satisfies CSSProperties}
    >
      <span
        className="magnetic-scatter-title__glyph"
        style={{
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        } satisfies CSSProperties}
      >
        {letter.pieces.map((piece, index) => (
          <span
            key={`${letter.key}-${index}`}
            className="magnetic-scatter-title__piece"
            style={{
              left: `${((piece.x - letter.x) / letter.width) * 100}%`,
              top: `${((piece.y - letter.y) / letter.height) * 100}%`,
              width: `${(piece.width / letter.width) * 100}%`,
              height: `${(piece.height / letter.height) * 100}%`,
            } satisfies CSSProperties}
          >
            <TitlePieceImage piece={piece} config={config} />
          </span>
        ))}
      </span>
    </span>
  );
}

export function SectionTitleMark({ title, alt, className = "" }: SectionTitleMarkProps) {
  const config = sectionTitleLetters[title];
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const reducedMotionRef = useRef(false);

  const initials = useMemo(
    () => config.letters.map((letter, index) => ({ ...letter, seed: createSeed(index, letter.key) })),
    [config]
  );

  useEffect(() => {
    const media = window.matchMedia(prefersReducedMotionQuery);
    const updateReduced = () => {
      reducedMotionRef.current = media.matches;
    };

    updateReduced();
    media.addEventListener("change", updateReduced);
    return () => media.removeEventListener("change", updateReduced);
  }, []);

  useEffect(() => {
    lettersRef.current = initials.map((letter) => ({
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      vx: 0,
      vy: 0,
      seed: letter.seed,
    }));
  }, [initials]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const activeRadius = getResponsiveSettings(window.innerWidth).radius;

    const step = () => {
      const rect = root.getBoundingClientRect();
      const settings = getResponsiveSettings(window.innerWidth);
      const targetX = pointerRef.current.active ? pointerRef.current.x : Number.NaN;
      const targetY = pointerRef.current.active ? pointerRef.current.y : Number.NaN;

      lettersRef.current = lettersRef.current.map((letter, index) => {
        const configLetter = initials[index];
        const centerX = rect.left + (configLetter.x + configLetter.width / 2) * (rect.width / config.viewBoxWidth);
        const centerY = rect.top + (configLetter.y + configLetter.height / 2) * (rect.height / config.viewBoxHeight);
        const dx = pointerRef.current.active ? targetX - centerX : 0;
        const dy = pointerRef.current.active ? targetY - centerY : 0;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = clamp(1 - distance / settings.radius, 0, 1);
        const randomScale = 0.82 + letter.seed * 0.36;
        const maxTranslation = settings.maxTranslation;
        const desiredX = influence > 0 ? clamp((-dx / distance) * influence * maxTranslation * randomScale, -maxTranslation, maxTranslation) : 0;
        const desiredY = influence > 0 ? clamp((-dy / distance) * influence * maxTranslation * randomScale, -maxTranslation, maxTranslation) : 0;
        const ease = reducedMotionRef.current ? 1 : settings.spring;
        const damping = reducedMotionRef.current ? 0 : settings.damping;
        const nextVx = (letter.vx + (desiredX - letter.tx) * ease) * (1 - damping);
        const nextVy = (letter.vy + (desiredY - letter.ty) * ease) * (1 - damping);
        const nextTx = reducedMotionRef.current ? 0 : clamp(letter.tx + nextVx, -maxTranslation, maxTranslation);
        const nextTy = reducedMotionRef.current ? 0 : clamp(letter.ty + nextVy, -maxTranslation, maxTranslation);

        return {
          x: letter.x,
          y: letter.y,
          tx: nextTx,
          ty: nextTy,
          vx: nextVx,
          vy: nextVy,
          seed: letter.seed,
        };
      });

      const nodes = root.querySelectorAll<HTMLElement>(".magnetic-scatter-title__letter");
      nodes.forEach((node, index) => {
        const state = lettersRef.current[index];
        node.style.transform = `translate3d(${state.tx.toFixed(3)}px, ${state.ty.toFixed(3)}px, 0)`;
      });

      rafRef.current = window.requestAnimationFrame(step);
    };

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const expandedRect = {
        left: rect.left - activeRadius,
        right: rect.right + activeRadius,
        top: rect.top - activeRadius,
        bottom: rect.bottom + activeRadius,
      };
      const isNearTitle =
        event.clientX >= expandedRect.left &&
        event.clientX <= expandedRect.right &&
        event.clientY >= expandedRect.top &&
        event.clientY <= expandedRect.bottom;

      if (!isNearTitle) {
        pointerRef.current.active = false;
        return;
      }

      pointerRef.current = {
        active: true,
        x: event.clientX,
        y: event.clientY,
      };
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(step);
      }
    };

    const onLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [config.viewBoxHeight, config.viewBoxWidth, initials]);

  return (
    <span
      ref={rootRef}
      className={`magnetic-scatter-title ${className}`.trim()}
      aria-label={alt}
      role="img"
      data-title={title}
      style={{
        aspectRatio: `${config.viewBoxWidth} / ${config.viewBoxHeight}`,
        width: titleWidth,
      }}
    >
      {config.letters.map((letter) => (
        <MagneticLetter key={letter.key} letter={letter} config={config} />
      ))}
    </span>
  );
}
