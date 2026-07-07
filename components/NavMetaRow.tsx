"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { navLabels } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { NavRollMark } from "./NavRollMark";
import { NavRollSurface, useRollHover } from "./NavRollText";

import "./floema-nav.css";

type NavSection = "works" | "about" | "contact";

const linkConfig = [
  { href: "/#portfolio-folders", key: "works" as const, section: "works" as const },
  { href: "/about", key: "about" as const, section: "about" as const },
] as const;

const navMarks = {
  works: {
    src: "/icon/nav/works.svg",
    inactiveSrc: "/icon/nav/works-inactive.svg",
    aspect: "243/39" as const,
  },
  about: { src: "/icon/nav/about.svg", aspect: "244/39" as const },
  contact: {
    src: "/icon/nav/contact.svg",
    inactiveSrc: "/icon/nav/contact-inactive.svg",
    aspect: "315/39" as const,
  },
};

function NavRollLink({
  href,
  label,
  mark,
  section,
  active,
  onClick,
}: {
  href: string;
  label: string;
  mark: {
    src: string;
    inactiveSrc?: string;
    aspect: `${number}/${number}`;
  };
  section: NavSection;
  active: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { rollRef, onMouseEnter } = useRollHover();
  const markSrc = active ? mark.src : (mark.inactiveSrc ?? mark.src);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`floema-meta-row__link ${active ? "is-active" : ""}`}
      data-nav={section}
    >
      <NavRollSurface rollRef={rollRef}>
        <NavRollMark src={markSrc} aspect={mark.aspect} />
      </NavRollSurface>
      <span className="sr-only">{label}</span>
    </Link>
  );
}

function scrollToContact() {
  const target = document.getElementById("contact-cta");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToPortfolioFolders() {
  document.getElementById("portfolio-folders")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function NavMetaRow() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const labels = navLabels[locale];
  const [activeSection, setActiveSection] = useState<NavSection>(() =>
    pathname === "/about" ? "about" : "works",
  );

  useEffect(() => {
    if (pathname === "/about") {
      setActiveSection("about");
      return;
    }

    if (pathname !== "/") return;

    const syncFromHash = () => {
      if (window.location.hash === "#contact-cta") {
        setActiveSection("contact");
      } else if (window.location.hash === "#portfolio-folders") {
        setActiveSection("works");
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const contactEl = document.getElementById("contact-cta");
    if (!contactEl) {
      return () => window.removeEventListener("hashchange", syncFromHash);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActiveSection(entry.isIntersecting ? "contact" : "works");
      },
      { threshold: 0.35, rootMargin: "-10% 0px -35% 0px" },
    );

    observer.observe(contactEl);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [pathname]);

  const handleAboutClick = () => {
    setActiveSection("about");
  };

  const handleWorksClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    setActiveSection("works");
    window.history.pushState(null, "", "#portfolio-folders");
    scrollToPortfolioFolders();
  };

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    setActiveSection("contact");
    window.history.pushState(null, "", "#contact-cta");
    scrollToContact();
  };

  return (
    <nav aria-label="Primary" className="floema-meta-row">
      <div className="floema-meta-row__items">
        {linkConfig.map((link) => (
          <NavRollLink
            key={link.href}
            href={link.href}
            label={labels[link.key]}
            mark={navMarks[link.key]}
            section={link.section}
            active={activeSection === link.section}
            onClick={
              link.section === "works"
                ? handleWorksClick
                : link.section === "about"
                  ? handleAboutClick
                  : undefined
            }
          />
        ))}

        <NavRollLink
          href="/#contact-cta"
          label={labels.contact}
          mark={navMarks.contact}
          section="contact"
          active={activeSection === "contact"}
          onClick={handleContactClick}
        />
      </div>
    </nav>
  );
}
