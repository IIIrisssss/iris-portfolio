import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import "./spring-dango-sections.css";

const ASSET = "/creative/spring-dango-points/sections/s1";
const PREVIEW_GIF = "/creative/spring-dango-points/stickers/21.gif";
const TAG_H = 47.531;
const DESIGN_H = 1327;

const LARGE_NODES = [
  { x: 162, y: 534, label: "新年场景", lx: 242, ly: 668 },
  { x: 712, y: 270, label: "激励视觉", lx: 792, ly: 404 },
  { x: 711, y: 796, label: "日常场景", lx: 791, ly: 930 },
  { x: 1260, y: 533, label: "本土文化", lx: 1340, ly: 667 },
] as const;

const MEDIUM_NODES = [
  { x: 1181, y: 957, label: "社畜场景", lx: 1213.96, ly: 1027.94 },
  { x: 1534, y: 817, label: "国民运动", lx: 1566.96, ly: 887.94 },
  { x: 1340, y: 295, label: "夸张动态", lx: 1372.96, ly: 365.94 },
  { x: 1577, y: 416, label: "日式漫符", lx: 1609.96, ly: 486.94 },
  { x: 1385, y: 949, label: "日漫穿搭", lx: 1417.96, ly: 1019.94 },
] as const;

const SMALL_NODES = [
  { x: 415, y: 294, label: "暴富祈愿", lx: 448.11, ly: 365.24, alt: true },
  { x: 672, y: 602, label: "马年祝福", lx: 705.83, ly: 674.74 },
  { x: 877, y: 601, label: "好运祈愿", lx: 910.11, ly: 672.24 },
  { x: 1089, y: 390, label: "热血激励梗", lx: 1109, ly: 462.68, wide: true },
  { x: 437, y: 934, label: "假期状态", lx: 470.83, ly: 1006.74 },
] as const;

const ARROWS = [
  { x: 507, y: 702, w: 150, h: 12, src: "arrow-5", rotate: 0 },
  { x: 1075, y: 702, w: 160, h: 12, src: "arrow-13", rotate: 180 },
  { x: 395, y: 469, w: 76, h: 65, src: "arrow-3", rotate: -57.76 },
  { x: 395, y: 864, w: 94, h: 78, src: "arrow-11", rotate: 55.8 },
  { x: 644, y: 1018, w: 56, h: 8, src: "arrow-12", rotate: 172.02 },
  { x: 1034, y: 473, w: 45, h: 9, src: "arrow-9", rotate: -11.56 },
  { x: 1267, y: 534, w: 52, h: 31, src: "arrow-10", rotate: -143.57 },
  { x: 1566, y: 578, w: 39, h: 24, src: "arrow-15", rotate: -37.84 },
  { x: 620, y: 376, w: 76, h: 19, src: "arrow-4", rotate: -165.29 },
  { x: 1055, y: 976, w: 102, h: 31, src: "arrow-2", rotate: 17.84 },
  { x: 1424, y: 487, w: 40, h: 40, src: "arrow-7", rotate: -87.14 },
  { x: 1443, y: 867, w: 71, h: 70, src: "arrow-14", rotate: 81.07 },
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
        <FigmaPlacement designHeight={DESIGN_H} x={70} y={70} w={587} h={59}>
          <h2 className="sd-s1__title">CREATIVE THINKING</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={150} y={129} w={803} h={59}>
          <h2 className="sd-s1__title">&amp; SCENE INTEGRATION</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={196} w={329} h={39}>
          <p className="sd-s1__subtitle">创意发散与场景融合</p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1765} y={70} w={85} h={85}>
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

        <FigmaPlacement designHeight={DESIGN_H} x={1685} y={180} w={165} h={38}>
          <p className="sd-s1__credit sd-s1__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1685} y={223.63} w={165} h={38}>
          <p className="sd-s1__credit">UG INCENTIVE</p>
        </FigmaPlacement>

        {LARGE_NODES.map((node) => (
          <FigmaPlacement key={node.label} designHeight={DESIGN_H} x={node.x} y={node.y} w={322} h={322}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ellipseSrc(true)} alt="" className="sd-s1__ellipse" draggable={false} />
          </FigmaPlacement>
        ))}

        {LARGE_NODES.map((node) => (
          <FigmaPlacement key={`t-${node.label}`} designHeight={DESIGN_H} x={node.lx} y={node.ly} w={161} h={55}>
            <p className="sd-s1__node-label sd-s1__node-label--lg">{node.label}</p>
          </FigmaPlacement>
        ))}

        {MEDIUM_NODES.map((node) => (
          <FigmaPlacement key={node.label} designHeight={DESIGN_H} x={node.x} y={node.y} w={182} h={182}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSET}/ellipse-md.webp`} alt="" className="sd-s1__ellipse" draggable={false} />
          </FigmaPlacement>
        ))}

        {MEDIUM_NODES.map((node) => (
          <FigmaPlacement key={`t-${node.label}`} designHeight={DESIGN_H} x={node.lx} y={node.ly} w={116} h={40}>
            <p className="sd-s1__node-label">{node.label}</p>
          </FigmaPlacement>
        ))}

        {SMALL_NODES.map((node) => (
          <FigmaPlacement key={node.label} designHeight={DESIGN_H} x={node.x} y={node.y} w={184} h={184}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ellipseSrc(false, "alt" in node && node.alt)}
              alt=""
              className="sd-s1__ellipse"
              draggable={false}
            />
          </FigmaPlacement>
        ))}

        {SMALL_NODES.map((node) => (
          <FigmaPlacement
            key={`t-${node.label}`}
            designHeight={DESIGN_H}
            x={node.lx}
            y={node.ly}
            w={"wide" in node && node.wide ? 144 : 116}
            h={40}
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

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1208.61} w={225.739} h={TAG_H}>
          <span className="sd-s1__tag sd-s1__tag--filled">
            <span className="sd-s1__tag-text">INcentive</span>
            <span className="sd-s1__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={305.72} y={1208.61} w={168.785} h={TAG_H}>
          <span className="sd-s1__tag sd-s1__tag--outline">
            <span className="sd-s1__tag-text sd-s1__tag-text--dark">NEKO</span>
            <span className="sd-s1__tag-text sd-s1__tag-text--dark">NEKO～</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1670.55} y={1196} w={37.302} h={43.651}>
          <span className="sd-s1__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1708.38} y={1215.4} w={141.624} h={48.501}>
          <span className="sd-s1__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
