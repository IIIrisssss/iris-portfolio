"use client";

import type { CSSProperties } from "react";
import type { CaseStudyConfig } from "@/lib/creativeCaseStudies";

import { CreativeCaseStudyFooter } from "./CreativeCaseStudyFooter";
import { WorldcupBody } from "./sections/WorldcupBody";

import "./CreativeCaseStudy.css";
import "./sections/worldcup-sections.css";

type CreativeCaseStudyProps = {
  config: CaseStudyConfig;
};

export function CreativeCaseStudy({ config }: CreativeCaseStudyProps) {
  return (
    <div
      className="creative-case-study"
      style={
        {
          "--case-body-color": config.theme.body,
          "--case-footer-link-color": config.theme.footerLink ?? "#2c2c2c",
        } as CSSProperties
      }
    >
      <header className="creative-case-study__hero" aria-label="Project hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.hero.src}
          alt={config.hero.alt}
          className="creative-case-study__hero-image"
          loading="eager"
          decoding="async"
        />
      </header>

      <div className="creative-case-study__body">
        {config.slug === "worldcup-campaign" ? <WorldcupBody /> : null}
      </div>

      <CreativeCaseStudyFooter />
    </div>
  );
}
