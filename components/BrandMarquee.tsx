"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { brandMarqueeRowLeft, brandMarqueeRowRight } from "@/lib/data";
import type { BrandMarqueeItem } from "@/lib/data";

import "./BrandMarquee.css";

function MarqueeRow({
  items,
  direction,
}: {
  items: BrandMarqueeItem[];
  direction: "left" | "right";
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>(
        `.brand-marquee__track--${direction}`,
        rowRef.current
      );

      if (!tracks.length) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) return;

      let lastScrollPos = window.pageYOffset;
      let isScrollingDown = true;

      const tween = gsap.to(tracks, {
        xPercent: -100,
        repeat: -1,
        duration: 35,
        ease: "none",
      });

      tween.totalProgress(0.5);
      if (direction === "right") {
        tween.timeScale(-1);
      }

      const updateDirection = (currentPos: number) => {
        const scrollingDown = currentPos > lastScrollPos;

        if (scrollingDown !== isScrollingDown) {
          if (direction === "left") {
            tween.timeScale(scrollingDown ? 1 : -1);
          } else {
            tween.timeScale(scrollingDown ? -1 : 1);
          }
          isScrollingDown = scrollingDown;
        }

        lastScrollPos = currentPos;
      };

      const onWheel = () => updateDirection(window.pageYOffset);
      const onScroll = () => updateDirection(window.pageYOffset);

      window.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        tween.kill();
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("scroll", onScroll);
      };
    },
    { scope: rowRef, dependencies: [direction] }
  );

  const renderTrack = (duplicateIndex: number) => (
    <div
      key={duplicateIndex}
      className={`brand-marquee__track brand-marquee__track--${direction}`}
      aria-hidden={duplicateIndex === 1 ? true : undefined}
    >
      {items.map((item) => (
        <div key={`${duplicateIndex}-${item.title}`} className="brand-marquee__part">
          <Image
            src={item.image}
            alt=""
            width={120}
            height={81}
            className="brand-marquee__image"
            draggable={false}
          />
          <h2 className="brand-marquee__title">{item.title}</h2>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={rowRef} className="brand-marquee__row">
      {renderTrack(0)}
      {renderTrack(1)}
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section className="brand-marquee" aria-label="Client brands">
      <MarqueeRow items={brandMarqueeRowLeft} direction="left" />
      <MarqueeRow items={brandMarqueeRowRight} direction="right" />
    </section>
  );
}
