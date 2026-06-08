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
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const { rollRef, onMouseEnter } = useRollHover();

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      onMouseEnter={onMouseEnter}
      className={`floema-meta-row__link ${active ? "is-active" : ""}`}
    >
      <NavRollText text={label} rollRef={rollRef} />
      <span className="sr-only">{label}</span>
    </Link>
  );
}

export function NavMetaRow() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="floema-meta-row">
      <svg
        aria-hidden
        className="floema-meta-row__bg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect width="100" height="100" rx="12" />
      </svg>

      <div className="floema-meta-row__items">
        {links.map((link) => (
          <NavRollLink
            key={link.href}
            href={link.href}
            label={link.label}
            active={link.match(pathname)}
          />
        ))}
      </div>
    </nav>
  );
}
