"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./LogoMark";
import { NavLangSwitch } from "./NavLangSwitch";
import { NavMetaRow } from "./NavMetaRow";

import "./floema-nav.css";

function scrollToPortfolioFolders() {
  document.getElementById("portfolio-folders")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function TopNav() {
  const pathname = usePathname();
  const isCreativeCaseStudy = /^\/creative\/[^/]+$/.test(pathname ?? "");

  // Temporarily hide nav on creative case-study pages.
  if (isCreativeCaseStudy) {
    return null;
  }

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    window.history.pushState(null, "", "#portfolio-folders");
    scrollToPortfolioFolders();
  };

  return (
    <header className="floema-nav-header">
      <div className="floema-nav-shell">
        <div className="floema-nav-bar">
          <div className="floema-nav-bar__left">
            <Link
              href="/#portfolio-folders"
              aria-label="Go to creative projects"
              className="floema-nav-logo"
              onClick={handleLogoClick}
            >
              <LogoMark className="floema-nav-logo__mark" />
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
