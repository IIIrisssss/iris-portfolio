"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

import { foldersData, type FolderData } from "@/lib/data";
import { creativeProjectsSection } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { RevealMask } from "./RevealMask";
import { SectionTitleMark } from "./SectionTitleMark";
import "./PortfolioFolders.css";

export function PortfolioFolders() {
  const { locale } = useLanguage();
  const copy = creativeProjectsSection[locale];
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<FolderData["id"] | null>(null);
  const [pressedId, setPressedId] = useState<FolderData["id"] | null>(null);
  const bounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (bounceTimerRef.current !== null) {
        window.clearTimeout(bounceTimerRef.current);
      }
    };
  }, []);

  const handleSelect = (slug: string, id: FolderData["id"]) => {
    if (pressedId !== null) return;

    setPressedId(id);
    if (bounceTimerRef.current !== null) {
      window.clearTimeout(bounceTimerRef.current);
    }

    bounceTimerRef.current = window.setTimeout(() => {
      router.push(`/creative/${slug}`);
    }, 220);
  };

  return (
    <section
      id="portfolio-folders"
      className="portfolio-folders-section"
      aria-label={copy.ariaLabel}
    >
      <header className="portfolio-folders-header">
        <RevealMask className="reveal-mask--title" delay={0.12}>
          <h2 className="portfolio-folders-title">
            <span className="section-title-mark-creative">
              <SectionTitleMark title="creativeProjects" alt={copy.title} />
            </span>
          </h2>
        </RevealMask>
        <RevealMask delay={0.18}>
          <p className="portfolio-folders-subtitle section-subtitle section-subtitle--creative">
            {copy.subtitle}
          </p>
        </RevealMask>
      </header>

      <div className="portfolio-folders-grid" onMouseLeave={() => setHoveredId(null)}>
        {foldersData.map((folder) => (
          <FolderCard
            key={folder.id}
            data={folder}
            isHovered={hoveredId === folder.id}
            isDimmed={hoveredId !== null && hoveredId !== folder.id}
            isPressed={pressedId === folder.id}
            onHoverStart={() => setHoveredId(folder.id)}
            onHoverEnd={() => setHoveredId((current) => (current === folder.id ? null : current))}
            onSelect={() => handleSelect(folder.slug, folder.id)}
          />
        ))}
      </div>
    </section>
  );
}

function FolderCard({
  data,
  isHovered,
  isDimmed,
  isPressed,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: {
  data: FolderData;
  isHovered: boolean;
  isDimmed: boolean;
  isPressed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
}) {
  const scale = isPressed ? 1.08 : isHovered ? 1.08 : isDimmed ? 0.94 : 1;
  const style = {
    ...(data.frontColor
      ? ({
          "--folder-front-color": data.frontColor,
          "--folder-back-color": data.backColor ?? data.frontColor,
        } as CSSProperties)
      : {}),
  } as CSSProperties;

  return (
    <motion.button
      type="button"
      className="portfolio-folder-button"
      aria-label={`Open ${data.title1} ${data.title2}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={onSelect}
      animate={
        isPressed
          ? {
              scale: [scale, scale * 1.12, scale * 0.97, scale],
              y: [0, -10, 2, 0],
            }
          : {
              scale,
              y: isHovered ? -4 : 0,
            }
      }
      transition={
        isPressed
          ? { duration: 0.22, times: [0, 0.45, 0.78, 1], ease: "easeOut" }
          : { type: "spring", stiffness: 280, damping: 24, mass: 0.9 }
      }
      style={{ ...style, zIndex: isHovered || isPressed ? 20 : isDimmed ? 1 : 2 }}
    >
      <span className="sr-only">{`${data.title1} ${data.title2}`}</span>

      <span className="portfolio-folder-wrapper">
        <span className="portfolio-folder-hover-area" />

        <span className="portfolio-folder-container">
          <span className="folder-underlay">
            <span className="folder-layer folder-back">
              <span className="folder-back-tab" />
              <span className="folder-back-main" />
            </span>

            <span className="folder-layer folder-asset-kong">
              <img src="/folders/figma-assets/kong.png" alt="" />
            </span>

            <span className="folder-layer folder-asset-cats">
              <img src="/folders/figma-assets/cat-stickers.png" alt="" />
            </span>

            <span className="folder-layer folder-asset-horse">
              <img src="/folders/figma-assets/horse-rider.png" alt="" />
            </span>
          </span>

          <span className="folder-layer portfolio-folder-front-frost" aria-hidden="true">
            <span className="portfolio-folder-front-frost__block" aria-hidden="true" />
            <span className="portfolio-folder-front-frost__scene">
              <span className="folder-layer folder-asset-cats folder-asset-cats--frost">
                <img src="/folders/figma-assets/cat-stickers.png" alt="" />
              </span>
              <span className="folder-layer folder-asset-horse folder-asset-horse--frost">
                <img src="/folders/figma-assets/horse-rider.png" alt="" />
              </span>
            </span>
            <span className="portfolio-folder-front-frost__tint" aria-hidden="true" />
          </span>

          <span className="folder-layer portfolio-folder-front-glass">
            <span className="portfolio-folder-titles">
              <span className="folder-text-subtitle1">#2026</span>
              <span className="folder-text-title1">{data.title1}</span>
              <span className="folder-text-title2">{data.title2}</span>
              <span className="folder-text-subtitle2">#TikTok Lite</span>
            </span>

            <span className="portfolio-folder-logo">
              <img src="/folders/figma-assets/folder-logo.svg" alt="" aria-hidden="true" />
            </span>

            <span className="folder-asset-paperclip">
              <img src="/folders/paperclip.png?v=3" alt="" />
            </span>
          </span>

          <span className="folder-layer folder-asset-crowned-cat">
            <img
              className="folder-crowned-cat-default"
              src="/folders/figma-assets/crowned-cat-default.png"
              alt=""
            />
            <img
              className="folder-crowned-cat-hover"
              src="/folders/figma-assets/crowned-cat-hover.png"
              alt=""
            />
          </span>

          <span className="folder-layer folder-asset-peanut">
            <img src="/folders/figma-assets/peanut.png" alt="" />
          </span>
        </span>
      </span>
    </motion.button>
  );
}
