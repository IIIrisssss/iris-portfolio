export const CASE_STUDY_HERO_PLACEHOLDER = "/creative/case-study-hero-placeholder.svg";

export type CaseStudyConfig = {
  slug: string;
  title: string;
  date: string;
  description: string;
  hero: {
    src: string;
    alt: string;
  };
  theme: {
    /** Solid fill for the area below the hero image. */
    body: string;
    /** Side gutters on ultra-wide screens; defaults to #eaeaea. */
    marginColor?: string;
    /** Hero header background; use "white" for light cover art. */
    heroBackground?: "white";
    /** Footer back-link color; defaults to dark gray. */
    footerLink?: string;
  };
};
