"use client";

import { SPRING_DANGO_STICKERS } from "@/lib/springDangoStickers";

import {
  StatusBatteryIcon,
  StatusCellularIcon,
  StatusWifiIcon,
  ToolbarEmojiIcon,
  ToolbarPlusIcon,
} from "./WeChatPhoneIcons";
import { useDragScroll } from "./useDragScroll";

import "./wechat-phone.css";

const AVATAR = "/creative/spring-dango-points/chat-avatar.png";
const TOOLBAR_VOICE_ICON = "/creative/spring-dango-points/wechat-toolbar-voice.png";
const PHONE_FRAME = "/creative/spring-dango-points/phone-frame.png";

/** iPhone 15 Pro frame cutout — device-frames-media Black Titanium template */
const PHONE_SCREEN_INSET = {
  left: 6.644,
  top: 3.338,
  width: 86.577,
  height: 93.324,
} as const;

const TIMESTAMP_MARKERS: Record<number, string> = {
  0: "Thursday 11:36",
  7: "Yesterday 18:22",
  14: "3:00",
};

type WeChatPhoneModuleProps = {
  variant?: "standalone" | "embedded";
};

export function WeChatPhoneModule({ variant = "standalone" }: WeChatPhoneModuleProps) {
  const chatRef = useDragScroll<HTMLDivElement>({
    wheelFactor: 0.9,
    dragFactor: 1.08,
  });

  const moduleClass =
    variant === "embedded"
      ? "wechat-phone-module wechat-phone-module--embedded"
      : "wechat-phone-module";

  const phoneClass =
    variant === "embedded" ? "phone-device phone-device--image" : "phone-device";

  const screenContent = (
    <div className="phone-device__screen">
      <div className="wechat-phone">
                <div className="wechat-phone__status-bar">
                  <span className="wechat-phone__status-time">3:05</span>
                  <div className="wechat-phone__status-icons">
                    <StatusCellularIcon className="wechat-phone__status-icon" />
                    <StatusWifiIcon className="wechat-phone__status-icon" />
                    <span className="wechat-phone__status-battery-wrap">
                      <span className="wechat-phone__status-battery-text">84</span>
                      <StatusBatteryIcon className="wechat-phone__status-icon wechat-phone__status-icon--battery" />
                    </span>
                  </div>
                </div>

                <header className="wechat-phone__nav">
                  <button type="button" className="wechat-phone__nav-back" aria-label="Back">
                    <svg viewBox="0 0 12 20" aria-hidden="true">
                      <path
                        d="M10.8 1.2 1.8 10l9 8.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <h2 className="wechat-phone__nav-title">Manekineko🐈</h2>
                  <button type="button" className="wechat-phone__nav-more" aria-label="More">
                    <svg viewBox="0 0 20 4" aria-hidden="true">
                      <circle cx="2" cy="2" r="1.6" fill="currentColor" />
                      <circle cx="10" cy="2" r="1.6" fill="currentColor" />
                      <circle cx="18" cy="2" r="1.6" fill="currentColor" />
                    </svg>
                  </button>
                </header>

                <div ref={chatRef} className="wechat-phone__chat wechat-phone__chat--draggable">
                  <div className="wechat-phone__chat-inner">
                    {SPRING_DANGO_STICKERS.map((src, index) => (
                      <div key={src} className="wechat-phone__message-group">
                        {TIMESTAMP_MARKERS[index] ? (
                          <p className="wechat-phone__timestamp">{TIMESTAMP_MARKERS[index]}</p>
                        ) : null}
                        <div className="wechat-phone__message wechat-phone__message--received">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={AVATAR}
                            alt=""
                            className="wechat-phone__avatar"
                            draggable={false}
                          />
                          <div className="wechat-phone__bubble wechat-phone__bubble--sticker">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Sticker ${index + 1}`}
                              className="wechat-phone__sticker"
                              loading={index < 4 ? "eager" : "lazy"}
                              decoding="async"
                              draggable={false}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <footer className="wechat-phone__footer">
                  <div className="wechat-phone__toolbar">
                    <button type="button" className="wechat-phone__toolbar-btn" aria-label="Voice">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={TOOLBAR_VOICE_ICON}
                        alt=""
                        className="wechat-phone__toolbar-voice-icon"
                        draggable={false}
                      />
                    </button>
                    <div className="wechat-phone__input-field" role="textbox" aria-readonly="true" />
                    <button type="button" className="wechat-phone__toolbar-btn" aria-label="Emoji">
                      <ToolbarEmojiIcon />
                    </button>
                    <button
                      type="button"
                      className="wechat-phone__toolbar-btn wechat-phone__toolbar-btn--plus"
                      aria-label="More"
                    >
                      <ToolbarPlusIcon />
                    </button>
                  </div>
                </footer>
      </div>
    </div>
  );

  return (
    <div className={moduleClass}>
      <div className="wechat-phone-module__stage">
        <div className={phoneClass} aria-hidden="false">
          {variant === "embedded" ? (
            <>
              <div
                className="phone-device__screen-slot"
                style={{
                  left: `${PHONE_SCREEN_INSET.left}%`,
                  top: `${PHONE_SCREEN_INSET.top}%`,
                  width: `${PHONE_SCREEN_INSET.width}%`,
                  height: `${PHONE_SCREEN_INSET.height}%`,
                }}
              >
                {screenContent}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHONE_FRAME}
                alt=""
                className="phone-device__frame-img"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </>
          ) : (
            <>
              <span className="phone-device__btn phone-device__btn--vol-up" />
              <span className="phone-device__btn phone-device__btn--vol-down" />
              <span className="phone-device__btn phone-device__btn--power" />
              <div className="phone-device__bezel">{screenContent}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
