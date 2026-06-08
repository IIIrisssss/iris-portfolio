"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useNavVisibility } from "@/hooks/useScrollDirection";
import { softSpring } from "@/lib/motion";
import { LogoMark } from "./LogoMark";
import { NavRollSurface, useRollHover } from "./NavRollText";
import { NavLangSwitch } from "./NavLangSwitch";
import { NavMetaRow } from "./NavMetaRow";

import "./floema-nav.css";

export function TopNav() {
  const visible = useNavVisibility();
  const { rollRef: logoRollRef, onMouseEnter: onLogoEnter } = useRollHover();

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : "-110%" }}
      transition={softSpring}
      className="pointer-events-none fixed top-0 right-0 left-0 z-30"
    >
      <div className="px-[clamp(16px,10.15px+1.5vw,36px)] pt-[max(var(--padding),env(safe-area-inset-top))] pb-6">
        <div className="floema-nav-bar">
          <div className="pointer-events-auto floema-nav-bar__left">
            <Link
              href="/"
              aria-label="Spencer Gabor home"
              className="floema-nav-logo"
              onMouseEnter={onLogoEnter}
            >
              <NavRollSurface rollRef={logoRollRef}>
                <LogoMark className="floema-nav-logo__mark" />
              </NavRollSurface>
            </Link>
          </div>

          <div className="pointer-events-auto floema-nav-bar__center">
            <NavMetaRow />
          </div>

          <div className="pointer-events-auto floema-nav-bar__right">
            <NavLangSwitch />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
