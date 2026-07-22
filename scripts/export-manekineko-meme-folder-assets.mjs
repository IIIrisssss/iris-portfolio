#!/usr/bin/env node
/** Export manekineko-meme folder assets — transparent PNG. */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { execSync } from "child_process";

const OUT = "public/folders/manekineko-meme";
const TMP = "/tmp/manekineko-meme-assets";
const MAX_DIM = 1600;

const ASSETS = {
  kong: {
    urls: [
      "https://www.figma.com/api/mcp/asset/c91583ce-1f6f-4f3f-9af4-9cba6fec7195",
    ],
    keyCorner: true,
  },
  "cat-stickers": {
    urls: [
      "https://www.figma.com/api/mcp/asset/178516d6-7791-4ca5-9ec0-150e89338c3b",
      "https://www.figma.com/api/mcp/asset/93220b2c-6b8a-4af6-a8a2-a546239e20f4",
    ],
    keyWhite: true,
  },
  "horse-rider": {
    urls: [
      "https://www.figma.com/api/mcp/asset/043cba30-adb3-4ed4-a4ec-c2de874ee440",
      "https://www.figma.com/api/mcp/asset/6f814def-f715-410e-8306-e25f01f04c79",
    ],
    keyWhite: true,
  },
  paperclip: {
    urls: [
      "https://www.figma.com/api/mcp/asset/ee891b78-84b0-4c69-b6a4-8a9d539399c9",
      "https://www.figma.com/api/mcp/asset/99159dd4-c520-473b-b2b5-32de27d96ff1",
    ],
  },
  "peanut-default": {
    urls: [
      "https://www.figma.com/api/mcp/asset/09e4bfd3-9057-4f55-b559-4e120dcd16ad",
      "https://www.figma.com/api/mcp/asset/78e34a13-55af-4a86-909c-4a2913b42184",
    ],
  },
  "peanut-hover": {
    urls: [
      "https://www.figma.com/api/mcp/asset/0ae0bdf5-e98d-4ee1-b474-ffff677ba67e",
      "https://www.figma.com/api/mcp/asset/2d9af10a-5a32-4834-8303-09aeeb6597d1",
    ],
  },
};

function curlDownload(url, dest) {
  execSync(`curl -sL --max-time 120 -o "${dest}" "${url}"`, { stdio: "pipe" });
}

async function pickLargestLocal(urls, prefix) {
  let best = null;
  for (let i = 0; i < urls.length; i++) {
    const dest = `${TMP}/${prefix}-${i}.png`;
    curlDownload(urls[i], dest);
    const buf = await sharp(dest).toBuffer();
    const meta = await sharp(buf).metadata();
    const pixels = (meta.width ?? 0) * (meta.height ?? 0);
    if (!best || pixels > best.pixels) best = { buf, meta, pixels };
  }
  return best;
}

function keyNearWhite(data) {
  const threshold = 248;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) data[i + 3] = 0;
  }
}

function keyCornerColor(data, width, height) {
  const corners = [0, (width - 1) * 4, (height - 1) * width * 4, ((height - 1) * width + (width - 1)) * 4];
  const bg = corners.map((i) => [data[i], data[i + 1], data[i + 2]]);
  const bgR = Math.round(bg.reduce((s, c) => s + c[0], 0) / 4);
  const bgG = Math.round(bg.reduce((s, c) => s + c[1], 0) / 4);
  const bgB = Math.round(bg.reduce((s, c) => s + c[2], 0) / 4);
  const threshold = 40;
  for (let i = 0; i < data.length; i += 4) {
    const dr = Math.abs(data[i] - bgR);
    const dg = Math.abs(data[i + 1] - bgG);
    const db = Math.abs(data[i + 2] - bgB);
    if (dr < threshold && dg < threshold && db < threshold) data[i + 3] = 0;
  }
}

await mkdir(OUT, { recursive: true });
await mkdir(TMP, { recursive: true });

let ok = true;
for (const [name, spec] of Object.entries(ASSETS)) {
  const { buf, meta } = await pickLargestLocal(spec.urls, name);
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  if (spec.keyWhite) keyNearWhite(data);
  if (spec.keyCorner) keyCornerColor(data, info.width, info.height);

  const cornerCheck = await (async () => {
    const pts = [
      0,
      (info.width - 1) * 4,
      (info.height - 1) * info.width * 4,
      ((info.height - 1) * info.width + (info.width - 1)) * 4,
    ];
    return pts.every((i) => data[i + 3] < 128);
  })();

  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  const maxSide = Math.max(info.width, info.height);
  if (maxSide > MAX_DIM) {
    pipeline = pipeline.resize({
      width: info.width >= info.height ? MAX_DIM : undefined,
      height: info.height > info.width ? MAX_DIM : undefined,
      fit: "inside",
    });
  }

  const outPath = `${OUT}/${name}.png`;
  await pipeline.trim({ threshold: 1 }).png({ compressionLevel: 6 }).toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  const stats = await sharp(outPath).ensureAlpha().stats();
  const pass = cornerCheck;
  console.log(
    `${name}: ${meta.width}x${meta.height} → ${outMeta.width}x${outMeta.height} cornerKeyed=${cornerCheck} alphaRange=${stats.channels[3].min}-${stats.channels[3].max} ${pass ? "OK" : "FAIL"}`,
  );
  if (!pass) ok = false;
}

if (!ok) {
  console.error("\n⚠ Transparency check failed");
  process.exit(1);
}
console.log("\n✓ All assets pass corner transparency check");
