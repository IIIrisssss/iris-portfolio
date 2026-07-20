import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";

import "./manekineko-meme-sections.css";

const SECTION_1_IMAGE =
  "/creative/manekineko-meme/sections/section-1-ip-aigc-workflow.webp";
const SECTION_2_IMAGE =
  "/creative/manekineko-meme/sections/section-2-aigc-visual-workflow.webp";
const SECTION_3_IMAGE =
  "/creative/manekineko-meme/sections/section-3-chapter-business.webp";
const SECTION_4_IMAGE =
  "/creative/manekineko-meme/sections/section-4-single-gameplay-visual.webp";
const SECTION_5_IMAGE =
  "/creative/manekineko-meme/sections/section-5-batch-aigc-production.webp";
const SECTION_6_IMAGE =
  "/creative/manekineko-meme/sections/section-6-chapter-platform.webp";
const SECTION_7_IMAGE =
  "/creative/manekineko-meme/sections/section-7-ai-agent-platform.webp";

export function ManekinekoMemeBody() {
  return (
    <div className="creative-case-study__sections">
      <WorldcupFullbleedSection
        className="mk-s1"
        designHeight={1316}
        imageSrc={SECTION_1_IMAGE}
        alt="1.1 IP-AIGC 设计视觉流程"
      />
      <WorldcupFullbleedSection
        className="mk-s2"
        designHeight={1316}
        imageSrc={SECTION_2_IMAGE}
        alt="1.2 AIGC 设计视觉流程"
      />
      <WorldcupFullbleedSection
        className="mk-s3"
        designHeight={215}
        imageSrc={SECTION_3_IMAGE}
        alt="02 业务AIGC量产流程"
      />
      <WorldcupFullbleedSection
        className="mk-s4"
        designHeight={3257}
        imageSrc={SECTION_4_IMAGE}
        alt="2.1 单玩法全流程主视觉+延展"
      />
      <WorldcupFullbleedSection
        className="mk-s5"
        designHeight={2824}
        imageSrc={SECTION_5_IMAGE}
        alt="2.2 单触点批量AIGC素材生产"
      />
      <WorldcupFullbleedSection
        className="mk-s6"
        designHeight={215}
        imageSrc={SECTION_6_IMAGE}
        alt="03 平台AIGC赋能流程"
      />
      <WorldcupFullbleedSection
        className="mk-s7"
        designHeight={2391}
        imageSrc={SECTION_7_IMAGE}
        alt="3.1 AI AGENT平台搭建"
      />
    </div>
  );
}
