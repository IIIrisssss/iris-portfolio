#!/usr/bin/env node
/**
 * Export Mava Social Media sections from Figma MCP download_assets.
 *
 * IMPORTANT: Do NOT use get_screenshot — it returns ~1024px previews that blur
 * when upscaled. Use Figma MCP download_assets with defaultScale: 2 instead.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/mava-social-media/sections";

/** Native 2× Figma exports (~3840px wide). Refresh URLs via MCP when expired. */
const ASSETS = {
  hero: {
    url: "https://www.figma.com/api/mcp/asset/bc8c58ec-c4ed-41b9-90d7-727063415b48",
    quality: 94,
    textHeavy: true,
  },
  "section-1-preliminary-analysis": {
    url: "https://www.figma.com/api/mcp/asset/3d168535-9a05-4097-9982-c3f1480128a4",
    quality: 94,
    textHeavy: true,
  },
  "section-2-visual-strategy": {
    url: "https://www.figma.com/api/mcp/asset/86dab9e8-b0e7-4459-ba79-59e3dfb35b52",
    quality: 92,
    textHeavy: true,
  },
  "section-3-aigc-process": {
    url: "https://www.figma.com/api/mcp/asset/d3f7ffc5-27b2-40d9-83c3-186e90030ca9",
    quality: 94,
    textHeavy: true,
  },
  "section-4-visual-presentation": {
    url: "https://www.figma.com/api/mcp/asset/8715df92-8169-4492-8c9e-8259123c9820",
    quality: 90,
    textHeavy: false,
  },
  "section-5-video-strategy": {
    url: "https://www.figma.com/api/mcp/asset/f51a1e4b-055e-4672-98b3-30f8cc9c6085",
    quality: 88,
    textHeavy: true,
  },
  "section-6-video-design": {
    url: "https://www.figma.com/api/mcp/asset/f6541c1a-8f08-4582-a067-ef94df70622a",
    quality: 94,
    textHeavy: true,
  },
  "section-7-project-summary": {
    url: "https://www.figma.com/api/mcp/asset/e0f0a81e-d4f0-44ab-b576-4a085e478a7e",
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
await mkdir("public/creative/mava-social-media", { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  const out =
    name === "hero"
      ? "public/creative/mava-social-media/hero.webp"
      : `${OUT}/${name}.webp`;

  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);

  const meta = await sharp(out).metadata();
  const { size } = await import("fs/promises").then((fs) => fs.stat(out));
  console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
}

console.log("Done — native 2× Figma exports converted to WebP.");
