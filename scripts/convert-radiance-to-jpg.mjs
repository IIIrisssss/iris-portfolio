/**
 * Convert public/radiance-works/*.avif → *.jpg with visual sanity checks.
 * Run: node scripts/convert-radiance-to-jpg.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public/radiance-works");
const JPEG_QUALITY = 92;

async function isMostlyBlack(imagePath) {
  const { data, info } = await sharp(imagePath)
    .resize(32, 32, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let sum = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  const mean = sum / (data.length / info.channels);
  return mean < 8;
}

async function convertFile(avifPath) {
  const base = path.basename(avifPath, ".avif");
  const jpgPath = path.join(DIR, `${base}.jpg`);

  await sharp(avifPath)
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(jpgPath);

  if (await isMostlyBlack(jpgPath)) {
    throw new Error(`${base}.jpg looks blank/black after conversion`);
  }

  const meta = await sharp(jpgPath).metadata();
  return { base, width: meta.width, height: meta.height };
}

async function main() {
  const entries = await fs.readdir(DIR);
  const avifs = entries.filter((name) => name.endsWith(".avif")).sort();

  if (!avifs.length) {
    console.log("No .avif files found — nothing to convert.");
    return;
  }

  const results = [];
  for (const name of avifs) {
    const result = await convertFile(path.join(DIR, name));
    results.push(result);
    console.log(`✓ ${result.base}.jpg (${result.width}×${result.height})`);
  }

  console.log(`\nConverted ${results.length} files.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
