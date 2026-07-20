"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { HERO_SLIDER_SIZES } from "@/lib/imageSizes";
import { heroSlides } from "@/lib/data";
import "./HeroSlider.css";

const slides = heroSlides;
const SLIDE_DURATION_MS = 5000;
const FLASH_MS = 240;

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashActive, setFlashActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const currentIndexRef = useRef(0);
  const transitioningRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const transitionTo = useCallback((index: number) => {
    if (index === currentIndexRef.current || transitioningRef.current) return;

    if (reducedMotionRef.current) {
      currentIndexRef.current = index;
      setCurrentIndex(index);
      return;
    }

    transitioningRef.current = true;
    setFlashActive(true);

    window.setTimeout(() => {
      currentIndexRef.current = index;
      setCurrentIndex(index);
      setFlashActive(false);

      window.setTimeout(() => {
        transitioningRef.current = false;
      }, FLASH_MS);
    }, FLASH_MS);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      transitionTo((currentIndexRef.current + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [currentIndex, transitionTo]);

  const slide = slides[currentIndex];

  return (
    <section
      className={`hero-slider${isHovered ? " is-hovered" : ""}${flashActive ? " is-flashing" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hero-slide" aria-live="polite">
        <Link
          href={slide.href}
          className="hero-media-link"
          aria-label={`View ${slide.title} project`}
        >
          {slide.type === "video" ? (
            <video
              key={slide.src}
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-media"
            />
          ) : (
            <OptimizedImage
              key={slide.src}
              src={slide.src}
              alt={slide.title}
              fill
              sizes={HERO_SLIDER_SIZES}
              priority={currentIndex === 0}
              quality={88}
              className="hero-media"
            />
          )}
        </Link>

        <div className="hero-overlay" />
      </div>

      <div className="hero-flash" aria-hidden="true" />

      <div className="hero-nav" aria-hidden={!isHovered}>
        <button
          type="button"
          className="hero-nav__btn hero-nav__btn--prev"
          onClick={() => transitionTo((currentIndexRef.current - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M14.5 6L9 12l5.5 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="hero-nav__btn hero-nav__btn--next"
          onClick={() => transitionTo((currentIndexRef.current + 1) % slides.length)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9.5 6L15 12l-5.5 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="hero-pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => transitionTo(index)}
            className={`hero-indicator ${index === currentIndex ? "is-active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <div key={currentIndex} className="hero-indicator-progress" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
