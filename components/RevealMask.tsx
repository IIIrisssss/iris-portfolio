"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { easeOutExpo } from "@/lib/motion";

import "./RevealMask.css";

type RevealMaskProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
};

export function RevealMask({
  children,
  className = "",
  delay = 0,
  disabled = false,
}: RevealMaskProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`reveal-mask ${className}`.trim()}>
      <motion.div
        className="reveal-mask__inner"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.85,
          ease: easeOutExpo,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
