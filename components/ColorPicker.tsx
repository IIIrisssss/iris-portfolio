"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { accentColors } from "@/lib/data";
import { elastic, softSpring } from "@/lib/motion";
import { useTheme } from "./ThemeProvider";

const RADIUS = 54;
const ARC_SPAN = 72;

export function ColorPicker() {
  const [open, setOpen] = useState(false);
  const { accent, setAccent } = useTheme();

  const positions = accentColors.map((_, i) => {
    const t = accentColors.length === 1 ? 0 : i / (accentColors.length - 1);
    const angle = (90 + t * ARC_SPAN) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * RADIUS,
      y: -Math.sin(angle) * RADIUS,
    };
  });

  return (
    <div className="fixed right-[var(--padding)] bottom-[max(var(--padding),env(safe-area-inset-bottom))] z-20 grid place-items-center">
      <AnimatePresence>
        {open &&
          accentColors.map((color, i) => (
            <motion.button
              key={color}
              type="button"
              aria-label={`Set accent ${color}`}
              onClick={() => {
                setAccent(color);
                setOpen(false);
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: positions[i].x,
                y: positions[i].y,
                scale: 1,
                opacity: 1,
              }}
              exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              transition={{ ...elastic, delay: i * 0.04 }}
              whileHover={{ scale: 1.2, zIndex: 20 }}
              whileTap={{ scale: 0.9 }}
              style={{ backgroundColor: color, zIndex: i + 1 }}
              className={`absolute h-9 w-9 rounded-full ring-2 ring-white ${
                accent === color ? "outline-2 outline-offset-1 outline-black/30" : ""
              }`}
            />
          ))}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Pick accent color"
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: open ? 90 : 0 }}
        transition={{
          scale: { ...elastic, delay: 0.7 },
          rotate: softSpring,
        }}
        whileHover={{ scale: 1.07, rotate: open ? 104 : 14 }}
        whileTap={{ scale: 0.9 }}
        className="relative z-10 grid h-12 w-12 origin-center place-items-center rounded-full bg-white ring-1 ring-black/5"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3a9 9 0 1 0 0 18c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.1 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Z"
            stroke="#2c2c2c"
            strokeWidth="1.6"
          />
          <circle cx="7.5" cy="11" r="1.1" fill="#2c2c2c" />
          <circle cx="10.5" cy="7.5" r="1.1" fill="#2c2c2c" />
          <circle cx="14.5" cy="7.5" r="1.1" fill="#2c2c2c" />
        </svg>
      </motion.button>
    </div>
  );
}
