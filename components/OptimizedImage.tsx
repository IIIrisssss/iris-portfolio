import Image, { type ImageProps } from "next/image";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  /** When true, disables lazy loading (LCP / above-the-fold). */
  priority?: boolean;
};

/**
 * Thin wrapper around next/image with sensible defaults:
 * AVIF/WebP via next.config, async decode, lazy unless priority.
 */
export function OptimizedImage({
  priority = false,
  loading,
  decoding = "async",
  quality = 85,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      alt={props.alt}
      quality={quality}
      priority={priority}
      loading={loading ?? (priority ? undefined : "lazy")}
      decoding={decoding}
    />
  );
}
