"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLabels } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { NavRollMark } from "./NavRollMark";
import { NavRollSurface, useRollHover } from "./NavRollText";

import "./floema-nav.css";

const linkConfig = [
  { href: "/", key: "works" as const, match: (path: string) => path !== "/about" },
  { href: "/about", key: "about" as const, match: (path: string) => path === "/about" },
] as const;

const navMarks = {
  works: { src: "/icon/nav/works.svg", aspect: "243/39" as const },
  about: { src: "/icon/nav/about.svg", aspect: "244/39" as const },
  contact: { src: "/icon/nav/contact.svg", aspect: "315/39" as const },
};

function NavRollLink({
  href,
  label,
  mark,
  active,
  onClick,
}: {
  href: string;
  label: string;
  mark: { src: string; aspect: `${number}/${number}` };
  active: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { rollRef, onMouseEnter } = useRollHover();

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`floema-meta-row__link ${active ? "is-active" : ""}`}
    >
      <NavRollSurface rollRef={rollRef}>
        <NavRollMark src={mark.src} aspect={mark.aspect} />
      </NavRollSurface>
      <span className="sr-only">{label}</span>
    </Link>
  );
}

function scrollToContact() {
  const target = document.getElementById("contact-cta");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function NavMetaRow() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const labels = navLabels[locale];

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
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
            active={link.match(pathname)}
          />
        ))}

        <NavRollLink
          href="/#contact-cta"
          label={labels.contact}
          mark={navMarks.contact}
          active={false}
          onClick={handleContactClick}
        />
      </div>
    </nav>
  );
}
