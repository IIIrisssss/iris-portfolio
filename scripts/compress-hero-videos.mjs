#!/usr/bin/env node
/**
 * Compress hero carousel MP4s — H.264 CRF 24, faststart for streaming.
 * Requires ffmpeg on PATH (`brew install ffmpeg`).
 */
import { spawnSync } from "child_process";
import { mkdir, rename, stat } from "fs/promises";
import ffmpegStatic from "ffmpeg-static";

const FFMPEG = ffmpegStatic ?? "ffmpeg";

const VIDEOS = [
  "public/hero-media/2-replacement.mp4",
  "public/hero-media/3-replacement.mp4",
  "public/hero-media/4-replacement.mp4",
];

function ffmpegAvailable() {
  return spawnSync(FFMPEG, ["-version"], { stdio: "ignore" }).status === 0;
}

if (!ffmpegAvailable()) {
  console.error("ffmpeg not found. Install with: brew install ffmpeg");
  process.exit(1);
}

await mkdir("public/hero-media", { recursive: true });

for (const input of VIDEOS) {
  const tmp = input.replace(".mp4", ".compressed.mp4");
  const { size: before } = await stat(input);

  const args = [
    "-y",
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    "24",
    "-preset",
    "slow",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    tmp,
  ];

  const r = spawnSync(FFMPEG, args, { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`Failed: ${input}`);
    continue;
  }

  const { size: after } = await stat(tmp);
  if (after >= before) {
    console.log(`– ${input} kept original (${(before / 1024 / 1024).toFixed(1)} MB)`);
    continue;
  }

  await rename(tmp, input);
  console.log(
    `✓ ${input} ${(before / 1024 / 1024).toFixed(1)} → ${(after / 1024 / 1024).toFixed(1)} MB`,
  );
}
