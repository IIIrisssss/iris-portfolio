import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import "./spring-dango-sections.css";

const BRAND_CAT_LOGO = "/creative/spring-dango-points/brand-cat-logo-cream.png";
const TILE_SIZE = 316.111;
const TAG_H = 47.391;
const DESIGN_H = 1440;

/** Sticker GIFs keep original assets; tile frames follow Figma 4/2/1/5 stagger layout. */
const TILES = [
  { name: "1", x: 202, y: 634 },
  { name: "2", x: 602.11, y: 543 },
  { name: "4", x: 1002.22, y: 634 },
  { name: "5", x: 1402.33, y: 543 },
] as const;

const CAPTIONS = [
  { x: 202, y: 975, w: 316, text: "猫咪钻袋子的本能" },
  { x: 202, y: 1013, w: 316, text: "福袋文化" },
  { x: 202, y: 1051, w: 316, text: "结合拜年姿势" },
  { x: 602, y: 884, w: 316, text: "强烈的透视空间感" },
  { x: 602, y: 923, w: 316, text: "变戏法式动态" },
  { x: 1002, y: 975, w: 314, text: "人偶服文化" },
  { x: 1002, y: 1014, w: 314, text: "春驹文化" },
  { x: 1402, y: 884, w: 314, text: "日系热血指认动作" },
  { x: 1402, y: 923, w: 314, text: "打破第四面墙" },
] as const;

function stickerSrc(n: string) {
  return `/creative/spring-dango-points/stickers/${n}.gif`;
}

export function SpringDangoFestiveIncentiveSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="sd-s3">
      <div className="sd-s3__canvas" aria-label="节庆激励视觉">
        <FigmaPlacement designHeight={DESIGN_H} x={70} y={70} w={598} h={72}>
          <h2 className="sd-s3__title">Year of the Horse &amp; Coins</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={189} w={1032} h={108}>
          <p className="sd-s3__body">
            怎么把带有商业目的的“金币”、“红包”，塞进日本用户使用的聊天表情里而不显得突兀？本次的表情包将金币与新年场景进行了融合，并用了多种手法让金币自然和IP及新年场景进行融合，提升表情包趣味性。
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1771} y={194} w={79.037} h={48.271}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND_CAT_LOGO}
            alt=""
            className="sd-s3__brand-logo"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={255} w={169} h={38}>
          <p className="sd-s3__credit sd-s3__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={301} w={169} h={38}>
          <p className="sd-s3__credit">UG INCENTIVE</p>
        </FigmaPlacement>

        {TILES.map((tile) => (
          <FigmaPlacement
            key={tile.name}
            designHeight={DESIGN_H}
            x={tile.x}
            y={tile.y}
            w={TILE_SIZE}
            h={TILE_SIZE}
          >
            <div className="sd-s3__tile" data-tile={tile.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stickerSrc(tile.name)}
                alt={`Sticker ${tile.name}`}
                className="sd-s3__tile-gif"
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
            h={25}
          >
            <p className="sd-s3__caption">{item.text}</p>
          </FigmaPlacement>
        ))}

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1312.61} w={225.739} h={TAG_H}>
          <span className="sd-s3__tag sd-s3__tag--filled">
            <span className="sd-s3__tag-text">Incentive</span>
            <span className="sd-s3__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={306} y={1313} w={154} h={47}>
          <span className="sd-s3__tag sd-s3__tag--outline">
            <span className="sd-s3__tag-text sd-s3__tag-text--dark">NEKO</span>
            <span className="sd-s3__tag-text sd-s3__tag-text--dark">NEKO</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1640.54} y={1302} w={37.302} h={43.651}>
          <span className="sd-s3__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1679} y={1329} w={171} h={41}>
          <span className="sd-s3__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
