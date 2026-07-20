#!/usr/bin/env node
/**
 * Export Manekineko Meme sections from Figma MCP download_assets.
 *
 * IMPORTANT: Do NOT use get_screenshot — it returns ~1024px previews that blur
 * when upscaled. Use Figma MCP download_assets with defaultScale: 2 instead.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/manekineko-meme/sections";

/** Native 2× Figma exports (~3840px wide). Refresh URLs via MCP when expired. */
const ASSETS = {
  hero: {
    // node 20:9630 — 01 个人AIGC设计流程沉淀
    url: "https://www.figma.com/api/mcp/asset/e918be97-821e-4ccd-9ff1-b293ffb1753f",
    quality: 94,
    textHeavy: true,
  },
  "section-1-ip-aigc-workflow": {
    // node 20:9277 — 1.1 IP-AIGC 设计视觉流程
    url: "https://www.figma.com/api/mcp/asset/9df6ebe6-fd8e-410b-b71d-845eda5647f3",
    quality: 92,
    textHeavy: true,
  },
  "section-2-aigc-visual-workflow": {
    // node 20:9515 — 1.2 AIGC 设计视觉流程
    url: "https://www.figma.com/api/mcp/asset/d6537e4e-2a79-4261-be07-dee417185c7e",
    quality: 92,
    textHeavy: true,
  },
  "section-3-chapter-business": {
    // node 20:9708 — 02 业务AIGC量产流程
    url: "https://www.figma.com/api/mcp/asset/11fc436a-8601-4290-ade9-6679eb5f05f6",
    quality: 94,
    textHeavy: true,
  },
  "section-4-single-gameplay-visual": {
    // node 20:9716 — 2.1 单玩法全流程主视觉+延展
    url: "https://www.figma.com/api/mcp/asset/c9cc5e63-4f38-440c-98be-9d00a3b92311",
    quality: 92,
    textHeavy: false,
  },
  "section-5-batch-aigc-production": {
    // node 22:4074 — 2.2 单触点批量AIGC素材生产
    url: "https://www.figma.com/api/mcp/asset/811c7d25-0a59-43ee-b867-0f92b9e79392",
    quality: 90,
    textHeavy: false,
  },
  "section-6-chapter-platform": {
    // node 20:9712 — 03 平台AIGC赋能流程
    url: "https://www.figma.com/api/mcp/asset/1065f482-2c2d-411a-a1fd-c0e0f4f91db1",
    quality: 94,
    textHeavy: true,
  },
  "section-7-ai-agent-platform": {
    // node 22:2590 — 3.1 AI AGENT平台搭建
    url: "https://www.figma.com/api/mcp/asset/fb93dcc7-f935-4d74-84a3-c79d577ce33b",
    quality: 90,
    textHeavy: false,
  },
};

async function toWebp(buf, quality, textHeavy) {
  let pipeline = sharp(buf).ensureAlpha();
  if (textHeavy) {
    pipeline = pipeline.sharpen({ sigma: 0.3, m1: 0.5, m2: 0.25 });
  }
  return pipeline
    .webp({
      quality,
      effort: 6,
      smartSubsample: false,
      nearLossless: textHeavy,
    })
    .toBuffer();
}

await mkdir(OUT, { recursive: true });
await mkdir("public/creative/manekineko-meme", { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  const out =
    name === "hero"
      ? "public/creative/manekineko-meme/hero.webp"
      : `${OUT}/${name}.webp`;

  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);

  const meta = await sharp(webp).metadata();
  console.log(
    `✓ ${out} — ${meta.width}×${meta.height}, ${(webp.length / 1024).toFixed(0)} KB`,
  );
}
