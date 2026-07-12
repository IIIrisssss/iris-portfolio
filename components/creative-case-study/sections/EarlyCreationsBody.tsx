import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";

const SECTION_1_IMAGE =
  "/creative/early-creations/sections/section-1-analysis.webp";
const SECTION_2_IMAGE =
  "/creative/early-creations/sections/section-2-visual-strategy.webp";
const SECTION_3_IMAGE =
  "/creative/early-creations/sections/section-3-color-layout.webp";
const SECTION_4_IMAGE =
  "/creative/early-creations/sections/section-4-rednote-design.webp";
const SECTION_5_IMAGE =
  "/creative/early-creations/sections/section-5-official-account.webp";
const SECTION_6_IMAGE =
  "/creative/early-creations/sections/section-6-project-feedback.webp";
const SECTION_7_IMAGE =
  "/creative/early-creations/sections/section-7-project-summary.webp";

export function EarlyCreationsBody() {
  return (
    <div className="creative-case-study__sections">
      <WorldcupFullbleedSection
        className="ec-s1"
        designHeight={1635}
        imageSrc={SECTION_1_IMAGE}
        alt="1 · 前期工作分析：品牌核心要素、视觉问题与升级需求"
      />
      <WorldcupFullbleedSection
        className="ec-s2"
        designHeight={1080}
        imageSrc={SECTION_2_IMAGE}
        alt="2 · 视觉设计策略：呼吸感、物性触达与灰度共生"
      />
      <WorldcupFullbleedSection
        className="ec-s3"
        designHeight={2576}
        imageSrc={SECTION_3_IMAGE}
        alt="2.2–2.4 视觉风格氛围图、颜色选择与版面拆解"
      />
      <WorldcupFullbleedSection
        className="ec-s4"
        designHeight={1168}
        imageSrc={SECTION_4_IMAGE}
        alt="3 · 小红书模板设计"
      />
      <WorldcupFullbleedSection
        className="ec-s5"
        designHeight={2736}
        imageSrc={SECTION_5_IMAGE}
        alt="4 · 公众号推文设计"
      />
      <WorldcupFullbleedSection
        className="ec-s6"
        designHeight={1319}
        imageSrc={SECTION_6_IMAGE}
        alt="5.1 上线反馈：小红书与公众号数据表现"
      />
      <WorldcupFullbleedSection
        className="ec-s7"
        designHeight={633}
        imageSrc={SECTION_7_IMAGE}
        alt="5.2–5.3 优势总结与不足改进方向"
      />
    </div>
  );
}
