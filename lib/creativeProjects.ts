/**
 * Creative Projects collage — positions from Figma nodes 15:1501 (desktop) /
 * 18:2007 (mobile collage). Card ratio overrides per design spec.
 */

export const CREATIVE_DESKTOP_VIEWPORT = { width: 1440, height: 911 } as const;
export const CREATIVE_MOBILE_VIEWPORT = { width: 525, height: 1112 } as const;
export const CREATIVE_MOBILE_COLLAGE_OFFSET = 458;

const D = CREATIVE_DESKTOP_VIEWPORT;
const M = CREATIVE_MOBILE_VIEWPORT;
const MO = CREATIVE_MOBILE_COLLAGE_OFFSET;

const FRAME_PAD = 13;
const FRAME_BORDER = 1.5;
const CAPTION_BLOCK_DESKTOP = 21.4;
const CAPTION_BLOCK_MOBILE = 15;
/** Desktop collage horizontal nudge (px in 1440 design space) */
const DESKTOP_COLLAGE_SHIFT_X = -38;

function dCx(x: number, w: number) {
  return ((x + DESKTOP_COLLAGE_SHIFT_X + w / 2) / D.width) * 100;
}
function dCy(y: number, h: number) {
  return ((y + h / 2) / D.height) * 100;
}
function dW(w: number) {
  return (w / D.width) * 100;
}
function dH(h: number) {
  return (h / D.height) * 100;
}
function dLabelCx(x: number, w: number) {
  return dCx(x, w);
}
function dLabelTop(y: number) {
  return (y / D.height) * 100;
}

function mCx(x: number, w: number) {
  return ((x - MO + w / 2) / M.width) * 100;
}
function mCy(y: number, h: number) {
  return ((y + h / 2) / M.height) * 100;
}
function mW(w: number) {
  return (w / M.width) * 100;
}
function mH(h: number) {
  return (h / M.height) * 100;
}
function mLabelCx(x: number, w: number) {
  return mCx(x, w);
}
function mLabelTop(y: number) {
  return (y / M.height) * 100;
}

function heightFromWidthPx(
  wPx: number,
  ratioW: number,
  ratioH: number,
  vh: number,
) {
  return ((wPx * ratioH) / ratioW / vh) * 100;
}

function widthFromHeightPx(
  hPx: number,
  ratioW: number,
  ratioH: number,
  vw: number,
) {
  return (((hPx * ratioW) / ratioH) / vw) * 100;
}

function heightFrom16x9InnerPx(
  wPx: number,
  hasCaption: boolean,
  vh: number,
  captionBlock: number,
) {
  const innerW = wPx - 2 * FRAME_BORDER - 2 * FRAME_PAD;
  const innerH = innerW * (1080 / 1920);
  const hPx =
    innerH + 2 * FRAME_PAD + 2 * FRAME_BORDER + (hasCaption ? captionBlock : 0);
  return (hPx / vh) * 100;
}

function cyFromTopAndHeightPx(y: number, hPx: number, vh: number) {
  return ((y + hPx / 2) / vh) * 100;
}

function nudgeCx(cx: number, dxPx: number, vw: number) {
  return cx + (dxPx / vw) * 100;
}

function nudgeCy(cy: number, dyPx: number, vh: number) {
  return cy + (dyPx / vh) * 100;
}

export type CardPlacement = {
  cx: number;
  cy: number;
  width: number;
  height: number;
  rotate: number;
};

export type CreativeCard = {
  id: string;
  href: string;
  alt: string;
  zIndex: number;
  placeholderColor: string;
  innerAspect?: number;
  caption?: string;
  desktop: CardPlacement;
  mobile: CardPlacement;
};

/** Labels are independent — center-anchored above each card cluster */
export type LabelPlacement = { cx: number; top: number; width: number };

export type CreativeLabel = {
  id: string;
  date: string;
  title: string;
  color: string;
  zIndex: number;
  desktop: LabelPlacement;
  mobile: LabelPlacement;
};

