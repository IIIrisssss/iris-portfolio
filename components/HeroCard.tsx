"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { Work } from "@/lib/data";
import { elastic } from "@/lib/motion";

type HeroCardProps = {
  card: Work;
  index: number;
  rotate: number;
  translateY: string;
};

const pointerSpring = { stiffness: 130, damping: 9, mass: 0.4 };
const PUSH = 120;
const ROTATE_PUSH = 0.75;

function HeroCard({ card, index, rotate, translateY }: HeroCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateBase = useMotionValue(rotate);

  const x = useSpring(pointerX, pointerSpring);
  const y = useSpring(pointerY, pointerSpring);
  const rotateSpring = useSpring(rotateBase, pointerSpring);
  const transform = useMotionTemplate`translateX(${x}px) translateY(calc(${translateY} + ${y}px)) rotate(${rotateSpring}deg)`;

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
    rotateBase.set(rotate);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    const velocity = nx * 26;

    pointerX.set(nx * PUSH);
    pointerY.set(ny * PUSH);
    rotateBase.set(rotate - velocity * ROTATE_PUSH);
  };

  return (
    <motion.div
      className="relative size-[clamp(10rem,24vmin,14rem)] shrink-0 rounded-2xl"
      style={{
        marginRight: index < 3 ? "-6%" : 0,
        zIndex: index,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ...elastic, delay: 0.4 + index * 0.08 }}
    >
      <motion.div
        className="absolute inset-0 cursor-pointer overflow-hidden rounded-2xl shadow-[var(--shadow)] touch-none"
        style={{
          backgroundColor: card.bg,
          transform,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 160px, 224px"
          className="pointer-events-none object-cover"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

const cardLayout = [
  { rotate: 2, translateY: "5%" },
  { rotate: -3, translateY: "-6%" },
  { rotate: 6, translateY: "5%" },
  { rotate: -2, translateY: "-4%" },
] as const;

export { HeroCard, cardLayout };
