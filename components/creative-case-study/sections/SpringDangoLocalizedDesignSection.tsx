import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import "./spring-dango-sections.css";

const ASSET = "/creative/spring-dango-points/sections/s4";
const PREVIEW_GIF = "/creative/spring-dango-points/stickers/21.gif";
const TILE = 316;
const TAG_H = 47.531;
const DESIGN_H = 1622;

const TILES = [
  { src: "tile-1-1", x: 183, y: 405 },
  { src: "tile-1-2", x: 523, y: 405 },
  { src: "tile-1-3", x: 1053, y: 405 },
  { src: "tile-1-4", x: 1392, y: 405 },
  { src: "tile-2-1", x: 183, y: 1005 },
  { src: "tile-2-2", x: 523, y: 1005 },
  { src: "tile-2-3", x: 1053, y: 1003 },
  { src: "tile-2-4", x: 1392, y: 1003 },
] as const;

const PILLS = [
  { x: 400, y: 308, label: "社交日常" },
  { x: 1275, y: 306, label: "国民热血" },
  { x: 402, y: 906, label: "职场社畜" },
  { x: 1291, y: 906, label: "日式漫符" },
] as const;

export function SpringDangoLocalizedDesignSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="sd-s4">
      <div className="sd-s4__canvas" aria-label="本土化设计">
        <FigmaPlacement designHeight={DESIGN_H} x={370} y={498} w={1180} h={707.572}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSET}/bg-cat.webp`}
            alt=""
            className="sd-s4__bg-cat"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={70} w={524} h={59}>
          <h2 className="sd-s4__title">Localized Design</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={138} w={253} h={39}>
          <p className="sd-s4__subtitle">本土化设计</p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1765} y={70} w={85} h={85}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PREVIEW_GIF}
            alt=""
            className="sd-s4__preview-gif"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1685} y={180} w={165} h={38}>
          <p className="sd-s4__credit sd-s4__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1685} y={223.63} w={165} h={38}>
          <p className="sd-s4__credit">UG INCENTIVE</p>
        </FigmaPlacement>

        {PILLS.map((pill) => (
          <FigmaPlacement key={pill.label} designHeight={DESIGN_H} x={pill.x} y={pill.y} w={201} h={61}>
            <span className="sd-s4__pill">{pill.label}</span>
          </FigmaPlacement>
        ))}

        {TILES.map((tile) => (
          <FigmaPlacement
            key={tile.src}
            designHeight={DESIGN_H}
            x={tile.x}
            y={tile.y}
            w={TILE}
            h={TILE}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSET}/${tile.src}.webp`}
              alt=""
              className="sd-s4__tile"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </FigmaPlacement>
        ))}

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1503.61} w={225.739} h={TAG_H}>
          <span className="sd-s4__tag sd-s4__tag--filled">
            <span className="sd-s4__tag-text">INcentive</span>
            <span className="sd-s4__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={305.72} y={1503.61} w={168.785} h={TAG_H}>
          <span className="sd-s4__tag sd-s4__tag--outline">
            <span className="sd-s4__tag-text sd-s4__tag-text--dark">NEKO</span>
            <span className="sd-s4__tag-text sd-s4__tag-text--dark">NEKO～</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1670.55} y={1491} w={37.302} h={43.651}>
          <span className="sd-s4__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1708.38} y={1510.4} w={141.624} h={48.501}>
          <span className="sd-s4__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
