/**
 * Losslessly-ish compress images under public/ while keeping visual quality.
 * Run: node scripts/compress-public-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const SKIP_EXT = new Set([".svg", ".mp4", ".webm", ".pdf", ".json", ".ico", ".ttf", ".woff", ".woff2"]);
const MIN_SAVINGS = 8 * 1024;
const MAX_DIMENSION = 2800;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
      continue;
    }
    files.push(full);
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${bytes}B`;
}

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (SKIP_EXT.has(ext)) return null;

  const before = (await fs.stat(filePath)).size;
  if (before < 32 * 1024) return null;

  const input = sharp(filePath, { animated: ext === ".gif" });
  const meta = await input.metadata();
  if (!meta.width || !meta.height) return null;

  let pipeline = sharp(filePath, { animated: ext === ".gif" });
  const longest = Math.max(meta.width, meta.height);
  if (longest > MAX_DIMENSION) {
    pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  let out;
  if (ext === ".png") {
    out = await pipeline
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: false,
        quality: 95,
        effort: 10,
      })
      .toBuffer();
  } else if (ext === ".jpg" || ext === ".jpeg") {
    out = await pipeline.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  } else if (ext === ".webp") {
    out = await pipeline.webp({ quality: 88, effort: 6 }).toBuffer();
  } else if (ext === ".gif") {
    out = await pipeline
      .gif({ effort: 10, colours: 256 })
      .toBuffer();
  } else if (ext === ".avif") {
    out = await pipeline.avif({ quality: 82, effort: 6 }).toBuffer();
  } else {
    return null;
  }

  if (out.length >= before - MIN_SAVINGS) return null;

  await fs.writeFile(filePath, out);
  return { before, after: out.length };
}

async function main() {
  const files = (await walk(PUBLIC)).sort();
  let processed = 0;
  let saved = 0;

  for (const file of files) {
    try {
      const result = await compressFile(file);
      if (!result) continue;
      processed += 1;
      saved += result.before - result.after;
      const rel = path.relative(ROOT, file);
      console.log(
        `✓ ${rel}  ${formatBytes(result.before)} → ${formatBytes(result.after)}`,
      );
    } catch (error) {
      const rel = path.relative(ROOT, file);
      console.warn(`⚠ ${rel}: ${error.message}`);
    }
  }

  console.log(`\nCompressed ${processed} files, saved ${formatBytes(saved)}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
