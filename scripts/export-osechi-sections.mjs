#!/usr/bin/env node
/**
 * Export New Year Osechi sections from Figma MCP download_assets.
 *
 * IMPORTANT: Do NOT use get_screenshot — it returns ~1024px previews that blur
 * when upscaled. Use Figma MCP download_assets with defaultScale: 2 instead:
 *   download_assets({ fileKey, nodeId, defaultFormat: "png", defaultScale: 2 })
 * Then paste the export.url values below and run this script.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/new-year-osechi/sections";

/** Native 2× Figma exports (~3840px wide). Refresh URLs via MCP when expired. */
const ASSETS = {
  hero: {
    // node 1:8001 — 头图KV
    url: "https://www.figma.com/api/mcp/asset/cc3441bc-2ba8-4c0e-9142-1aa561c2b0ce",
    quality: 92,
    textHeavy: false,
  },
  "section-1-ranking": {
    // node 1:8025
    url: "https://www.figma.com/api/mcp/asset/cf334b9d-b40b-41d9-beb8-bd2f0a0d7f2a",
    quality: 90,
    textHeavy: false,
  },
  "section-2-wish-card": {
    // node 1:9091
    url: "https://www.figma.com/api/mcp/asset/eb815dd2-bf4e-4921-bf1a-39c9e4232b4c",
    quality: 90,
    textHeavy: false,
  },
  "section-3-gameplay": {
    // node 1:12869
    url: "https://www.figma.com/api/mcp/asset/3de35bd4-1c1c-4cf2-b9c0-fafef26b2c3b",
    quality: 90,
    textHeavy: false,
  },
  "section-4-manekineko-evolution": {
    // node 1:12416
    url: "https://www.figma.com/api/mcp/asset/d92a54f5-2240-434b-a25d-09383db76fd5",
    quality: 92,
    textHeavy: false,
  },
  "section-5-click-battle": {
    // node 1:12539
    url: "https://www.figma.com/api/mcp/asset/dd900696-2c20-47e9-b983-e79a265d3be2",
    quality: 90,
    textHeavy: false,
  },
  "section-6-manekineko-popup": {
    // node 1:12439
    url: "https://www.figma.com/api/mcp/asset/40c5754f-9f8f-4156-b3fa-208c3afad8a4",
    quality: 92,
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
await mkdir("public/creative/new-year-osechi", { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  const out =
    name === "hero"
      ? "public/creative/new-year-osechi/hero.webp"
      : `${OUT}/${name}.webp`;

  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);

  const meta = await sharp(out).metadata();
  const { size } = await import("fs/promises").then((fs) => fs.stat(out));
  console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
}

console.log("Done — native 2× Figma exports converted to WebP.");
