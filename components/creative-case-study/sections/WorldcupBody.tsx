import { MoreWorkImageMotion } from "../motion/MoreWorkImageMotion";
import { WorldcupAnalysisSection } from "./WorldcupAnalysisSection";
import { WorldcupContextSection } from "./WorldcupContextSection";
import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";
import { WorldcupVisualSection } from "./WorldcupVisualSection";

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
const SEAM_MASCOT =
  "/creative/worldcup-campaign/sections/seam-mascot.webp";

export function WorldcupBody() {
  return (
    <div className="creative-case-study__sections">
      <div className="wc-section-pair wc-section-pair--s1-s2">
        <div className="wc-section-pair__s1">
          <WorldcupContextSection />
          <div className="wc-section-seam" aria-hidden="true">
            <MoreWorkImageMotion scrollEntrance>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SEAM_MASCOT}
                alt=""
                className="wc-section-seam__mascot"
                loading="eager"
                decoding="async"
              />
            </MoreWorkImageMotion>
          </div>
        </div>
        <WorldcupAnalysisSection />
      </div>
      <WorldcupVisualSection />
      <WorldcupFullbleedSection
        className="wc-s4"
        designHeight={1709}
        topInset={120}
        imageSrc={SECTION_4_IMAGE}
        alt="3.2 视觉页面设计：Coin Dozer、Incentive Soccer 等玩法主页面、弹窗与加载页"
      />
      <WorldcupFullbleedSection
        className="wc-s5"
        designHeight={2156}
        imageSrc={SECTION_5_IMAGE}
        alt="世界杯主题玩法界面：Ranking、邀请分享与活动弹窗设计"
      />
      <WorldcupFullbleedSection
        className="wc-s6"
        designHeight={2378}
        imageSrc={SECTION_6_IMAGE}
        alt="分享链路视觉设计：扫码邀请与分享面板界面"
      />
      <WorldcupFullbleedSection
        className="wc-s7"
        designHeight={1924}
        imageSrc={SECTION_7_IMAGE}
        alt="Feed Banner 与落地页主图：世界杯主题推广物料设计"
      />
      <WorldcupFullbleedSection
        className="wc-s8"
        designHeight={621}
        imageSrc={SECTION_8_IMAGE}
        alt="项目信息：2026 Summer World Cup JP Pro L10N 设计署名"
      />
    </div>
  );
}
