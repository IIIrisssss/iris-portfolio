#!/usr/bin/env node
/**
 * Export Spring Dango full-page sections from Figma MCP download_assets (2× PNG → WebP).
 * Refresh URLs via MCP when expired. Do NOT use get_screenshot.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const SECTIONS_OUT = "public/creative/spring-dango-points/sections";
const HERO_OUT = "public/creative/spring-dango-points/hero.webp";

/** Native 2× Figma frame exports */
const PAGE_SECTIONS = {
  hero: {
    url: "https://www.figma.com/api/mcp/asset/50926938-eb05-41f7-a878-b69f6947bfb2",
    out: HERO_OUT,
    quality: 92,
    textHeavy: true,
  },
  "section-1-creative-thinking": {
    url: "https://www.figma.com/api/mcp/asset/24ad63ed-e81f-41ee-a3f3-66a036df69ef",
    quality: 94,
    textHeavy: true,
  },
  "section-2-festive-incentive": {
    url: "https://www.figma.com/api/mcp/asset/aff307bb-b0df-413c-86a0-fadaa23f83a0",
    quality: 90,
    textHeavy: false,
  },
  "section-3-localized-design": {
    url: "https://www.figma.com/api/mcp/asset/472edf19-269a-4be0-90a8-d771f926b302",
    quality: 88,
    textHeavy: false,
  },
  "section-4-dynamic-fun": {
    url: "https://www.figma.com/api/mcp/asset/2f550bf4-c66e-4434-9fab-44acc5edf2d7",
    quality: 92,
    textHeavy: true,
  },
  "section-5-sticker-showcase": {
    url: "https://www.figma.com/api/mcp/asset/031551e2-ba67-45f1-a83c-60be91911bed",
    quality: 92,
    textHeavy: true,
  },
  "section-6-summary": {
    url: "https://www.figma.com/api/mcp/asset/6df91d22-8144-47f5-bab9-dedda910ec0d",
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

await mkdir(SECTIONS_OUT, { recursive: true });
await mkdir("public/creative/spring-dango-points", { recursive: true });

for (const [name, cfg] of Object.entries(PAGE_SECTIONS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  const out = cfg.out ?? `${SECTIONS_OUT}/${name}.webp`;
  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);

  const meta = await sharp(out).metadata();
  const { size } = await import("fs/promises").then((fs) => fs.stat(out));
  console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
}

console.log("Done — Spring Dango page sections exported.");
