import { creativeProjectDetails, foldersData } from "@/lib/data";

import { osechiCaseStudy } from "./osechi";
import { worldcupCaseStudy } from "./worldcup";
import { CASE_STUDY_HERO_PLACEHOLDER, type CaseStudyConfig } from "./types";

export type { CaseStudyConfig };
export { CASE_STUDY_HERO_PLACEHOLDER };

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
    },
  };
}

export function getCaseStudyConfig(slug: string): CaseStudyConfig | null {
  if (slug === "new-year-osechi") {
    return osechiCaseStudy;
  }
  if (slug === "worldcup-campaign") {
    return worldcupCaseStudy;
  }
  return buildGenericCaseStudy(slug);
}
