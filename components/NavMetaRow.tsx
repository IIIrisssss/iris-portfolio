"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavRollText, useRollHover } from "./NavRollText";

import "./floema-nav.css";

const links = [
  { href: "/", label: "Works", match: (path: string) => path !== "/about" },
  { href: "/about", label: "About", match: (path: string) => path === "/about" },
] as const;

function NavRollLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
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
      <NavRollText text={label} rollRef={rollRef} />
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

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    scrollToContact();
  };

  return (
    <nav aria-label="Primary" className="floema-meta-row">
      <div className="floema-meta-row__items">
        {links.map((link) => (
          <NavRollLink
            key={link.href}
            href={link.href}
            label={link.label}
            active={link.match(pathname)}
          />
        ))}

        <NavRollLink
          href="/#contact-cta"
          label="Contact"
          active={false}
          onClick={handleContactClick}
        />
      </div>
    </nav>
  );
}
