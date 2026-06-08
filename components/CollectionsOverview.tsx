"use client";

import Image from "next/image";
import { Fragment, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { collectionsOverview } from "@/lib/data";
import type { CollectionItem } from "@/lib/data";
import {
  DetailsIcon,
  GolfIcon,
  NatureIcon,
  RePlasticIcon,
  UrbanIcon,
} from "./CollectionIcons";
import "./CollectionsOverview.css";

gsap.registerPlugin(ScrollTrigger);

const CYCLE_DURATION = 0.14;
const CYCLE_DELAY = 0.2;
const HOVER_MIN_WIDTH = 1023;

function CollectionIcon({ name }: { name: CollectionItem["icon"] }) {
  const className = "collections-overview__icon";
  switch (name) {
    case "urban":
      return <UrbanIcon className={className} />;
    case "nature":
      return <NatureIcon className={className} />;
    case "golf":
      return <GolfIcon className={className} />;
    case "replastic":
      return <RePlasticIcon className={className} />;
    case "details":
      return <DetailsIcon className={className} />;
  }
}

function MediaStack({ item }: { item: CollectionItem }) {
  const variantClass = item.mediaVariant
    ? ` collections-overview__media--${item.mediaVariant}`
    : "";

  return (
    <div className={`collections-overview__media${variantClass}`}>
      {item.images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={500}
          height={288}
          className="collections-overview__image"
          data-index={index}
          draggable={false}
        />
      ))}
    </div>
  );
}

function CollectionRow({ item }: { item: CollectionItem }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<gsap.core.Timeline | null>(null);
  const delayRef = useRef<gsap.core.Tween | null>(null);

  const count = `(${String(item.count).padStart(2, "0")})`;

  const icon = <CollectionIcon name={item.icon} />;
  const title = (
    <h3 className="collections-overview__title">{item.name}</h3>
  );
  const countEl = <h3 className="collections-overview__count">{count}</h3>;
  const media = <MediaStack item={item} />;

  const keyed = (key: string, node: ReactNode) => (
    <Fragment key={key}>{node}</Fragment>
  );

  let children: ReactNode[];
  switch (item.layout) {
    case "media-before-title":
      children = [
        keyed("icon", icon),
        keyed("media", media),
        keyed("title", title),
        keyed("count", countEl),
      ];
      break;
    case "media-after-count":
      children = [
        keyed("icon", icon),
        keyed("title", title),
        keyed("count", countEl),
        keyed("media", media),
      ];
      break;
    case "media-first":
      children = [
        keyed("media", media),
        keyed("icon", icon),
        keyed("title", title),
        keyed("count", countEl),
      ];
      break;
    default:
      children = [
        keyed("icon", icon),
        keyed("title", title),
        keyed("media", media),
        keyed("count", countEl),
      ];
      break;
  }

  useGSAP(
    () => {
      const row = rowRef.current;
      if (!row) return;

      const images = row.querySelectorAll<HTMLElement>(
        ".collections-overview__image"
      );
      const firstImage = images[0];

      gsap.set(images, { autoAlpha: 0 });
      gsap.set(row, { y: 50, autoAlpha: 0, pointerEvents: "none" });

      const tl = gsap.timeline({ paused: true });
      ScrollTrigger.create({
        trigger: row,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
        onEnter: () => tl.play(0),
      });

      tl.to(row, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      if (firstImage) {
        gsap.set(firstImage, { y: 30, autoAlpha: 0 });
        tl.to(
          firstImage,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => gsap.set(row, { pointerEvents: "all" }),
          },
          "-=0.7"
        );
      } else {
        tl.eventCallback("onComplete", () => {
          gsap.set(row, { pointerEvents: "all" });
        });
      }
    },
    { scope: rowRef, dependencies: [item.slug] }
  );

  const startCycle = () => {
    const row = rowRef.current;
    if (!row || window.innerWidth < HOVER_MIN_WIDTH) return;

    const images = Array.from(
      row.querySelectorAll<HTMLElement>(".collections-overview__image")
    );
    if (images.length < 2) return;

    cycleRef.current?.kill();
    delayRef.current?.kill();

    gsap.set(images, { autoAlpha: 0 });
    gsap.set(images[0], { autoAlpha: 1 });

    const cycle = gsap.timeline({
      paused: true,
      repeat: -1,
      defaults: { ease: "none" },
    });

    for (let i = 1; i < images.length; i++) {
      cycle.add(() => gsap.set(images[i], { autoAlpha: 1 }));
      cycle.add(() => gsap.set(images[i - 1], { autoAlpha: 0 }), "+=0");
      cycle.to({}, { duration: CYCLE_DURATION });
    }

    cycle.add(() => {
      gsap.set(images, { autoAlpha: 0 });
      gsap.set(images[0], { autoAlpha: 1 });
    });

    cycleRef.current = cycle;
    delayRef.current = gsap.delayedCall(CYCLE_DELAY, () => {
      cycle.timeScale(0.9).restart();
    });
  };

  const stopCycle = () => {
    const row = rowRef.current;
    if (!row) return;

    delayRef.current?.kill();
    cycleRef.current?.pause(0);
    cycleRef.current?.kill();

    const images = row.querySelectorAll<HTMLElement>(
      ".collections-overview__image"
    );
    gsap.set(images, { autoAlpha: 0 });
    if (images[0]) gsap.set(images[0], { autoAlpha: 1 });
  };

  return (
    <a
      href={item.href}
      className="collections-overview__link"
      title={`${item.slug} collection link`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        ref={rowRef}
        className="collections-overview__row"
        onMouseEnter={startCycle}
        onMouseLeave={stopCycle}
      >
        {children}
      </div>
    </a>
  );
}

export function CollectionsOverview() {
  return (
    <section
      className="collections-overview"
      aria-label="The Collections"
      data-component="collections-overview"
    >
      <p className="collections-overview__eyebrow">The Collections</p>

      <div className="collections-overview__wrapper">
        {collectionsOverview.map((item) => (
          <CollectionRow key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
