"use client";

import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  WC_EASE_LUXE,
  WC_PARALLAX,
  WC_SCRUB,
} from "@/lib/worldcupMotion";
import { moreWorkImageEntrance } from "./MoreWorkImageMotion";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

type WorldcupScrollMotionProps = {
  children: ReactNode;
};

export function WorldcupScrollMotion({ children }: WorldcupScrollMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(root.querySelectorAll("[data-wc-motion]"), {
          clearProps: "all",
        });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Parallax: backgrounds (slower) ──
        root.querySelectorAll<HTMLElement>(
          ".wc-s1 .wc-scaled-canvas__inner, [data-wc-parallax='bg']",
        ).forEach((el) => {
            gsap.to(el, {
              yPercent: WC_PARALLAX.bgSlow,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".wc-scaled-canvas") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: WC_SCRUB,
              },
            });
          });

        root.querySelectorAll<HTMLElement>("[data-wc-parallax='mesh']").forEach(
          (el) => {
            gsap.to(el, {
              yPercent: WC_PARALLAX.bgMesh,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".wc-scaled-canvas") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: WC_SCRUB,
              },
            });
          },
        );

        // ── Parallax: foreground 3D / showcase (faster) ──
        root.querySelectorAll<HTMLElement>("[data-wc-parallax='fg']").forEach(
          (el) => {
            gsap.fromTo(
              el,
              { yPercent: -WC_PARALLAX.fgFast * 0.35 },
              {
                yPercent: WC_PARALLAX.fgFast,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest(".wc-scaled-canvas") ?? el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: WC_SCRUB,
                },
              },
            );
          },
        );

        root.querySelectorAll<HTMLElement>(
          "[data-wc-parallax='showcase']",
        ).forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -WC_PARALLAX.showcase * 0.4 },
            {
              yPercent: WC_PARALLAX.showcase,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".wc-scaled-canvas") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: WC_SCRUB,
              },
            },
          );
        });

        root.querySelectorAll<HTMLElement>(
          "[data-wc-parallax='fullbleed']",
        ).forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -WC_PARALLAX.fullbleed },
            {
              yPercent: WC_PARALLAX.fullbleed,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".wc-scaled-canvas") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: WC_SCRUB,
              },
            },
          );
        });

        // ── More Work image entrance (Lenis-safe) ──
        root.querySelectorAll<HTMLElement>(
          ".wc-more-work-image-motion[data-wc-more-work-entrance]",
        ).forEach((el) => {
          gsap.fromTo(el, moreWorkImageEntrance.from, {
            ...moreWorkImageEntrance.to,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });

        // ── Section canvas entrance ──
        root.querySelectorAll<HTMLElement>(".wc-scaled-canvas").forEach(
          (section) => {
            gsap.from(section, {
              autoAlpha: 0,
              y: 28,
              duration: 1.05,
              ease: WC_EASE_LUXE,
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          },
        );

        // ── Stagger body copy & pills ──
        root.querySelectorAll<HTMLElement>("[data-wc-stagger]").forEach(
          (group) => {
            const items = group.querySelectorAll<HTMLElement>(
              "[data-wc-stagger-item]",
            );
            if (!items.length) return;

            gsap.from(items, {
              autoAlpha: 0,
              y: 18,
              duration: 0.85,
              ease: WC_EASE_LUXE,
              stagger: 0.08,
              scrollTrigger: {
                trigger: group,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            });
          },
        );

        root.querySelectorAll<HTMLElement>("[data-wc-stagger-item]").forEach(
          (el) => {
            if (el.closest("[data-wc-stagger]")) return;

            gsap.from(el, {
              autoAlpha: 0,
              y: 18,
              duration: 0.85,
              ease: WC_EASE_LUXE,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          },
        );

        const hero = root.querySelector<HTMLElement>(
          ".creative-case-study__hero-image",
        );
        if (hero) {
          gsap.from(hero, {
            scale: 1.04,
            autoAlpha: 0,
            duration: 1.2,
            ease: WC_EASE_LUXE,
            delay: 0.05,
          });
        }
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <div ref={rootRef} className="wc-motion-root">
      {children}
    </div>
  );
}
