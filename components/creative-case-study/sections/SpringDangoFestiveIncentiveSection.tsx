import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";

import "./spring-dango-sections.css";

const BRAND_CAT_LOGO = "/creative/spring-dango-points/brand-cat-logo.png";
const TILE_SIZE = 316.111;
const TAG_H = 47.531;
const DESIGN_H = 1150;

const TILES = [
  { name: "1", x: 225 },
  { name: "2", x: 609.11 },
  { name: "4", x: 993.22 },
  { name: "5", x: 1377.33 },
] as const;

const BULLETS = [
  { x: 257.74, y: 804, text: "猫咪钻袋子的本能" },
  { x: 257, y: 842.57, text: "福袋文化" },
  { x: 257.74, y: 883.36, text: "结合拜年姿势" },
  { x: 645, y: 803, text: "强烈的透视空间感" },
  { x: 645, y: 842, text: "变戏法式动态" },
  { x: 1063, y: 804, text: "人偶服文化" },
  { x: 1063, y: 842, text: "春驹文化" },
  { x: 1427, y: 804, text: "日系热血指认动作" },
  { x: 1427, y: 840, text: "打破第四面墙" },
] as const;

function stickerSrc(n: string) {
  return `/creative/spring-dango-points/stickers/${n}.gif`;
}

export function SpringDangoFestiveIncentiveSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="sd-s3">
      <div className="sd-s3__canvas" aria-label="节庆激励视觉">
        <FigmaPlacement designHeight={DESIGN_H} x={70} y={70} w={524} h={59}>
          <h2 className="sd-s3__title">Horse Year &amp; Coins</h2>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={138} w={253} h={39}>
          <p className="sd-s3__subtitle">节庆激励视觉</p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={221} w={1032} h={135}>
          <p className="sd-s3__body">
            怎么把带有商业目的的“金币”、“红包”，塞进日本用户使用的聊天表情里而不显得突兀？本次的表情包将金币与新年场景进行了融合，并用了多种手法让金币自然和IP及新年场景进行融合，提升表情包趣味性。
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1770.88} y={117} w={79.037} h={48.271}>
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

        <FigmaPlacement
          designHeight={DESIGN_H}
          x={1685}
          y={180}
          w={164.881}
          h={38.372}
        >
          <p className="sd-s3__credit sd-s3__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement
          designHeight={DESIGN_H}
          x={1685}
          y={223.63}
          w={164.881}
          h={38.372}
        >
          <p className="sd-s3__credit">UG INCENTIVE</p>
        </FigmaPlacement>

        {TILES.map((tile) => (
          <FigmaPlacement
            key={tile.name}
            designHeight={DESIGN_H}
            x={tile.x}
            y={473}
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

        {BULLETS.map((item) => (
          <FigmaPlacement key={`${item.x}-${item.y}`} designHeight={DESIGN_H} x={item.x} y={item.y}>
            <ul className="sd-s3__bullet">
              <li>{item.text}</li>
            </ul>
          </FigmaPlacement>
        ))}

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1024.61} w={225.739} h={TAG_H}>
          <span className="sd-s3__tag sd-s3__tag--filled">
            <span className="sd-s3__tag-text">INcentive</span>
            <span className="sd-s3__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={305.72} y={1024.61} w={168.785} h={TAG_H}>
          <span className="sd-s3__tag sd-s3__tag--outline">
            <span className="sd-s3__tag-text sd-s3__tag-text--dark">NEKO</span>
            <span className="sd-s3__tag-text sd-s3__tag-text--dark">NEKO～</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1670.55} y={1012} w={37.302} h={43.651}>
          <span className="sd-s3__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1708.38} y={1031.4} w={141.624} h={48.501}>
          <span className="sd-s3__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
