import { MavaVideoDesignSection } from "./MavaVideoDesignSection";
import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";

import "./mava-social-media-sections.css";

const SECTION_1_IMAGE =
  "/creative/mava-social-media/sections/section-1-preliminary-analysis.webp";
const SECTION_2_IMAGE =
  "/creative/mava-social-media/sections/section-2-visual-strategy.webp";
const SECTION_3_IMAGE =
  "/creative/mava-social-media/sections/section-3-aigc-process.webp";
const SECTION_4_IMAGE =
  "/creative/mava-social-media/sections/section-4-visual-presentation.webp";
const SECTION_5_IMAGE =
  "/creative/mava-social-media/sections/section-5-video-strategy.webp";
const SECTION_7_IMAGE =
  "/creative/mava-social-media/sections/section-7-project-summary.webp";

export function MavaSocialMediaBody() {
  return (
    <div className="creative-case-study__sections">
      <WorldcupFullbleedSection
        className="mava-s1"
        designHeight={1287}
        imageSrc={SECTION_1_IMAGE}
        alt="1 · 前期工作分析：背景补充、项目目标与现存问题"
        jpFlag
      />
      <WorldcupFullbleedSection
        className="mava-s2"
        designHeight={1287}
        imageSrc={SECTION_2_IMAGE}
        alt="2 · 视觉设计策略：视觉元素、色彩与三渲二质感推导"
        jpFlag
      />
      <WorldcupFullbleedSection
        className="mava-s3"
        designHeight={1450}
        imageSrc={SECTION_3_IMAGE}
        alt="2.2 AIGC 设计全流程：四步混合工作流"
        jpFlag
      />
      <WorldcupFullbleedSection
        className="mava-s4"
        designHeight={2685}
        imageSrc={SECTION_4_IMAGE}
        alt="3 · 视觉呈现：元素设计、配色与视觉页面设计"
        jpFlag
      />
      <WorldcupFullbleedSection
        className="mava-s5"
        designHeight={3427}
        imageSrc={SECTION_5_IMAGE}
        alt="4 · 视频设计策略：IP 服装设定与分镜设计"
        jpFlag={{ pillX: 56 }}
      />
      <MavaVideoDesignSection />
      <WorldcupFullbleedSection
        className="mava-s7"
        designHeight={1157}
        imageSrc={SECTION_7_IMAGE}
        alt="项目总结：活动数据、问题反思与后续策略"
        jpFlag
      />
    </div>
  );
}
