"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moreWork } from "@/lib/data";
import { elastic } from "@/lib/motion";
import { TextBlock } from "./TextBlock";

export function MoreWork() {
  return (
    <section className="flex flex-col gap-16">
      <TextBlock title="More Work" description="Take a scroll, stay a while" />

      <div className="flex w-full flex-wrap justify-center gap-6 px-[var(--padding)] pb-10 sm:gap-8 md:gap-10 lg:gap-12">
        {moreWork.map((work, i) => (
          <motion.div
            key={`${work.title}-${i}`}
            className="group relative aspect-square w-40 cursor-pointer sm:w-44 md:w-52 lg:w-56 xl:w-60 2xl:w-64"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={elastic}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
              style={{ backgroundColor: work.bg }}
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 45vw, 30vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
