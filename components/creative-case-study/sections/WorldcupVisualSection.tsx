import { FigmaPlacement } from "../FigmaPlacement";
import { ScrollRevealMask } from "../motion/ScrollRevealMask";
import { ScaledCanvas } from "../ScaledCanvas";

const BG_MESH = "/creative/worldcup-campaign/sections/bg-dot-mesh.webp";
const COLOR_SHOWCASE =
  "/creative/worldcup-campaign/sections/section-3-color-showcase.webp";

const DESIGN_H = 932;

export function WorldcupVisualSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="wc-s3">
      <div
        className="wc-s3__bg"
        data-wc-parallax="mesh"
        style={{ backgroundImage: `url(${BG_MESH})` }}
        aria-hidden="true"
      />

      <FigmaPlacement designHeight={DESIGN_H} x={60} y={60}>
        <span className="wc-pill wc-pill--outline wc-pill--dark" data-wc-stagger-item>
          # VISUAL DESIGN
        </span>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={1636} y={60}>
        <span className="wc-pill wc-pill--outline wc-pill--dark" data-wc-stagger-item>
          3 · 视觉呈现
        </span>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={62} y={136} w={371} h={52}>
        <ScrollRevealMask>
          <h2 className="wc-s3__title">3.1 元素设计 x 配色</h2>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={62} y={192} w={627} h={44}>
        <ScrollRevealMask delay={0.05}>
          <p className="wc-s3__subtitle">ELEMENT DESIGN x COLOUR</p>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={177} y={192} w={1512.006}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COLOR_SHOWCASE}
          alt="世界杯主题元素设计与配色方案：电光蓝主色搭配柠檬黄、薄荷绿、热粉与青柠绿"
          className="wc-s3__showcase-image"
          data-wc-parallax="showcase"
          loading="lazy"
          decoding="async"
        />
      </FigmaPlacement>
    </ScaledCanvas>
  );
}
