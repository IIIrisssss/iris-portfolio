import { FigmaPlacement } from "../FigmaPlacement";
import { MoreWorkImageMotion } from "../motion/MoreWorkImageMotion";
import { ScrollRevealMask } from "../motion/ScrollRevealMask";
import { ScaledCanvas } from "../ScaledCanvas";

const ILLUSTRATION =
  "/creative/worldcup-campaign/sections/section-1-illustration.webp";

const DESIGN_H = 980;

export function WorldcupContextSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="wc-s1">
      <FigmaPlacement designHeight={DESIGN_H} x={78} y={99.98} w={21.512} h={21.512}>
        <span className="wc-s1__bullet" aria-hidden="true" />
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={118.87} y={86} w={205.44} h={48}>
        <ScrollRevealMask>
          <h2 className="wc-s1__heading">项目背景：</h2>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={118.69} y={144.38} w={713.849}>
        <div data-wc-stagger>
          <p className="wc-s1__body" data-wc-stagger-item>
            针对 TikTok/TikTok Lite日本市场，借势世界杯热点激活用户增长。项目通过对6大核心增长玩法及宣发全链路进行世界杯主题视觉换肤，旨在打破存量用户感知麻木，驱动拉新促活。
          </p>
        </div>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={78} y={392.78} w={21.512} h={21.512}>
        <span className="wc-s1__bullet" aria-hidden="true" />
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={118.87} y={378.79} w={205.44} h={48}>
        <ScrollRevealMask delay={0.06}>
          <h2 className="wc-s1__heading">团队分工：</h2>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={119} y={445} w={733}>
        <div className="wc-s1__body wc-s1__body--roles" data-wc-stagger>
          <p data-wc-stagger-item>
            <strong>主视觉设计（1名）</strong>
            ：负责世界杯主题基调奠定 / 2大主推增长玩法 / 2大高频裂变玩法共建
            / 推广KV设计
          </p>
          <p data-wc-stagger-item>
            <strong>核心视觉设计（1名）：</strong>
          </p>
          <p data-wc-stagger-item>【独立主导】 3大核心增长玩法视觉设计</p>
          <p data-wc-stagger-item>【核心共建】 2大高频裂变玩法设计（50%）</p>
          <p data-wc-stagger-item>【效率延展】 全渠道推广物料系统化延展</p>
          <p data-wc-stagger-item>
            <strong>协同团队：</strong>产研与动效团队（PM/PO/RD/Motion）
          </p>
        </div>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={975} y={183} w={836.317}>
        <MoreWorkImageMotion data-wc-parallax="fg" scrollEntrance>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ILLUSTRATION}
            alt=""
            className="wc-s1__art-image"
            loading="lazy"
            decoding="async"
          />
        </MoreWorkImageMotion>
      </FigmaPlacement>
    </ScaledCanvas>
  );
}
