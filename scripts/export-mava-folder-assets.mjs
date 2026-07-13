#!/usr/bin/env node
/**
 * Export Mava folder 4 assets at 4× from Figma.
 * Crowned cats: 4× node render → key gray bg → trim → transparent PNG.
 * Others: largest raw source, no downscale.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/folders/mava";
const X0 = 216;
const Y0 = 411.44;
const W = 441.472;
const H = 333.559;

const ASSETS = {
  kong: {
    raw: [
      "https://www.figma.com/api/mcp/asset/fff931c9-b4a6-4ee9-9bdf-4c788f787ba2",
      "https://www.figma.com/api/mcp/asset/f0caf114-cce0-401e-b460-763925038704",
    ],
    trim: false,
  },
  "cat-stickers": {
    raw: [
      "https://www.figma.com/api/mcp/asset/84f98b05-5378-42e6-b3d0-556e40617ccb",
      "https://www.figma.com/api/mcp/asset/82ba0aaa-3abf-4097-9224-fe01bbf1f26d",
    ],
    trim: false,
  },
  "horse-rider": {
    raw: [
      "https://www.figma.com/api/mcp/asset/f4082d98-3565-4585-9535-c221f4168735",
      "https://www.figma.com/api/mcp/asset/3b565724-152f-4938-8d7c-5bcd8c8dae00",
    ],
    trim: true,
  },
  peanut: {
    raw: [
      "https://www.figma.com/api/mcp/asset/c9b4aa54-ac26-4b25-b023-d7f9be1c5fe8",
      "https://www.figma.com/api/mcp/asset/bc3375c3-c5f5-4170-8a51-bedb7e9c9dae",
    ],
    trim: true,
  },
  "crowned-cat-default": {
    export4x:
      "https://www.figma.com/api/mcp/asset/0643cd4c-12b9-475c-be73-fb0210ceb8fd",
    frame: { w: 307, h: 137 },
  },
  "crowned-cat-hover": {
    export4x:
      "https://www.figma.com/api/mcp/asset/9ab97fcf-da62-4b2b-98e0-173f069d8cde",
    frame: { w: 330.569, h: 147.237 },
  },
};

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function pickLargestRaw(urls) {
  let best = null;
  for (const url of urls) {
    const buf = await fetchBuffer(url);
    const meta = await sharp(buf).metadata();
    const pixels = (meta.width ?? 0) * (meta.height ?? 0);
    if (!best || pixels > best.pixels) best = { buf, meta, pixels };
  }
  return best;
}

/** Key near-uniform dark/gray background from corners → transparent. */
async function keyBackground(buf, shouldTrim = false) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  const corners = [
    0,
    (info.width - 1) * 4,
    (info.height - 1) * info.width * 4,
    ((info.height - 1) * info.width + (info.width - 1)) * 4,
  ];
  const bg = corners.map((i) => [data[i], data[i + 1], data[i + 2]]);
  const bgR = Math.round(bg.reduce((s, c) => s + c[0], 0) / 4);
  const bgG = Math.round(bg.reduce((s, c) => s + c[1], 0) / 4);
  const bgB = Math.round(bg.reduce((s, c) => s + c[2], 0) / 4);

  const threshold = 42;
  for (let i = 0; i < data.length; i += 4) {
    const dr = Math.abs(data[i] - bgR);
    const dg = Math.abs(data[i + 1] - bgG);
    const db = Math.abs(data[i + 2] - bgB);
    if (dr < threshold && dg < threshold && db < threshold) {
      data[i + 3] = 0;
    }
  }

  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  if (shouldTrim) {
    const stats = await pipeline.clone().stats();
    if (stats.channels[3].min < 250) {
      pipeline = pipeline.trim({ threshold: 12 });
    }
  }

  return pipeline.png({ compressionLevel: 6 }).toBuffer();
}

async function processRaw(name, spec) {
  const { buf, meta } = await pickLargestRaw(spec.raw);
  let pipeline = sharp(buf).ensureAlpha();
  if (spec.trim) pipeline = pipeline.trim({ threshold: 10 });
  const outPath = `${OUT}/${name}.png`;
  await pipeline.png({ compressionLevel: 6 }).toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  console.log(`${name}: raw ${meta.width}x${meta.height} → ${outMeta.width}x${outMeta.height}`);
}

async function processCrowned(name, spec) {
  const buf = await fetchBuffer(spec.export4x);
  const keyed = await keyBackground(buf, false);
  const outPath = `${OUT}/${name}.png`;
  await sharp(keyed).png({ compressionLevel: 6 }).toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  const stats = await sharp(outPath).stats();
  console.log(
    `${name}: 4x export → ${outMeta.width}x${outMeta.height} alpha[${stats.channels[3].min}-${stats.channels[3].max}]`,
  );
}

await mkdir(OUT, { recursive: true });

for (const [name, spec] of Object.entries(ASSETS)) {
  if (spec.export4x) await processCrowned(name, spec);
  else await processRaw(name, spec);
}

// Print CSS reference
const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;
console.log("\n--- crowned cat CSS ---");
console.log("default:", {
  left: pct(364 - X0, W),
  top: pct(590 - Y0, H),
  width: pct(307, W),
  height: pct(137, H),
});
console.log("hover wrapper:", {
  left: pct(341.05 - X0, W),
  top: pct(541.11 - Y0, H),
  width: pct(353.954, W),
  height: pct(212.736, H),
});
