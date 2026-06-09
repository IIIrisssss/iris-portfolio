export type CardScatterLayout = {
  x: number;
  y: number;
  r: number;
};

/**
 * Card offsets around hovered title (multiples of card size).
 * Spread left / above / right — not clustered only on top.
 */
const LAYOUT_SETS: [number, number, number, number, number, number][] = [
  [-2.05, -0.12, 0, -0.62, 2.05, 0.18],
  [-1.98, -0.42, 2.02, -0.28, -0.15, 0.38],
  [1.95, -0.48, -2.08, 0.08, 0.08, -0.68],
  [-2.1, 0.15, 0.12, -0.72, 1.98, -0.22],
  [2, 0.12, -1.88, -0.55, 0.05, -0.75],
];

const ROTATION_SETS: [number, number, number][] = [
  [-14, 9, 22],
  [-19, 6, 17],
  [11, -13, 21],
  [-8, 16, -18],
  [15, -11, 24],
];

/** Stable scatter positions per project — wide horizontal spread, unique per title. */
export function getProjectCardLayouts(
  projectIndex: number,
  cardSizePx: number,
): CardScatterLayout[] {
  const set = projectIndex % LAYOUT_SETS.length;
  const layout = LAYOUT_SETS[set];
  const rotations = ROTATION_SETS[set];

  return [0, 1, 2].map((cardIndex) => ({
    x: layout[cardIndex * 2] * cardSizePx,
    y: layout[cardIndex * 2 + 1] * cardSizePx,
    r: rotations[cardIndex],
  }));
}

export function estimateCardSize(listWidthPx: number) {
  return Math.min(listWidthPx * 0.26, 152);
}
