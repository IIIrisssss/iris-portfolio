import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import "./spring-dango-sections.css";

const ASSET = "/creative/spring-dango-points/sections/s1";
const PREVIEW_GIF = "/creative/spring-dango-points/stickers/21.gif";
const TAG_H = 47.391;
const DESIGN_H = 1456;

const LARGE_NODES = [
  { x: 204, y: 598.11, w: 305.063, h: 305.063, label: "新年场景", lx: 279.79, ly: 729.8, lw: 152.532, lh: 42.633 },
  { x: 725.07, y: 348, w: 305.063, h: 305.063, label: "激励视觉", lx: 800.86, ly: 482.53, lw: 152.532, lh: 36.949 },
  { x: 724.12, y: 846.33, w: 305.063, h: 305.063, label: "日常场景", lx: 799.92, ly: 980.86, lw: 152.532, lh: 36.949 },
  { x: 1244.25, y: 597.17, w: 305.063, h: 305.063, label: "本土文化", lx: 1320.04, ly: 727.91, lw: 152.532, lh: 42.633 },
] as const;

const MEDIUM_NODES = [
  { x: 1169.4, y: 998.86, label: "社畜场景", lx: 1200.63, ly: 1066.07 },
  { x: 1503.83, y: 866.23, label: "国民运动", lx: 1535.06, ly: 933.43 },
  { x: 1335.2, y: 366, label: "夸张动态", lx: 1366.42, ly: 433.21 },
  { x: 1544.57, y: 486.32, label: "日式漫符", lx: 1575.8, ly: 553.53 },
  { x: 1362.67, y: 991.29, label: "日漫穿搭", lx: 1393.9, ly: 1058.49 },
] as const;

const SMALL_ELLIPSES = [
  { x: 687.17, y: 662.54, w: 174.433, h: 174.433 },
  { x: 881.39, y: 661.59, w: 174.433, h: 174.433 },
  { x: 464.54, y: 977.07, w: 174.433, h: 174.433, label: "假期状态", lx: 496.58, ly: 1044.71 },
  { x: 1082.24, y: 461.69, w: 174.433, h: 174.433, label: "热血激励梗", lx: 1101.19, ly: 528.95, wide: true },
  { x: 443.69, y: 370.74, w: 174.433, h: 174.433, label: "暴富祈愿", lx: 475.06, ly: 438.23, alt: true },
] as const;

const TEXT_ONLY_NODES = [
  { label: "马年祝福", lx: 719.22, ly: 731.45, lw: 109.724, lh: 38.613 },
  { label: "好运祈愿", lx: 912.76, ly: 729.08, lw: 109.294, lh: 37.337 },
] as const;

const ARROWS = [
  { x: 530.85, y: 757.28, w: 142.11, h: 12, src: "arrow-5", rotate: 0 },
  { x: 1068.98, y: 757.28, w: 151.584, h: 12, src: "arrow-13", rotate: 180 },
  { x: 424.74, y: 536.53, w: 38.843, h: 61.581, src: "arrow-3", rotate: -57.76 },
  { x: 424.74, y: 910.76, w: 50.212, h: 73.897, src: "arrow-11", rotate: 55.8 },
  { x: 660.65, y: 1056.66, w: 53.055, h: 7.438, src: "arrow-12", rotate: 172.02 },
  { x: 1030.13, y: 540.32, w: 41.686, h: 8.527, src: "arrow-9", rotate: -11.56 },
  { x: 1250.88, y: 598.11, w: 39.791, h: 29.369, src: "arrow-10", rotate: -143.57 },
  { x: 1534.15, y: 639.8, w: 29.526, h: 22.938, src: "arrow-15", rotate: -37.84 },
  { x: 637.91, y: 448.42, w: 70.134, h: 18.418, src: "arrow-4", rotate: -165.29 },
  { x: 1050.03, y: 1016.87, w: 92.342, h: 29.711, src: "arrow-2", rotate: 17.84 },
  { x: 1406.25, y: 551.69, w: 6.632, h: 37.896, src: "arrow-7", rotate: -80.07 },
  { x: 1417.62, y: 913.6, w: 10.421, h: 66.318, src: "arrow-14", rotate: 81.07 },
] as const;

function ellipseSrc(large: boolean, alt?: boolean) {
  if (large) return `${ASSET}/ellipse-lg.webp`;
  if (alt) return `${ASSET}/ellipse-sm-alt.webp`;
  return `${ASSET}/ellipse-sm.webp`;
}

export function SpringDangoCreativeThinkingSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="sd-s1">
      <div className="sd-s1__canvas" aria-label="创意发散与场景融合">
        <FigmaPlacement designHeight={DESIGN_H} x={70} y={76} w={654} h={72}>
          <h2 className="sd-s1__title">CREATIVE THINKING</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={151} y={139} w={736} h={72}>
          <h2 className="sd-s1__title">&amp; SCENE INTEGRATION</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1765} y={126} w={85} h={85}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PREVIEW_GIF}
            alt=""
            className="sd-s1__preview-gif"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={223} w={169} h={38}>
          <p className="sd-s1__credit sd-s1__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={269} w={169} h={38}>
          <p className="sd-s1__credit">UG INCENTIVE</p>
        </FigmaPlacement>

        {LARGE_NODES.map((node) => (
          <FigmaPlacement
            key={node.label}
            designHeight={DESIGN_H}
            x={node.x}
            y={node.y}
            w={node.w}
            h={node.h}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ellipseSrc(true)} alt="" className="sd-s1__ellipse" draggable={false} loading="lazy" decoding="async" />
          </FigmaPlacement>
        ))}

        {LARGE_NODES.map((node) => (
          <FigmaPlacement
            key={`t-${node.label}`}
            designHeight={DESIGN_H}
            x={node.lx}
            y={node.ly}
            w={node.lw}
            h={node.lh}
          >
            <p className="sd-s1__node-label sd-s1__node-label--lg">{node.label}</p>
          </FigmaPlacement>
        ))}

        {MEDIUM_NODES.map((node) => (
          <FigmaPlacement key={node.label} designHeight={DESIGN_H} x={node.x} y={node.y} w={172.427} h={172.427}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSET}/ellipse-md.webp`} alt="" className="sd-s1__ellipse" draggable={false} loading="lazy" decoding="async" />
          </FigmaPlacement>
        ))}

        {MEDIUM_NODES.map((node) => (
          <FigmaPlacement key={`t-${node.label}`} designHeight={DESIGN_H} x={node.lx} y={node.ly} w={109.294} h={37.337}>
            <p className="sd-s1__node-label">{node.label}</p>
          </FigmaPlacement>
        ))}

        {SMALL_ELLIPSES.map((node, index) => (
          <FigmaPlacement
            key={`sm-${index}`}
            designHeight={DESIGN_H}
            x={node.x}
            y={node.y}
            w={node.w}
            h={node.h}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ellipseSrc(false, "alt" in node && node.alt)}
              alt=""
              className="sd-s1__ellipse"
              draggable={false}
            />
          </FigmaPlacement>
        ))}

        {SMALL_ELLIPSES.filter((node) => "label" in node).map((node) => (
          <FigmaPlacement
            key={`t-${node.label}`}
            designHeight={DESIGN_H}
            x={node.lx}
            y={node.ly}
            w={"wide" in node && node.wide ? 136.748 : 109.724}
            h={38.613}
          >
            <p className="sd-s1__node-label">{node.label}</p>
          </FigmaPlacement>
        ))}

        {TEXT_ONLY_NODES.map((node) => (
          <FigmaPlacement
            key={node.label}
            designHeight={DESIGN_H}
            x={node.lx}
            y={node.ly}
            w={node.lw}
            h={node.lh}
          >
            <p className="sd-s1__node-label">{node.label}</p>
          </FigmaPlacement>
        ))}

        {ARROWS.map((arrow) => (
          <FigmaPlacement
            key={arrow.src + arrow.x}
            designHeight={DESIGN_H}
            x={arrow.x}
            y={arrow.y}
            w={arrow.w}
            h={arrow.h}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSET}/${arrow.src}.webp`}
              alt=""
              className="sd-s1__arrow"
              style={{ transform: `rotate(${arrow.rotate}deg)` }}
              draggable={false}
            />
          </FigmaPlacement>
        ))}

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1328.61} w={225.739} h={TAG_H}>
          <span className="sd-s1__tag sd-s1__tag--filled">
            <span className="sd-s1__tag-text">INcentive</span>
            <span className="sd-s1__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={306} y={1329} w={154} h={47}>
          <span className="sd-s1__tag sd-s1__tag--outline">
            <span className="sd-s1__tag-text sd-s1__tag-text--dark">NEKO</span>
            <span className="sd-s1__tag-text sd-s1__tag-text--dark">NEKO</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1640.54} y={1318} w={37.302} h={43.651}>
          <span className="sd-s1__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1679} y={1345} w={171} h={41}>
          <span className="sd-s1__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
