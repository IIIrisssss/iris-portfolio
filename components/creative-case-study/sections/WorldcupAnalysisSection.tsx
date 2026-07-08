import { FigmaPlacement } from "../FigmaPlacement";
import { ScrollRevealMask } from "../motion/ScrollRevealMask";
import { ScaledCanvas } from "../ScaledCanvas";

const BG_MESH = "/creative/worldcup-campaign/sections/bg-dot-mesh.webp";
const DIVIDER = "/creative/worldcup-campaign/sections/divider-line.webp";
const TIKTOK_PILL = "/creative/worldcup-campaign/sections/tiktok-logo-pill.webp";
const ICON_ARROW =
  "/creative/worldcup-campaign/sections/icon-arrow-circle.webp";
const ICON_AIGC = "/creative/worldcup-campaign/sections/icon-aigc.webp";

const DESIGN_H = 1082;

export function WorldcupAnalysisSection() {
  return (
    <ScaledCanvas designHeight={DESIGN_H} className="wc-s2">
      <div
        className="wc-s2__bg"
        data-wc-parallax="mesh"
        style={{ backgroundImage: `url(${BG_MESH})` }}
        aria-hidden="true"
      />

      <FigmaPlacement designHeight={DESIGN_H} x={60} y={60}>
        <span className="wc-pill wc-pill--outline" data-wc-stagger-item>
          # PRELIMINARY WORK ANALYSIS
        </span>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={1586} y={60}>
        <span className="wc-pill wc-pill--outline" data-wc-stagger-item>
          1 · 前期工作分析
        </span>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={60} y={177} w={530} h={52}>
        <ScrollRevealMask>
          <h2 className="wc-s2__title">1.1 背景补充</h2>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={60} y={233} w={492} h={44}>
        <ScrollRevealMask delay={0.05}>
          <p className="wc-s2__subtitle">Background Supplement</p>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={61} y={295} w={687}>
        <p className="wc-s2__body" data-wc-stagger-item>
          TikTokb布局少量轻量激励玩法，TikTok
          Lite则聚焦海外‘网赚爆破’，作为核心增长引擎，具备更多样的玩法。它通过现金直兑的强诱因，驱动用户邀请多名新用户及召回流失用户以解锁巨额积分。
        </p>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={59} y={539} w={530} h={52}>
        <ScrollRevealMask>
          <h2 className="wc-s2__title">1.2 项目目标</h2>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={60} y={595} w={375} h={44}>
        <ScrollRevealMask delay={0.05}>
          <p className="wc-s2__subtitle">Project Objectives</p>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={60} y={662} w={702}>
        <p className="wc-s2__body" data-wc-stagger-item>
          本次项目为 TikTok
          矩阵面向全球市场的“世界杯”周期性 S
          级增长战役。针对日本市场，业务侧精准圈定了高 ROI
          的核心激励玩法进行主题换肤。旨在借势现象级体育热点，通过强诱因任务，低成本、高效率地拉动日区大盘的DNU与DRU。
        </p>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={834} y={145} w={11} h={747}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DIVIDER}
          alt=""
          className="wc-s2__divider-image"
          loading="lazy"
          decoding="async"
        />
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={926} y={177} w={351} h={52}>
        <ScrollRevealMask>
          <h2 className="wc-s2__title">1.3 现存问题和难点</h2>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={926} y={238} w={676} h={44}>
        <ScrollRevealMask delay={0.05}>
          <p className="wc-s2__subtitle">Existing Problems and Difficulties</p>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={922} y={320} w={820} h={49}>
        <ScrollRevealMask delay={0.08}>
          <p className="wc-s2__challenge-title">
            跨文化情绪翻译：将“世界杯狂欢”重塑为日式高能视觉
          </p>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={922} y={397} w={938}>
        <p className="wc-s2__body" data-wc-stagger-item>
          面对世界杯狂热氛围与日本“低饱和”审美的冲突，我制定了“强色彩+高亲和力IP”策略。以明艳蓝底与动感涂鸦拉升赛事张力，同时将官方IP重塑为“大头短身”比例辅以热血动作+夸张表情，将生硬的体育竞技巧妙转化为本土熟悉的“热血二次元”语境，中和了高饱和色彩带来的视觉排斥。
        </p>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={922} y={626} w={757} h={49}>
        <ScrollRevealMask delay={0.08}>
          <p className="wc-s2__challenge-title">
            合规约束破局：无官方授权下的“泛赛事”氛围重塑
          </p>
        </ScrollRevealMask>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={922} y={703} w={938}>
        <p className="wc-s2__body" data-wc-stagger-item>
          与美区获得 FIFA
          官方授权不同，日韩赛区处于非授权状态，面临极严苛的版权合规限制。需在完全剥离
          FIFA
          官方标志、特定名称等核心资产的极限条件下，通过深挖“泛足球文化”符号与本土
          IP
          元素的重组，烘托出极具临场感的世界杯狂欢氛围，实现“无授权但强感知”的视觉降维打击。
        </p>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={60} y={966}>
        <div className="wc-s2__tags" data-wc-stagger>
          <span className="wc-pill wc-pill--filled" data-wc-stagger-item>
            <span aria-hidden="true">🇯🇵</span> JP
          </span>
          <span className="wc-pill wc-pill--outline" data-wc-stagger-item>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ICON_ARROW}
              alt=""
              className="wc-pill__icon"
              loading="lazy"
              decoding="async"
            />
            PRO/MAIN
          </span>
          <span className="wc-pill wc-pill--outline" data-wc-stagger-item>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ICON_AIGC}
              alt=""
              className="wc-pill__icon wc-pill__icon--aigc"
              loading="lazy"
              decoding="async"
            />
            AIGC CREATIVE
          </span>
        </div>
      </FigmaPlacement>

      <FigmaPlacement designHeight={DESIGN_H} x={1735} y={967} w={124.644} h={55}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TIKTOK_PILL}
          alt=""
          className="wc-s2__brand-image"
          data-wc-parallax="fg"
          loading="lazy"
          decoding="async"
        />
      </FigmaPlacement>
    </ScaledCanvas>
  );
}
