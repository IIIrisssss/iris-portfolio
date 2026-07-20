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
    url: "https://www.figma.com/api/mcp/asset/35fc30e4-0715-4d0e-9542-f4f4614afb6c",
    quality: 90,
  },
  "ellipse-md": {
    url: "https://www.figma.com/api/mcp/asset/8cae7a0c-aee1-4e19-af2e-ce10712a1d21",
    quality: 90,
  },
  "ellipse-sm": {
    url: "https://www.figma.com/api/mcp/asset/b8116680-a2e4-49a8-929c-8dce0500385b",
    quality: 90,
  },
  "ellipse-sm-alt": {
    url: "https://www.figma.com/api/mcp/asset/24d141ba-56b5-45eb-904a-1203016cd330",
    quality: 90,
  },
  "arrow-2": {
    url: "https://www.figma.com/api/mcp/asset/29334ab8-bafd-4656-a6fb-889253360324",
    quality: 92,
    textHeavy: true,
  },
  "arrow-3": {
    url: "https://www.figma.com/api/mcp/asset/6413725b-e13d-4b98-b503-43edc299ae9c",
    quality: 92,
    textHeavy: true,
  },
  "arrow-4": {
    url: "https://www.figma.com/api/mcp/asset/bfe465eb-717b-4eb7-8c8f-e1f5717f9f37",
    quality: 92,
    textHeavy: true,
  },
  "arrow-5": {
    url: "https://www.figma.com/api/mcp/asset/ee5e02ad-23ac-4582-b4bc-dd40ac76b9f5",
    quality: 92,
    textHeavy: true,
  },
  "arrow-7": {
    url: "https://www.figma.com/api/mcp/asset/ef11fc64-e5b1-4bf7-949a-4309d84b58ea",
    quality: 92,
    textHeavy: true,
  },
  "arrow-9": {
    url: "https://www.figma.com/api/mcp/asset/bcb9b101-b2e5-4474-9053-2a95007ef07f",
    quality: 92,
    textHeavy: true,
  },
  "arrow-10": {
    url: "https://www.figma.com/api/mcp/asset/ff39bc43-1b4c-44fe-830a-4eccebeba433",
    quality: 92,
    textHeavy: true,
  },
  "arrow-11": {
    url: "https://www.figma.com/api/mcp/asset/e8a3996e-7d20-40ba-948f-3aa504c3659e",
    quality: 92,
    textHeavy: true,
  },
  "arrow-12": {
    url: "https://www.figma.com/api/mcp/asset/ec6a3bcf-db8e-4152-aa98-e22428afb08a",
    quality: 92,
    textHeavy: true,
  },
  "arrow-13": {
    url: "https://www.figma.com/api/mcp/asset/2be51a64-c06b-438f-87c7-0877eb3d0016",
    quality: 92,
    textHeavy: true,
  },
  "arrow-14": {
    url: "https://www.figma.com/api/mcp/asset/e32c79f7-ea80-4557-9a8b-bd3f74e08282",
    quality: 92,
    textHeavy: true,
  },
  "arrow-15": {
    url: "https://www.figma.com/api/mcp/asset/46941264-68f5-460e-9146-2c10fce26dde",
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
