"use client";

import { motion, useReducedMotion } from "framer-motion";

import { moreWorkHoverSpring } from "@/lib/motion";

type SeamMascotHoverProps = {
  src: string;
};

export function SeamMascotHover({ src }: SeamMascotHoverProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className="wc-section-seam__mascot"
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <motion.div
      className="wc-section-seam__motion"
      whileHover={{
        scale: 1.06,
        rotate: 10,
        transition: moreWorkHoverSpring,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="wc-section-seam__mascot"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}
