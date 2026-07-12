type IconProps = {
  className?: string;
};

export function StatusCellularIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 12" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" fill="currentColor" />
      <rect x="10" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
      <rect x="15" y="0" width="3" height="12" rx="0.6" fill="currentColor" />
    </svg>
  );
}

export function StatusWifiIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 12" aria-hidden="true">
      <path
        d="M8 10.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm-3.1-2.1a4.6 4.6 0 0 1 6.2 0l1-1.1a6.2 6.2 0 0 0-8.2 0l1 1.1Zm-2.5-2.4a8.1 8.1 0 0 1 10.8 0l1-1.1a9.7 9.7 0 0 0-12.8 0l1 1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StatusBatteryIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 27 13" aria-hidden="true">
      <rect
        x="0.75"
        y="0.75"
        width="22"
        height="11.5"
        rx="2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect x="2.4" y="2.4" width="16.8" height="8.2" rx="1.2" fill="currentColor" />
      <path
        d="M24.2 4.2h1.8c.7 0 1.2.5 1.2 1.2v2.1c0 .7-.5 1.2-1.2 1.2h-1.8"
        fill="currentColor"
      />
    </svg>
  );
}

export function ToolbarEmojiIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10.2" cy="11.8" r="1.2" fill="currentColor" />
      <circle cx="17.8" cy="11.8" r="1.2" fill="currentColor" />
      <path
        d="M9.8 17.2c1.4 2 2.4 2.8 4.2 2.8s2.8-.8 4.2-2.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function ToolbarPlusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 8.5v11M8.5 14h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
