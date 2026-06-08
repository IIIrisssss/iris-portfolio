"use client";

import { motion, type Variants } from "framer-motion";
import { elastic } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: (stagger: number = 0.1) => ({
    transition: { staggerChildren: stagger },
  }),
};

const word: Variants = {
  hidden: { scaleY: 0, y: "0.25em", opacity: 0 },
  visible: { scaleY: 1, y: 0, opacity: 1, transition: elastic },
};

type Props = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
};

export function SplitWords({
  text,
  className = "",
  stagger = 0.1,
  delay = 0,
  as = "span",
}: Props) {
  const words = text.split(" ");
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-visible align-bottom"
        >
          <motion.span
            variants={word}
            className="inline-block origin-bottom will-change-transform"
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
