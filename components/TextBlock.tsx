"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

export function TextBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 px-[var(--padding)] text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
    >
      <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] text-[var(--color-on-primary)]">
        {title}
      </h2>
      <p className="max-w-[24em] text-[1rem] font-medium leading-[1.3] text-[var(--color-on-primary)]/70">
        {description}
      </p>
    </motion.div>
  );
}
