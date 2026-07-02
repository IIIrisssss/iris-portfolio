type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "h-10" }: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon/logo-mark.svg"
      alt=""
      aria-hidden
      className={`block aspect-[534/69] w-auto max-w-none object-contain object-left ${className}`.trim()}
    />
  );
}
