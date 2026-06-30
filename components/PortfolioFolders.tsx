"use client";

import { useLanguage } from "./LanguageProvider";
import { creativeProjectsSection } from "@/lib/i18n";
import { RevealMask } from "./RevealMask";
import "./PortfolioFolders.css";

const foldersData = [
  { id: 1, title1: "MANEKINEKO", title2: "MEME" },
  { id: 2, title1: "SPRING", title2: "DANGO" },
  { id: 3, title1: "NEW YEAR", title2: "OSECHI" },
  { id: 4, title1: "MAVA", title2: "SOCIAL" },
  { id: 5, title1: "WORLDCUP", title2: "CAMPAIGN" },
  { id: 6, title1: "EARLY", title2: "CREATIONS" },
];

export function PortfolioFolders() {
  const { locale } = useLanguage();
  const copy = creativeProjectsSection[locale];

  return (
    <section className="portfolio-folders-section" aria-label={copy.ariaLabel}>
      <header className="portfolio-folders-header">
        <RevealMask delay={0.12}>
          <h2 className="portfolio-folders-title section-title">{copy.title}</h2>
        </RevealMask>
        <RevealMask delay={0.18}>
          <p className="portfolio-folders-subtitle">{copy.subtitle}</p>
        </RevealMask>
      </header>

      <div className="portfolio-folders-grid">
        {foldersData.map((folder) => (
          <FolderCard key={folder.id} data={folder} />
        ))}
      </div>
    </section>
  );
}

function FolderCard({ data }: { data: typeof foldersData[0] }) {
  return (
    <div className="portfolio-folder-wrapper">
      {/* Invisible hover area that covers the expanded state to prevent flickering */}
      <div className="portfolio-folder-hover-area" />

      <div className="portfolio-folder-container">
        {/* Back Cover */}
        <div className="folder-layer folder-back">
          <img src="/folders/folder-back.png" alt="" />
        </div>

        {/* Popping Assets */}
        <div className="folder-layer folder-asset-kong" />
        
        <div className="folder-layer folder-asset-cats">
          <img src="/folders/card-cats.png" alt="" />
        </div>

        <div className="folder-layer folder-asset-horse">
          <img src="/folders/cat-horse.png" alt="" />
        </div>

        {/* Front Cover (Glassmorphism) */}
        <div className="folder-layer portfolio-folder-front-glass" />

        {/* Text Layer */}
        <div className="portfolio-folder-titles">
          <p className="folder-text-title1">{data.title1}</p>
          <p className="folder-text-title2">{data.title2}</p>
        </div>
        
        <div className="folder-layer portfolio-folder-logo">
          <img src="/folders/logo.svg" alt="Portfolio" />
        </div>

        {/* Topmost Assets */}
        <div className="folder-layer folder-asset-paperclip">
          <img src="/folders/paperclip.png" alt="" />
        </div>
        
        <div className="folder-layer folder-asset-crowned-cat">
          <img src="/folders/cat-head.png" alt="" />
        </div>
        
        <div className="folder-layer folder-asset-peanut">
          <img src="/folders/peanut.png" alt="" />
        </div>
      </div>
    </div>
  );
}
