import { creativeProjectDetails, foldersData } from "@/lib/data";

import { earlyCreationsCaseStudy } from "./earlyCreations";
import { mavaSocialMediaCaseStudy } from "./mavaSocialMedia";
import { osechiCaseStudy } from "./osechi";
import { springDangoCaseStudy } from "./springDango";
import { worldcupCaseStudy } from "./worldcup";
import { CASE_STUDY_HERO_PLACEHOLDER, type CaseStudyConfig } from "./types";

export type { CaseStudyConfig };
export { CASE_STUDY_HERO_PLACEHOLDER };

const CUSTOM_CONFIG_BY_SLUG: Partial<Record<string, CaseStudyConfig>> = {
  "worldcup-campaign": worldcupCaseStudy,
  "early-creations": earlyCreationsCaseStudy,
  "spring-dango-points": springDangoCaseStudy,
  "new-year-osechi": osechiCaseStudy,
  "mava-social-media": mavaSocialMediaCaseStudy,
};

function getFolderColor(slug: string) {
  return foldersData.find((folder) => folder.slug === slug);
}

function buildGenericCaseStudy(slug: string): CaseStudyConfig | null {
  const project = creativeProjectDetails[slug];
  if (!project) return null;

  const folder = getFolderColor(slug);

  return {
    slug,
    title: project.title,
    date: project.date,
    description: project.description,
    hero: {
      src: CASE_STUDY_HERO_PLACEHOLDER,
      alt: `${project.title} hero placeholder`,
    },
    theme: {
      body: folder?.frontColor ?? "#f3ead8",
      marginColor: "#eaeaea",
      footerLink: "#2c2c2c",
    },
  };
}

export function getCaseStudyConfig(slug: string): CaseStudyConfig | null {
  return CUSTOM_CONFIG_BY_SLUG[slug] ?? buildGenericCaseStudy(slug);
}
