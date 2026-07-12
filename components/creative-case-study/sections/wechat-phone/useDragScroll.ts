"use client";

import { useEffect, useRef } from "react";

type DragScrollOptions = {
  /** Wheel delta multiplier — lower feels heavier. */
  wheelFactor?: number;
  /** Drag distance multiplier. */
  dragFactor?: number;
};

export function useDragScroll<T extends HTMLElement>(
  options: DragScrollOptions = {},
) {
  const ref = useRef<T | null>(null);
  const state = useRef({
    dragging: false,
    pointerId: -1,
    startY: 0,
    startScrollTop: 0,
    velocity: 0,
    lastY: 0,
    lastTime: 0,
    raf: 0,
  });

  const { wheelFactor = 0.85, dragFactor = 1.05 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stopMomentum = () => {
      if (state.current.raf) {
        cancelAnimationFrame(state.current.raf);
        state.current.raf = 0;
      }
    };

    const runMomentum = () => {
      const s = state.current;
      if (Math.abs(s.velocity) < 0.15) {
        s.velocity = 0;
        s.raf = 0;
        return;
      }
      el.scrollTop -= s.velocity;
      s.velocity *= 0.92;
      s.raf = requestAnimationFrame(runMomentum);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      stopMomentum();
      state.current.dragging = true;
      state.current.pointerId = event.pointerId;
      state.current.startY = event.clientY;
      state.current.startScrollTop = el.scrollTop;
      state.current.lastY = event.clientY;
      state.current.lastTime = performance.now();
      state.current.velocity = 0;
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      const s = state.current;
      if (!s.dragging || event.pointerId !== s.pointerId) return;

      const delta = (event.clientY - s.startY) * dragFactor;
      el.scrollTop = s.startScrollTop - delta;

      const now = performance.now();
      const dt = now - s.lastTime;
      if (dt > 0) {
        s.velocity = ((event.clientY - s.lastY) / dt) * 16 * dragFactor;
      }
      s.lastY = event.clientY;
      s.lastTime = now;
    };

    const endDrag = (event: PointerEvent) => {
      const s = state.current;
      if (!s.dragging || event.pointerId !== s.pointerId) return;
      s.dragging = false;
      el.releasePointerCapture(event.pointerId);
      el.classList.remove("is-dragging");
      stopMomentum();
      s.raf = requestAnimationFrame(runMomentum);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      stopMomentum();
      el.scrollTop += event.deltaY * wheelFactor;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stopMomentum();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("wheel", onWheel);
    };
  }, [dragFactor, wheelFactor]);

  return ref;
}
