import { SeamMascotHover } from "./SeamMascotHover";
import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";

const SECTION_1_IMAGE =
  "/creative/worldcup-campaign/sections/section-1-context.webp";
const SECTION_2A_IMAGE =
  "/creative/worldcup-campaign/sections/section-2-analysis-cultural-taboos.webp";
const SECTION_2B_IMAGE =
  "/creative/worldcup-campaign/sections/section-2-analysis-cultural-localization.webp";
const SECTION_2C_IMAGE =
  "/creative/worldcup-campaign/sections/section-2-analysis-localized-expressions.webp";
const SECTION_3A_IMAGE =
  "/creative/worldcup-campaign/sections/section-3-visual-carnival-vibes.webp";
const SECTION_3B_IMAGE =
  "/creative/worldcup-campaign/sections/section-3-visual-mechanics-matrix.webp";
const SECTION_4_IMAGE =
  "/creative/worldcup-campaign/sections/section-4-visual-page-design.webp";
const SECTION_5_IMAGE =
  "/creative/worldcup-campaign/sections/section-5-gameplay-screens.webp";
const SECTION_6_IMAGE =
  "/creative/worldcup-campaign/sections/section-6-share-flow.webp";
const SECTION_7_IMAGE =
  "/creative/worldcup-campaign/sections/section-7-feed-banners.webp";
const SECTION_8_IMAGE =
  "/creative/worldcup-campaign/sections/section-8-project-footer.webp";
const SECTION_10_IMAGE =
  "/creative/worldcup-campaign/sections/section-10-project-footer.webp";
const SEAM_MASCOT =
  "/creative/worldcup-campaign/sections/seam-mascot.webp";
const SEAM_MASCOT_S5_S6 =
  "/creative/worldcup-campaign/sections/seam-mascot-s5-s6.webp";
const SEAM_MASCOT_S6_S7 =
  "/creative/worldcup-campaign/sections/seam-mascot-s6-s7.webp";

function SectionSeam({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={["wc-section-seam", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <SeamMascotHover src={src} />
    </div>
  );
}

export function WorldcupBody() {
  return (
    <div className="creative-case-study__sections">
      <SectionSeam
        src={SEAM_MASCOT}
        className="wc-section-seam--hero-s1"
      />
      <WorldcupFullbleedSection
        className="wc-s1"
        designHeight={1433}
        imageSrc={SECTION_1_IMAGE}
        alt="前期工作分析：背景补充、项目目标与现存问题"
      />
      <WorldcupFullbleedSection
        className="wc-s2"
        designHeight={1456}
        imageSrc={SECTION_2A_IMAGE}
        alt="Local Cultural Taboos & Visual Compliance"
      />
      <WorldcupFullbleedSection
        className="wc-s2b"
        designHeight={1456}
        imageSrc={SECTION_2B_IMAGE}
        alt="Cultural Localization of Character Assets"
      />
      <WorldcupFullbleedSection
        className="wc-s2c"
        designHeight={1360}
        imageSrc={SECTION_2C_IMAGE}
        alt="Localized Expressions & Dynamic Poses"
      />
      <WorldcupFullbleedSection
        className="wc-s3"
        designHeight={1456}
        imageSrc={SECTION_3A_IMAGE}
        alt="Visual Translation of Carnival Vibes"
      />
      <WorldcupFullbleedSection
        className="wc-s3b"
        designHeight={1647}
        imageSrc={SECTION_3B_IMAGE}
        alt="Visual Differentiation of the Mechanics Matrix"
      />
      <WorldcupFullbleedSection
        className="wc-s4"
        designHeight={2797}
        imageSrc={SECTION_4_IMAGE}
        alt="Main Visuals & Social Assets"
      />
      <div className="wc-section-pair wc-section-pair--s5-s7">
        <WorldcupFullbleedSection
          className="wc-s5"
          designHeight={1931}
          imageSrc={SECTION_5_IMAGE}
          alt="3.1 视觉页面设计：主视觉与社媒物料"
        />
        <SectionSeam
          src={SEAM_MASCOT_S5_S6}
          className="wc-section-seam--s5-s6 wc-section-seam--compact"
        />
        <WorldcupFullbleedSection
          className="wc-s6"
          designHeight={2655}
          imageSrc={SECTION_7_IMAGE}
          alt="Ranking 榜单与奖励视觉设计"
        />
        <SectionSeam
          src={SEAM_MASCOT_S6_S7}
          className="wc-section-seam--s6-s7 wc-section-seam--compact"
        />
        <WorldcupFullbleedSection
          className="wc-s7"
          designHeight={1912}
          imageSrc={SECTION_6_IMAGE}
          alt="世界杯主题玩法界面与激励弹窗设计"
        />
      </div>
      <WorldcupFullbleedSection
        className="wc-s8"
        designHeight={4383}
        imageSrc={SECTION_8_IMAGE}
        alt="扫码激励与分享链路视觉设计"
      />
      <WorldcupFullbleedSection
        className="wc-s10"
        designHeight={621}
        imageSrc={SECTION_10_IMAGE}
        alt="项目信息：2026 Summer World Cup JP Pro L10N 设计署名"
      />
    </div>
  );
}
