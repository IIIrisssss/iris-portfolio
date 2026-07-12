#!/usr/bin/env node
/**
 * Export World Cup section assets from Figma MCP screenshots.
 * Uses contentsOnly screenshots (transparent PNG) — never download_assets
 * which bakes in Figma's gray (#565656) matte.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUT = "public/creative/worldcup-campaign/sections";

const ASSETS = {
  "section-1-illustration": {
    url: "https://www.figma.com/api/mcp/asset/8a562203-fba0-48e8-8d8b-05c19855ba8c",
    targetW: 1672,
    quality: 90,
  },
  "section-1-context": {
    url: "https://www.figma.com/api/mcp/asset/ed6b667e-b8cd-427a-a97f-a436e2e71863",
    targetW: 3840,
    quality: 88,
  },
  "section-2-analysis": {
    url: "https://www.figma.com/api/mcp/asset/5969bb12-6d36-4f8b-9110-9d451944287a",
    targetW: 3840,
    quality: 88,
  },
  "section-3-color-showcase": {
    url: "https://www.figma.com/api/mcp/asset/63d35df9-afec-42e8-9994-f06d2607757c",
    targetW: 3040,
    quality: 90,
  },
  "bg-dot-mesh": {
    url: "https://www.figma.com/api/mcp/asset/b0967eb6-b3a0-4e18-9cc5-9facb0d7b411",
    targetW: 1920,
    quality: 92,
  },
  "divider-line": {
    url: "https://www.figma.com/api/mcp/asset/de5c31ea-a78e-4a41-b522-427afbd53c50",
    quality: 95,
  },
  "tiktok-logo-pill": {
    url: "https://www.figma.com/api/mcp/asset/0b203f0e-38ee-4270-bdcf-dc1cf410e307",
    quality: 95,
  },
  "icon-arrow-circle": {
    url: "https://www.figma.com/api/mcp/asset/831d4381-4e4b-42cd-8c26-592ffe5bb983",
    quality: 95,
  },
  "icon-aigc": {
    url: "https://www.figma.com/api/mcp/asset/59a759c0-86bf-42d7-ae37-100a76ad5939",
    quality: 95,
  },
  "section-4-visual-page-design": {
    url: "https://www.figma.com/api/mcp/asset/a6e8d2fa-d587-473e-8082-c471ff9fb066",
    targetW: 3840,
    quality: 88,
  },
  "section-5-gameplay-screens": {
    url: "https://www.figma.com/api/mcp/asset/87239374-16ab-482e-a729-639c1c588f97",
    targetW: 3840,
    quality: 88,
  },
  "section-6-share-flow": {
    url: "https://www.figma.com/api/mcp/asset/abf68c33-14c1-40a4-ab14-0c8d60463a0f",
    targetW: 3840,
    quality: 88,
  },
  "section-7-feed-banners": {
    url: "https://www.figma.com/api/mcp/asset/4d72ce6a-89ba-4f4e-8793-83f0356b02c4",
    targetW: 3840,
    quality: 88,
  },
  "section-8-project-footer": {
    url: "https://www.figma.com/api/mcp/asset/5d555427-a525-4da6-b35a-3c2ecb88f03e",
    targetW: 3840,
    quality: 88,
  },
  "section-9-promotion": {
    url: "https://www.figma.com/api/mcp/asset/035947fc-cef9-4754-a6cc-fe036679cfa0",
    targetW: 3840,
    quality: 88,
  },
  "section-10-project-footer": {
    url: "https://www.figma.com/api/mcp/asset/e44017b8-6dfb-44a9-8ed9-a7ce8cf56bec",
    targetW: 3840,
    quality: 88,
  },
};

const SECTION_3_COMPOSITE = {
  outName: "section-3-visual-strategy",
  designW: 1920,
  designH: 3183,
  bgX: -1795,
  bgY: -1176,
  bgW: 6000,
  bgH: 4814,
  foregroundUrl:
    "https://www.figma.com/api/mcp/asset/85247b4a-a7cf-4f22-a77d-a5e926fe657c",
  backgroundUrl:
    "https://www.figma.com/api/mcp/asset/eef65591-accd-4915-ba7b-fbc84450fd0f",
};

/** Remove Figma gray matte (#565656) and near-white from icon exports. */
async function stripMatte(buf) {
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isGrayMatte =
      Math.abs(r - 86) < 8 && Math.abs(g - 86) < 8 && Math.abs(b - 86) < 8;
    const isNearWhite = r > 245 && g > 245 && b > 245;
    if (isGrayMatte || isNearWhite) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

/** Extract dot mesh overlay: white pixels → transparent, keep colored mesh lines. */
async function extractMeshOverlay(buf, targetW) {
  const { data, info } = await sharp(buf)
    .resize({ width: targetW })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isWhiteish = r > 246 && g > 246 && b > 246;
    const isGrayMatte =
      Math.abs(r - 86) < 8 && Math.abs(g - 86) < 8 && Math.abs(b - 86) < 8;
    if (isWhiteish || isGrayMatte) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Swap decorative background while preserving foreground content. */
async function exportBgComposite(cfg) {
  const targetW = 3840;
  const scale = targetW / cfg.designW;
  const outH = Math.round(cfg.designH * scale);

  const [fgBuf, bgBuf] = await Promise.all([
    fetchBuffer(cfg.foregroundUrl),
    fetchBuffer(cfg.backgroundUrl),
  ]);

  const fg = await sharp(fgBuf)
    .resize({ width: targetW, height: outH, fit: "fill" })
    .ensureAlpha()
    .png()
    .toBuffer();

  const bg = await sharp(bgBuf)
    .resize({
      width: Math.round(cfg.bgW * scale),
      height: Math.round(cfg.bgH * scale),
      fit: "fill",
    })
    .ensureAlpha()
    .png()
    .toBuffer();

  const bgMeta = await sharp(bg).metadata();
  const bgLeft = Math.round(cfg.bgX * scale);
  const bgTop = Math.round(cfg.bgY * scale);
  const cropLeft = Math.max(0, -bgLeft);
  const cropTop = Math.max(0, -bgTop);
  const pasteLeft = Math.max(0, bgLeft);
  const pasteTop = Math.max(0, bgTop);
  const cropW = Math.min(bgMeta.width - cropLeft, targetW - pasteLeft);
  const cropH = Math.min(bgMeta.height - cropTop, outH - pasteTop);

  const bgVisible = await sharp(bg)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .png()
    .toBuffer();

  const out = `${OUT}/${cfg.outName}.webp`;
  await sharp({
    create: {
      width: targetW,
      height: outH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: bgVisible,
        left: pasteLeft,
        top: pasteTop,
      },
      { input: fg, left: 0, top: 0, blend: "darken" },
    ])
    .webp({ quality: 88, effort: 6 })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`${cfg.outName}: ${meta.width}x${meta.height} (bg composite)`);
}

await mkdir(OUT, { recursive: true });

for (const [name, cfg] of Object.entries(ASSETS)) {
  const res = await fetch(cfg.url);
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`);
  let input = Buffer.from(await res.arrayBuffer());
  let pipeline;

  if (cfg.flattenWhite) {
    pipeline = await extractMeshOverlay(input, cfg.targetW);
  } else if (
    name.startsWith("icon-") ||
    name === "tiktok-logo-pill" ||
    name === "divider-line"
  ) {
    pipeline = await stripMatte(await sharp(input).ensureAlpha().toBuffer());
  } else {
    pipeline = sharp(input).ensureAlpha();
    if (cfg.targetW) {
      pipeline = pipeline.resize({ width: cfg.targetW, withoutEnlargement: false });
    }
  }

  const out = `${OUT}/${name}.webp`;
  await pipeline.webp({ quality: cfg.quality, effort: 6 }).toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${name}: ${meta.width}x${meta.height}`);
}

await exportBgComposite(SECTION_3_COMPOSITE);

console.log("Done — all assets exported without gray matte.");
