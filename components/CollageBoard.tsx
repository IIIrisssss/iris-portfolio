"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

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

function Paperclip() {
  return (
    <svg
      viewBox="0 0 54 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <path
        d="M42.8892 15.4839L22.6661 31.5093C22.6661 31.5093 17.8654 36.0791 13.9522 31.1409C10.2254 26.4379 15.5851 22.5735 15.5851 22.5735L41.6871 1.88956C41.6871 1.88956 45.9198 -1.46459 50.392 4.17908C54.6231 9.51851 50.6315 13.1769 50.6315 13.1769L15.3585 41.1282C15.3585 41.1282 8.72544 46.7672 3.04202 39.5951C-2.45506 32.6581 4.36437 27.2541 4.36437 27.2541L33.7585 3.96142"
        stroke="#626262"
        strokeWidth="1.8002"
        strokeLinecap="round"
      />
    </svg>
  );
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
      <Paperclip />
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
  return (
    <section className="creative-collage" aria-label="Creative projects">
      <header className="creative-collage__header">
        <RevealMask delay={0.12}>
          <h2 className="creative-collage__title section-title">
            Creative Projects
          </h2>
        </RevealMask>
        <RevealMask delay={0.18}>
          <p className="creative-collage__subtitle">
            Click to explore the visual archives.
          </p>
        </RevealMask>
      </header>

      <div className="creative-collage__stage">
        <div className="desktop-collage">
          <CollageLayout layout="desktop" />
        </div>
        <div className="mobile-collage">
          <div className="mobile-collage__canvas">
            <div className="mobile-collage__viewport">
              <CollageLayout layout="mobile" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
