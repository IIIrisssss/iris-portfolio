"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { featured } from "@/lib/data";
import { Shuffle } from "./Shuffle";

import "./FeaturedWork.css";

const CLICK_DRAG_THRESHOLD = 8;
const START_INDEX = Math.floor((featured.length - 1) / 2);

const shuffleProps = {
  shuffleDirection: "right" as const,
  duration: 0.35,
  animationMode: "evenodd" as const,
  shuffleTimes: 1,
  stagger: 0.03,
  playOnMount: true,
  triggerOnce: true,
  triggerOnHover: true,
  respectReducedMotion: true,
};

export function FeaturedWork() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(START_INDEX);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const pointerMovedRef = useRef(false);

  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
    duration: 32,
    dragFree: false,
    startIndex: START_INDEX,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const openWork = useCallback(
    (slug: string) => {
      if (pointerMovedRef.current) return;
      router.push(`/work/${slug}`);
    },
    [router]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const scrollToSnap = (index: number) => {
      emblaApi.scrollTo(index, true);
      onSelect();
    };

    scrollToSnap(START_INDEX);
    requestAnimationFrame(() => scrollToSnap(START_INDEX));

    const onReInit = () => {
      scrollToSnap(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);

    const onResize = () => {
      emblaApi.reInit();
    };

    window.addEventListener("resize", onResize);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.rootNode();

    const onPointerDown = (event: PointerEvent) => {
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      pointerMovedRef.current = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      const dx = event.clientX - pointerStartRef.current.x;
      const dy = event.clientY - pointerStartRef.current.y;

      if (Math.hypot(dx, dy) > CLICK_DRAG_THRESHOLD) {
        pointerMovedRef.current = true;
      }
    };

    const onEmblaPointerDown = () => setIsDragging(true);
    const onEmblaPointerUp = () => setIsDragging(false);

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    emblaApi.on("pointerDown", onEmblaPointerDown);
    emblaApi.on("pointerUp", onEmblaPointerUp);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      emblaApi.off("pointerDown", onEmblaPointerDown);
      emblaApi.off("pointerUp", onEmblaPointerUp);
    };
  }, [emblaApi]);

  return (
    <section className="yearbook-showcase" aria-label="Iris's PROJECTS">
      <header className="yearbook-showcase__header">
        <div className="flex w-full flex-col items-center gap-[min(0.5rem,1.5vh)]">
          <h2 className="yearbook-showcase__heading font-display flex w-full flex-col items-center gap-[min(0.5rem,1.5vh)] text-center leading-[0.82] text-[var(--color-on-primary)]">
            <Shuffle
              text="Iris's"
              tag="span"
              className="yearbook-showcase__title-line yearbook-showcase__title-line--small"
              {...shuffleProps}
            />
            <Shuffle
              text="PROJECTS"
              tag="span"
              className="yearbook-showcase__title-line yearbook-showcase__title-line--large"
              {...shuffleProps}
            />
          </h2>
        </div>
      </header>

      <div className="yearbook-showcase__carousel">
        <div
          ref={viewportRef}
          className={`yearbook-showcase__viewport ${isDragging ? "is-dragging" : ""}`}
        >
          <div className="yearbook-showcase__track">
            {featured.map((work, index) => {
              const active = index === selectedIndex;
              const slug = work.slug ?? work.title.toLowerCase();

              return (
                <div
                  key={work.slug ?? work.title}
                  className={`yearbook-showcase__slide ${active ? "is-active" : ""}`}
                >
                  <article
                    className="yearbook-card"
                    style={
                      {
                        "--card-bg": work.bg,
                        "--card-text": work.textColor ?? "#111",
                        "--yb-visual-top": work.visualTop ?? "-30%",
                        "--yb-visual-scale": work.visualScale ?? 0.75,
                        "--yb-visual-rotate": work.visualRotate ?? "0deg",
                      } as CSSProperties
                    }
                  >
                    <div className="yearbook-card__inner">
                      <div className="yearbook-card__visuals">
                        <div className="yearbook-card__visual">
                          <Image
                            src={work.image}
                            alt=""
                            fill
                            sizes="(max-width: 500px) 80vw, 25em"
                            className="yearbook-card__image"
                            draggable={false}
                            priority={index < 3}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="yearbook-card__button"
                        onClick={() => openWork(slug)}
                      >
                        <span className="yearbook-card__button-label">
                          {work.title} read story
                        </span>
                      </button>

                      <div className="yearbook-card__headlines">
                        <h3 className="yearbook-card__title">{work.title}</h3>
                        {work.subtitle ? (
                          <p className="yearbook-card__subtitle">
                            {work.subtitle}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
