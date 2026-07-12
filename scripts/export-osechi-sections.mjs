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
    url: "https://www.figma.com/api/mcp/asset/23ad8682-13db-4031-b56a-307a1910be0b",
    quality: 94,
    textHeavy: true,
  },
  "section-1-ranking": {
    url: "https://www.figma.com/api/mcp/asset/03531a6b-484d-45f1-bdd3-5dea5c367f55",
    quality: 90,
    textHeavy: false,
  },
  "section-2-wish-card": {
    url: "https://www.figma.com/api/mcp/asset/bc97e3d8-b348-4df7-be52-33378442e3f8",
    quality: 90,
    textHeavy: false,
  },
  "section-3-gameplay": {
    url: "https://www.figma.com/api/mcp/asset/0789e905-f5fe-42b4-95d2-00e45355c4be",
    quality: 90,
    textHeavy: false,
  },
  "section-4-manekineko-evolution": {
    url: "https://www.figma.com/api/mcp/asset/661c7816-9e15-4045-be11-5bd2b81f389e",
    quality: 92,
    textHeavy: false,
  },
  "section-5-click-battle": {
    url: "https://www.figma.com/api/mcp/asset/530f28bf-8822-4648-86ca-41979e387ce2",
    quality: 90,
    textHeavy: false,
  },
  "section-6-manekineko-popup": {
    url: "https://www.figma.com/api/mcp/asset/bdcb645e-7415-4a60-83ea-11004dd28600",
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
