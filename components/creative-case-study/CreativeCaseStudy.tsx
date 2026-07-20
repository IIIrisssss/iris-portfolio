"use client";

import type { CSSProperties } from "react";
import type { CaseStudyConfig } from "@/lib/creativeCaseStudies";
import { resolveCaseStudyBody } from "@/lib/creativeCaseStudies/bodyComponents";

import { CreativeCaseStudyBack } from "./CreativeCaseStudyBack";
import { CreativeCaseStudyNav } from "./CreativeCaseStudyNav";

import "./CreativeCaseStudy.css";
import "./sections/worldcup-sections.css";

type CreativeCaseStudyProps = {
  config: CaseStudyConfig;
};

export function CreativeCaseStudy({ config }: CreativeCaseStudyProps) {
  const Body = resolveCaseStudyBody(config.slug);
  const heroBackground = config.theme.heroBackground;

  const content = (
    <div
      className="creative-case-study"
      style={
        {
          "--case-body-color": config.theme.body,
          "--case-margin-color": config.theme.marginColor ?? "#ffffff",
          "--case-footer-link-color": config.theme.footerLink ?? "#2c2c2c",
        } as CSSProperties
      }
    >
      <CreativeCaseStudyBack />
      <CreativeCaseStudyNav slug={config.slug} />
      <div className="creative-case-study__shell">
        <header
          className={[
            "creative-case-study__hero",
            heroBackground === "white" ? "creative-case-study__hero--white" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label="Project hero"
        >
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
          <Body />
        </div>
      </div>
    </div>
  );

  return content;
}
