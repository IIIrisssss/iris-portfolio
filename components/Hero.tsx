"use client";

import { motion } from "framer-motion";
import { heroCards, profile } from "@/lib/data";
import { easeOutExpo } from "@/lib/motion";
import { HeroCard, cardLayout } from "./HeroCard";
import { Shuffle } from "./Shuffle";

export function Hero() {
  return (
    <section className="grid min-h-[100svh] w-full place-items-center gap-y-10 px-[var(--padding)] py-[max(var(--padding),env(safe-area-inset-top))] text-center [grid-template-rows:1fr_auto]">
      {/* MID */}
      <div className="flex w-full flex-col items-center justify-center gap-[min(4rem,6vh)] pt-[min(8vh,4.5rem)]">
        <Shuffle
          text={profile.name}
          tag="h1"
          className="font-display max-w-[12em] text-[clamp(3.8rem,11vw,7.5rem)] leading-[0.82] text-[var(--color-on-primary)]"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          stagger={0.03}
          playOnMount
          triggerOnce
          triggerOnHover
          respectReducedMotion
        />

        <div className="flex w-full flex-col items-center gap-[min(3rem,5vh)]">
          <div className="flex items-center justify-center">
            {heroCards.map((card, i) => (
              <HeroCard
                key={card.title}
                card={card}
                index={i}
                rotate={cardLayout[i].rotate}
                translateY={cardLayout[i].translateY}
              />
            ))}
          </div>

          <h2 className="font-display flex max-w-[12em] flex-col items-center gap-[min(0.85rem,2.2vh)] text-[clamp(3.8rem,8vw,5.5rem)] leading-[0.88] tracking-[0.7px] text-[var(--color-secondary)]">
            <Shuffle
              text={profile.role[0]}
              tag="span"
              className="block"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              stagger={0.03}
              playOnMount
              triggerOnce
              triggerOnHover
              respectReducedMotion
            />
            <Shuffle
              text={profile.role.slice(1).join(" ")}
              tag="span"
              className="block"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              stagger={0.03}
              playOnMount
              triggerOnce
              triggerOnHover
              respectReducedMotion
            />
          </h2>
        </div>
      </div>

      {/* BOT */}
      <motion.div
        className="flex flex-col items-center gap-[0.6rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.35 }}
      >
        <p className="eyebrow text-[0.875rem] text-[var(--color-on-primary)]">
          {profile.clientsLabel}
        </p>
        <p className="eyebrow max-w-[24em] text-[0.875rem] leading-[1.6] text-[var(--color-secondary)]">
          {profile.clients}
        </p>
      </motion.div>
    </section>
  );
}
