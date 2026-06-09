"use client";

import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { NavRollSurface, useRollHover } from "./NavRollText";
import { NavLangSwitch } from "./NavLangSwitch";
import { NavMetaRow } from "./NavMetaRow";

import "./floema-nav.css";

export function TopNav() {
  const { rollRef: logoRollRef, onMouseEnter: onLogoEnter } = useRollHover();

  return (
    <header className="floema-nav-header">
      <div className="floema-nav-shell">
        <div className="floema-nav-bar">
          <div className="floema-nav-bar__left">
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

          <div className="floema-nav-bar__center">
            <NavMetaRow />
          </div>

          <div className="floema-nav-bar__right">
            <NavLangSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
