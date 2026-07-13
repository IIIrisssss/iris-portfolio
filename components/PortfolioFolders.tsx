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
import "./PortfolioFolders.worldcup.css";
import "./PortfolioFolders.osechi.css";
import "./PortfolioFolders.mava.css";
import "./PortfolioFolders.early-creations.css";

/** Panel-Folder-Back — Figma 441.472 × 333.559 (path normalized to viewBox origin) */
const FOLDER_BACK_PATH =
  "M441.472 31.969C441.472 14.313 427.159 0 409.503 0H295.956C291.038 0 286.186 1.135 281.777 3.316L221.348 33.219C216.94 35.401 212.088 36.536 207.169 36.536H32.969C15.313 36.536 1 50.849 1 68.505V301.59C1 319.246 15.313 333.558 32.969 333.558H409.503C427.159 333.558 441.472 319.246 441.472 301.59V31.969Z";

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
        {foldersData.map((folder, index) => (
          <FolderCard
            key={folder.id}
            data={folder}
            shiftUp={index < 3}
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
  shiftUp,
  isHovered,
  isDimmed,
  isPressed,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: {
  data: FolderData;
  shiftUp: boolean;
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

  const isWorldcup = data.id === "worldcup-campaign";
  const isOsechi = data.id === "new-year-osechi";
  const isMava = data.id === "mava-social-media";
  const isEarlyCreations = data.id === "early-creations";
  const assetBase = isWorldcup
    ? "/folders/worldcup"
    : isOsechi
      ? "/folders/osechi"
      : isMava
        ? "/folders/mava"
        : isEarlyCreations
          ? "/folders/early-creations"
          : "/folders/figma-assets";

  return (
    <motion.button
      type="button"
      className={[
        "portfolio-folder-button",
        shiftUp ? "portfolio-folder-button--shift-up" : "",
      ]
        .filter(Boolean)
        .join(" ")}
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

      <span
        className={[
          "portfolio-folder-wrapper",
          isWorldcup ? "portfolio-folder-wrapper--worldcup" : "",
          isOsechi ? "portfolio-folder-wrapper--osechi" : "",
          isMava ? "portfolio-folder-wrapper--mava" : "",
          data.id === "mava-social-media" ? "portfolio-folder-wrapper--mava-social-media" : "",
          data.id === "early-creations" ? "portfolio-folder-wrapper--early-creations" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="portfolio-folder-hover-area" />

        <span className="portfolio-folder-container">
          <span className="folder-underlay">
            <span className="folder-layer folder-back">
              <svg
                className="folder-back-svg"
                viewBox="0 0 441.472 333.559"
                fill="none"
                aria-hidden="true"
              >
                <path d={FOLDER_BACK_PATH} fill="var(--folder-back-color, #0D41CF)" />
              </svg>
            </span>

            <span className="folder-layer folder-asset-kong">
              <img src={`${assetBase}/kong.png`} alt="" />
            </span>

            {isOsechi ? (
              <span className="folder-layer folder-asset-paperclip folder-asset-paperclip--osechi-back">
                <img src={`${assetBase}/paperclip.png`} alt="" />
              </span>
            ) : null}

            <span className="folder-layer folder-asset-horse">
              <img src={`${assetBase}/horse-rider.png`} alt="" />
            </span>

            <span className="folder-layer folder-asset-cats">
              <img src={`${assetBase}/cat-stickers.png`} alt="" />
            </span>
          </span>

          <span className="folder-layer portfolio-folder-front-frost" aria-hidden="true">
            <span className="portfolio-folder-front-frost__block" aria-hidden="true" />
            <span className="portfolio-folder-front-frost__scene">
              <span className="folder-layer folder-asset-cats folder-asset-cats--frost">
                <img src={`${assetBase}/cat-stickers.png`} alt="" />
              </span>
              <span className="folder-layer folder-asset-horse folder-asset-horse--frost">
                <img src={`${assetBase}/horse-rider.png`} alt="" />
              </span>
            </span>
            <span className="portfolio-folder-front-frost__tint" aria-hidden="true" />
          </span>

          <span className="folder-layer portfolio-folder-front-glass">
            <span className="portfolio-folder-titles">
              <span className="folder-text-subtitle1">{data.subtitle1 ?? "#2026"}</span>
              <span className="folder-text-title1">{data.title1}</span>
              <span className="folder-text-title2">{data.title2}</span>
              <span className="folder-text-subtitle2">{data.subtitle2 ?? "#TikTok Lite"}</span>
            </span>

            <span className="portfolio-folder-logo">
              <img src="/folders/figma-assets/folder-logo.svg" alt="" aria-hidden="true" />
            </span>

            {data.id !== "mava-social-media" && !isOsechi ? (
              <span className="folder-asset-paperclip">
                <img
                  src={
                    isWorldcup || isOsechi || isEarlyCreations
                      ? `${assetBase}/paperclip.png`
                      : "/folders/paperclip.png?v=3"
                  }
                  alt=""
                />
              </span>
            ) : null}

            {isEarlyCreations ? (
              <span className="folder-layer folder-asset-peanut folder-asset-peanut--front">
                <img src={`${assetBase}/peanut.png`} alt="" />
              </span>
            ) : null}
          </span>

          {!isEarlyCreations ? (
            <span className="folder-layer folder-asset-crowned-cat">
              <img
                className="folder-crowned-cat-default"
                src={`${assetBase}/crowned-cat-default.png`}
                alt=""
              />
              <img
                className="folder-crowned-cat-hover"
                src={`${assetBase}/crowned-cat-hover.png`}
                alt=""
              />
            </span>
          ) : null}

          {!isEarlyCreations ? (
            <span className="folder-layer folder-asset-peanut">
              {isWorldcup ? (
                <>
                  <img
                    className="folder-peanut-default"
                    src={`${assetBase}/peanut-default.png`}
                    alt=""
                  />
                  <img
                    className="folder-peanut-hover"
                    src={`${assetBase}/peanut-hover.png`}
                    alt=""
                  />
                </>
              ) : (
                <img src={`${assetBase}/peanut.png`} alt="" />
              )}
            </span>
          ) : null}
        </span>
      </span>
    </motion.button>
  );
}
