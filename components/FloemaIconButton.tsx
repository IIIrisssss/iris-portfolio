"use client";

import type { ReactNode } from "react";

import "./floema-nav.css";

type FloemaIconButtonProps = {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
};

export function FloemaIconButton({
  href,
  label,
  children,
  external = false,
}: FloemaIconButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="floema-icon-btn"
    >
      <span aria-hidden className="floema-icon-btn__bg" />
      <span className="floema-icon-btn__icon">{children}</span>
    </a>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 16.2 4.2 10.4a3.2 3.2 0 0 1 4.5-4.5L10 7.2l1.3-1.3a3.2 3.2 0 1 1 4.5 4.5L10 16.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FloemaWishlistButton({ href }: { href: string }) {
  return (
    <FloemaIconButton href={href} label="Enquiry list">
      <HeartIcon />
    </FloemaIconButton>
  );
}
