#!/usr/bin/env node
import sharp from "sharp";

function keyCornerColor(data, width, height) {
  const corners = [
    0,
    (width - 1) * 4,
    (height - 1) * width * 4,
    ((height - 1) * width + (width - 1)) * 4,
  ];
  const bgR = Math.round(corners.reduce((s, i) => s + data[i], 0) / 4);
  const bgG = Math.round(corners.reduce((s, i) => s + data[i + 1], 0) / 4);
  const bgB = Math.round(corners.reduce((s, i) => s + data[i + 2], 0) / 4);
  const threshold = 40;
  for (let i = 0; i < data.length; i += 4) {
    const dr = Math.abs(data[i] - bgR);
    const dg = Math.abs(data[i + 1] - bgG);
    const db = Math.abs(data[i + 2] - bgB);
    if (dr < threshold && dg < threshold && db < threshold) data[i + 3] = 0;
  }
}

async function processAsset(src, out) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  keyCornerColor(data, info.width, info.height);

  const cornerAlphas = [0, (info.width - 1) * 4, (info.height - 1) * info.width * 4]
    .map((i) => data[i + 3]);

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 6 })
    .toFile(out);

  const meta = await sharp(out).metadata();
  const stats = await sharp(out).stats();
  const pass = cornerAlphas.every((a) => a < 128);
  console.log(
    `${out.split("/").pop()}: ${info.width}x${info.height} → ${meta.width}x${meta.height} cornerKeyed=${pass} alpha=${stats.channels[3].min}-${stats.channels[3].max}`,
  );
  return pass;
}

const OUT = "public/folders/manekineko-meme";
let ok = true;
ok &&= await processAsset("/tmp/cats-export.png", `${OUT}/cat-stickers.png`);
ok &&= await processAsset("/tmp/horse-export.png", `${OUT}/horse-rider.png`);
ok &&= await processAsset("/tmp/clip-export.png", `${OUT}/paperclip.png`);
ok &&= await processAsset("/tmp/peanut-def-export.png", `${OUT}/peanut-default.png`);
ok &&= await processAsset("/tmp/peanut-hov-export.png", `${OUT}/peanut-hover.png`);

if (!ok) globalThis.process.exit(1);
console.log("✓ Local processing complete");
