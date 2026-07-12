import { SeamMascotHover } from "./SeamMascotHover";
import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";

const SECTION_1_IMAGE =
  "/creative/worldcup-campaign/sections/section-1-context.webp";
const SECTION_2_IMAGE =
  "/creative/worldcup-campaign/sections/section-2-analysis.webp";
const SECTION_3_IMAGE =
  "/creative/worldcup-campaign/sections/section-3-visual-strategy.webp";
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
const SECTION_9_IMAGE =
  "/creative/worldcup-campaign/sections/section-9-promotion.webp";
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
      <div className="wc-section-pair wc-section-pair--s1-s2">
        <div className="wc-section-pair__s1">
          <WorldcupFullbleedSection
            className="wc-s1"
            designHeight={845}
            imageSrc={SECTION_1_IMAGE}
            alt="项目背景与团队分工：世界杯主题增长战役定位与职责划分"
          />
          <SectionSeam src={SEAM_MASCOT} />
        </div>
        <WorldcupFullbleedSection
          className="wc-s2"
          designHeight={1082}
          imageSrc={SECTION_2_IMAGE}
          alt="1 · 前期工作分析：背景补充、项目目标与现存问题"
        />
      </div>
      <WorldcupFullbleedSection
        className="wc-s3"
        designHeight={3183}
        imageSrc={SECTION_3_IMAGE}
        alt="2 · 视觉设计策略：IP 本土化融入与视觉体系"
      />
      <WorldcupFullbleedSection
        className="wc-s4"
        designHeight={2389}
        imageSrc={SECTION_4_IMAGE}
        alt="2.3–2.4 狂欢氛围日系化转译与玩法矩阵视觉差异化"
      />
      <div className="wc-section-pair wc-section-pair--s5-s7">
        <div className="wc-section-pair__s1">
          <WorldcupFullbleedSection
            className="wc-s5"
            designHeight={2574}
            imageSrc={SECTION_5_IMAGE}
            alt="3.1 视觉页面设计：主视觉与社媒物料"
          />
          <SectionSeam
            src={SEAM_MASCOT_S5_S6}
            className="wc-section-seam--s5-s6 wc-section-seam--compact"
          />
        </div>
        <div className="wc-section-pair__s1">
          <WorldcupFullbleedSection
            className="wc-s6"
            designHeight={1468}
            imageSrc={SECTION_6_IMAGE}
            alt="世界杯主题玩法界面与激励弹窗设计"
          />
          <SectionSeam
            src={SEAM_MASCOT_S6_S7}
            className="wc-section-seam--compact"
          />
        </div>
        <WorldcupFullbleedSection
          className="wc-s7"
          designHeight={2097}
          imageSrc={SECTION_7_IMAGE}
          alt="Ranking 榜单与奖励视觉设计"
        />
      </div>
      <WorldcupFullbleedSection
        className="wc-s8"
        designHeight={1691}
        imageSrc={SECTION_8_IMAGE}
        alt="扫码激励与分享链路视觉设计"
      />
      <WorldcupFullbleedSection
        className="wc-s9"
        designHeight={4651}
        imageSrc={SECTION_9_IMAGE}
        alt="推广物料：倒计时、活动首日与 Boost 等 Feed Banner"
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
