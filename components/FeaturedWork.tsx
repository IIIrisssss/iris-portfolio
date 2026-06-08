"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolioSlides } from "@/lib/data";

import "./FeaturedWork.css";

const CARD_PUSH = 20;
const CARD_COUNT = portfolioSlides.length;
const TILT_DEG = 40;

const scaleForIndex = gsap.utils.mapRange(0, CARD_COUNT - 1, 1, 0.75);
const alphaForIndex = gsap.utils.mapRange(0, CARD_COUNT - 1, 1, 0.25);

function padCounter(index: number) {
  return `0${index + 1} / 0${CARD_COUNT}`;
}

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsAreaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tagARef = useRef<HTMLHeadingElement>(null);
  const tagBRef = useRef<HTMLHeadingElement>(null);
  const nameARef = useRef<HTMLHeadingElement>(null);
  const nameBRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const changeCardsRef = useRef<
    (nextIndex: number, scrollingDown: boolean) => void
  >(() => {});
  const isOverCardsRef = useRef(false);
  const imageTimelinesRef = useRef<gsap.core.Timeline[]>([]);

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  }, []);

  const updateLabels = useCallback((index: number) => {
    const slide = portfolioSlides[index];
    if (tagARef.current) tagARef.current.textContent = slide.tagA;
    if (tagBRef.current) tagBRef.current.textContent = slide.tagB;
    if (nameARef.current) nameARef.current.textContent = slide.nameA;
    if (nameBRef.current) nameBRef.current.textContent = slide.nameB;
    if (yearRef.current) yearRef.current.textContent = slide.year;
    if (counterRef.current) counterRef.current.textContent = padCounter(index);
  }, []);

  const applyStackLayout = useCallback((cards: HTMLElement[]) => {
    gsap.set(cards, {
      transformOrigin: "center center",
      zIndex: (i) => -i,
      y: (i) => i * CARD_PUSH,
      scale: (i) => scaleForIndex(i),
      autoAlpha: (i) => (i < 3 ? alphaForIndex(i) : 0),
      yPercent: 0,
    });
  }, []);

  const animateTextChange = useCallback(
    (index: number, scrollingDown: boolean) => {
      const targets = [
        tagARef.current,
        tagBRef.current,
        nameARef.current,
        nameBRef.current,
        yearRef.current,
      ].filter(Boolean) as HTMLElement[];

      const tl = gsap.timeline();
      tl.to(targets, {
        yPercent: scrollingDown ? -100 : 100,
        duration: 0.25,
        stagger: 0.1,
        onComplete: () => updateLabels(index),
      });
      tl.set(targets, { yPercent: scrollingDown ? 100 : -100 });
      tl.to(targets, { yPercent: 0, duration: 0.25, stagger: 0.1 });
    },
    [updateLabels]
  );

  const changeCards = useCallback(
    (nextIndex: number, scrollingDown: boolean) => {
      const cards = cardsRef.current.filter(Boolean);
      const section = sectionRef.current;
      if (!cards.length || !section || isAnimatingRef.current) return;

      const clamped = Math.max(0, Math.min(CARD_COUNT - 1, nextIndex));
      if (clamped === currentIndexRef.current) return;

      isAnimatingRef.current = true;
      const fromIndex = currentIndexRef.current;
      currentIndexRef.current = clamped;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      if (scrollingDown) {
        for (let i = fromIndex + 1; i < cards.length; i++) {
          const prev = cards[i - 1];
          tl.to(
            cards[i],
            {
              autoAlpha: gsap.getProperty(prev, "opacity"),
              y: gsap.getProperty(prev, "y"),
              scale: gsap.getProperty(prev, "scale"),
              zIndex: gsap.getProperty(prev, "zIndex"),
            },
            "<"
          );
        }
        tl.to(
          cards[fromIndex],
          { yPercent: -300, zIndex: 99, duration: 0.45, ease: "power2.in" },
          "<"
        );
      } else {
        tl.to(cards[clamped], { yPercent: 0, duration: 0.35, ease: "power2.out" });
        tl.to(
          cards.slice(clamped),
          {
            zIndex: (i) => -i,
            y: (i) => i * CARD_PUSH,
            scale: (i) => scaleForIndex(i),
            autoAlpha: (i) => (i < 3 ? alphaForIndex(i) : 0),
            duration: 0.35,
            ease: "power2.out",
          },
          "<"
        );
      }

      animateTextChange(clamped, scrollingDown);
    },
    [animateTextChange]
  );

  changeCardsRef.current = changeCards;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = cardsRef.current.filter(Boolean);
      if (!section || !cards.length) return;

      updateLabels(0);
      applyStackLayout(cards);

      imageTimelinesRef.current = [];
      const cardCleanups: Array<() => void> = [];

      cards.forEach((card, cardIndex) => {
        const inner = card.querySelector<HTMLElement>(".tilt-card");
        if (!inner) return;

        gsap.set(inner, { transformStyle: "preserve-3d", transformPerspective: 800 });

        const images = card.querySelectorAll<HTMLElement>(".tilt-card__image");
        const cycle = gsap.timeline({ paused: true, repeat: -1 });
        gsap.set(images, { autoAlpha: 0 });
        gsap.set(images[0], { autoAlpha: 1 });
        for (let i = 1; i < images.length; i++) {
          cycle.add(() => gsap.set(images[i], { autoAlpha: 1 }));
          cycle.add(() => gsap.set(images[i - 1], { autoAlpha: 0 }), "+=0");
          cycle.to({}, { duration: 0.9 });
        }
        cycle.add(() => {
          gsap.set(images, { autoAlpha: 0 });
          gsap.set(images[0], { autoAlpha: 1 });
        });
        imageTimelinesRef.current[cardIndex] = cycle;

        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const xVal = event.clientX - rect.left;
          const yVal = event.clientY - rect.top;
          const yRotation = TILT_DEG * ((xVal - rect.width / 2) / rect.width);
          const xRotation = -TILT_DEG * ((yVal - rect.height / 2) / rect.height);

          gsap.to(inner, {
            rotationX: xRotation,
            rotationY: yRotation,
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out",
          });

          if (cursorRef.current) {
            gsap.to(cursorRef.current, {
              x: event.clientX + 16,
              y: event.clientY + 16,
              autoAlpha: 1,
              duration: 0.2,
            });
          }
        };

        const onLeave = () => {
          gsap.to(inner, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          });
          if (cursorRef.current) {
            gsap.to(cursorRef.current, { autoAlpha: 0, duration: 0.2 });
          }
          cycle.pause(0);
        };

        const onEnter = () => cycle.play();

        const onDown = () => gsap.to(inner, { scale: 0.97, duration: 0.15 });
        const onUp = () => gsap.to(inner, { scale: 1.08, duration: 0.15 });

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mousedown", onDown);
        card.addEventListener("mouseup", onUp);

        cardCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mousedown", onDown);
          card.removeEventListener("mouseup", onUp);
        });
      });

      const cardsArea = cardsAreaRef.current;
      let wheelAccumulator = 0;
      let pinnedScrollY = 0;
      const WHEEL_THRESHOLD = 40;

      const onCardsEnter = () => {
        isOverCardsRef.current = true;
        pinnedScrollY = window.scrollY;
      };

      const onCardsLeave = () => {
        isOverCardsRef.current = false;
        wheelAccumulator = 0;
      };

      cardsArea?.addEventListener("mouseenter", onCardsEnter);
      cardsArea?.addEventListener("mouseleave", onCardsLeave);

      const onScrollWhileHovering = () => {
        if (!isOverCardsRef.current) return;
        if (window.scrollY !== pinnedScrollY) {
          window.scrollTo(0, pinnedScrollY);
        }
      };

      const onWheel = (event: WheelEvent) => {
        if (!isOverCardsRef.current) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (isAnimatingRef.current) return;

        wheelAccumulator += event.deltaY;
        if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return;

        const delta = wheelAccumulator;
        wheelAccumulator = 0;
        const index = currentIndexRef.current;

        if (delta > 0 && index < CARD_COUNT - 1) {
          changeCardsRef.current(index + 1, true);
        } else if (delta < 0 && index > 0) {
          changeCardsRef.current(index - 1, false);
        }
      };

      window.addEventListener("wheel", onWheel, {
        passive: false,
        capture: true,
      });
      window.addEventListener("scroll", onScrollWhileHovering, {
        passive: true,
      });

      return () => {
        window.removeEventListener("wheel", onWheel, { capture: true });
        window.removeEventListener("scroll", onScrollWhileHovering);
        cardsArea?.removeEventListener("mouseenter", onCardsEnter);
        cardsArea?.removeEventListener("mouseleave", onCardsLeave);
        imageTimelinesRef.current.forEach((tl) => tl.kill());
        cardCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="portfolio-section"
      className="portfolio-section"
      aria-label="Featured work"
    >
      <div className="portfolio-slider-layout">
        <div className="portfolio-work-tag">
          <div className="project-tag-heading">
            <h1 ref={tagARef} className="project-tag-a">
              {portfolioSlides[0].tagA}
            </h1>
          </div>
          <div className="project-tag-heading">
            <h1 ref={tagBRef} className="project-tag-b">
              {portfolioSlides[0].tagB}
            </h1>
          </div>
        </div>

        <div ref={cardsAreaRef} className="portfolio-slider-center">
          {portfolioSlides.map((slide, index) => (
            <div
              key={slide.href}
              ref={(el) => setCardRef(el, index)}
              className="tilt-card-container"
            >
              <div className="tilt-card">
                <a
                  href={slide.href}
                  className="tilt-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${slide.nameA} ${slide.nameB}`}
                >
                  {slide.images.map((src, imageIndex) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={480}
                      height={580}
                      className="tilt-card__image"
                      priority={index === 0 && imageIndex === 0}
                      draggable={false}
                    />
                  ))}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-project-name">
          <div className="project-name-heading">
            <h1 ref={nameARef} className="project-name-a">
              {portfolioSlides[0].nameA}
            </h1>
            <div ref={yearRef} className="project-year">
              {portfolioSlides[0].year}
            </div>
          </div>
          <div className="project-name-heading">
            <h1 ref={nameBRef} className="project-name-b">
              {portfolioSlides[0].nameB}
            </h1>
          </div>
        </div>

        <div ref={counterRef} className="portfolio-counter" aria-live="polite">
          {padCounter(0)}
        </div>
      </div>

      <div ref={cursorRef} className="portfolio-cursor" aria-hidden>
        SHOW
      </div>
    </section>
  );
}
