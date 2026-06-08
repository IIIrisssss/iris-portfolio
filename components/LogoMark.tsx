type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "h-10" }: LogoMarkProps) {
  return (
    <span
      aria-hidden
      className={`block aspect-[435/164] w-auto bg-[var(--color-on-primary)] [mask-image:url(/icon/logo-mark.svg)] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url(/icon/logo-mark.svg)] [-webkit-mask-position:left_center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] ${className}`}
    />
  );
}
