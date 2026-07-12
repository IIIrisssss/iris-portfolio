#!/usr/bin/env node
/**
 * Export Early Creations (MAVA) sections from Figma MCP download_assets.
 *
 * IMPORTANT: Do NOT use get_screenshot — it returns ~1024px previews that blur
 * when upscaled. Use Figma MCP download_assets with defaultScale: 2 instead:
 *   download_assets({ fileKey, nodeId, defaultFormat: "png", defaultScale: 2 })
 * Then paste the export.url values below and run this script.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/early-creations/sections";

/** Native 2× Figma exports (~3840px wide). Refresh URLs via MCP when expired. */
const ASSETS = {
  hero: {
    url: "https://www.figma.com/api/mcp/asset/87308da8-0862-4229-8afa-33f5910ea60a",
    quality: 94,
    textHeavy: true,
  },
  "section-1-analysis": {
    url: "https://www.figma.com/api/mcp/asset/81082dd0-a6e7-4cf8-a785-19881be17f54",
    quality: 94,
    textHeavy: true,
  },
  "section-2-visual-strategy": {
    url: "https://www.figma.com/api/mcp/asset/51a4575b-6b91-495a-b946-4b24fc5a2014",
    quality: 94,
    textHeavy: true,
  },
  "section-3-color-layout": {
    url: "https://www.figma.com/api/mcp/asset/d15972ca-f52b-4d53-ae45-30dde093dee6",
    quality: 92,
    textHeavy: true,
  },
  "section-4-rednote-design": {
    url: "https://www.figma.com/api/mcp/asset/e288c723-8e7f-4871-9509-9bc991229414",
    quality: 90,
    textHeavy: false,
  },
  "section-5-official-account": {
    url: "https://www.figma.com/api/mcp/asset/0ada9e9c-fd94-4290-83e0-59f3b2c9cc50",
    quality: 90,
    textHeavy: false,
  },
  "section-6-project-feedback": {
    url: "https://www.figma.com/api/mcp/asset/69cb1633-ef57-465d-aa09-76b256cc54e0",
    quality: 92,
    textHeavy: true,
  },
  "section-7-project-summary": {
    url: "https://www.figma.com/api/mcp/asset/efb7355f-c4de-47b8-bb8c-1e2eed34cd74",
    quality: 94,
    textHeavy: true,
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
await mkdir("public/creative/early-creations", { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  const out =
    name === "hero"
      ? "public/creative/early-creations/hero.webp"
      : `${OUT}/${name}.webp`;

  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);

  const meta = await sharp(out).metadata();
  const { size } = await import("fs/promises").then((fs) => fs.stat(out));
  console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
}

console.log("Done — native 2× Figma exports converted to WebP.");
