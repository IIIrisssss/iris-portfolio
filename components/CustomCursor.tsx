"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import "./CustomCursor.css";

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover)").matches;
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const followerSpringConfig = { damping: 28, stiffness: 150, mass: 0.6 };
  const followerX = useSpring(mouseX, followerSpringConfig);
  const followerY = useSpring(mouseY, followerSpringConfig);

  const CIRCLE_SIZE = 10;
  const circleX = useTransform(followerX, (value) => value - CIRCLE_SIZE / 2);
  const circleY = useTransform(followerY, (value) => value - CIRCLE_SIZE / 2);

  useEffect(() => {
    setMounted(true);
    setEnabled(canUseCustomCursor());
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isClickable);
    };

    const onMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [enabled, mounted, isVisible, mouseX, mouseY]);

  if (!mounted || !enabled) return null;

  return createPortal(
    <motion.div
      className="custom-cursor custom-cursor__blend"
      style={{
        x: circleX,
        y: circleY,
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <motion.svg
        className="custom-cursor__circle"
        width={CIRCLE_SIZE}
        height={CIRCLE_SIZE}
        viewBox="0 0 20 20"
        aria-hidden="true"
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      >
        <circle cx="10" cy="10" r="9" fill="#fff" />
      </motion.svg>
    </motion.div>,
    document.body
  );
}
