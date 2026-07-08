/** Luxury scroll easing — long deceleration tail (Lusion-style). */
export const WC_EASE_LUXE = "power3.out";

/** Custom cubic-bezier for scrub-linked parallax. */
export const WC_EASE_PARALLAX: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

/** ScrollTrigger scrub amount — higher = more inertia. */
export const WC_SCRUB = 1.2;

/** Default parallax travel in % of element height. */
export const WC_PARALLAX = {
  bgSlow: 6,
  bgMesh: 4,
  fgFast: 14,
  showcase: 10,
  fullbleed: 5,
} as const;