export type ClipPlacement = {
  cx: number;
  cy: number;
  width: number;
  rotate: number;
};

export type CreativeClip = {
  id: string;
  zIndex: number;
  desktop: ClipPlacement;
  mobile: ClipPlacement;
};

/* ---- Figma frame positions (unrotated intrinsic size) ---------------- */

const FIGMA_DESKTOP = {
  worldcupVideo: { x: 692.775, y: 608.395, w: 304, h: 216, rot: -7 },
  mava: { x: 1135.425, y: 151.857, w: 249.055, h: 309.254, rot: -12 },
  springdango: { x: 114.601, y: 139.751, w: 288.901, h: 315.458, rot: 10 },
  worldcup: { x: 437.693, y: 529.958, w: 387.359, h: 387.359, rot: 9 },
  meme: { x: 79.759, y: 580.748, w: 226.928, h: 264.04, rot: 3 },
  osechi: { x: 682.539, y: 183.92, w: 325.784, h: 267.246, rot: -3 },
  earlyBack: { x: 1102.734, y: 580.014, w: 283.779, h: 192.11, rot: 6 },
  springdangoVideo: { x: 287.881, y: 153.415, w: 339.629, h: 270.037, rot: -19 },
  earlyFront: { x: 1087.944, y: 686, w: 314.595, h: 276.894, rot: -16 },
} as const;

const FIGMA_MOBILE = {
  worldcupVideo: { x: 685.468, y: 457.863, w: 205.398, h: 145.941, rot: -6 },
  mava: { x: 465.356, y: 757.226, w: 168.275, h: 208.948, rot: 13 },
  springdango: { x: 478.8, y: 56.639, w: 195.196, h: 213.14, rot: -7 },
  worldcup: { x: 466.559, y: 414.989, w: 261.72, h: 261.72, rot: 6 },
  meme: { x: 776.428, y: 715.835, w: 191.478, h: 207.512, rot: -15 },
  osechi: { x: 774.913, y: 281.017, w: 220.116, h: 180.565, rot: 4 },
  earlyBack: { x: 558.19, y: 1004.625, w: 191.736, h: 129.799, rot: 5 },
  springdangoVideo: { x: 635.173, y: 67.531, w: 229.471, h: 182.451, rot: 4 },
  earlyFront: { x: 687.199, y: 1003.229, w: 212.556, h: 187.084, rot: -6 },
} as const;

const FIGMA_LABELS_DESKTOP = {
  springdango: { x: 277.056, y: 69, w: 188 },
  worldcup: { x: 663.223, y: 482.136, w: 188 },
  early: { x: 1151.152, y: 525.799, w: 188 },
  meme: { x: 99.223, y: 521.889, w: 188 },
  osechi: { x: 751.431, y: 98, w: 188 },
  mava: { x: 1122.652, y: 80, w: 188 },
} as const;

const FIGMA_LABELS_MOBILE = {
  springdango: { x: 644.514, y: 9, w: 145 },
  worldcup: { x: 596.545, y: 371.019, w: 145 },
  early: { x: 650.333, y: 957.833, w: 145 },
  meme: { x: 803.167, y: 663.891, w: 145 },
  osechi: { x: 815.739, y: 240, w: 145 },
  mava: { x: 563.997, y: 716.37, w: 145 },
} as const;

const FIGMA_CLIPS_DESKTOP = {
  springdango: { x: 353.551, y: 153.119, w: 57.32, h: 47.767, rot: -25 },
  worldcup: { x: 808.253, y: 580.947, w: 57.32, h: 47.767, rot: 173 },
  early: { x: 1345.472, y: 646.606, w: 57.32, h: 47.767, rot: 48 },
} as const;

const FIGMA_CLIPS_MOBILE = {
  springdango: { x: 633.473, y: 60.996, w: 42, h: 35, rot: -25 },
  worldcup: { x: 717.474, y: 437.863, w: 42, h: 35, rot: 80 },
  early: { x: 704.404, y: 1004.706, w: 42, h: 35, rot: -42 },
} as const;

