"use client";

import { motion } from "framer-motion";
import { moreWork } from "@/lib/data";
import { RevealMask } from "./RevealMask";
import { elastic } from "@/lib/motion";

export function MoreWork() {
  return (
    <section
      className="more-work relative z-0 flex flex-col gap-12 pt-4 md:gap-14 md:pt-8"
      aria-label="More work"
    >
      <RevealMask delay={0.82}>
        <header className="flex w-full flex-col items-center gap-3 px-[var(--padding)] text-center">
          <h2 className="section-title w-fit text-[var(--color-on-primary)]">
            MORE WORK
          </h2>
          <p className="max-w-[24em] text-[1rem] font-medium leading-[1.3] text-[var(--color-on-primary)]/70">
            Take a scroll, stay a while
          </p>
        </header>
      </RevealMask>

      <div className="flex w-full flex-wrap justify-center gap-6 px-[var(--padding)] pb-6 sm:gap-8 md:gap-10 lg:gap-12">
        {moreWork.map((work, i) => (
          <motion.div
            key={`${work.title}-${i}`}
            className="group relative aspect-square w-40 cursor-pointer sm:w-44 md:w-52 lg:w-56 xl:w-60 2xl:w-64"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={elastic}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[var(--card-radius-outer)] shadow-[var(--shadow-soft)]"
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
