import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import { MavaVideoPlayer } from "./MavaVideoPlayer";

const SECTION_BG =
  "/creative/mava-social-media/sections/section-6-video-design.webp";
const VIDEO_SRC = "/creative/mava-social-media/original-video.mp4";
const VIDEO_POSTER = "/creative/mava-social-media/video-poster.webp";

const DESIGN_W = 1920;
const DESIGN_H = 1456;

/** Figma node 20:8706 — 视频位置 placeholder (video overlays this rect). */
const VIDEO_X = 297;
const VIDEO_Y = 355;
const VIDEO_W = 1325;
const VIDEO_H = 745.3125;

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
        x={VIDEO_X}
        y={VIDEO_Y}
        w={VIDEO_W}
        h={VIDEO_H}
      >
        <MavaVideoPlayer src={VIDEO_SRC} poster={VIDEO_POSTER} />
      </FigmaPlacement>
    </ScaledCanvas>
  );
}
