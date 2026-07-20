import { FigmaPlacement } from "../FigmaPlacement";
import { ScaledCanvas } from "../ScaledCanvas";
import { WeChatPhoneModule } from "./wechat-phone/WeChatPhoneModule";

import "./spring-dango-sections.css";

const BG_MASK = "/creative/spring-dango-points/sections/bg-mask.png";
const CAT_ART = "/creative/spring-dango-points/sections/cat-art.webp";
const BRAND_CAT_LOGO = "/creative/spring-dango-points/brand-cat-logo.svg";
const SWIPE_ARROW = "/creative/spring-dango-points/sections/swipe-arrow.webp";

const DESIGN_H = 1824;
const TAG_H = 47.391;

export function SpringDangoManekinekoSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="sd-s2">
      <div className="sd-s2__canvas" aria-label="Manekineko sticker pack showcase">
        <FigmaPlacement designHeight={DESIGN_H} x={0} y={418} w={1449} h={1406}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BG_MASK}
            alt=""
            className="sd-s2__bg-mask"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement
          designHeight={DESIGN_H}
          className="sd-s2__phone-layer"
          x={672}
          y={246}
          w={584.268}
          h={1282.027}
        >
          <WeChatPhoneModule variant="embedded" />
        </FigmaPlacement>

        <FigmaPlacement
          designHeight={DESIGN_H}
          className="sd-s2__cat-layer"
          x={1078.33}
          y={1062.85}
          w={505.805}
          h={505.805}
        >
          <div className="sd-s2__cat-frame" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CAT_ART}
              alt=""
              className="sd-s2__cat-art"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={73} y={70}>
          <p className="sd-s2__heading sd-s2__heading--lg">JP PRO - IP</p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={159} w={380}>
          <p className="sd-s2__heading sd-s2__heading--md">Manekineko</p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={219} w={380.513}>
          <p className="sd-s2__description">
            Boost your luck with a Maneki Neko! It&apos;s especially famous as a symbol of
            financial wealth and business success!
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1771} y={174} w={79.037} h={48.271}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND_CAT_LOGO}
            alt=""
            className="sd-s2__brand-logo"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={235} w={169} h={38}>
          <p className="sd-s2__credit sd-s2__credit--by">
            DESIGN BY
            <br />
            YAN
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1681} y={281} w={169} h={38}>
          <p className="sd-s2__credit">UG INCENTIVE</p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1288.49} y={610.29} w={43.435} h={23.216}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SWIPE_ARROW}
            alt=""
            className="sd-s2__swipe-arrow"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1288} y={681} w={457} h={116}>
          <p className="sd-s2__swipe-en">
            Swipe for
            <br />
            more stickers
          </p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1288} y={812} w={383} h={39}>
          <p className="sd-s2__swipe-zh">滑动屏幕查看更多表情包</p>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1288.49} y={902.52} w={43.435} h={23.216}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SWIPE_ARROW}
            alt=""
            className="sd-s2__swipe-arrow sd-s2__swipe-arrow--down"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={70} y={1696.61} w={225.739} h={TAG_H}>
          <span className="sd-s2__tag sd-s2__tag--filled">
            <span className="sd-s2__tag-text">INcentive</span>
            <span className="sd-s2__tag-text">Design</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={306} y={1697} w={154} h={47}>
          <span className="sd-s2__tag sd-s2__tag--outline">
            <span className="sd-s2__tag-text sd-s2__tag-text--dark">NEKO</span>
            <span className="sd-s2__tag-text sd-s2__tag-text--dark">NEKO</span>
          </span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1640.54} y={1686} w={37.302} h={43.651}>
          <span className="sd-s2__year-hash">#</span>
        </FigmaPlacement>

        <FigmaPlacement designHeight={DESIGN_H} x={1679} y={1713} w={171} h={41}>
          <span className="sd-s2__year">2026</span>
        </FigmaPlacement>
      </div>
    </ScaledCanvas>
  );
}
