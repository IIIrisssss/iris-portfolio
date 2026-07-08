"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";

import { moreWorkImageMotion } from "@/lib/motion";

import "./MoreWorkImageMotion.css";

type MoreWorkImageMotionProps = {
  children: ReactElement;
  className?: string;
  /** Parallax hook for GSAP — on outer host so it won't fight hover transforms. */
  "data-wc-parallax"?: string;
  /** Use GSAP ScrollTrigger entrance (Lenis-safe) instead of Framer whileInView. */
  scrollEntrance?: boolean;
};

const hoverOnlyMotion = {
  whileHover: moreWorkImageMotion.whileHover,
  whileTap: moreWorkImageMotion.whileTap,
} as const;

/** More Work grid image effect: elastic scroll pop-in + spring hover lift. */
export function MoreWorkImageMotion({
  children,
  className = "",
  "data-wc-parallax": dataWcParallax,
  scrollEntrance = false,
}: MoreWorkImageMotionProps) {
  const reduceMotion = useReducedMotion();
  const motionProps = scrollEntrance ? hoverOnlyMotion : moreWorkImageMotion;

  if (reduceMotion) {
    return (
      <div
        className={["wc-more-work-image-motion", className]
          .filter(Boolean)
          .join(" ")}
        data-wc-parallax={dataWcParallax}
      >
        {children}
      </div>
    );
  }

  const motionNode = (
    <motion.div
      className={["wc-more-work-image-motion", className].filter(Boolean).join(" ")}
      data-wc-more-work-entrance={scrollEntrance ? "" : undefined}
      {...motionProps}
    >
      {children as ReactNode}
    </motion.div>
  );

  if (!dataWcParallax) {
    return motionNode;
  }

  return (
    <div
      className="wc-more-work-image-motion__parallax"
      data-wc-parallax={dataWcParallax}
    >
      {motionNode}
    </div>
  );
}

/** GSAP-friendly entrance values (mirrors elastic pop-in for Lenis pages). */
export const moreWorkImageEntrance = {
  from: { scale: 0.7, autoAlpha: 0 },
  to: { scale: 1, autoAlpha: 1, duration: 0.85, ease: "back.out(1.4)" },
} as const;
