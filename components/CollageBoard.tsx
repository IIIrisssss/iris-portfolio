"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  COLLAGE_DESIGN_HEIGHT,
  COLLAGE_DESIGN_WIDTH,
  COLLAGE_MIN_CARD_SCREEN,
  COLLAGE_MIN_SQUARE_DESIGN,
  clampCollagePosition,
  collageBoardItems,
  getVisibleDragBounds,
  type CollageItem,
} from "@/lib/collageBoard";
import { RevealMask } from "./RevealMask";
import "./CollageBoard.css";

type DragContext = {
  viewport: HTMLDivElement;
  scale: number;
};

function getClientXY(event: MouseEvent | TouchEvent) {
  if ("touches" in event && event.touches.length > 0) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }
  if ("changedTouches" in event && event.changedTouches.length > 0) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  }
  return { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };
}

function attachDrag(
  element: HTMLElement,
  getContext: () => DragContext | null,
  rotate: number,
  onDragChange: (dragging: boolean) => void,
) {
  let startX = 0;
  let startY = 0;

  const clampPosition = (left: number, top: number) => {
    const context = getContext();
    if (!context) return { left, top };

    const { width, height } = context.viewport.getBoundingClientRect();
    const bounds = getVisibleDragBounds(
      width,
      height,
      context.scale,
      element.offsetWidth,
      element.offsetHeight,
      rotate,
    );

    return clampCollagePosition(left, top, bounds);
  };

  const moveDrag = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();

    const context = getContext();
    if (!context) return;

    const pos = getClientXY(event);
    const deltaX = startX - pos.x;
    const deltaY = startY - pos.y;
    startX = pos.x;
    startY = pos.y;

    const nextLeft = element.offsetLeft - deltaX / context.scale;
    const nextTop = element.offsetTop - deltaY / context.scale;
    const clamped = clampPosition(nextLeft, nextTop);

    element.style.left = `${clamped.left}px`;
    element.style.top = `${clamped.top}px`;
  };

  const stopDrag = () => {
    onDragChange(false);
    document.removeEventListener("mousemove", moveDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", moveDrag);
    document.removeEventListener("touchend", stopDrag);
  };

  const startDrag = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    onDragChange(true);

    const pos = getClientXY(event);
    startX = pos.x;
    startY = pos.y;

    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", moveDrag, { passive: false });
    document.addEventListener("touchend", stopDrag);
  };

  element.addEventListener("mousedown", startDrag);
  element.addEventListener("touchstart", startDrag, { passive: false });

  return () => {
    stopDrag();
    element.removeEventListener("mousedown", startDrag);
    element.removeEventListener("touchstart", startDrag);
  };
}

function CollageItemView({ item }: { item: CollageItem }) {
  const itemClassName = [
    "collage-board__item",
    item.kind === "polaroid" ? "collage-board__item--polaroid" : "",
    item.kind === "text" ? "collage-board__item--text" : "",
    item.kind === "sticker" ? "collage-board__item--sticker" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={itemClassName}
      data-collage-item={item.id}
      data-collage-rotate={item.rotate}
      aria-label={item.alt}
      style={{
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height,
        zIndex: item.zIndex,
        transform: `rotate(${item.rotate}deg)`,
      }}
    >
      <span className="collage-board__float collage-board__item--floating">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt=""
          className="collage-board__media"
          draggable={false}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      </span>
    </button>
  );
}

export function CollageBoard() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);

  const getDragContext = useCallback((): DragContext | null => {
    const viewport = viewportRef.current;
    if (!viewport) return null;

    return {
      viewport,
      scale: scaleRef.current,
    };
  }, []);

  const updateScale = useCallback(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;

    const { width } = viewport.getBoundingClientRect();
    const widthScale = width / COLLAGE_DESIGN_WIDTH;
    const minCardScale =
      COLLAGE_MIN_CARD_SCREEN / COLLAGE_MIN_SQUARE_DESIGN;
    const scale = Math.max(widthScale, minCardScale);

    scaleRef.current = scale;
    canvas.style.setProperty("--collage-scale", String(scale));
    viewport.style.setProperty(
      "--collage-viewport-height",
      `${COLLAGE_DESIGN_HEIGHT * scale}px`,
    );
  }, []);

  const clampAllItems = useCallback(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;

    const { width, height } = viewport.getBoundingClientRect();
    const scale = scaleRef.current;

    canvas.querySelectorAll<HTMLElement>("[data-collage-item]").forEach((element) => {
      const rotate = Number.parseFloat(
        element.dataset.collageRotate ?? "0",
      );
      const bounds = getVisibleDragBounds(
        width,
        height,
        scale,
        element.offsetWidth,
        element.offsetHeight,
        rotate,
      );
      const clamped = clampCollagePosition(
        element.offsetLeft,
        element.offsetTop,
        bounds,
      );

      element.style.left = `${clamped.left}px`;
      element.style.top = `${clamped.top}px`;
    });
  }, []);

  useEffect(() => {
    updateScale();
    clampAllItems();

    const onResize = () => {
      updateScale();
      clampAllItems();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampAllItems, updateScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const items = canvas.querySelectorAll<HTMLElement>("[data-collage-item]");
    const cleanups: Array<() => void> = [];

    items.forEach((element) => {
      element
        .querySelector(".collage-board__float")
        ?.classList.add("collage-board__item--floating");

      const rotate = Number.parseFloat(element.dataset.collageRotate ?? "0");

      cleanups.push(
        attachDrag(element, getDragContext, rotate, (dragging) => {
          element.classList.toggle("is-dragging", dragging);
          element
            .querySelector(".collage-board__float")
            ?.classList.toggle("collage-board__item--floating", !dragging);
        }),
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [getDragContext]);

  return (
    <section className="collage-board" aria-label="Creative collage">
      <header className="collage-board__header">
        <RevealMask delay={0.12}>
          <h2 className="collage-board__title">Beloved Brands</h2>
        </RevealMask>
        <RevealMask delay={0.18}>
          <p className="collage-board__subtitle">
            Drag the polaroids — inspired by{" "}
            <a
              href="https://isadeburgh.com/?ref=land-book.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[rgba(44,44,44,0.35)] underline-offset-4"
            >
              Isa de Burgh
            </a>
          </p>
        </RevealMask>
      </header>

      <div ref={viewportRef} className="collage-board__viewport">
        <div ref={canvasRef} className="collage-board__canvas">
          {collageBoardItems.map((item) => (
            <CollageItemView key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
