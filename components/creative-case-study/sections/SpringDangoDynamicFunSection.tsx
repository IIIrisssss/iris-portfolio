import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import "./spring-dango-sections.css";

const BRAND_CAT_LOGO = "/creative/spring-dango-points/brand-cat-logo-cream.png";
const TILE_SIZE = 316.111;
const TAG_H = 47.391;
const DESIGN_H = 1456;

const STICKER_GIFS: Record<string, number> = {
  "11": 11,
  "15": 15,
  "13": 13,
  "2": 2,
};

const TILES = [
  { name: "11", x: 202, gif: STICKER_GIFS["11"] },
  { name: "15", x: 602.11, gif: STICKER_GIFS["15"] },
  { name: "13", x: 1002.22, gif: STICKER_GIFS["13"] },
  { name: "2", x: 1402.33, gif: STICKER_GIFS["2"] },
] as const;

const CAPTIONS = [
  { x: 202, y: 965, w: 315, text: "经典漫才梗" },
  { x: 203, y: 1003, w: 314, text: "颜艺级破防" },
  { x: 602, y: 965, w: 316, text: "反差萌热血" },
  { x: 602, y: 1002, w: 316, text: "中二起手式" },
  { x: 1003, y: 965, w: 316, text: "干物妹附体" },
  { x: 1003, y: 1002, w: 316, text: "鬼畜级抽搐" },
  { x: 1402, y: 965, w: 316, text: "破次元递送" },
  { x: 1402, y: 1000, w: 316, text: "糊脸式发钱" },
] as const;

function stickerSrc(n: number) {
  return `/creative/spring-dango-points/stickers/${n}.gif`;
}

export function SpringDangoDynamicFunSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="sd-s5">
      <div className="sd-s5__canvas" aria-label="动态趣味">
        <FigmaPlacement designHeight={DESIGN_H} x={70} y={70} w={1011} h={72}>
          <h2 className="sd-s5__title">Playful Sticker Animations</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={189} w={1112} h={144}>
          <p className="sd-s5__body">
            在部分动态表情包的设计上，我深度提取了日本 LINE
            榜单头部表情包的动态规律（如高频抽搐、身体的形变），以及日本用户在 ACG
            和手游语境下形成的视觉潜意识（如夸张透视、中二前摇）。通过将日本网民习惯的『吐槽与搞怪』进行夸张的物理外化，让平台的官方
            IP 彻底融入本土社交语境。
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1771} y={194} w={79.037} h={48.271}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND_CAT_LOGO}
            alt=""
            className="sd-s5__brand-logo"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={255} w={169} h={38}>
          <p className="sd-s5__credit sd-s5__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={301} w={169} h={38}>
          <p className="sd-s5__credit">UG INCENTIVE</p>
        </FigmaPlacement>

        {TILES.map((tile) => (
          <FigmaPlacement
            key={tile.name}
            designHeight={DESIGN_H}
            x={tile.x}
            y={624}
            w={TILE_SIZE}
            h={TILE_SIZE}
          >
            <div className="sd-s5__tile" data-tile={tile.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stickerSrc(tile.gif)}
                alt={`Sticker ${tile.name}`}
                className="sd-s5__tile-gif"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </FigmaPlacement>
        ))}

        {CAPTIONS.map((item) => (
          <FigmaPlacement
            key={`${item.x}-${item.y}`}
            designHeight={DESIGN_H}
            x={item.x}
            y={item.y}
            w={item.w}
            h={24}
          >
            <p className="sd-s5__caption">{item.text}</p>
          </FigmaPlacement>
        ))}

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1328.61} w={225.739} h={TAG_H}>
          <span className="sd-s5__tag sd-s5__tag--filled">
            <span className="sd-s5__tag-text">INcentive</span>
            <span className="sd-s5__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={306} y={1329} w={154} h={47}>
          <span className="sd-s5__tag sd-s5__tag--outline">
            <span className="sd-s5__tag-text sd-s5__tag-text--dark">NEKO</span>
            <span className="sd-s5__tag-text sd-s5__tag-text--dark">NEKO</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1640.54} y={1318} w={37.302} h={43.651}>
          <span className="sd-s5__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1679} y={1345} w={171} h={41}>
          <span className="sd-s5__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
