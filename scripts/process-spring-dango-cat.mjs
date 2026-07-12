#!/usr/bin/env node
/**
 * Process user-provided Spring Dango cat character to transparent WebP.
 *
 * Usage: node scripts/process-spring-dango-cat.mjs [input.png]
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const DEFAULT_SRC =
  "public/creative/spring-dango-points/sections/cat-art-source.png";
const OUT = "public/creative/spring-dango-points/sections/cat-art.webp";
const TARGET_W = 544;
const TARGET_H = 684;

const src = process.argv[2] ?? DEFAULT_SRC;

const { data, info } = await sharp(src)
  .ensureAlpha()
  .resize(TARGET_W, TARGET_H, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r < 24 && g < 24 && b < 24) {
    data[i + 3] = 0;
  }
}

await mkdir("public/creative/spring-dango-points/sections", { recursive: true });

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .webp({ quality: 90, effort: 6 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`cat-art: ${meta.width}x${meta.height} → ${OUT}`);
