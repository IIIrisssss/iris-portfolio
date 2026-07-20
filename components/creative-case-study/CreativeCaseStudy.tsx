"use client";

import type { CSSProperties } from "react";
import type { CaseStudyConfig } from "@/lib/creativeCaseStudies";
import { resolveCaseStudyBody } from "@/lib/creativeCaseStudies/bodyComponents";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CASE_STUDY_CONTENT_SIZES } from "@/lib/imageSizes";

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
          <OptimizedImage
            src={config.hero.src}
            alt={config.hero.alt}
            width={3840}
            height={2160}
            sizes={CASE_STUDY_CONTENT_SIZES}
            priority
            quality={88}
            className="creative-case-study__hero-image"
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
