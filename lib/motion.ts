import type { Transition } from "framer-motion";

/** Card stack intro — physical settle on first load. */
export const cardIntroSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

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

/** More Work grid image hover spring. */
export const moreWorkHoverSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 15,
  mass: 1,
};

/** Shared More Work image motion — scroll pop-in + hover lift. */
export const moreWorkImageMotion = {
  initial: { scale: 0.7, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: elastic,
  whileHover: {
    scale: 1.06,
    rotate: -2,
    zIndex: 10,
    transition: moreWorkHoverSpring,
  },
  whileTap: { scale: 0.96 },
} as const;

/** Smooth non-spring easing (ease-out-expo) for fades. */
export const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

/** ease-out-cubic */
export const easeOutCubic: [number, number, number, number] = [
  0.215, 0.61, 0.355, 1,
];