function cardFromFigmaDesktop(
  f: (typeof FIGMA_DESKTOP)[keyof typeof FIGMA_DESKTOP],
  overrides?: Partial<{ wPx: number; hPx: number }>,
) {
  const wPx = overrides?.wPx ?? f.w;
  const hPx = overrides?.hPx ?? f.h;
  return {
    cx: dCx(f.x, f.w),
    cy: cyFromTopAndHeightPx(f.y, hPx, D.height),
    width: dW(wPx),
    height: dH(hPx),
    rotate: f.rot,
  };
}

function cardFromFigmaMobile(
  f: (typeof FIGMA_MOBILE)[keyof typeof FIGMA_MOBILE],
  overrides?: Partial<{ wPx: number; hPx: number }>,
) {
  const wPx = overrides?.wPx ?? f.w;
  const hPx = overrides?.hPx ?? f.h;
  return {
    cx: mCx(f.x, f.w),
    cy: cyFromTopAndHeightPx(f.y, hPx, M.height),
    width: mW(wPx),
    height: mH(hPx),
    rotate: f.rot,
  };
}

/* Ratio overrides — desktop width tuned to 147px (was 147.75px in preview) */
const springdangoDesktopWPx =
  ((FIGMA_DESKTOP.springdango.h * 222) / 262) * (147 / 147.75);
const springdangoDesktopW = dW(springdangoDesktopWPx);
const springdangoMobileW = widthFromHeightPx(
  FIGMA_MOBILE.springdango.h,
  222,
  262,
  M.width,
);

const osechiDesktopH = heightFromWidthPx(
  FIGMA_DESKTOP.osechi.w,
  288,
  212,
  D.height,
);
const osechiMobileH = heightFromWidthPx(
  FIGMA_MOBILE.osechi.w,
  288,
  212,
  M.height,
);

const springVideoDesktopH = heightFrom16x9InnerPx(
  FIGMA_DESKTOP.springdangoVideo.w,
  true,
  D.height,
  CAPTION_BLOCK_DESKTOP,
);
const springVideoMobileH = heightFrom16x9InnerPx(
  FIGMA_MOBILE.springdangoVideo.w,
  true,
  M.height,
  CAPTION_BLOCK_MOBILE,
);

const earlyFrontDesktopH = heightFromWidthPx(
  FIGMA_DESKTOP.earlyFront.w,
  268,
  165,
  D.height,
);
const earlyFrontMobileH = heightFromWidthPx(
  FIGMA_MOBILE.earlyFront.w,
  268,
  165,
  M.height,
);

const worldcupDesktop = cardFromFigmaDesktop(FIGMA_DESKTOP.worldcup);
const worldcupMobile = cardFromFigmaMobile(FIGMA_MOBILE.worldcup);
const worldcupClipDesktop = clipDesktop(FIGMA_CLIPS_DESKTOP.worldcup);
const worldcupClipMobile = clipMobile(FIGMA_CLIPS_MOBILE.worldcup);
const springdangoDesktopBase = {
  ...cardFromFigmaDesktop(FIGMA_DESKTOP.springdango, {
    wPx: springdangoDesktopWPx,
  }),
  width: springdangoDesktopW,
};
const earlyClipDesktop = clipDesktop(FIGMA_CLIPS_DESKTOP.early);
const worldcupVideoMobileBase = cardFromFigmaMobile(FIGMA_MOBILE.worldcupVideo);
const mavaMobileBase = cardFromFigmaMobile(FIGMA_MOBILE.mava);
const memeMobileBase = cardFromFigmaMobile(FIGMA_MOBILE.meme);
const osechiMobileBase = cardFromFigmaMobile(FIGMA_MOBILE.osechi, {
  hPx: (FIGMA_MOBILE.osechi.w * 212) / 288,
});
const earlyBackMobileBase = cardFromFigmaMobile(FIGMA_MOBILE.earlyBack);
const earlyFrontMobileBase = cardFromFigmaMobile(FIGMA_MOBILE.earlyFront, {
  hPx: (FIGMA_MOBILE.earlyFront.w * 165) / 268,
});

