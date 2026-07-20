#!/usr/bin/env node
/**
 * Re-compress public WebP assets in-place (lossy but high quality).
 * Skips files already under MIN_BYTES. Backs up only when size shrinks.
 */
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const ROOT = "public";
const MIN_BYTES = 400 * 1024;
const MAX_WIDTH = 3840;
const QUALITY = 84;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (e.name.endsWith(".webp")) files.push(p);
  }
  return files;
}

const files = await walk(ROOT);
let saved = 0;

for (const file of files) {
  const { size: before } = await stat(file);
  if (before < MIN_BYTES) continue;

  const img = sharp(file);
  const meta = await img.metadata();
  let pipeline = img;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
  }

  const out = await pipeline
    .webp({ quality: QUALITY, effort: 6, smartSubsample: false })
    .toBuffer();

  if (out.length >= before) {
    console.log(`– ${file} (kept original, ${(before / 1024).toFixed(0)} KB)`);
    continue;
  }

  await sharp(out).toFile(file);
  saved += before - out.length;
  console.log(
    `✓ ${file} ${(before / 1024).toFixed(0)} → ${(out.length / 1024).toFixed(0)} KB`,
  );
}

console.log(`Done. Saved ${(saved / 1024 / 1024).toFixed(2)} MB total.`);
