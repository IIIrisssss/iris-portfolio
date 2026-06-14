"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolioSlides } from "@/lib/data";
import { cardIntroSpring } from "@/lib/motion";
import { featuredWorkTitle, getSlideLabels } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { RevealMask } from "./RevealMask";

import "./FeaturedWork.css";

const CARD_PUSH = 10;
const STACK_X_STEP = 3;
const STACK_ROT_STEP = 6;
const VISIBLE_STACK = 4;
const CARD_COUNT = portfolioSlides.length;
const EXPAND_MAX_WIDTH = 720;
const RADIANCE_CARD_WIDTH = 700;
const RADIANCE_CARD_HEIGHT = 836;
const CARD_ASPECT = RADIANCE_CARD_WIDTH / RADIANCE_CARD_HEIGHT;
function getExpandedCardSize() {
  const maxW = window.innerWidth * 0.94;
  const maxH = window.innerHeight * 0.88;

  let width = Math.min(maxW, EXPAND_MAX_WIDTH);
  let height = width / CARD_ASPECT;

  if (height > maxH) {
    height = maxH;
    width = height * CARD_ASPECT;
  }

  return { width, height };
}

const TILT_DEG = 40;
const WHEEL_THRESHOLD = 40;
const TOUCH_SWIPE_THRESHOLD = 36;
const MOBILE_NAV_MQ = "(max-width: 767px)";

function isMobilePortfolioNav() {
  return (
    typeof window !== "undefined" && window.matchMedia(MOBILE_NAV_MQ).matches
  );
}

function cardExitOffset(forward: boolean) {
  if (isMobilePortfolioNav()) {
    return { xPercent: forward ? -300 : 300, yPercent: 0 };
  }
  return { xPercent: 0, yPercent: forward ? -300 : 300 };
}

const scaleForIndex = gsap.utils.mapRange(0, CARD_COUNT - 1, 1, 0.72);
const alphaForIndex = gsap.utils.mapRange(0, VISIBLE_STACK - 1, 1, 0.2);

function stackX(index: number) {
  return (index % 2 === 0 ? -1 : 1) * index * STACK_X_STEP;
}

function stackRotation(index: number) {
  if (index === 0) return STACK_ROT_STEP * 0.65;
  const tier = Math.ceil(index / 2);
  return (index % 2 === 1 ? -1 : 1) * tier * STACK_ROT_STEP;
}

function padCounter(index: number) {
  return `0${index + 1} / 0${CARD_COUNT}`;
}

function getStackSlot(cardIndex: number, baseIndex: number) {
  for (let offset = 0; offset < VISIBLE_STACK; offset++) {
    if ((baseIndex + offset) % CARD_COUNT === cardIndex) return offset;
  }
  return -1;
}

function stackProps(index: number) {
  return {
    zIndex: -index,
    y: index * CARD_PUSH,
    x: stackX(index),
    rotation: stackRotation(index),
    scale: scaleForIndex(index),
    autoAlpha: index < VISIBLE_STACK ? alphaForIndex(index) : 0,
    yPercent: 0,
  };
}

function buildInitialStackCss() {
  const rules: string[] = [];

  for (let i = 0; i < CARD_COUNT; i++) {
    const selector = `.portfolio-slider-center:not(.is-stack-ready) .tilt-card-container:nth-child(${i + 1})`;

    if (i >= VISIBLE_STACK) {
      rules.push(`${selector}{visibility:hidden;opacity:0;pointer-events:none;}`);
      continue;
    }

    rules.push(
      `${selector}{z-index:${-i};opacity:${i === 0 ? 1 : 0};visibility:visible;transform:translate3d(0,50px,0) rotate(0deg) scale(0.8);transform-origin:center center;}`,
    );
  }

  return rules.join("");
}

type FeaturedWorkProps = {
  variant?: "hero" | "section";
};