export const creativeCards: CreativeCard[] = [
  {
    id: "worldcup-video",
    href: "/creative/worldcup-campaign",
    alt: "World Cup campaign — stadium kick-off render",
    zIndex: 21,
    placeholderColor: "#1a3a6e",
    innerAspect: 278 / 156,
    caption: "熱狂キックオフ⚽️",
    desktop: cardFromFigmaDesktop(FIGMA_DESKTOP.worldcupVideo),
    mobile: {
      ...worldcupVideoMobileBase,
      cy: nudgeCy(worldcupVideoMobileBase.cy, 64, M.height),
    },
  },
  {
    id: "mava",
    href: "/creative/mava-social-media",
    alt: "Mava social media templates",
    zIndex: 2,
    placeholderColor: "#d4d4d4",
    innerAspect: 220.37 / 280.57,
    desktop: cardFromFigmaDesktop(FIGMA_DESKTOP.mava),
    mobile: {
      ...mavaMobileBase,
      cx: nudgeCx(mavaMobileBase.cx, 30, M.width),
      cy: nudgeCy(mavaMobileBase.cy, 136, M.height),
    },
  },
  {
    id: "springdango",
    href: "/creative/spring-dango-points",
    alt: "Spring Sakura × Shiratama collection board",
    zIndex: 3,
    placeholderColor: "#84dcff",
    innerAspect: 222 / 262,
    desktop: {
      ...springdangoDesktopBase,
      cy: nudgeCy(springdangoDesktopBase.cy, 12, D.height),
    },
    mobile: {
      ...cardFromFigmaMobile(FIGMA_MOBILE.springdango, {
        wPx: (FIGMA_MOBILE.springdango.h * 222) / 262,
      }),
      width: springdangoMobileW,
    },
  },
  {
    id: "worldcup",
    href: "/creative/worldcup-campaign",
    alt: "World Cup campaign character set",
    zIndex: 4,
    placeholderColor: "#2068ff",
    innerAspect: 1,
    desktop: {
      ...worldcupDesktop,
      cy: nudgeCy(worldcupDesktop.cy, 53, D.height),
    },
    mobile: {
      ...worldcupMobile,
      cy: nudgeCy(worldcupMobile.cy, 97, M.height),
    },
  },
  {
    id: "meme",
    href: "/creative/manekineko-meme",
    alt: "Manekineko meme sticker set",
    zIndex: 5,
    placeholderColor: "#ffe8d6",
    innerAspect: 200.17 / 236.36,
    desktop: cardFromFigmaDesktop(FIGMA_DESKTOP.meme),
    mobile: {
      ...memeMobileBase,
      cy: nudgeCy(memeMobileBase.cy, 60, M.height),
    },
  },
  {
    id: "osechi",
    href: "/creative/new-year-osechi",
    alt: "New Year Osechi collection",
    zIndex: 6,
    placeholderColor: "#ffd92f",
    innerAspect: 288 / 212,
    desktop: {
      ...cardFromFigmaDesktop(FIGMA_DESKTOP.osechi, {
        hPx: (FIGMA_DESKTOP.osechi.w * 212) / 288,
      }),
      height: osechiDesktopH,
    },
    mobile: {
      ...osechiMobileBase,
      height: osechiMobileH,
      cy: nudgeCy(osechiMobileBase.cy, 30, M.height),
    },
  },
  {
    id: "early-back",
    href: "/creative/early-creations",
    alt: "Early creations — dusk fear cover",
    zIndex: 7,
    placeholderColor: "#1c1c1c",
    innerAspect: 255.2 / 163.53,
    desktop: cardFromFigmaDesktop(FIGMA_DESKTOP.earlyBack),
    mobile: {
      ...earlyBackMobileBase,
      cx: nudgeCx(earlyBackMobileBase.cx, 120, M.width),
      cy: nudgeCy(earlyBackMobileBase.cy, 99, M.height),
    },
  },
  {
    id: "springdango-video",
    href: "/creative/spring-dango-points",
    alt: "Spring dango points — cat render",
    zIndex: 9,
    placeholderColor: "#f5f0eb",
    innerAspect: 1920 / 1080,
    caption: "友達と白玉団子を集めよう🍡",
    desktop: {
      ...cardFromFigmaDesktop(FIGMA_DESKTOP.springdangoVideo, {
        hPx:
          (FIGMA_DESKTOP.springdangoVideo.w -
            2 * FRAME_BORDER -
            2 * FRAME_PAD) *
            (1080 / 1920) +
          2 * FRAME_PAD +
          2 * FRAME_BORDER +
          CAPTION_BLOCK_DESKTOP,
      }),
      height: springVideoDesktopH,
    },
    mobile: {
      ...cardFromFigmaMobile(FIGMA_MOBILE.springdangoVideo, {
        hPx:
          (FIGMA_MOBILE.springdangoVideo.w -
            2 * FRAME_BORDER -
            2 * FRAME_PAD) *
            (1080 / 1920) +
          2 * FRAME_PAD +
          2 * FRAME_BORDER +
          CAPTION_BLOCK_MOBILE,
      }),
      height: springVideoMobileH,
    },
  },
  {
    id: "early-front",
    href: "/creative/early-creations",
    alt: "Early creations — plastic layout",
    zIndex: 12,
    placeholderColor: "#e8e4df",
    innerAspect: 268 / 165,
    desktop: {
      ...cardFromFigmaDesktop(FIGMA_DESKTOP.earlyFront, {
        hPx: (FIGMA_DESKTOP.earlyFront.w * 165) / 268,
      }),
      height: earlyFrontDesktopH,
    },
    mobile: {
      ...earlyFrontMobileBase,
      height: earlyFrontMobileH,
      cx: nudgeCx(earlyFrontMobileBase.cx, 40, M.width),
      cy: nudgeCy(earlyFrontMobileBase.cy, 124, M.height),
    },
  },
];

