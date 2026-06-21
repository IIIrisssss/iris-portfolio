"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projectsList } from "@/lib/data";
import {
  estimateCardSize,
  getProjectCardLayouts,
} from "@/lib/projectScatterLayouts";
import { createSpring2D } from "@/lib/spring";
import { RevealMask } from "./RevealMask";
import "./ProjectsList.css";

const PREVIEW_COUNT = 3;
const POINTER_INFLUENCE = 0.36;

type ScatterItem = {
  x: number;
  y: number;
  r: number;
  velocity: { x: number; y: number };
  spring: ReturnType<typeof createSpring2D>;
};

function createScatterItems(): ScatterItem[] {
  return Array.from({ length: PREVIEW_COUNT }, () => ({
    x: 0,
    y: 0,
    r: 0,
    velocity: { x: 0, y: 0 },
    spring: createSpring2D(),
  }));
}

function applyScatterStyles(
  node: HTMLImageElement | null,
  item: ScatterItem,
  index: number,
) {
  if (!node) return;

  node.style.setProperty("--idx", String(index));
  node.style.setProperty("--offsetX", String(item.spring.current.x));
  node.style.setProperty("--offsetY", String(item.spring.current.y));
  node.style.setProperty("--rotation", String(item.r));
  node.style.setProperty(
    "--velocity",
    String(item.spring.velocity.x - item.spring.velocity.y),
  );
}

function applyLayoutToItems(
  items: ScatterItem[],
  layouts: ReturnType<typeof getProjectCardLayouts>,
) {
  items.forEach((item, index) => {
    const layout = layouts[index];
    if (!layout) return;

    item.r = layout.r;
    item.velocity.x = 0;
    item.velocity.y = 0;
    item.spring.target.x = layout.x;
    item.spring.target.y = layout.y;
    item.spring.current.x = layout.x;
    item.spring.current.y = layout.y;
    item.spring.velocity.x = 0;
    item.spring.velocity.y = 0;
  });
}

export function ProjectsList() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const itemsRef = useRef<ScatterItem[]>(createScatterItems());
  const cardSizeRef = useRef(120);
  const pointerRef = useRef({ x: 0, y: 0, movementX: 0, movementY: 0 });
  const viewportRef = useRef({ width: 1, height: 1 });
  const visibleRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorY, setAnchorY] = useState("50%");
  const [showPreviews, setShowPreviews] = useState(false);
  const [popTick, setPopTick] = useState(0);

  const activeProject = projectsList[activeIndex];

  const previewProjects = useMemo(
    () =>
      activeProject
        ? Array.from({ length: PREVIEW_COUNT }, () => activeProject)
        : [],
    [activeProject],
  );

  const syncImageAnchors = useCallback(() => {
    imageRefs.current.forEach((node, index) => {
      const item = itemsRef.current[index];
      if (!node || !item) return;

      try {
        const { x, y, width, height } = node.getBoundingClientRect();
        item.x = x + width * 0.5;
        item.y = y + window.scrollY + height * 0.5;
      } catch {
        /* ignore layout read errors */
      }
    });
  }, []);

  const setProjectLayout = useCallback(
    (projectIndex: number, listWidth: number) => {
      const cardSize = estimateCardSize(listWidth);
      cardSizeRef.current = cardSize;

      const layouts = getProjectCardLayouts(projectIndex, cardSize);
      applyLayoutToItems(itemsRef.current, layouts);

      itemsRef.current.forEach((item, index) => {
        item.velocity.x = (index - 1) * 4;
        item.velocity.y = -8 - index * 2;
      });

      imageRefs.current.forEach((node, index) => {
        applyScatterStyles(node, itemsRef.current[index], index);
      });
    },
    [],
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    setProjectLayout(activeIndex, list.getBoundingClientRect().width);
  }, [activeIndex, setProjectLayout]);

  useEffect(() => {
    const updateViewport = () => {
      viewportRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const list = listRef.current;
      if (list) {
        setProjectLayout(activeIndex, list.getBoundingClientRect().width);
      }
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, [activeIndex, setProjectLayout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    syncImageAnchors();
  }, [previewProjects, syncImageAnchors]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        movementX: event.movementX,
        movementY: event.movementY,
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    let last = performance.now();

    const tick = (now: number) => {
      frameRef.current = requestAnimationFrame(tick);

      if (!visibleRef.current) {
        last = now;
        pointerRef.current.movementX = 0;
        pointerRef.current.movementY = 0;
        return;
      }

      const delta = Math.min((now - last) / 16.67, 2);
      last = now;

      const { x, y, movementX, movementY } = pointerRef.current;
      const { width, height } = viewportRef.current;

      itemsRef.current.forEach((item) => {
        item.velocity.x *= 0.9;
        item.velocity.y *= 0.9;

        item.spring.current.x += item.velocity.x;
        item.spring.current.y += item.velocity.y;
        item.spring.update(delta);

        const pullX = (x - (item.x + item.spring.target.x)) / width;
        const pullY = (y - (item.y + item.spring.target.y)) / height;
        const distance = Math.hypot(pullX * 2, pullY * 2);
        const influence = Math.pow(Math.max(0, 1 - distance), 4) * POINTER_INFLUENCE;

        item.velocity.x += movementX * influence;
        item.velocity.y += movementY * influence;
      });

      itemsRef.current.forEach((item, index) => {
        applyScatterStyles(imageRefs.current[index], item, index);
      });

      pointerRef.current.movementX = 0;
      pointerRef.current.movementY = 0;
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleProjectEnter = (
    event:
      | React.PointerEvent<HTMLParagraphElement>
      | React.TouchEvent<HTMLParagraphElement>,
    index: number,
  ) => {
    setActiveIndex(index);
    setShowPreviews(true);
    setPopTick((tick) => tick + 1);

    const list = listRef.current;
    const title = event.currentTarget;

    if (list) {
      const listRect = list.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const titleCenterY = titleRect.top + titleRect.height / 2 - listRect.top;
      setAnchorY(`${titleCenterY}px`);
      setProjectLayout(index, listRect.width);
    }

    window.requestAnimationFrame(syncImageAnchors);
  };

  return (
    <section
      ref={rootRef}
      className="projects"
      aria-label="Projects"
      onTouchStart={() => undefined}
    >
      <RevealMask delay={0.52}>
        <h2>Projects</h2>
      </RevealMask>

      <ul
        ref={listRef}
        className={`projects__list${showPreviews ? " is-active" : ""}`}
        style={{ "--anchor-y": anchorY } as React.CSSProperties}
        onPointerLeave={() => setShowPreviews(false)}
      >
        {projectsList.map((project, index) => (
          <li key={project.slug} className="project__list-item">
            <RevealMask delay={0.58 + index * 0.05}>
              <p
                className="project__title"
                onPointerEnter={(event) => handleProjectEnter(event, index)}
                onTouchStart={(event) => handleProjectEnter(event, index)}
              >
                <a href={`/about#${project.slug}`}>{project.title}</a>
              </p>
            </RevealMask>
          </li>
        ))}

        {previewProjects.map((project, index) => {
          const scatter = itemsRef.current[index];
          if (!scatter) return null;

          return (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={`${activeProject?.slug ?? "project"}-preview-${index}-${popTick}`}
              ref={(node) => {
                imageRefs.current[index] = node;
                applyScatterStyles(node, scatter, index);
              }}
              className="projects__preview"
              src={project.image}
              alt=""
              width={200}
              height={200}
              sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, 200px"
              draggable={false}
            />
          );
        })}
      </ul>
    </section>
  );
}
