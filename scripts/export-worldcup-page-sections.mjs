#!/usr/bin/env node
/**
 * Export World Cup hero + full-page sections from Figma MCP (2× PNG → WebP).
 * Refresh URLs via MCP download_assets when expired.
 */
import sharp from "sharp";
import { mkdir, stat } from "fs/promises";

const SECTIONS_OUT = "public/creative/worldcup-campaign/sections";
const HERO_OUT = "public/creative/worldcup-campaign/hero.webp";

/** Figma brGxpK5JpT9huzR3Bbylht — 2× frame exports */
const PAGE_SECTIONS = {
  hero: {
    // node 1:37262
    url: "https://www.figma.com/api/mcp/asset/9db38e6c-8e56-42d3-b9a0-6e9273650830",
    out: HERO_OUT,
    quality: 92,
    textHeavy: true,
  },
  "section-1-context": {
    // node 1:19975
    url: "https://www.figma.com/api/mcp/asset/f2ab1782-cfba-4e0c-9d1a-0fc78803a582",
    quality: 92,
    textHeavy: true,
  },
  "section-2-analysis-cultural-taboos": {
    // node 103:52904
    url: "https://www.figma.com/api/mcp/asset/0951be61-97de-440e-a7cd-51f9a1d0699b",
    quality: 90,
    textHeavy: true,
  },
  "section-2-analysis-cultural-localization": {
    // node 103:53098
    url: "https://www.figma.com/api/mcp/asset/a757012c-dc95-49ba-a1a7-c23165873770",
    quality: 90,
    textHeavy: true,
  },
  "section-2-analysis-localized-expressions": {
    // node 104:53292
    url: "https://www.figma.com/api/mcp/asset/48b3105c-ae1b-46d7-879e-5e43b7b28b7f",
    quality: 90,
    textHeavy: true,
  },
  "section-3-visual-carnival-vibes": {
    // node 1:20242
    url: "https://www.figma.com/api/mcp/asset/01d2e6e1-cd9a-41ca-b48a-280b35e96627",
    quality: 90,
    textHeavy: true,
  },
  "section-3-visual-mechanics-matrix": {
    // node 103:48739
    url: "https://www.figma.com/api/mcp/asset/b2b4b112-b4ce-4f5b-adb1-6d9713cbd5dc",
    quality: 88,
    textHeavy: false,
  },
  "section-4-visual-page-design": {
    // node 98:29068
    url: "https://www.figma.com/api/mcp/asset/55cca6a8-6177-4082-bfbf-186d7d58d1ca",
    quality: 88,
    textHeavy: false,
  },
  "section-5-gameplay-screens": {
    // node 100:46902
    url: "https://www.figma.com/api/mcp/asset/c657323f-face-4a23-a858-236651a5f7a1",
    quality: 88,
    textHeavy: false,
  },
  "section-6-share-flow": {
    // node 11:5747
    url: "https://www.figma.com/api/mcp/asset/ece9b94b-b49e-4b78-b52e-735711be4cfa",
    quality: 88,
    textHeavy: false,
  },
  "section-7-feed-banners": {
    // node 11:5695
    url: "https://www.figma.com/api/mcp/asset/bc96fa9a-5c73-444b-9533-842d81870875",
    quality: 88,
    textHeavy: false,
  },
  "section-8-project-footer": {
    // node 100:48402
    url: "https://www.figma.com/api/mcp/asset/e2aca4f3-7343-44af-a983-20a11f6c769b",
    quality: 88,
    textHeavy: false,
  },
  "section-9-promotion": {
    // node 11:7328
    url: "https://www.figma.com/api/mcp/asset/3834a05f-36ec-4c9f-914e-651f59d7f113",
    quality: 92,
    textHeavy: true,
  },
};

async function toWebp(buf, quality, textHeavy) {
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

await mkdir(SECTIONS_OUT, { recursive: true });
await mkdir("public/creative/worldcup-campaign", { recursive: true });

for (const [name, cfg] of Object.entries(PAGE_SECTIONS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  const out = cfg.out ?? `${SECTIONS_OUT}/${name}.webp`;
  const webp = await toWebp(input, cfg.quality, cfg.textHeavy);
  await sharp(webp).toFile(out);

  const meta = await sharp(out).metadata();
  const { size } = await stat(out);
  console.log(
    `${name}: ${meta.width}x${meta.height} (${Math.round(size / 1024)}KB)`,
  );
}

console.log("Done — World Cup page sections exported.");
