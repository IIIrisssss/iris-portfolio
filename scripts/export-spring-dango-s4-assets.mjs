#!/usr/bin/env node
/** Figma brGxpK5JpT9huzR3Bbylht · node 38:49436 layered exports */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/spring-dango-points/sections/s4";

const ASSETS = {
  "bg-cat": {
    url: "https://www.figma.com/api/mcp/asset/b16fda53-0d6e-478d-9717-b5c12acac862",
    quality: 90,
  },
  "tile-1-1": {
    url: "https://www.figma.com/api/mcp/asset/dcfb6c3a-f384-46aa-b91b-3573bb9980e5",
    quality: 88,
  },
  "tile-1-2": {
    url: "https://www.figma.com/api/mcp/asset/0add2d4f-aab0-4116-820c-da067d7cc9b2",
    quality: 88,
  },
  "tile-1-3": {
    url: "https://www.figma.com/api/mcp/asset/0748f15d-9f38-4818-b6c1-b316ac06e93f",
    quality: 88,
  },
  "tile-1-4": {
    url: "https://www.figma.com/api/mcp/asset/3c8b3192-2494-4d0b-8eae-63ebebf2988b",
    quality: 88,
  },
  "tile-2-1": {
    url: "https://www.figma.com/api/mcp/asset/a40e92e4-571d-4cb1-a64f-df2c1ea5cf44",
    quality: 88,
  },
  "tile-2-2": {
    url: "https://www.figma.com/api/mcp/asset/b8c5e287-e620-48e7-b77e-dc87cccd057a",
    quality: 88,
  },
  "tile-2-3": {
    url: "https://www.figma.com/api/mcp/asset/943309ab-eac7-43c7-837f-efa8e3936bc0",
    quality: 88,
  },
  "tile-2-4": {
    url: "https://www.figma.com/api/mcp/asset/6e0dae01-aa21-4f35-844b-514cc25d6824",
    quality: 88,
  },
};

async function toWebp(buf, quality) {
  return sharp(buf)
    .ensureAlpha()
    .webp({ quality, effort: 6, smartSubsample: true })
    .toBuffer();
}

await mkdir(OUT, { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());
  const out = `${OUT}/${name}.webp`;
  await sharp(await toWebp(input, cfg.quality)).toFile(out);
  const meta = await sharp(out).metadata();
  const { size } = await import("fs/promises").then((fs) => fs.stat(out));
  console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
}

console.log("Done — Spring Dango s4 layered assets exported.");
