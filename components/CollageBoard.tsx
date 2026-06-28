"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  creativeCards,
  creativeClips,
  creativeLabels,
  type CardPlacement,
  type ClipPlacement,
  type CreativeCard,
  type CreativeClip,
  type CreativeLabel,
} from "@/lib/creativeProjects";
import { creativeProjectsSection } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { PolaroidCard } from "./PolaroidCard";
import { RevealMask } from "./RevealMask";

import "./CollageBoard.css";

type Layout = "desktop" | "mobile";

/** Cards pinned by a decorative paperclip in the collage */
const CLIP_ID_BY_CARD: Partial<Record<string, string>> = {
  springdango: "springdango",
  worldcup: "worldcup",
  "early-back": "early",
  "early-front": "early",
};

function clipById(id: string) {
  return creativeClips.find((clip) => clip.id === id);
}

function swayOrigin(card: CardPlacement, clip?: ClipPlacement): string {
  if (!clip) return "50% 50%";

  const left = card.cx - card.width / 2;
  const top = card.cy - card.height / 2;
  const x = ((clip.cx - left) / card.width) * 100;
  const y = ((clip.cy - top) / card.height) * 100;

  return `${x.toFixed(3)}% ${y.toFixed(3)}%`;
}

function swayTiming(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i) * (i + 3)) % 997;
  }

  return {
    duration: `${(3.6 + (hash % 31) / 10).toFixed(2)}s`,
    delay: `${-((hash % 36) / 10).toFixed(2)}s`,
  };
}

function CardItem({ card, layout }: { card: CreativeCard; layout: Layout }) {
  const p = card[layout];
  const clipId = CLIP_ID_BY_CARD[card.id];
  const clip = clipId ? clipById(clipId)?.[layout] : undefined;
  const { duration, delay } = swayTiming(card.id);

  return (
    <Link
      href={card.href}
      className="collage-card"
      aria-label={`Open ${card.alt}`}
      style={
        {
          "--x": `${p.cx}%`,
          "--y": `${p.cy}%`,
          "--w": `${p.width}%`,
          "--h": `${p.height}%`,
          zIndex: card.zIndex,
        } as CSSProperties
      }
    >
      <PolaroidCard
        alt={card.alt}
        image={card.image}
        placeholderColor={card.placeholderColor}
        innerAspect={card.caption ? card.innerAspect : undefined}
        caption={card.caption}
        style={
          {
            "--card-rot": `${p.rotate}deg`,
            "--sway-origin": swayOrigin(p, clip),
            "--sway-duration": duration,
            "--sway-delay": delay,
          } as CSSProperties
        }
      />
    </Link>
  );
}

function LabelItem({
  label,
  layout,
}: {
  label: CreativeLabel;
  layout: Layout;
}) {
  const p = label[layout];

  return (
    <div
      className="collage-label"
      style={
        {
          "--x": `${p.cx}%`,
          "--y": `${p.top}%`,
          "--w": `${p.width}%`,
          "--date-color": label.color,
          zIndex: label.zIndex,
        } as CSSProperties
      }
    >
      <p className="collage-label__date">{label.date}</p>
      <p className="collage-label__title">{label.title}</p>
    </div>
  );
}

function ClipItem({ clip, layout }: { clip: CreativeClip; layout: Layout }) {
  const p = clip[layout];

  return (
    <div
      className="collage-clip"
      style={
        {
          "--x": `${p.cx}%`,
          "--y": `${p.cy}%`,
          "--w": `${p.width}%`,
          "--rot": `${p.rotate}deg`,
          zIndex: layout === "mobile" ? 50 : clip.zIndex,
        } as CSSProperties
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/creative-projects/paperclip.png?v=3"
        alt=""
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

type GridMetrics = {
  width: number;
  height: number;
  path: string;
};

function CollageGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<GridMetrics>({ width: 0, height: 0, path: "" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const computeGrid = () => {
      const rect = el.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width <= 0 || height <= 0) return;

      const host = el.parentElement;
      if (!host) return;

      const hostWidth = host.getBoundingClientRect().width;
      const cellUnit = parseFloat(
        getComputedStyle(host).getPropertyValue("--grid-cell"),
      );
      const targetCell = (cellUnit / 100) * hostWidth;
      const colCount = Math.max(2, Math.round(width / targetCell));
      const rowCount = Math.max(2, Math.round(height / targetCell));

      const segments: string[] = [];

      for (let col = 0; col <= colCount; col += 1) {
        const x = (col * width) / colCount;
        segments.push(`M ${x} 0 L ${x} ${height}`);
      }

      for (let row = 0; row <= rowCount; row += 1) {
        const y = (row * height) / rowCount;
        segments.push(`M 0 ${y} L ${width} ${y}`);
      }

      setGrid({ width, height, path: segments.join(" ") });
    };

    computeGrid();
    const observer = new ResizeObserver(computeGrid);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="collage-grid" aria-hidden="true">
      {grid.width > 0 && grid.height > 0 ? (
        <svg
          className="collage-grid__svg"
          viewBox={`${-1} ${-1} ${grid.width + 2} ${grid.height + 2}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d={grid.path} className="collage-grid__path" />
        </svg>
      ) : null}
    </div>
  );
}

function CollageLayout({ layout }: { layout: Layout }) {
  return (
    <>
      {creativeCards.map((card) => (
        <CardItem key={card.id} card={card} layout={layout} />
      ))}
      {creativeLabels.map((label) => (
        <LabelItem key={label.id} label={label} layout={layout} />
      ))}
      {creativeClips.map((clip) => (
        <ClipItem key={clip.id} clip={clip} layout={layout} />
      ))}
    </>
  );
}

export function CollageBoard() {
  const { locale } = useLanguage();
  const copy = creativeProjectsSection[locale];

  return (
    <section className="creative-collage" aria-label={copy.ariaLabel}>
      <header className="creative-collage__header">
        <RevealMask delay={0.12}>
          <h2 className="creative-collage__title section-title">{copy.title}</h2>
        </RevealMask>
        <RevealMask delay={0.18}>
          <p className="creative-collage__subtitle">{copy.subtitle}</p>
        </RevealMask>
      </header>

      <div className="creative-collage__stage">
        <div className="desktop-collage">
          <CollageGrid />
          <CollageLayout layout="desktop" />
        </div>
        <div className="mobile-collage">
          <div className="mobile-collage__canvas">
            <div className="mobile-collage__viewport">
              <CollageGrid />
              <CollageLayout layout="mobile" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
