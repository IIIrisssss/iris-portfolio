#!/usr/bin/env node
/** Export early-creations (folder 6) assets from Figma MCP at 4×. */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/folders/early-creations";

const ASSETS = {
  kong: {
    raw: [
      "https://www.figma.com/api/mcp/asset/5b197123-c4c7-42b3-b6a3-3d074c3d3fd6",
      "https://www.figma.com/api/mcp/asset/b01c285c-c12b-41fe-a900-f5678921beb7",
    ],
    trim: false,
  },
  "cat-stickers": {
    raw: [
      "https://www.figma.com/api/mcp/asset/d2295ab3-1888-4520-b025-cd1075e85d9d",
      "https://www.figma.com/api/mcp/asset/acb90be5-136b-442b-8761-9beff76c2516",
    ],
    trim: false,
  },
  "horse-rider": {
    raw: [
      "https://www.figma.com/api/mcp/asset/f00dfe38-3a55-4872-80d4-23fe640d90bb",
      "https://www.figma.com/api/mcp/asset/9dcc5ef2-5ef9-4677-85ed-f9933a85f893",
    ],
    trim: false,
  },
  paperclip: {
    raw: [
      "https://www.figma.com/api/mcp/asset/07a5f87a-d971-42d1-adc1-8cdfc4cb7014",
      "https://www.figma.com/api/mcp/asset/63813084-2cf5-44b9-a695-76eca6ff2955",
    ],
    trim: true,
  },
  peanut: {
    raw: [
      "https://www.figma.com/api/mcp/asset/46dac9d3-64f8-4512-bdd4-509148a45864",
      "https://www.figma.com/api/mcp/asset/d8f51887-d121-4e1b-87c7-43b8ff5be6a4",
    ],
    trim: true,
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

await mkdir(OUT, { recursive: true });

for (const [name, spec] of Object.entries(ASSETS)) {
  const { buf, meta } = await pickLargestRaw(spec.raw);
  let pipeline = sharp(buf).ensureAlpha();
  if (spec.trim) pipeline = pipeline.trim({ threshold: 10 });
  const outPath = `${OUT}/${name}.png`;
  await pipeline.png({ compressionLevel: 6 }).toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  const stats = await sharp(outPath).stats();
  const a = stats.channels[3];
  console.log(
    `${name}: ${meta.width}x${meta.height} → ${outMeta.width}x${outMeta.height} alpha[${a.min}-${a.max}]`,
  );
}
