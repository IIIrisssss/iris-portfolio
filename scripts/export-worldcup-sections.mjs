#!/usr/bin/env node
/**
 * Export World Cup section assets from Figma MCP screenshots.
 * Uses contentsOnly screenshots (transparent PNG) — never download_assets
 * which bakes in Figma's gray (#565656) matte.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/worldcup-campaign/sections";

const ASSETS = {
  "section-1-illustration": {
    url: "https://www.figma.com/api/mcp/asset/8a562203-fba0-48e8-8d8b-05c19855ba8c",
    targetW: 1672,
    quality: 90,
  },
  "section-3-color-showcase": {
    url: "https://www.figma.com/api/mcp/asset/63d35df9-afec-42e8-9994-f06d2607757c",
    targetW: 3040,
    quality: 90,
  },
  "bg-dot-mesh": {
    url: "https://www.figma.com/api/mcp/asset/b0967eb6-b3a0-4e18-9cc5-9facb0d7b411",
    targetW: 1920,
    quality: 92,
  },
  "divider-line": {
    url: "https://www.figma.com/api/mcp/asset/de5c31ea-a78e-4a41-b522-427afbd53c50",
    quality: 95,
  },
  "tiktok-logo-pill": {
    url: "https://www.figma.com/api/mcp/asset/0b203f0e-38ee-4270-bdcf-dc1cf410e307",
    quality: 95,
  },
  "icon-arrow-circle": {
    url: "https://www.figma.com/api/mcp/asset/831d4381-4e4b-42cd-8c26-592ffe5bb983",
    quality: 95,
  },
  "icon-aigc": {
    url: "https://www.figma.com/api/mcp/asset/59a759c0-86bf-42d7-ae37-100a76ad5939",
    quality: 95,
  },
  "section-4-visual-page-design": {
    url: "https://www.figma.com/api/mcp/asset/3cd95d83-2932-4bbc-a378-a9daec5fe28a",
    targetW: 3840,
    quality: 88,
  },
  "section-5-gameplay-screens": {
    url: "https://www.figma.com/api/mcp/asset/5a4998e9-3988-41b2-80a6-d044ce2deec5",
    targetW: 3840,
    quality: 88,
  },
  "section-6-share-flow": {
    url: "https://www.figma.com/api/mcp/asset/871fcb01-ce03-4993-8257-ea48ef2af20a",
    targetW: 3840,
    quality: 88,
  },
  "section-7-feed-banners": {
    url: "https://www.figma.com/api/mcp/asset/fc17348b-216f-4c6a-9350-e6241b3a4e86",
    targetW: 3840,
    quality: 88,
  },
  "section-8-project-footer": {
    url: "https://www.figma.com/api/mcp/asset/20aff82d-af3e-4e2b-966c-1e7b35bc4cbd",
    targetW: 3840,
    quality: 88,
  },
};

/** Remove Figma gray matte (#565656) and near-white from icon exports. */
async function stripMatte(buf) {
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isGrayMatte =
      Math.abs(r - 86) < 8 && Math.abs(g - 86) < 8 && Math.abs(b - 86) < 8;
    const isNearWhite = r > 245 && g > 245 && b > 245;
    if (isGrayMatte || isNearWhite) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

/** Extract dot mesh overlay: white pixels → transparent, keep colored mesh lines. */
async function extractMeshOverlay(buf, targetW) {
  const { data, info } = await sharp(buf)
    .resize({ width: targetW })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isWhiteish = r > 246 && g > 246 && b > 246;
    const isGrayMatte =
      Math.abs(r - 86) < 8 && Math.abs(g - 86) < 8 && Math.abs(b - 86) < 8;
    if (isWhiteish || isGrayMatte) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

await mkdir(OUT, { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  let input = Buffer.from(await res.arrayBuffer());
  let pipeline;

  if (cfg.flattenWhite) {
    pipeline = await extractMeshOverlay(input, cfg.targetW);
  } else if (
    name.startsWith("icon-") ||
    name === "tiktok-logo-pill" ||
    name === "divider-line"
  ) {
    pipeline = await stripMatte(await sharp(input).ensureAlpha().toBuffer());
  } else {
    pipeline = sharp(input).ensureAlpha();
    if (cfg.targetW) {
      pipeline = pipeline.resize({ width: cfg.targetW, withoutEnlargement: false });
    }
  }

  const out = `${OUT}/${name}.webp`;
  await pipeline.webp({ quality: cfg.quality, effort: 6 }).toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${name}: ${meta.width}x${meta.height}`);
}

console.log("Done — all assets exported without gray matte.");
