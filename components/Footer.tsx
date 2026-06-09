"use client";

import { useEffect } from "react";
import { RevealMask } from "./RevealMask";
import { footer } from "@/lib/data";
import { EmailIcon, LinkedInIcon, WeChatIcon } from "./FooterIcons";

import "./Footer.css";

function SocialIcon({ id }: { id: string }) {
  const className = "meet-footer__social-icon";
  switch (id) {
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "email":
      return <EmailIcon className={className} />;
    case "wechat":
      return <WeChatIcon className={className} />;
    default:
      return null;
  }
}

export function Footer() {
  useEffect(() => {
    if (window.location.hash !== "#contact-cta") return;

    const target = document.getElementById("contact-cta");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="meet-footer" aria-label="Contact">
      <div id="contact-cta" className="meet-footer__cta">
        <RevealMask delay={0.95}>
          <p className="meet-footer__eyebrow">{footer.eyebrow}</p>
        </RevealMask>

        <RevealMask delay={1.02}>
          <h2 className="meet-footer__headline">{footer.headline}</h2>
        </RevealMask>

        <RevealMask delay={1.08}>
          <p className="meet-footer__body">{footer.body}</p>
        </RevealMask>

        <RevealMask delay={1.14}>
          <a href={footer.ctaHref} className="meet-footer__button">
            {footer.ctaLabel} →
          </a>
        </RevealMask>

        <RevealMask delay={1.2}>
          <p className="meet-footer__connect">{footer.connectLabel}</p>
        </RevealMask>

        <div className="meet-footer__social">
          {footer.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="meet-footer__social-link"
              aria-label={link.label}
              target={link.id === "email" ? undefined : "_blank"}
              rel={link.id === "email" ? undefined : "noopener noreferrer"}
            >
              <SocialIcon id={link.id} />
            </a>
          ))}
        </div>
      </div>

      <div className="meet-footer__bottom">
        <p className="meet-footer__credit">{footer.credit}</p>

        <div className="meet-footer__bar">
          <span>{footer.copyright}</span>
          <button
            type="button"
            className="meet-footer__back-top"
            onClick={scrollToTop}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
