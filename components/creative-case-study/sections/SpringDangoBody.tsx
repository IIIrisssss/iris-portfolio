import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";
import { SpringDangoCreativeThinkingSection } from "./SpringDangoCreativeThinkingSection";
import { SpringDangoDynamicFunSection } from "./SpringDangoDynamicFunSection";
import { SpringDangoFestiveIncentiveSection } from "./SpringDangoFestiveIncentiveSection";
import { SpringDangoLocalizedDesignSection } from "./SpringDangoLocalizedDesignSection";
import { SpringDangoManekinekoSection } from "./SpringDangoManekinekoSection";

import "./spring-dango-sections.css";

const SECTION_5 =
  "/creative/spring-dango-points/sections/section-5-sticker-showcase.webp";
const SECTION_6 =
  "/creative/spring-dango-points/sections/section-6-summary.webp";

export function SpringDangoBody() {
  return (
    <div className="creative-case-study__sections">
      <SpringDangoCreativeThinkingSection />
      <SpringDangoFestiveIncentiveSection />
      <SpringDangoLocalizedDesignSection />
      <SpringDangoDynamicFunSection />
      <WorldcupFullbleedSection
        className="sd-s6"
        designHeight={2866}
        imageSrc={SECTION_5}
        alt="表情包展示"
      />
      <SpringDangoManekinekoSection />
      <WorldcupFullbleedSection
        className="sd-s7"
        designHeight={1125}
        imageSrc={SECTION_6}
        alt="项目总结"
      />
    </div>
  );
}
