#!/usr/bin/env node
/**
 * Export manekineko-meme cards — Figma 68:1846 inner boxes @ 10px radius, 4×.
 * Uses design_context fill images; cover crop + rounded mask only (no gray/key matte).
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/folders/manekineko-meme";
const OUT_SCALE = 4;

const ASSETS = {
  kong: {
    url: "https://www.figma.com/api/mcp/asset/2c4adac8-c709-4708-804f-7599c5cbdfe8",
    innerW: 283.466,
    innerH: 283.466,
    radius: 10,
    gravity: "centre",
  },
  "cat-stickers": {
    url: "https://www.figma.com/api/mcp/asset/a800f24e-4ae5-48bb-a62f-495ad23129af",
    innerW: 193,
    innerH: 307,
    radius: 10,
    gravity: "centre",
  },
  "horse-rider": {
    url: "https://www.figma.com/api/mcp/asset/56cf619a-ac86-4e3b-9758-345d564c84bc",
    innerW: 180.066,
    innerH: 289.928,
    radius: 10,
    gravity: "south",
  },
};

async function fetchBuffer(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(180_000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function exportCard(name, spec) {
  const buf = await fetchBuffer(spec.url);
  const srcMeta = await sharp(buf).metadata();
  const outW = Math.round(spec.innerW * OUT_SCALE);
  const outH = Math.round(spec.innerH * OUT_SCALE);
  const rx = Math.round(spec.radius * OUT_SCALE);

  const mask = Buffer.from(
    `<svg width="${outW}" height="${outH}"><rect width="${outW}" height="${outH}" rx="${rx}" ry="${rx}"/></svg>`,
  );

  const outPath = `${OUT}/${name}.png`;
  await sharp(buf)
    .resize(outW, outH, { fit: "cover", position: spec.gravity })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png({ compressionLevel: 6 })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  const stats = await sharp(outPath).stats();
  const { data: corner } = await sharp(outPath)
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(
    `${name}: ${srcMeta.width}x${srcMeta.height} → ${outMeta.width}x${outMeta.height} r=${rx}px cornerα=${corner[3]} alpha=${stats.channels[3].min}-${stats.channels[3].max}`,
  );
}

await mkdir(OUT, { recursive: true });
for (const [name, spec] of Object.entries(ASSETS)) {
  await exportCard(name, spec);
}
console.log("Done");
