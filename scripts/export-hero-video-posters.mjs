#!/usr/bin/env node
/**
 * Compress hero carousel video posters from local Pro 冲榜 05 PNGs → WebP.
 * Source: ~/Downloads/Pro 冲榜 05/视频{2,3,4}.png
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { homedir } from "os";
import { join } from "path";

const TARGET_W = 3840;
const TARGET_H = 2160;
const SRC_DIR = join(homedir(), "Downloads", "Pro 冲榜 05");

const POSTERS = [
  { n: 2, out: "public/hero-media/2-replacement-poster.webp" },
  { n: 3, out: "public/hero-media/3-replacement-poster.webp" },
  { n: 4, out: "public/hero-media/4-replacement-poster.webp" },
];

await mkdir("public/hero-media", { recursive: true });

for (const { n, out } of POSTERS) {
  const inputPath = join(SRC_DIR, `视频${n}.png`);
  const webp = await sharp(inputPath)
    .resize(TARGET_W, TARGET_H, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .webp({ quality: 88, effort: 6, smartSubsample: false })
    .toBuffer();
  await sharp(webp).toFile(out);
  const meta = await sharp(webp).metadata();
  console.log(
    `✓ ${out} — ${meta.width}×${meta.height}, ${(webp.length / 1024).toFixed(0)} KB`,
  );
}
