"use client";

import { useLanguage } from "./LanguageProvider";
import { creativeProjectsSection } from "@/lib/i18n";
import { RevealMask } from "./RevealMask";
import { SectionTitleMark } from "./SectionTitleMark";
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
          <h2 className="portfolio-folders-title">
            <SectionTitleMark
              src="/icon/headings/creative-projects-title.svg"
              aspect="492/108"
              alt={copy.title}
              size="large"
            />
          </h2>
        </RevealMask>
        <RevealMask delay={0.18}>
          <p className="portfolio-folders-subtitle section-subtitle section-subtitle--creative">
            {copy.subtitle}
          </p>
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
        {/* Everything painted before Panel-Folder-Front — backdrop-filter samples this group */}
        <div className="folder-underlay">
          <div className="folder-layer folder-back">
            <div className="folder-back-tab" />
            <div className="folder-back-main" />
          </div>

          <div className="folder-layer folder-asset-kong" />

          <div className="folder-layer folder-asset-cats">
            <img src="/folders/card-cats.png?v=3" alt="" />
          </div>

          <div className="folder-layer folder-asset-horse">
            <img src="/folders/cat-horse.png?v=3" alt="" />
          </div>
        </div>

        {/* Frost — blur lives inside front panel bounds, not on asset layers */}
        <div className="folder-layer portfolio-folder-front-frost" aria-hidden="true">
          <div className="portfolio-folder-front-frost__block" aria-hidden="true" />
          <div className="portfolio-folder-front-frost__scene">
            <div className="folder-layer folder-asset-cats folder-asset-cats--frost">
              <img src="/folders/card-cats.png?v=3" alt="" />
            </div>
            <div className="folder-layer folder-asset-horse folder-asset-horse--frost">
              <img src="/folders/cat-horse.png?v=3" alt="" />
            </div>
          </div>
          <div className="portfolio-folder-front-frost__tint" aria-hidden="true" />
        </div>

        {/* Front Cover (Glassmorphism) */}
        <div className="folder-layer portfolio-folder-front-glass">
          <div className="portfolio-folder-titles">
            <p className="folder-text-title1">{data.title1}</p>
            <p className="folder-text-title2">{data.title2}</p>
          </div>

          <div className="portfolio-folder-logo">
            <img src="/folders/logo.svg" alt="Portfolio" />
          </div>

          <div className="folder-asset-paperclip">
            <img src="/folders/paperclip.png?v=3" alt="" />
          </div>
        </div>

        {/* Topmost Assets (always in front of Panel-Folder-Front) */}
        <div className="folder-layer folder-asset-crowned-cat">
          <img src="/folders/cat-head.png?v=3" alt="" />
        </div>

        <div className="folder-layer folder-asset-peanut">
          <img src="/folders/peanut.png?v=3" alt="" />
        </div>
      </div>
    </div>
  );
}
