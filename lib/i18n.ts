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

export type FooterCopy = {
  eyebrow: string;
  headline: string;
  headlineLineBreakAfter?: string;
  body: string;
  bodyLineBreakAfter?: string;
  ctaLabel: string;
  connectLabel: string;
  credit: string;
};

export function getFooterCopy(locale: Locale): FooterCopy {
  if (locale === "zh") {
    return {
      eyebrow: "画布在此收尾，但灵感仍在生成..",
      headline: "让概念化作视觉张力。",
      body: "热衷于跨文化美学 🌍、动态 IP 孵化 👾 以及重塑独特的视觉体验 ✨",
      bodyLineBreakAfter: "随时准备好迎接下一个创意谜题🧩",
      ctaLabel: "在此捕捉我 ➡️",
      connectLabel: "or connect through..",
      credit: "由全球化审美、奶茶和打破常规的渴望驱动。保持好奇！🧋",
    };
  }

  return {
    eyebrow: "The canvas ends here, but the generation continues...",
    headline: "Let's turn concepts into",
    headlineLineBreakAfter: "visual impact.",
    body:
      "Passionate about cross-cultural aesthetics 🌍, dynamic IP creation 👾,",
    bodyLineBreakAfter:
      "and shaping unique visual experiences ✨. Always ready for a new creative puzzle. 🧩",
    ctaLabel: "Catch Me Here ➡️",
    connectLabel: "or connect through..",
    credit:
      "Fueled by global aesthetics, milk tea, and the desire to break the mold. Stay curious! 🧋",
  };
}
