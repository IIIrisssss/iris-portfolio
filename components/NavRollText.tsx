"use client";

import { useRef, type ReactNode } from "react";

import "./NavRollText.css";

type NavRollTextProps = {
  text: string;
  rollRef: React.RefObject<HTMLSpanElement | null>;
  className?: string;
};

type NavRollSurfaceProps = {
  children: ReactNode;
  rollRef: React.RefObject<HTMLSpanElement | null>;
  className?: string;
};

export function useRollHover() {
  const rollRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onMouseEnter = () => {
    const el = rollRef.current;
    if (!el) return;

    el.classList.remove("is-on");
    void el.offsetWidth;
    el.classList.add("is-on");

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      el.classList.remove("is-on");
    }, 400);
  };

  return { rollRef, onMouseEnter };
}

export function NavRollText({ text, rollRef, className = "" }: NavRollTextProps) {
  return (
    <span
      ref={rollRef}
      className={`nav-roll nav-roll--text ${className}`.trim()}
      aria-hidden
    >
      <span className="nav-roll__outer">
        <span className="nav-roll__translate">
          <span className="nav-roll__line">{text}</span>
          <span className="nav-roll__line nav-roll__line--dup">{text}</span>
        </span>
      </span>
    </span>
  );
}

export function NavRollSurface({
  children,
  rollRef,
  className = "",
}: NavRollSurfaceProps) {
  return (
    <span
      ref={rollRef}
      className={`nav-roll nav-roll--surface ${className}`.trim()}
      aria-hidden
    >
      <span className="nav-roll__outer">
        <span className="nav-roll__translate">
          <span className="nav-roll__line">{children}</span>
          <span className="nav-roll__line nav-roll__line--dup">{children}</span>
        </span>
      </span>
    </span>
  );
}
