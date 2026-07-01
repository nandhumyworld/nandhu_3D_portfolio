// Emits <img srcset sizes> for the -w{width}.webp variants produced by
// scripts/optimize-images.mjs. Pass `src` as the ORIGINAL path (e.g.
// "/images/farm/IMG_3862.JPG") — this component swaps the extension and
// appends the width suffix that the optimizer wrote to disk.
//
// `widths` must match the sizes the optimizer generated for that folder
// (see TARGETS in scripts/optimize-images.mjs).
import { forwardRef } from "react";

function toVariant(src, width) {
  const dot = src.lastIndexOf(".");
  const base = dot === -1 ? src : src.slice(0, dot);
  // srcset uses space + comma as separators, so any space inside the URL
  // (e.g. "Beauty and wild.jpg") corrupts the parser. Encode per path segment
  // — keeps the leading "/" and folder slashes intact.
  return `${base}-w${width}.webp`
    .split("/")
    .map(encodeURIComponent)
    .join("/");
}

const ResponsiveImg = forwardRef(function ResponsiveImg(
  { src, widths, sizes = "100vw", alt = "", className, loading = "lazy", fetchPriority, ...rest },
  ref
) {
  const sorted = [...widths].sort((a, b) => a - b);
  const srcSet = sorted.map((w) => `${toVariant(src, w)} ${w}w`).join(", ");
  const fallback = toVariant(src, sorted[Math.floor(sorted.length / 2)] || sorted[0]);
  return (
    <img
      ref={ref}
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchpriority={fetchPriority}
      className={className}
      {...rest}
    />
  );
});

export default ResponsiveImg;
