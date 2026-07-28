#!/usr/bin/env node
/**
 * Export Spring Dango section 1 layered assets from Figma MCP.
 * Figma file: brGxpK5JpT9huzR3Bbylht · node 36:47446
 * Refresh URLs via get_design_context when expired.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/spring-dango-points/sections/s1";

/** Layered assets from Figma MCP get_design_context (36:47446). */
const ASSETS = {
  "ellipse-lg": {
    url: "https://www.figma.com/api/mcp/asset/41d0dd32-9e12-41ed-af1a-20b0748d480e",
    quality: 90,
  },
  "ellipse-md": {
    url: "https://www.figma.com/api/mcp/asset/da6d0cd2-ba7d-475d-b3f8-6466b2c20e17",
    quality: 90,
  },
  "ellipse-sm": {
    url: "https://www.figma.com/api/mcp/asset/dfee7d60-c855-40fd-81fd-003319269b98",
    quality: 90,
  },
  "ellipse-sm-alt": {
    url: "https://www.figma.com/api/mcp/asset/15523d0a-a617-46ce-82c4-357292281f1f",
    quality: 90,
  },
  "arrow-2": {
    url: "https://www.figma.com/api/mcp/asset/2d2f33fe-8efe-49e6-af71-f9427877a11d",
    quality: 92,
    textHeavy: true,
  },
  "arrow-3": {
    url: "https://www.figma.com/api/mcp/asset/3d550396-6fa8-4a71-8f50-58c1e36196f8",
    quality: 92,
    textHeavy: true,
  },
  "arrow-4": {
    url: "https://www.figma.com/api/mcp/asset/fe24678c-f46c-405c-9dc0-c0ab179a1107",
    quality: 92,
    textHeavy: true,
  },
  "arrow-5": {
    url: "https://www.figma.com/api/mcp/asset/0350c2db-d696-4b52-97f3-595ca4b62df6",
    quality: 92,
    textHeavy: true,
  },
  "arrow-7": {
    url: "https://www.figma.com/api/mcp/asset/6aad0e06-fdff-4382-8ec1-dcf50d195c8f",
    quality: 92,
    textHeavy: true,
  },
  "arrow-9": {
    url: "https://www.figma.com/api/mcp/asset/cfb030a9-d951-479b-b272-07048236a642",
    quality: 92,
    textHeavy: true,
  },
  "arrow-10": {
    url: "https://www.figma.com/api/mcp/asset/9716b462-4668-4c38-ab63-1c43f6d37234",
    quality: 92,
    textHeavy: true,
  },
  "arrow-11": {
    url: "https://www.figma.com/api/mcp/asset/bef35657-fe54-45f8-a627-914b85ec6268",
    quality: 92,
    textHeavy: true,
  },
  "arrow-12": {
    url: "https://www.figma.com/api/mcp/asset/06755e26-b325-4162-a55d-dca32b3b745d",
    quality: 92,
    textHeavy: true,
  },
  "arrow-13": {
    url: "https://www.figma.com/api/mcp/asset/0552bb3f-c903-421e-b1bb-6fb19b5d32c9",
    quality: 92,
    textHeavy: true,
  },
  "arrow-14": {
    url: "https://www.figma.com/api/mcp/asset/ecd61b1c-527c-4136-b15a-bd96013202b2",
    quality: 92,
    textHeavy: true,
  },
  "arrow-15": {
    url: "https://www.figma.com/api/mcp/asset/6f04798d-225a-42c3-aaf7-69050df66408",
    quality: 92,
    textHeavy: true,
  },
};

async function toWebp(buf, quality, textHeavy = false) {
  let pipeline = sharp(buf).ensureAlpha();
  if (textHeavy) {
    pipeline = pipeline.sharpen({ sigma: 0.3, m1: 0.5, m2: 0.25 });
  }
  return pipeline
    .webp({
      quality,
      effort: 6,
      smartSubsample: false,
      nearLossless: textHeavy,
    })
    .toBuffer();
}

await mkdir(OUT, { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());
  const out = `${OUT}/${name}.webp`;
  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);
  const meta = await sharp(out).metadata();
  const { size } = await import("fs/promises").then((fs) => fs.stat(out));
  console.log(`${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`);
}

console.log("Done — Spring Dango s1 layered assets exported.");
