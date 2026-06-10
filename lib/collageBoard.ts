const BASE = "/collage-board";

const ASPECT_16X9 = 1080 / 1920;

/** Square polaroid — on-screen size matches FeaturedWork tilt cards (~365px+) */
const SQ = 520;

function wide16x9(width: number) {
  return { width, height: Math.round(width * ASPECT_16X9) };
}

export type CollageItemKind = "polaroid" | "text" | "sticker";

export type CollageItem = {
  id: string;
  kind: CollageItemKind;
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  zIndex: number;
};

const wide1 = wide16x9(980);
const wide2 = wide16x9(1040);
const portrait = { width: 420, height: Math.round(420 * (580 / 480)) };

/**
 * 1920×1500 canvas — initial layout from user screenshot (refresh positions).
 */
export const collageBoardItems: CollageItem[] = [
  {
    id: "text-1",
    kind: "text",
    src: `${BASE}/work-text-2.svg`,
    alt: "Magic Mind",
    left: 820,
    top: 510,
    width: 400,
    height: 64,
    rotate: 0,
    zIndex: 12,
  },
  {
    id: "wide-1",
    kind: "polaroid",
    src: `${BASE}/abt-img-2.png`,
    alt: "Polaroid collage",
    left: 620,
    top: 230,
    width: wide1.width,
    height: wide1.height,
    rotate: 12,
    zIndex: 4,
  },
  {
    id: "square-1",
    kind: "polaroid",
    src: `${BASE}/abt-img-1.png`,
    alt: "Polaroid collage",
    left: 360,
    top: 70,
    width: SQ,
    height: SQ,
    rotate: 8,
    zIndex: 7,
  },
  {
    id: "text-2",
    kind: "text",
    src: `${BASE}/work-text-4.svg`,
    alt: "Little Saints",
    left: 1580,
    top: 60,
    width: 420,
    height: 64,
    rotate: 0,
    zIndex: 9,
  },
  {
    id: "wide-2",
    kind: "polaroid",
    src: `${BASE}/abt-img-7.png`,
    alt: "Polaroid collage",
    left: 980,
    top: 420,
    width: wide2.width,
    height: wide2.height,
    rotate: -10,
    zIndex: 5,
  },
  {
    id: "text-3",
    kind: "text",
    src: `${BASE}/work-text-1.svg`,
    alt: "Earthbar",
    left: 1040,
    top: 680,
    width: 340,
    height: 64,
    rotate: 6,
    zIndex: 10,
  },
  {
    id: "rect-1",
    kind: "polaroid",
    src: `${BASE}/abt-img-3.png`,
    alt: "Polaroid collage",
    left: 1200,
    top: 35,
    width: portrait.width,
    height: portrait.height,
    rotate: -5,
    zIndex: 6,
  },
  {
    id: "sticker-ls",
    kind: "sticker",
    src: `${BASE}/ls-feet.gif`,
    alt: "Little Saints",
    left: 45,
    top: 505,
    width: 400,
    height: 400,
    rotate: -3,
    zIndex: 11,
  },
  {
    id: "square-2",
    kind: "polaroid",
    src: `${BASE}/abt-img-5.png`,
    alt: "Polaroid collage",
    left: 165,
    top: 785,
    width: SQ,
    height: SQ,
    rotate: 10,
    zIndex: 8,
  },
  {
    id: "wide-3",
    kind: "polaroid",
    src: `${BASE}/abt-img-4.png`,
    alt: "Polaroid collage",
    left: 720,
    top: 900,
    width: portrait.width,
    height: portrait.height,
    rotate: 4,
    zIndex: 3,
  },
  {
    id: "square-3",
    kind: "polaroid",
    src: `${BASE}/abt-img-10.png`,
    alt: "Polaroid collage",
    left: 1310,
    top: 705,
    width: SQ,
    height: SQ,
    rotate: -8,
    zIndex: 6,
  },
];

export const COLLAGE_DESIGN_WIDTH = 1920;
export const COLLAGE_DESIGN_HEIGHT = 1500;

/** Match FeaturedWork tilt-card on-screen width (min ~365px) */
export const COLLAGE_MIN_CARD_SCREEN = 365;
export const COLLAGE_MIN_SQUARE_DESIGN = SQ;

export type CollageDragBounds = {
  minLeft: number;
  maxLeft: number;
  minTop: number;
  maxTop: number;
};

function rotatedPadding(width: number, height: number, rotateDeg: number) {
  const rad = (rotateDeg * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  const rotW = width * cos + height * sin;
  const rotH = width * sin + height * cos;

  return {
    padX: (rotW - width) / 2,
    padY: (rotH - height) / 2,
  };
}

/** Keep cards fully inside the visible viewport (accounts for scale + rotation). */
export function getVisibleDragBounds(
  viewportWidth: number,
  viewportHeight: number,
  scale: number,
  elementWidth: number,
  elementHeight: number,
  rotateDeg: number,
): CollageDragBounds {
  const canvasW = COLLAGE_DESIGN_WIDTH * scale;
  const canvasH = COLLAGE_DESIGN_HEIGHT * scale;

  const visibleMinX =
    canvasW > viewportWidth ? (canvasW - viewportWidth) / (2 * scale) : 0;
  const visibleMinY =
    canvasH > viewportHeight ? (canvasH - viewportHeight) / (2 * scale) : 0;
  const visibleMaxX =
    canvasW > viewportWidth
      ? COLLAGE_DESIGN_WIDTH - visibleMinX
      : COLLAGE_DESIGN_WIDTH;
  const visibleMaxY =
    canvasH > viewportHeight
      ? COLLAGE_DESIGN_HEIGHT - visibleMinY
      : COLLAGE_DESIGN_HEIGHT;

  const { padX, padY } = rotatedPadding(
    elementWidth,
    elementHeight,
    rotateDeg,
  );

  const minLeft = visibleMinX + padX;
  const minTop = visibleMinY + padY;
  const maxLeft = visibleMaxX - elementWidth - padX;
  const maxTop = visibleMaxY - elementHeight - padY;

  return {
    minLeft: Math.min(minLeft, maxLeft),
    maxLeft: Math.max(minLeft, maxLeft),
    minTop: Math.min(minTop, maxTop),
    maxTop: Math.max(minTop, maxTop),
  };
}

export function clampCollagePosition(
  left: number,
  top: number,
  bounds: CollageDragBounds,
) {
  return {
    left: Math.max(bounds.minLeft, Math.min(left, bounds.maxLeft)),
    top: Math.max(bounds.minTop, Math.min(top, bounds.maxTop)),
  };
}
