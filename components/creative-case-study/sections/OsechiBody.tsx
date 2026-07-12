import { WorldcupFullbleedSection } from "./WorldcupFullbleedSection";

const SECTION_1_IMAGE =
  "/creative/new-year-osechi/sections/section-1-ranking.webp";
const SECTION_2_IMAGE =
  "/creative/new-year-osechi/sections/section-2-wish-card.webp";
const SECTION_3_IMAGE =
  "/creative/new-year-osechi/sections/section-3-gameplay.webp";
const SECTION_4_IMAGE =
  "/creative/new-year-osechi/sections/section-4-manekineko-evolution.webp";
const SECTION_5_IMAGE =
  "/creative/new-year-osechi/sections/section-5-click-battle.webp";
const SECTION_6_IMAGE =
  "/creative/new-year-osechi/sections/section-6-manekineko-popup.webp";

export function OsechiBody() {
  return (
    <div className="creative-case-study__sections">
      <WorldcupFullbleedSection
        className="osechi-s1"
        designHeight={2060}
        imageSrc={SECTION_1_IMAGE}
        alt="1 · New Year Ranking — mobile screens, reward dialogs, and festive Lucky cat"
      />
      <WorldcupFullbleedSection
        className="osechi-s2"
        designHeight={2292}
        imageSrc={SECTION_2_IMAGE}
        alt="2 · Wish Card gameplay — card collection, sharing flow, and reward mechanics"
      />
      <WorldcupFullbleedSection
        className="osechi-s3"
        designHeight={3617}
        imageSrc={SECTION_3_IMAGE}
        alt="3 · In-app gameplay screens — osechi-themed UI flows and interactions"
      />
      <WorldcupFullbleedSection
        className="osechi-s4"
        designHeight={532}
        imageSrc={SECTION_4_IMAGE}
        alt="4 · Maneki-neko character evolution — five-frame muscle-building sequence"
      />
      <WorldcupFullbleedSection
        className="osechi-s5"
        designHeight={1484}
        imageSrc={SECTION_5_IMAGE}
        alt="5 · Click Battle — team match UI with comic-style action panels"
      />
      <WorldcupFullbleedSection
        className="osechi-s6"
        designHeight={801}
        imageSrc={SECTION_6_IMAGE}
        alt="6 · Maneki-neko popup — 迎春ドンドン！祭 reward reveal animation"
      />
    </div>
  );
}
