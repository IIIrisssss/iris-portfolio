import type { ComponentType } from "react";

import { CaseStudySectionsShell } from "@/components/creative-case-study/sections/CaseStudySectionsShell";
import { EarlyCreationsBody } from "@/components/creative-case-study/sections/EarlyCreationsBody";
import { ManekinekoMemeBody } from "@/components/creative-case-study/sections/ManekinekoMemeBody";
import { MavaSocialMediaBody } from "@/components/creative-case-study/sections/MavaSocialMediaBody";
import { OsechiBody } from "@/components/creative-case-study/sections/OsechiBody";
import { SpringDangoBody } from "@/components/creative-case-study/sections/SpringDangoBody";
import { WorldcupBody } from "@/components/creative-case-study/sections/WorldcupBody";

const CUSTOM_BODY_BY_SLUG: Partial<Record<string, ComponentType>> = {
  "worldcup-campaign": WorldcupBody,
  "early-creations": EarlyCreationsBody,
  "spring-dango-points": SpringDangoBody,
  "new-year-osechi": OsechiBody,
  "mava-social-media": MavaSocialMediaBody,
  "manekineko-meme": ManekinekoMemeBody,
};

export function resolveCaseStudyBody(slug: string): ComponentType {
  return CUSTOM_BODY_BY_SLUG[slug] ?? CaseStudySectionsShell;
}