function labelDesktop(f: (typeof FIGMA_LABELS_DESKTOP)[keyof typeof FIGMA_LABELS_DESKTOP]) {
  return {
    cx: dLabelCx(f.x, f.w),
    top: dLabelTop(f.y),
    width: dW(f.w),
  };
}

function labelMobile(f: (typeof FIGMA_LABELS_MOBILE)[keyof typeof FIGMA_LABELS_MOBILE]) {
  return {
    cx: mLabelCx(f.x, f.w),
    top: mLabelTop(f.y),
    width: mW(f.w),
  };
}

const osechiLabelMobile = labelMobile(FIGMA_LABELS_MOBILE.osechi);
const worldcupLabelMobile = labelMobile(FIGMA_LABELS_MOBILE.worldcup);
const memeLabelMobile = labelMobile(FIGMA_LABELS_MOBILE.meme);
const mavaLabelMobile = labelMobile(FIGMA_LABELS_MOBILE.mava);
const earlyLabelMobile = labelMobile(FIGMA_LABELS_MOBILE.early);

export const creativeLabels: CreativeLabel[] = [
  {
    id: "springdango",
    date: "2026.2–2026.3",
    title: "SPRING DANGO POINTS",
    color: "#e12ca8",
    zIndex: 20,
    desktop: labelDesktop(FIGMA_LABELS_DESKTOP.springdango),
    mobile: labelMobile(FIGMA_LABELS_MOBILE.springdango),
  },
  {
    id: "osechi",
    date: "2025.12–2026.1",
    title: "NEW YEAR OSECHI COLLECTION",
    color: "#a8741d",
    zIndex: 20,
    desktop: labelDesktop(FIGMA_LABELS_DESKTOP.osechi),
    mobile: {
      ...osechiLabelMobile,
      top: nudgeCy(osechiLabelMobile.top, 30, M.height),
    },
  },
  {
    id: "mava",
    date: "2025.7",
    title: "MAVA SOCIAL MEDIA TEMPLATES",
    color: "#909090",
    zIndex: 20,
    desktop: labelDesktop(FIGMA_LABELS_DESKTOP.mava),
    mobile: {
      ...mavaLabelMobile,
      cx: nudgeCx(mavaLabelMobile.cx, -10, M.width),
      top: nudgeCy(mavaLabelMobile.top, 126, M.height),
    },
  },
  {
    id: "worldcup",
    date: "2026.5–2026.6",
    title: "WORLDCUP CAMPAIGN",
    color: "#2068ff",
    zIndex: 20,
    desktop: labelDesktop(FIGMA_LABELS_DESKTOP.worldcup),
    mobile: {
      ...worldcupLabelMobile,
      top: nudgeCy(worldcupLabelMobile.top, 64, M.height),
    },
  },
  {
    id: "meme",
    date: "2026.1–2026.2",
    title: "MANEKINEKO MEME",
    color: "#f23012",
    zIndex: 20,
    desktop: labelDesktop(FIGMA_LABELS_DESKTOP.meme),
    mobile: {
      ...memeLabelMobile,
      top: nudgeCy(memeLabelMobile.top, 60, M.height),
    },
  },
  {
    id: "early",
    date: "2022.1–2023.1",
    title: "EARLY CREATIONS",
    color: "#00d6d2",
    zIndex: 20,
    desktop: labelDesktop(FIGMA_LABELS_DESKTOP.early),
    mobile: {
      ...earlyLabelMobile,
      cx: nudgeCx(earlyLabelMobile.cx, 93, M.width),
      top: nudgeCy(earlyLabelMobile.top, 116, M.height),
    },
  },
];

