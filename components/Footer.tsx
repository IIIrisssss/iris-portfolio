"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { footer } from "@/lib/data";

export function Footer() {
  const spacerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <>
      <div ref={spacerRef} id="contact" className="h-[100dvh] w-full" />

      <footer className="fixed bottom-0 left-0 z-0 flex h-[100dvh] w-full flex-col items-center justify-end gap-8 bg-[var(--color-secondary)] py-16 text-center">
        <motion.h2
          style={{ scaleY }}
          className="font-display origin-bottom px-2 text-[30vw] leading-[0.8] text-[var(--color-primary)] select-none"
        >
          <span className="relative -top-[0.1em]">{footer.title}</span>
        </motion.h2>

        <div className="flex flex-col items-center gap-4">
          <a
            href={`mailto:${footer.email}`}
            className="eyebrow text-[0.875rem] text-[var(--color-on-primary)] transition-colors hover:text-[var(--color-primary)]"
          >
            {footer.email}
          </a>
          <ul className="flex flex-col items-center gap-1">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow inline-block origin-bottom text-[0.875rem] text-[var(--color-on-primary)] transition-all hover:scale-y-125 hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <small className="eyebrow mt-2 text-[0.5625rem] font-medium text-[var(--color-primary)]/80">
            {footer.copyright}
          </small>
        </div>
      </footer>
    </>
  );
}
