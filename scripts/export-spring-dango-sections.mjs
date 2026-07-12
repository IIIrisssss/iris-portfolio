#!/usr/bin/env node
/**
 * Export Spring Dango Manekineko section assets from Figma MCP download_assets.
 *
 * Figma node: 36:47441 (1920×1824)
 * - bg-mask: mask group 38:48337 at Figma coords (placed in component)
 * - cat-art: raw transparent image from 38:49003
 * - swipe-arrow: 38:48476 chevron
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/spring-dango-points/sections";

const FRAME_W = 1920;
const FRAME_H = 1824;
const MASK_X = -1063;
const MASK_Y = 418;
const MASK_EXPORT_W = 1449;
const MASK_EXPORT_H = 1406;
const CAT_NODE_SIZE = 505.805;
const ARROW_NODE_W = 43.435;
const ARROW_NODE_H = 23.216;
const EXPORT_SCALE = 2;

/** Refresh URLs via MCP download_assets when expired. */
const ASSETS = {
  "bg-mask": {
    url: "https://www.figma.com/api/mcp/asset/6ec19603-efd9-448e-a855-397618e10fd5",
    quality: 92,
    transparentMask: true,
  },
  "cat-art": {
    url: "https://www.figma.com/api/mcp/asset/12fff1e6-0d2d-4177-addb-3281a553fba8",
    quality: 92,
    transparentCat: true,
  },
  "swipe-arrow": {
    url: "https://www.figma.com/api/mcp/asset/b30e6e0e-6c1d-414f-9007-311fb99cb377",
    quality: 92,
    textHeavy: true,
    transparentArrow: true,
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

async function clipMaskToFrame(maskBuf) {
  const outW = Math.round(FRAME_W * EXPORT_SCALE);
  const outH = Math.round(FRAME_H * EXPORT_SCALE);
  const targetW = Math.round(MASK_W * EXPORT_SCALE);
  const targetH = Math.round(MASK_H * EXPORT_SCALE);
  const pasteTop = Math.round(MASK_Y * EXPORT_SCALE);
  const cropLeft = Math.round(-MASK_X * EXPORT_SCALE);
  const cropWidth = Math.min(outW, targetW - cropLeft);
  const cropHeight = Math.min(targetH, outH - pasteTop);

  const resized = await sharp(maskBuf)
    .resize(targetW, targetH, { fit: "fill" })
    .png()
    .toBuffer();

  const visible = await sharp(resized)
    .extract({ left: cropLeft, top: 0, width: cropWidth, height: cropHeight })
    .toBuffer();

  return sharp({
    create: {
      width: outW,
      height: outH,
      channels: 4,
      background: { r: 245, g: 237, b: 214, alpha: 1 },
    },
  })
    .composite([{ input: visible, left: 0, top: pasteTop }])
    .png()
    .toBuffer();
}

async function prepareMask(buf) {
  return sharp(buf).ensureAlpha().png().toBuffer();
}

async function prepareCatArt(buf) {
  const size = Math.round(CAT_NODE_SIZE * 1.0715 * EXPORT_SCALE);
  return sharp(buf)
    .ensureAlpha()
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function prepareSwipeArrow(buf) {
  const targetW = Math.round(ARROW_NODE_W * EXPORT_SCALE);
  const targetH = Math.round(ARROW_NODE_H * EXPORT_SCALE);

  return sharp(buf)
    .ensureAlpha()
    .resize(targetW, targetH, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

await mkdir(OUT, { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  let input = Buffer.from(await res.arrayBuffer());

  if (cfg.clipToFrame) {
    input = await clipMaskToFrame(input);
  }
  if (cfg.resizeMask) {
    input = await prepareMask(input);
  }
  if (cfg.transparentMask) {
    const out = `${OUT}/${name}.png`;
    await sharp(await prepareMask(input)).toFile(out);
    const meta = await sharp(out).metadata();
    const { size } = await import("fs/promises").then((fs) => fs.stat(out));
    console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
    continue;
  }
  if (cfg.transparentCat) {
    input = await prepareCatArt(input);
  }
  if (cfg.transparentArrow) {
    input = await prepareSwipeArrow(input);
  }

  const out = `${OUT}/${name}.webp`;
  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);

  const meta = await sharp(out).metadata();
  const { size } = await import("fs/promises").then((fs) => fs.stat(out));
  console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
}

console.log("Done — Spring Dango section assets exported to WebP.");
