"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroSlider.css";

const slides = [
  {
    type: "image",
    src: "/hero-media/1.webp",
    title: "DESIGN",
    subtitle: "CREATIVE.LQB",
    description: "to use AI to explore.\nis one of the design\npursue. Just do it",
  },
  {
    type: "video",
    src: "/hero-media/2.mp4",
    title: "WORK",
    subtitle: "CREATIVE.LQB",
    description: "AI时代下技术赋能与视觉表达的融合实践探索",
  },
  {
    type: "image",
    src: "/hero-media/3.webp",
    title: "A FUTURE",
    subtitle: "CREATIVE.LQB",
    description: "我是陆78，让技术成为放大 imagination 的引擎",
  },
  {
    type: "video",
    src: "/hero-media/4.mp4",
    title: "EXPLORE",
    subtitle: "CREATIVE.LQB",
    description: "浪潮中思考与判断力愈发不可替代",
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      className={`hero-slider${isHovered ? " is-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="hero-slide"
        >
          {slides[currentIndex].type === "video" ? (
            <video
              src={slides[currentIndex].src}
              autoPlay
              muted
              loop
              playsInline
              className="hero-media"
            />
          ) : (
            <img
              src={slides[currentIndex].src}
              alt={slides[currentIndex].title}
              className="hero-media"
            />
          )}

          <div className="hero-overlay">
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-nav" aria-hidden={!isHovered}>
        <button
          type="button"
          className="hero-nav__btn hero-nav__btn--prev"
          onClick={goPrev}
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
          onClick={goNext}
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
            onClick={() => goToSlide(index)}
            className={`hero-indicator ${index === currentIndex ? "is-active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="hero-indicator-progress" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
