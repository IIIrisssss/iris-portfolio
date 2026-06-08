"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

type ScrambledTextProps = {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "p" | "span";
};

export function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  as = "p",
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<Element[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const textEl = root?.firstElementChild;
    if (!textEl) return;

    const split = SplitText.create(textEl, {
      type: "chars",
      charsClass: "char",
    });
    charsRef.current = split.chars;

    charsRef.current.forEach((char) => {
      gsap.set(char, {
        display: "inline-block",
        attr: { "data-content": char.innerHTML },
      });
    });

    const handleMove = (event: PointerEvent) => {
      charsRef.current.forEach((char) => {
        const { left, top, width, height } = char.getBoundingClientRect();
        const dx = event.clientX - (left + width / 2);
        const dy = event.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(char, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: (char as HTMLElement).dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    root.addEventListener("pointermove", handleMove);

    return () => {
      root.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className="scrambled-text">
      {createElement(as, { className, style }, children)}
    </div>
  );
}
