"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { WC_EASE_LUXE } from "@/lib/worldcupMotion";

import "../../RevealMask.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealMaskProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
};

/**
 * Scroll-triggered text mask reveal — synced with Lenis + ScrollTrigger.
 */
export function ScrollRevealMask({
  children,
  className = "",
  delay = 0,
  disabled = false,
}: ScrollRevealMaskProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner || reduceMotion || disabled) return;

      gsap.set(inner, { yPercent: 108 });
      gsap.to(inner, {
        yPercent: 0,
        duration: 0.95,
        ease: WC_EASE_LUXE,
        delay,
        scrollTrigger: {
          trigger: wrap,
          start: "top 92%",
          once: true,
        },
      });
    },
    { scope: wrapRef, dependencies: [delay, disabled, reduceMotion] },
  );

  if (reduceMotion || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={wrapRef} className={`reveal-mask ${className}`.trim()}>
      <div ref={innerRef} className="reveal-mask__inner">
        {children}
      </div>
    </div>
  );
}
