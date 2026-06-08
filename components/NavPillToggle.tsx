"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { softSpring } from "@/lib/motion";

type ToggleOption<T extends string> = {
  value: T;
  label: string;
  href?: string;
};

type NavPillToggleProps<T extends string> = {
  options: [ToggleOption<T>, ToggleOption<T>];
  value: T;
  onChange?: (value: T) => void;
  className?: string;
};

export function NavPillToggle<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: NavPillToggleProps<T>) {
  const activeIndex = options.findIndex((option) => option.value === value);

  return (
    <div
      className={`relative inline-flex h-10 items-center rounded-[7px] bg-[var(--color-secondary)] p-1 ring-1 ring-black/5 ${className}`}
    >
      <motion.span
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-[5px] bg-white"
        initial={false}
        animate={{ left: activeIndex === 0 ? 4 : "calc(50%)" }}
        transition={softSpring}
      />

      {options.map((option) => {
        const active = option.value === value;
        const classNames = `relative z-10 flex h-full min-w-[3.25rem] items-center justify-center px-3 font-display text-[0.625rem] leading-none tracking-[0.14em] uppercase transition-colors sm:min-w-[3.75rem] sm:px-4 sm:text-[0.6875rem] ${
          active
            ? "text-[var(--color-on-primary)]"
            : "text-[var(--color-on-primary)]/55"
        }`;

        if (option.href) {
          return (
            <Link
              key={option.value}
              href={option.href}
              className={classNames}
              aria-current={active ? "page" : undefined}
            >
              {option.label}
            </Link>
          );
        }

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange?.(option.value)}
            className={classNames}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
