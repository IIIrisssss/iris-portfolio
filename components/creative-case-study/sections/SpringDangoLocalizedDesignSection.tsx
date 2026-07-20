import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import "./spring-dango-sections.css";

const ASSET = "/creative/spring-dango-points/sections/s4";
const PREVIEW_GIF = "/creative/spring-dango-points/stickers/21.gif";
const TILE = 316;
const TAG_H = 47.391;
const DESIGN_H = 1471;

const TILES = [
  { src: "tile-1-1", x: 197, y: 368 },
  { src: "tile-1-2", x: 537, y: 368 },
  { src: "tile-1-3", x: 1067, y: 368 },
  { src: "tile-1-4", x: 1406, y: 368 },
  { src: "tile-2-1", x: 197, y: 897 },
  { src: "tile-2-2", x: 537, y: 897 },
  { src: "tile-2-3", x: 1067, y: 895 },
  { src: "tile-2-4", x: 1406, y: 895 },
] as const;

const PILLS = [
  { x: 414, y: 271, label: "社交日常" },
  { x: 1289, y: 269, label: "国民热血" },
  { x: 416, y: 798, label: "职场社畜" },
  { x: 1305, y: 798, label: "日式漫符" },
] as const;

export function SpringDangoLocalizedDesignSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="sd-s4">
      <div className="sd-s4__canvas" aria-label="本土化设计">
        <FigmaPlacement designHeight={DESIGN_H} x={368} y={444} w={1180} h={707.572}>
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

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={70} w={632} h={72}>
          <h2 className="sd-s4__title">Localized Design</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1765} y={126} w={85} h={85}>
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

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={223} w={169} h={38}>
          <p className="sd-s4__credit sd-s4__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={269} w={169} h={38}>
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

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1343.61} w={225.739} h={TAG_H}>
          <span className="sd-s4__tag sd-s4__tag--filled">
            <span className="sd-s4__tag-text">INcentive</span>
            <span className="sd-s4__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={306} y={1344} w={154} h={47}>
          <span className="sd-s4__tag sd-s4__tag--outline">
            <span className="sd-s4__tag-text sd-s4__tag-text--dark">NEKO</span>
            <span className="sd-s4__tag-text sd-s4__tag-text--dark">NEKO</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1640.54} y={1333} w={37.302} h={43.651}>
          <span className="sd-s4__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1679} y={1360} w={171} h={41}>
          <span className="sd-s4__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
