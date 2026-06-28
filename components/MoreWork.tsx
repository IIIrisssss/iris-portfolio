"use client";

import { motion } from "framer-motion";
import { moreWork } from "@/lib/data";
import { moreWorkSection } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { RevealMask } from "./RevealMask";
import { elastic } from "@/lib/motion";

export function MoreWork() {
  const { locale } = useLanguage();
  const copy = moreWorkSection[locale];

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

      <div className="grid w-full grid-cols-4 gap-6 px-6 pb-6 lg:grid-cols-6 lg:gap-10 lg:px-10">
        {moreWork.map((work, i) => (
          <motion.div
            key={`${work.title}-${i}`}
            className="group relative aspect-square w-full cursor-pointer"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={elastic}
            whileHover={{ 
              scale: 1.06, 
              rotate: -2,
              zIndex: 10,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
                mass: 1
              }
            }}
            whileTap={{ scale: 0.96 }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[var(--card-radius-outer)]"
              style={{ backgroundColor: work.bg }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.image}
                alt={work.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
