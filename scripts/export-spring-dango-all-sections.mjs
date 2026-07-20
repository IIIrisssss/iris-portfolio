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
    // Figma brGxpK5JpT9huzR3Bbylht node 29:22154
    url: "https://www.figma.com/api/mcp/asset/e0894493-b1e6-40a3-8ef8-4499f896a66b",
    out: HERO_OUT,
    quality: 94,
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
    // Figma brGxpK5JpT9huzR3Bbylht node 36:47057 (2× PNG export)
    url: "https://www.figma.com/api/mcp/asset/c5d2d696-4e6c-454a-b3aa-425e46cd1581",
    quality: 92,
    textHeavy: true,
  },
  "section-6-summary": {
    // Figma brGxpK5JpT9huzR3Bbylht node 41:49886
    url: "https://www.figma.com/api/mcp/asset/9446c74a-ff00-48a1-baa3-728219bf2ded",
    quality: 90,
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
