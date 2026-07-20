#!/usr/bin/env node
/**
 * Export hero carousel slide 1 from Figma MCP download_assets.
 * Node 8:1732 — 视频1 / MANEKI NEKO hero KV
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";

const TARGET_W = 3840;
const TARGET_H = 2160;

/** Refresh via MCP: fileKey 9CaoMkc3g4ywLod8DvQ9jG, nodeId 8:1732, defaultScale 2 */
const ASSET_URL =
  "https://www.figma.com/api/mcp/asset/d560f1e8-3647-4caa-aeae-98c6b0703036";

await mkdir("public/hero-media", { recursive: true });

const res = await fetch(ASSET_URL);
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
const input = Buffer.from(await res.arrayBuffer());

const resized = await sharp(input)
  .resize(TARGET_W, TARGET_H, { fit: "cover", position: "centre" })
  .ensureAlpha()
  .toBuffer();

const webp = await sharp(resized)
  .webp({ quality: 90, effort: 6, smartSubsample: false })
  .toBuffer();

await sharp(webp).toFile("public/hero-media/1-replacement.webp");

const meta = await sharp(webp).metadata();
console.log(
  `✓ public/hero-media/1-replacement.webp — ${meta.width}×${meta.height}, ${(webp.length / 1024).toFixed(0)} KB`,
);
