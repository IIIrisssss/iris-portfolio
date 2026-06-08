import type { Transition } from "framer-motion";

/** Signature bouncy "pop-in" used across the site (mimics ease-out-elastic). */
export const elastic: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 13,
  mass: 0.9,
};

/** A gentler spring for subtle hover / settle motions. */
export const softSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

/** Smooth non-spring easing (ease-out-expo) for fades. */
export const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

/** ease-out-cubic */
export const easeOutCubic: [number, number, number, number] = [
  0.215, 0.61, 0.355, 1,
];
