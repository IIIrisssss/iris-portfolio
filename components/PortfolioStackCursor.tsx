"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import "./PortfolioStackCursor.css";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

export type StackCursorMode = "default" | "up" | "down";

export type PortfolioStackCursorHandle = {
  setTarget: (
    x: number,
    y: number,
    mode: StackCursorMode,
    visible: boolean,
    dragging?: boolean,
  ) => void;
};

export const PortfolioStackCursor = forwardRef<PortfolioStackCursorHandle>(
  function PortfolioStackCursor(_, ref) {
    const rootRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef({
      x: 0,
      y: 0,
      mode: "default" as StackCursorMode,
      visible: false,
      dragging: false,
    });
    const renderedRef = useRef({ x: 0, y: 0 });

    useImperativeHandle(ref, () => ({
      setTarget(x, y, mode, visible, dragging = false) {
        targetRef.current = { x, y, mode, visible, dragging };
      },
    }));

    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;

      let rafId = 0;

      const render = () => {
        const target = targetRef.current;
        const rendered = renderedRef.current;

        rendered.x = lerp(rendered.x, target.x, 0.22);
        rendered.y = lerp(rendered.y, target.y, 0.18);

        root.style.transform = `translate3d(${rendered.x}px, ${rendered.y}px, 0)`;
        root.classList.toggle("is-visible", target.visible);
        root.classList.toggle("is-dragging", target.dragging);
        root.classList.toggle("portfolio-stack-cursor--up", target.mode === "up");
        root.classList.toggle(
          "portfolio-stack-cursor--down",
          target.mode === "down",
        );

        rafId = requestAnimationFrame(render);
      };

      rafId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(rafId);
    }, []);

    if (typeof document === "undefined") return null;

    return createPortal(
      <div
        ref={rootRef}
        className="portfolio-stack-cursor"
        aria-hidden="true"
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle
            className="portfolio-stack-cursor__ring"
            cx="24"
            cy="24"
            r="14"
          />
          <path
            className="portfolio-stack-cursor__arrow portfolio-stack-cursor__arrow--up"
            d="M24 30V18M24 18l-5 5M24 18l5 5"
          />
          <path
            className="portfolio-stack-cursor__arrow portfolio-stack-cursor__arrow--down"
            d="M24 18v12M24 30l-5-5M24 30l5-5"
          />
        </svg>
      </div>,
      document.body,
    );
  },
);
