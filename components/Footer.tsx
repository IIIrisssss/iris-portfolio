"use client";

import { useEffect, useRef, useState } from "react";

import { footer } from "@/lib/data";
import { useLanguage } from "./LanguageProvider";

import "./Footer.css";

const footerCopy = {
  en: {
    aboutTitle: "ABOUT ME",
    aboutBody:
      "As a creative visual designer, I excel in graphic design and the end-to-end AIGC workflow, driving concepts into dynamic visual executions. With expertise in localized and global design strategies, I have a proven track record of delivering cross-border projects. I leverage strong English and cross-functional collaboration skills to ensure precise project delivery, constantly pushing the boundaries of design and cutting-edge technology.",
    expertiseTitle: "EXPERTISE & STATUS",
    coreSkillsLabel: "CORE SKILLS",
    coreSkillsValue: "Global Visuals / AIGC Creative",
    focusLabel: "FOCUS",
    focusValue: "AI Creative Design",
    statusLabel: "STATUS",
    statusValue: "Open to Opportunities",
    contactTitle: "CONTACT ME",
    emailLabel: "EMAIL",
    phoneLabel: "TELEPHONE",
    wechatLabel: "WECHAT",
    copyHint: "Click to copy",
    copiedText: "Copied!",
    credit:
      "Fueled by global aesthetics, milk tea, and the desire to break the mold. Stay curious! 🧋",
  },
  zh: {
    aboutTitle: "个人介绍",
    aboutBody:
      "作为创意视觉设计师，我擅长平面设计，并能熟练驾驭从概念设定到动态演绎的 AIGC 全链路。具备本地化与国际化设计逻辑，拥有跨国项目落地经验。依托良好的英语沟通与跨部门协作优势，确保方案精准交付，并始终对前沿技术与设计边界保持强烈好奇。",
    expertiseTitle: "个人信息",
    coreSkillsLabel: "核心技能",
    coreSkillsValue: "国际化视觉/AIGC创意",
    focusLabel: "方向",
    focusValue: "AI创意设计",
    statusLabel: "状态",
    statusValue: "看机会中",
    contactTitle: "联系方式",
    emailLabel: "邮箱",
    phoneLabel: "电话",
    wechatLabel: "微信",
    copyHint: "点击复制",
    copiedText: "已复制！",
    credit: "由全球化审美、奶茶和打破常规的渴望驱动。保持好奇！🧋",
  },
} as const;

const contactValues = {
  email: "825204992@qq.com",
  phone: "17876520519",
};

const wechatQr = {
  en: "https://www.figma.com/api/mcp/asset/0b4f9edc-2ecf-40ab-929e-bf0d78eb0a4f",
  zh: "https://www.figma.com/api/mcp/asset/d55d6271-9ba4-48c8-ba2f-e115e857c2a3",
} as const;

type CopyKey = "email" | "phone";

function CopyableContact({
  label,
  value,
  copyHint,
  copiedText,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copyHint: string;
  copiedText: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="meet-footer__contact-item">
      <div className="meet-footer__contact-label">{label}</div>
      <button
        type="button"
        className={`copy-able ${copied ? "is-copied" : ""}`.trim()}
        data-clipboard-text={value}
        onClick={onCopy}
        aria-label={`${label}: ${value}`}
      >
        <span className="copy-able__text">{copied ? copiedText : value}</span>
        <span className="copy-able__hint" aria-hidden="true">
          {copied ? copiedText : copyHint}
        </span>
      </button>
    </div>
  );
}

export function Footer() {
  const { locale } = useLanguage();
  const copy = footerCopy[locale];
  const qrSrc = wechatQr[locale];
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null);
  const copiedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.location.hash !== "#contact-cta") return;

    const target = document.getElementById("contact-cta");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (key: CopyKey, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current);
      }
      copiedTimerRef.current = window.setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    } catch {
      setCopiedKey(key);
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current);
      }
      copiedTimerRef.current = window.setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    }
  };

  return (
    <footer
      id="contact"
      className={`meet-footer meet-footer--${locale}`.trim()}
      aria-label="Contact"
    >
      <div id="contact-cta" className="meet-footer__top">
        <div className="meet-footer__grid">
          <section className="meet-footer__column meet-footer__column--about">
            <h2 className="meet-footer__section-title">{copy.aboutTitle}</h2>
            <p className="meet-footer__about-body">{copy.aboutBody}</p>
          </section>

          <section className="meet-footer__column meet-footer__column--expertise">
            <h2 className="meet-footer__section-title">{copy.expertiseTitle}</h2>

            <div className="meet-footer__info-stack">
              <div className="meet-footer__info-block">
                <div className="meet-footer__label">{copy.coreSkillsLabel}</div>
                <div className="meet-footer__value meet-footer__value--single-line">
                  {copy.coreSkillsValue}
                </div>
              </div>

              <div className="meet-footer__info-block">
                <div className="meet-footer__label">{copy.focusLabel}</div>
                <div className="meet-footer__value">{copy.focusValue}</div>
              </div>

              <div className="meet-footer__info-block">
                <div className="meet-footer__label">{copy.statusLabel}</div>
                <div className="meet-footer__value meet-footer__value--single-line">
                  {copy.statusValue}
                </div>
              </div>
            </div>
          </section>

          <section className="meet-footer__column meet-footer__column--contact">
            <h2 className="meet-footer__section-title">{copy.contactTitle}</h2>

            <div className="meet-footer__contact-stack">
              <CopyableContact
                label={copy.emailLabel}
                value={contactValues.email}
                copyHint={copy.copyHint}
                copiedText={copy.copiedText}
                copied={copiedKey === "email"}
                onCopy={() => handleCopy("email", contactValues.email)}
              />

              <CopyableContact
                label={copy.phoneLabel}
                value={contactValues.phone}
                copyHint={copy.copyHint}
                copiedText={copy.copiedText}
                copied={copiedKey === "phone"}
                onCopy={() => handleCopy("phone", contactValues.phone)}
              />

              <div className="meet-footer__contact-item meet-footer__contact-item--qr">
                <div className="meet-footer__contact-label">{copy.wechatLabel}</div>
                <div className="meet-footer__wechat-qr" aria-label="WeChat QR code">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrSrc} alt="" aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="meet-footer__bottom">
        <p className="meet-footer__credit">{copy.credit}</p>

        <div className="meet-footer__bar">
          <span>{footer.copyright}</span>
          <button
            type="button"
            className="meet-footer__back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
