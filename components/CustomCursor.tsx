"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "./CustomCursor.css";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover)").matches;
}

export function CustomCursor() {
  const innerRef = useRef<SVGCircleElement>(null);
  const outerRef = useRef<SVGCircleElement>(null);
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(canUseCustomCursor());
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    const cursor = { x: 0, y: 0 };
    const rendered = { x: 0, y: 0 };
    let rafId = 0;
    let visible = false;

    const render = () => {
      rendered.x = lerp(rendered.x, cursor.x, 0.2);
      rendered.y = lerp(rendered.y, cursor.y, 0.15);

      inner.setAttribute("cx", String(rendered.x));
      inner.setAttribute("cy", String(rendered.y));
      outer.setAttribute("cx", String(rendered.x));
      outer.setAttribute("cy", String(rendered.y));

      rafId = requestAnimationFrame(render);
    };

    const onMouseMove = (event: MouseEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;

      if (!visible) {
        visible = true;
        inner.style.opacity = "1";
        outer.style.opacity = "1";
        rendered.x = cursor.x;
        rendered.y = cursor.y;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.body.classList.add("custom-cursor-enabled");

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [enabled, mounted]);

  if (!mounted || !enabled) return null;

  return createPortal(
    <svg
      aria-hidden="true"
      className="custom-cursor custom-cursor--outer"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <circle ref={outerRef} className="custom-cursor__outer" cx="24" cy="24" r="10" />
      <circle ref={innerRef} className="custom-cursor__inner" cx="24" cy="24" r="4" />
    </svg>,
    document.body
  );
}
