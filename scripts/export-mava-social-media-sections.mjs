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
    // node 1:19280
    url: "https://www.figma.com/api/mcp/asset/b552e5ac-61f4-4283-bdbb-6de5f58e0b54",
    quality: 94,
    textHeavy: true,
  },
  "section-1-preliminary-analysis": {
    // node 19:3202
    url: "https://www.figma.com/api/mcp/asset/fd28ea31-2bd5-4821-954d-cfc98f18cc24",
    quality: 94,
    textHeavy: true,
  },
  "section-2-visual-strategy": {
    // node 1:19049
    url: "https://www.figma.com/api/mcp/asset/ecd2603d-030c-4d6a-8674-daea4666db74",
    quality: 92,
    textHeavy: true,
  },
  "section-3-aigc-process": {
    // node 20:764
    url: "https://www.figma.com/api/mcp/asset/ef829edf-c7bd-4c5c-ac07-64e3583441b4",
    quality: 94,
    textHeavy: true,
  },
  "section-4-visual-presentation": {
    // node 1:19323
    url: "https://www.figma.com/api/mcp/asset/367bbd23-0fc2-48eb-b17d-fdee810cc804",
    quality: 90,
    textHeavy: false,
  },
  "section-5-video-strategy": {
    // node 20:8993
    url: "https://www.figma.com/api/mcp/asset/325bb428-0c79-497e-860b-b1ba142ef553",
    quality: 88,
    textHeavy: true,
  },
  "section-5-storyboard-design": {
    // node 20:9091
    url: "https://www.figma.com/api/mcp/asset/32decb17-fb48-474e-8ba5-bc8e646be718",
    quality: 88,
    textHeavy: false,
  },
  "section-6-video-design": {
    // node 20:8655 — post-process to erase 视频位置 rect before WebP
    url: "https://www.figma.com/api/mcp/asset/a148f552-d5e9-4c7e-8d37-9742c1196a0b",
    quality: 94,
    textHeavy: true,
    eraseVideoPlaceholder: true,
  },
  "section-7-project-summary": {
    // node 20:734
    url: "https://www.figma.com/api/mcp/asset/2d8e8480-c6b0-4dc9-b005-067e92d41bfe",
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

async function prepareInput(name, cfg, input) {
  if (!cfg.eraseVideoPlaceholder) return input;

  const meta = await sharp(input).metadata();
  const scale = meta.width / 1920;
  const vx = Math.round(297 * scale);
  const vy = Math.round(355 * scale);
  const vw = Math.round(1325 * scale);
  const vh = Math.round(745.3125 * scale);
  const hole = Buffer.from(
    `<svg width="${vw}" height="${vh}"><rect width="100%" height="100%" fill="#94e1ff"/></svg>`,
  );

  return sharp(input)
    .composite([{ input: hole, left: vx, top: vy }])
    .png()
    .toBuffer();
}

await mkdir(OUT, { recursive: true });
await mkdir("public/creative/mava-social-media", { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const fetched = Buffer.from(await res.arrayBuffer());
  const input = await prepareInput(name, cfg, fetched);

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