export function FeaturedWork({ variant = "section" }: FeaturedWorkProps) {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsAreaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tagARef = useRef<HTMLHeadingElement>(null);
  const tagBRef = useRef<HTMLHeadingElement>(null);
  const nameARef = useRef<HTMLHeadingElement>(null);
  const nameBRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const portalLayerRef = useRef<HTMLDivElement>(null);
  const originalCardParentRef = useRef<HTMLElement | null>(null);
  const originalCardNextSiblingRef = useRef<ChildNode | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isStackReady, setIsStackReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isExpandedRef = useRef(false);
  const introCompleteRef = useRef(false);
  const expandedCardIndexRef = useRef<number | null>(null);
  const expandFromRectRef = useRef<DOMRect | null>(null);
  const expandFromRotationRef = useRef(0);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const changeCardsRef = useRef<
    (nextIndex: number, scrollingDown: boolean) => void
  >(() => {});
  const isOverCardsRef = useRef(false);
  const touchGestureRef = useRef({
    active: false,
    didSwipe: false,
    lastX: 0,
    lastY: 0,
    accum: 0,
    totalMove: 0,
    lockedAxis: null as "x" | "y" | null,
  });

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  }, []);

  const updateLabels = useCallback(
    (index: number) => {
      const labels = getSlideLabels(portfolioSlides[index], locale);
      if (tagARef.current) tagARef.current.textContent = labels.tagA;
      if (tagBRef.current) tagBRef.current.textContent = labels.tagB;
      if (nameARef.current) nameARef.current.textContent = labels.nameA;
      if (nameBRef.current) nameBRef.current.textContent = labels.nameB;
      if (yearRef.current) yearRef.current.textContent = labels.year;
      if (counterRef.current) counterRef.current.textContent = padCounter(index);
    },
    [locale]
  );

  const finalizeStack = useCallback(
    (cards: HTMLElement[], baseIndex: number) => {
      cards.forEach((card, i) => {
        const slot = getStackSlot(i, baseIndex);

        if (slot === -1) {
          gsap.set(card, {
            ...cardExitOffset(true),
            autoAlpha: 0,
            zIndex: -20 - i,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
          });
          return;
        }

        gsap.set(card, {
          transformOrigin: "center center",
          ...stackProps(slot),
          xPercent: 0,
          yPercent: 0,
        });
      });
    },
    []
  );

  const flattenExpandedCard = useCallback(
    (card: HTMLElement, inner: HTMLElement | null) => {
      gsap.killTweensOf([card, inner].filter(Boolean));

      if (inner) {
        gsap.set(inner, {
          rotationX: 0,
          rotationY: 0,
          rotation: 0,
          scale: 1,
          transformPerspective: 0,
        });
        inner.style.transform = "none";
        inner.style.transformStyle = "flat";
      }

      gsap.set(card, {
        rotation: 0,
        skewX: 0,
        skewY: 0,
        transformOrigin: "50% 50%",
        transformPerspective: 0,
      });
    },
    [],
  );

  const resetCardTilt = useCallback((inner: HTMLElement | null) => {
    if (!inner) return;
    inner.style.removeProperty("transform");
    inner.style.removeProperty("transform-style");
    gsap.set(inner, { transformStyle: "preserve-3d", transformPerspective: 800 });
  }, []);

  const getDimTargets = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return [];

    return [
      heroTitleRef.current,
      section.querySelector<HTMLElement>(".portfolio-work-tag"),
      section.querySelector<HTMLElement>(".portfolio-project-name"),
      counterRef.current,
    ].filter(Boolean) as HTMLElement[];
  }, []);

  const restoreDimTargets = useCallback(() => {
    getDimTargets().forEach((target) => {
      if (target === heroTitleRef.current && currentIndexRef.current > 0) {
        gsap.set(target, { autoAlpha: 0, y: -28 });
        return;
      }
      gsap.to(target, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" });
    });
  }, [getDimTargets]);

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
      if (isExpandedRef.current) return;

      const fromIndex = currentIndexRef.current;
      const clamped =
        ((nextIndex % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
      if (clamped === fromIndex) return;

      isAnimatingRef.current = true;
      currentIndexRef.current = clamped;

      const tl = gsap.timeline({
        onComplete: () => {
          finalizeStack(cards, clamped);
          isAnimatingRef.current = false;
          cardsAreaRef.current?.classList.add("is-pullback-ready");
        },
      });

      if (scrollingDown) {
        if (fromIndex === 0 && clamped !== 0 && heroTitleRef.current) {
          tl.to(heroTitleRef.current, {
            autoAlpha: 0,
            y: -28,
            duration: 0.2,
            ease: "power2.in",
          });
        }

        gsap.set(cards[fromIndex], { zIndex: 50 });

        tl.to(
          cards[fromIndex],
          {
            ...cardExitOffset(true),
            autoAlpha: 0,
            zIndex: 50,
            duration: 0.45,
            ease: "power2.in",
          },
          fromIndex === 0 && clamped !== 0 && heroTitleRef.current ? ">0.02" : 0,
        );

        for (let offset = 0; offset < VISIBLE_STACK; offset++) {
          const cardIndex = (clamped + offset) % CARD_COUNT;
          tl.to(
            cards[cardIndex],
            {
              ...stackProps(offset),
              xPercent: 0,
              yPercent: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            offset === 0 ? "<0.12" : "<0.04",
          );
        }

        if (clamped === 0 && heroTitleRef.current) {
          tl.to(
            heroTitleRef.current,
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "<0.15",
          );
        }
      } else {
        if (isMobilePortfolioNav()) {
          gsap.set(cards[clamped], {
            zIndex: 50,
            ...cardExitOffset(false),
            autoAlpha: 1,
          });
        } else {
          gsap.set(cards[clamped], { zIndex: 50 });
        }

        tl.to(cards[clamped], {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 1,
          zIndex: 50,
          duration: 0.35,
          ease: "power2.out",
        });

        for (let offset = 0; offset < VISIBLE_STACK; offset++) {
          const cardIndex = (clamped + offset) % CARD_COUNT;
          tl.to(
            cards[cardIndex],
            {
              ...stackProps(offset),
              xPercent: 0,
              yPercent: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "<",
          );
        }

        if (clamped === 0 && heroTitleRef.current) {
          tl.to(
            heroTitleRef.current,
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "<0.15",
          );
        } else if (fromIndex === 0 && clamped !== 0 && heroTitleRef.current) {
          tl.to(heroTitleRef.current, {
            autoAlpha: 0,
            y: -28,
            duration: 0.2,
            ease: "power2.in",
          });
        }
      }

      animateTextChange(clamped, scrollingDown);
    },
    [animateTextChange, finalizeStack]
  );

  useEffect(() => {
    changeCardsRef.current = changeCards;
  }, [changeCards]);

  const expandCard = useCallback((cardIndex: number) => {
    if (isExpandedRef.current || isAnimatingRef.current) return;

    const card = cardsRef.current[cardIndex];
    const inner = card?.querySelector<HTMLElement>(".tilt-card");
    const backdrop = backdropRef.current;
    const portalLayer = portalLayerRef.current;
    if (!card || !backdrop || !portalLayer) return;

    expandFromRotationRef.current = Number(gsap.getProperty(card, "rotation")) || 0;
    flattenExpandedCard(card, inner ?? null);

    const rect = card.getBoundingClientRect();
    expandFromRectRef.current = rect;
    originalCardParentRef.current = card.parentElement;
    originalCardNextSiblingRef.current = card.nextSibling;

    isExpandedRef.current = true;
    expandedCardIndexRef.current = cardIndex;
    setIsExpanded(true);
    document.body.classList.remove("portfolio-stack-cursor-active");
    document.body.classList.add("portfolio-lightbox-open");

    gsap.set(card, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      margin: 0,
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      scale: 1,
      zIndex: 2,
      transformOrigin: "center center",
    });
    card.classList.add("is-expanded");
    portalLayer.appendChild(card);

    const slide = portfolioSlides[cardIndex];
    const img = card.querySelector<HTMLImageElement>(".tilt-card__image");
    if (img && slide?.unoptimizedImage) {
      gsap.set(card, { force3D: false, transformPerspective: 0 });
      img.loading = "eager";
      img.decoding = "sync";
      img.sizes = "94vw";
      if (slide.imageWidth) {
        img.srcset = `${slide.images[0]} ${slide.imageWidth}w`;
      }
    }

    const { width: targetWidth, height: targetHeight } = getExpandedCardSize();

    gsap.to(getDimTargets(), {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(backdrop, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(card, {
      autoAlpha: 1,
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      width: targetWidth,
      height: targetHeight,
      rotation: 0,
      duration: 0.55,
      ease: "power3.out",
    });

    cardsRef.current.forEach((otherCard, index) => {
      if (index !== cardIndex && otherCard) {
        gsap.to(otherCard, { autoAlpha: 0, duration: 0.3 });
      }
    });
  }, [flattenExpandedCard, getDimTargets]);

  const closeExpanded = useCallback(() => {
    if (!isExpandedRef.current) return;

    const cardIndex = expandedCardIndexRef.current;
    const card = cardIndex !== null ? cardsRef.current[cardIndex] : null;
    const backdrop = backdropRef.current;
    const fromRect = expandFromRectRef.current;
    if (!card || !backdrop || !fromRect) return;

    const inner = card.querySelector<HTMLElement>(".tilt-card");

    gsap.to(backdrop, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(card, {
      top: fromRect.top,
      left: fromRect.left,
      xPercent: 0,
      yPercent: 0,
      x: 0,
      y: 0,
      width: fromRect.width,
      height: fromRect.height,
      rotation: expandFromRotationRef.current,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        const parent = originalCardParentRef.current ?? cardsAreaRef.current;
        if (parent) {
          if (originalCardNextSiblingRef.current) {
            parent.insertBefore(card, originalCardNextSiblingRef.current);
          } else {
            parent.appendChild(card);
          }
        }
        card.classList.remove("is-expanded");
        resetCardTilt(inner);
        gsap.set(card, {
          clearProps:
            "position,top,left,width,height,zIndex,margin,x,y,xPercent,yPercent,rotation,scale",
        });
        finalizeStack(cardsRef.current.filter(Boolean), currentIndexRef.current);
        restoreDimTargets();
        document.body.classList.remove("portfolio-lightbox-open");
        isExpandedRef.current = false;
        expandedCardIndexRef.current = null;
        expandFromRectRef.current = null;
        originalCardParentRef.current = null;
        originalCardNextSiblingRef.current = null;
        setIsExpanded(false);
      },
    });
  }, [finalizeStack, resetCardTilt, restoreDimTargets]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeExpanded();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded, closeExpanded]);

  useEffect(() => {
    updateLabels(currentIndexRef.current);
  }, [locale, updateLabels]);

  useLayoutEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    let cancelled = false;
    const introCards = cards.slice(0, VISIBLE_STACK);

    const finishIntro = () => {
      if (cancelled || introCompleteRef.current) return;
      introCompleteRef.current = true;

      introCards.forEach((card) => {
        card.style.removeProperty("transform");
        card.style.removeProperty("opacity");
      });

      finalizeStack(cards, currentIndexRef.current);
      cardsAreaRef.current?.classList.add("is-stack-ready");
      cardsAreaRef.current?.classList.add("is-pullback-ready");
      setIsStackReady(true);
      setIntroComplete(true);

      if (heroTitleRef.current) {
        gsap.set(heroTitleRef.current, {
          autoAlpha: currentIndexRef.current === 0 ? 1 : 0,
          y: currentIndexRef.current === 0 ? 0 : -28,
        });
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      finishIntro();
      return () => {
        cancelled = true;
      };
    }

    cards.forEach((card, i) => {
      if (i >= VISIBLE_STACK) {
        gsap.set(card, { autoAlpha: 0, visibility: "hidden" });
      }
    });

    introCards.forEach((card, i) => {
      gsap.killTweensOf(card);
      gsap.set(card, { clearProps: "transform,opacity,visibility" });

      card.style.transformOrigin = "center center";
      card.style.zIndex = String(stackProps(i).zIndex);
      card.style.transform = "translate3d(0px, 50px, 0px) rotate(0deg) scale(0.8)";
      card.style.opacity = i === 0 ? "1" : "0";
    });

    const animations = introCards.map((card, i) => {
      const target = stackProps(i);

      return animate(
        card,
        {
          x: target.x,
          y: target.y,
          rotate: target.rotation,
          scale: target.scale,
          opacity: target.autoAlpha as number,
        },
        {
          ...cardIntroSpring,
          delay: 0.22 + i * 0.08,
        },
      );
    });

    Promise.all(animations.map((animation) => animation.finished))
      .then(finishIntro)
      .catch(() => finishIntro());

    return () => {
      cancelled = true;
      animations.forEach((animation) => animation.stop());
    };
  }, [finalizeStack, locale]);

  useGSAP(
    () => {
      if (!introCompleteRef.current) return;

      const section = sectionRef.current;
      const cards = cardsRef.current.filter(Boolean);
      if (!section || !cards.length) return;

      if (backdropRef.current) {
        gsap.set(backdropRef.current, { autoAlpha: 0 });
      }

      const cardCleanups: Array<() => void> = [];
      const cardsArea = cardsAreaRef.current;
      let wheelAccumulator = 0;
      let pinnedScrollY = 0;

      cards.forEach((card, cardIndex) => {
        const inner = card.querySelector<HTMLElement>(".tilt-card");
        if (!inner) return;

        const slide = portfolioSlides[cardIndex];
        const isSharpImage = Boolean(slide?.unoptimizedImage);

        if (isSharpImage) {
          gsap.set(inner, { transformStyle: "flat", scale: 1 });
        } else {
          gsap.set(inner, { transformStyle: "preserve-3d", transformPerspective: 800 });

          const onMove = (event: MouseEvent) => {
            if (isExpandedRef.current) return;
            const rect = card.getBoundingClientRect();
            const xVal = event.clientX - rect.left;
            const yVal = event.clientY - rect.top;
            const yRotation = TILT_DEG * ((xVal - rect.width / 2) / rect.width);
            const xRotation = -TILT_DEG * ((yVal - rect.height / 2) / rect.height);

            gsap.to(inner, {
              rotationX: xRotation,
              rotationY: yRotation,
              scale: 1.06,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const onLeave = () => {
            if (isExpandedRef.current) return;
            gsap.to(inner, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseleave", onLeave);
          card.addEventListener("mousemove", onMove);

          cardCleanups.push(() => {
            card.removeEventListener("mouseleave", onLeave);
            card.removeEventListener("mousemove", onMove);
          });
        }

        const onClick = () => {
          if (touchGestureRef.current.didSwipe) return;
          expandCard(cardIndex);
        };

        card.addEventListener("click", onClick);
        cardCleanups.push(() => {
          card.removeEventListener("click", onClick);
        });
      });

      if (!cardsArea) return;

      const onCardsEnter = () => {
        isOverCardsRef.current = true;
        pinnedScrollY = window.scrollY;
      };

      const onCardsLeave = () => {
        isOverCardsRef.current = false;
        wheelAccumulator = 0;
      };

      cardsArea.addEventListener("mouseenter", onCardsEnter);
      cardsArea.addEventListener("mouseleave", onCardsLeave);

      const onScrollWhileHovering = () => {
        if (!isOverCardsRef.current || isMobilePortfolioNav()) return;
        if (window.scrollY !== pinnedScrollY) {
          window.scrollTo(0, pinnedScrollY);
        }
      };

      const onWheel = (event: WheelEvent) => {
        if (!isOverCardsRef.current) return;
        if (isExpandedRef.current) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (isAnimatingRef.current) return;

        wheelAccumulator += event.deltaY;
        if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return;

        const delta = wheelAccumulator;
        wheelAccumulator = 0;
        const index = currentIndexRef.current;

        if (delta > 0) {
          changeCardsRef.current((index + 1) % CARD_COUNT, true);
        } else if (delta < 0) {
          changeCardsRef.current(
            (index - 1 + CARD_COUNT) % CARD_COUNT,
            false,
          );
        }
      };

      const resetTouchGesture = () => {
        touchGestureRef.current.active = false;
        touchGestureRef.current.accum = 0;
        touchGestureRef.current.totalMove = 0;
        touchGestureRef.current.lockedAxis = null;
        isOverCardsRef.current = false;
        window.setTimeout(() => {
          touchGestureRef.current.didSwipe = false;
        }, 80);
      };

      const onTouchStart = (event: TouchEvent) => {
        if (isExpandedRef.current) return;
        if (event.touches.length !== 1) return;

        touchGestureRef.current.active = true;
        touchGestureRef.current.didSwipe = false;
        touchGestureRef.current.lastX = event.touches[0].clientX;
        touchGestureRef.current.lastY = event.touches[0].clientY;
        touchGestureRef.current.accum = 0;
        touchGestureRef.current.totalMove = 0;
        touchGestureRef.current.lockedAxis = null;
        isOverCardsRef.current = !isMobilePortfolioNav();
        pinnedScrollY = window.scrollY;
      };

      const onTouchMove = (event: TouchEvent) => {
        const touch = touchGestureRef.current;
        if (!touch.active || isExpandedRef.current) return;
        if (event.touches.length !== 1) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const deltaX = touch.lastX - currentX;
        const deltaY = touch.lastY - currentY;
        touch.lastX = currentX;
        touch.lastY = currentY;

        if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) return;

        const mobileNav = isMobilePortfolioNav();

        if (mobileNav && !touch.lockedAxis) {
          if (
            Math.abs(deltaX) > 8 ||
            Math.abs(deltaY) > 8
          ) {
            touch.lockedAxis =
              Math.abs(deltaX) >= Math.abs(deltaY) ? "x" : "y";
          } else {
            return;
          }
        }

        if (mobileNav && touch.lockedAxis === "y") {
          return;
        }

        touch.totalMove += mobileNav
          ? Math.abs(deltaX)
          : Math.abs(deltaY);
        event.preventDefault();

        if (isAnimatingRef.current) return;

        const delta = mobileNav ? deltaX : deltaY;
        touch.accum += delta;
        if (Math.abs(touch.accum) < TOUCH_SWIPE_THRESHOLD) return;

        touch.didSwipe = true;
        const index = currentIndexRef.current;
        if (touch.accum > 0) {
          changeCardsRef.current((index + 1) % CARD_COUNT, true);
        } else {
          changeCardsRef.current(
            (index - 1 + CARD_COUNT) % CARD_COUNT,
            false,
          );
        }
        touch.accum = 0;
      };

      const onTouchEnd = () => {
        if (touchGestureRef.current.totalMove > TOUCH_SWIPE_THRESHOLD) {
          touchGestureRef.current.didSwipe = true;
        }
        resetTouchGesture();
      };

      window.addEventListener("wheel", onWheel, {
        passive: false,
        capture: true,
      });
      window.addEventListener("scroll", onScrollWhileHovering, {
        passive: true,
      });
      cardsArea.addEventListener("touchstart", onTouchStart, { passive: true });
      cardsArea.addEventListener("touchmove", onTouchMove, { passive: false });
      cardsArea.addEventListener("touchend", onTouchEnd, { passive: true });
      cardsArea.addEventListener("touchcancel", onTouchEnd, { passive: true });

      return () => {
        window.removeEventListener("wheel", onWheel, { capture: true });
        window.removeEventListener("scroll", onScrollWhileHovering);
        cardsArea.removeEventListener("mouseenter", onCardsEnter);
        cardsArea.removeEventListener("mouseleave", onCardsLeave);
        cardsArea.removeEventListener("touchstart", onTouchStart);
        cardsArea.removeEventListener("touchmove", onTouchMove);
        cardsArea.removeEventListener("touchend", onTouchEnd);
        cardsArea.removeEventListener("touchcancel", onTouchEnd);
        cardCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef, dependencies: [locale, expandCard, introComplete] },
  );

  const initialLabels = getSlideLabels(portfolioSlides[0], locale);
  const isHero = variant === "hero";

  return (
    <>
      {isMounted &&
        createPortal(
          <div
            ref={portalLayerRef}
            className={`portfolio-lightbox-layer${isExpanded ? " is-active" : ""}`}
            aria-hidden={!isExpanded}
          >
            <div
              ref={backdropRef}
              className="portfolio-lightbox-backdrop"
              onClick={closeExpanded}
            />
            <button
              type="button"
              className="portfolio-lightbox-close"
              aria-label="Close"
              onClick={closeExpanded}
            >
              ×
            </button>
          </div>,
          document.body
        )}

      <section
      ref={sectionRef}
      id="portfolio-section"
      className={`portfolio-section${isHero ? " portfolio-section--hero" : ""}${isExpanded ? " is-card-expanded" : ""}`}
      aria-label="Featured work"
    >
      <style dangerouslySetInnerHTML={{ __html: buildInitialStackCss() }} />

      {isHero && (
        <RevealMask className="portfolio-hero-title-wrap" delay={0.1}>
          <h2 ref={heroTitleRef} className="portfolio-hero-title section-title">
            {featuredWorkTitle[locale]}
          </h2>
        </RevealMask>
      )}

      <div className="portfolio-slider-layout">
        <div className="portfolio-work-tag">
          <div className="project-tag-heading">
            <RevealMask delay={0.18}>
              <h1 ref={tagARef} className="project-tag-a">
                {initialLabels.tagA}
              </h1>
            </RevealMask>
          </div>
          <div className="project-tag-heading">
            <RevealMask delay={0.24}>
              <h1 ref={tagBRef} className="project-tag-b">
                {initialLabels.tagB}
              </h1>
            </RevealMask>
          </div>
        </div>

        <div
          ref={cardsAreaRef}
          className={`portfolio-slider-center${isStackReady ? " is-stack-ready" : ""}`}
        >
          {portfolioSlides.map((slide, index) => (
            <div
              key={`${slide.nameA}-${slide.nameB}-${index}`}
              ref={(el) => setCardRef(el, index)}
              className={`tilt-card-container${slide.unoptimizedImage ? " tilt-card-container--sharp" : ""}`}
              data-slide-index={index}
            >
              <div className="tilt-card">
                <div className="tilt-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={slide.images[0]}
                    src={slide.images[0]}
                    alt=""
                    width={slide.imageWidth ?? RADIANCE_CARD_WIDTH}
                    height={slide.imageHeight ?? RADIANCE_CARD_HEIGHT}
                    className="tilt-card__image"
                    draggable={false}
                    decoding="sync"
                    fetchPriority={index <= 1 ? "high" : "auto"}
                    sizes="(max-width: 767px) 60vw, min(720px, 42vw)"
                    srcSet={
                      slide.imageWidth
                        ? `${slide.images[0]} ${slide.imageWidth}w`
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <RevealMask className="portfolio-counter-wrap" delay={0.44}>
          <div ref={counterRef} className="portfolio-counter" aria-live="polite">
            {padCounter(0)}
          </div>
        </RevealMask>

        <div className="portfolio-project-name">
          <div className="project-name-heading">
            <RevealMask delay={0.3}>
              <h1 ref={nameARef} className="project-name-a">
                {initialLabels.nameA}
              </h1>
            </RevealMask>
            <RevealMask delay={0.34}>
              <div ref={yearRef} className="project-year">
                {initialLabels.year}
              </div>
            </RevealMask>
          </div>
          <div className="project-name-heading">
            <RevealMask delay={0.38}>
              <h1 ref={nameBRef} className="project-name-b">
                {initialLabels.nameB}
              </h1>
            </RevealMask>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
