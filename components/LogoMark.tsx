type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <span className={`logo-mark-swap group relative inline-flex items-center ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon/logo-mark.svg"
        alt=""
        aria-hidden
        className="logo-mark-swap__base block w-auto max-w-none object-contain object-left transition-opacity duration-200 group-hover:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon/logo-mark-hover.svg"
        alt=""
        aria-hidden
        className="logo-mark-swap__hover pointer-events-none absolute left-0 top-0 block w-auto max-w-none object-contain object-left opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </span>
  );
}
