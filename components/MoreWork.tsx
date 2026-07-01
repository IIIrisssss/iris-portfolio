"use client";

import { motion } from "framer-motion";
import { moreWorkGridLayout } from "@/lib/data";
import { moreWorkSection } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { RevealMask } from "./RevealMask";
import { elastic } from "@/lib/motion";
import "./MoreWork.css";

const gridItemMotionProps = {
  initial: { scale: 0.7, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: elastic,
  whileHover: {
    scale: 1.06,
    rotate: -2,
    zIndex: 10,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 15,
      mass: 1,
    },
  },
  whileTap: { scale: 0.96 },
};

function GridCell({
  order,
  size,
  asset,
  image,
  bg,
}: {
  order: number;
  size: "big" | "small";
  asset: string;
  image: string;
  bg: string;
}) {
  const orderLabel = String(order).padStart(2, "0");
  const sizeClass = size === "big" ? "grid-item-large" : "grid-item-small";

  return (
    <motion.div
      className={`group relative w-full cursor-pointer ${sizeClass}`}
      {...gridItemMotionProps}
    >
      <div
        className="grid-item-card relative h-full w-full"
        style={{ backgroundColor: bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${asset} — ${orderLabel} ${size}`}
          className="grid-item-image absolute left-0 top-0"
        />
      </div>
    </motion.div>
  );
}

export function MoreWork() {
  const { locale } = useLanguage();
  const copy = moreWorkSection[locale];

  const cell = (index: number) => {
    const layout = moreWorkGridLayout[index];
    return (
      <GridCell
        order={index + 1}
        size={layout.size}
        asset={layout.asset}
        image={layout.image}
        bg={layout.bg}
      />
    );
  };

  return (
    <section
      className="more-work relative z-0 flex flex-col gap-12 pt-4 md:gap-14 md:pt-8"
      aria-label={copy.ariaLabel}
    >
      <RevealMask delay={0.82}>
        <header className="flex w-full flex-col items-center gap-3 px-[var(--padding)] text-center">
          <h2 className="section-title w-fit text-[var(--color-on-primary)]">
            {copy.title}
          </h2>
          <p className="max-w-[24em] text-[1rem] font-medium leading-[1.3] text-[var(--color-on-primary)]/70">
            {copy.subtitle}
          </p>
        </header>
      </RevealMask>

      <div className="more-work-grid w-full gap-6 px-6 pb-6 lg:gap-10 lg:px-10">
        {/* 01 — big — 1_big.webp */}
        {cell(0)}
        {/* 02 — small — 1_small.webp */}
        {cell(1)}
        {/* 03 — small — 2_small.webp */}
        {cell(2)}
        {/* 04 — small — 3_small.webp */}
        {cell(3)}
        {/* 05 — small — 4_small.webp */}
        {cell(4)}
        {/* 06 — small — 5_small.webp */}
        {cell(5)}
        {/* 07 — small — 6_small.webp */}
        {cell(6)}
        {/* 08 — small — 7_small.webp */}
        {cell(7)}
        {/* 09 — small — 8_small.webp */}
        {cell(8)}
        {/* 10 — small — 9_small.webp */}
        {cell(9)}
        {/* 11 — small — 10_small.webp */}
        {cell(10)}
        {/* 12 — small — 11_small.webp */}
        {cell(11)}
        {/* 13 — small — 12_small.webp */}
        {cell(12)}
        {/* 14 — small — 13_small.webp */}
        {cell(13)}
        {/* 15 — small — 14_small.webp */}
        {cell(14)}
        {/* 16 — small — 15_small.webp */}
        {cell(15)}
        {/* 17 — small — 16_small.webp */}
        {cell(16)}
        {/* 18 — small — 17_small.webp */}
        {cell(17)}
        {/* 19 — big — 2_big.webp */}
        {cell(18)}
        {/* 20 — small — 18_small.webp */}
        {cell(19)}
        {/* 21 — small — 19_small.webp */}
        {cell(20)}
        {/* 22 — small — 20_small.webp */}
        {cell(21)}
        {/* 23 — small — 21_small.webp */}
        {cell(22)}
        {/* 24 — small — 22_small.webp */}
        {cell(23)}
        {/* 25 — small — 23_small.webp */}
        {cell(24)}
        {/* 26 — small — 24_small.webp */}
        {cell(25)}
        {/* 27 — small — 25_small.webp */}
        {cell(26)}
        {/* 28 — small — 26_small.webp */}
        {cell(27)}
        {/* 29 — small — 27_small.webp */}
        {cell(28)}
        {/* 30 — small — 28_small.webp */}
        {cell(29)}
        {/* 31 — small — 29_small.webp */}
        {cell(30)}
        {/* 32 — big — 3_big.webp */}
        {cell(31)}
        {/* 33 — small — 30_small.webp */}
        {cell(32)}
        {/* 34 — small — 31_small.webp */}
        {cell(33)}
        {/* 35 — small — 32_small.webp */}
        {cell(34)}
        {/* 36 — small — 33_small.webp */}
        {cell(35)}
        {/* 37 — small — 34_small.webp */}
        {cell(36)}
        {/* 38 — small — 35_small.webp */}
        {cell(37)}
        {/* 39 — small — 36_small.webp */}
        {cell(38)}
      </div>
    </section>
  );
}
