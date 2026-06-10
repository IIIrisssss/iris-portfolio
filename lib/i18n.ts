import type { Locale } from "@/components/LanguageProvider";
import type { PortfolioSlide } from "@/lib/data";

export const featuredWorkTitle: Record<Locale, string> = {
  en: "MY WORKS",
  zh: "我的作品",
};

export type SlideLabels = {
  tagA: string;
  tagB: string;
  nameA: string;
  nameB: string;
  year: string;
};

export function getSlideLabels(
  slide: PortfolioSlide,
  locale: Locale
): SlideLabels {
  if (locale === "zh" && slide.i18n?.zh) {
    const zh = slide.i18n.zh;
    return {
      tagA: zh.tagA,
      tagB: zh.tagB,
      nameA: zh.nameA ?? slide.nameA,
      nameB: zh.nameB ?? slide.nameB,
      year: slide.year,
    };
  }

  return {
    tagA: slide.tagA,
    tagB: slide.tagB,
    nameA: slide.nameA,
    nameB: slide.nameB,
    year: slide.year,
  };
}
