import {
  CaseStudyJpFlag,
  JP_FLAG_PRESET_MAVA_WIDE,
} from "../CaseStudyJpFlag";
import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import { MavaVideoPlayer } from "./MavaVideoPlayer";

const SECTION_BG =
  "/creative/mava-social-media/sections/section-6-video-design.webp";
const VIDEO_SRC = "/creative/mava-social-media/original-video.mp4";
const VIDEO_POSTER = "/creative/mava-social-media/video-poster.webp";

const DESIGN_W = JP_FLAG_PRESET_MAVA_WIDE.designWidth;
const DESIGN_H = 1342;

export function MavaVideoDesignSection() {
  return (
    <ScaledCanvas
      designWidth={DESIGN_W}
      designHeight={DESIGN_H}
      className="mava-s6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SECTION_BG}
        alt="5 · 视频设计 — Video Design section"
        className="mava-s6__bg"
        loading="lazy"
        decoding="async"
      />

      <FigmaPlacement
        designWidth={DESIGN_W}
        designHeight={DESIGN_H}
        x={305}
        y={305}
        w={1325}
        h={745.313}
      >
        <MavaVideoPlayer src={VIDEO_SRC} poster={VIDEO_POSTER} />
      </FigmaPlacement>

      <CaseStudyJpFlag
        designHeight={DESIGN_H}
        designWidth={JP_FLAG_PRESET_MAVA_WIDE.designWidth}
        pillX={JP_FLAG_PRESET_MAVA_WIDE.pillX}
        bottomOffset={JP_FLAG_PRESET_MAVA_WIDE.bottomOffset}
      />
    </ScaledCanvas>
  );
}
