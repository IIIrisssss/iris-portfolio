type NavRollMarkProps = {
  src: string;
  aspect: `${number}/${number}`;
  className?: string;
};

export function NavRollMark({ src, aspect, className = "" }: NavRollMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      className={`floema-nav-mark block w-auto object-contain object-left ${className}`.trim()}
      style={{ aspectRatio: aspect }}
    />
  );
}