function clipDesktop(f: (typeof FIGMA_CLIPS_DESKTOP)[keyof typeof FIGMA_CLIPS_DESKTOP]) {
  return {
    cx: dCx(f.x, f.w),
    cy: dCy(f.y, f.h),
    width: dW(f.w),
    rotate: f.rot,
  };
}

function clipMobile(f: (typeof FIGMA_CLIPS_MOBILE)[keyof typeof FIGMA_CLIPS_MOBILE]) {
  return {
    cx: mCx(f.x, f.w),
    cy: mCy(f.y, f.h),
    width: mW(f.w),
    rotate: f.rot,
  };
}

const earlyClipMobile = clipMobile(FIGMA_CLIPS_MOBILE.early);

export const creativeClips: CreativeClip[] = [
  {
    id: "springdango",
    zIndex: 70,
    desktop: clipDesktop(FIGMA_CLIPS_DESKTOP.springdango),
    mobile: clipMobile(FIGMA_CLIPS_MOBILE.springdango),
  },
  {
    id: "worldcup",
    zIndex: 70,
    desktop: {
      ...worldcupClipDesktop,
      cx: nudgeCx(worldcupClipDesktop.cx, -8, D.width),
    },
    mobile: {
      ...worldcupClipMobile,
      cx: nudgeCx(worldcupClipMobile.cx, -20, M.width),
      cy: nudgeCy(worldcupClipMobile.cy, 74, M.height),
      rotate: worldcupClipMobile.rotate - 85,
    },
  },
  {
    id: "early",
    zIndex: 70,
    desktop: {
      ...earlyClipDesktop,
      cy: nudgeCy(earlyClipDesktop.cy, 8, D.height),
      rotate: earlyClipDesktop.rotate - 49,
    },
    mobile: {
      ...earlyClipMobile,
      cx: nudgeCx(earlyClipMobile.cx, 135, M.width),
      cy: nudgeCy(earlyClipMobile.cy, 110, M.height),
      rotate: earlyClipMobile.rotate + 21,
    },
  },
];
