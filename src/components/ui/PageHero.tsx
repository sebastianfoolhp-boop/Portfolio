import { ReactNode } from "react";
import LazyVideo from "./LazyVideo";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** Looping silent video behind the title. Loads only when you scroll near it. */
  videoSrc?: string;
  /** Which part of the footage stays in view when it is cropped: "x% y%". 50% 50% is the center. */
  position?: string;
  /** Still image behind the title (used when there is no video). */
  imageSrc?: string;
  imageAlt?: string;
  /** Banner height. Any CSS length; svh keeps it correct under mobile browser toolbars. */
  height?: string;
  children?: ReactNode;
}

/**
 * Rounded banner that opens the Music and Cinema sections. The footage keeps its
 * original colors; only a light flat tint sits on top so the white title stays readable.
 */
export default function PageHero({
  title,
  subtitle,
  videoSrc,
  position = "50% 50%",
  imageSrc,
  imageAlt,
  height = "64svh",
  children,
}: PageHeroProps) {
  return (
    <div className="px-3 pt-3 md:px-6 md:pt-6">
      <div
        className="img-zoom relative flex items-end overflow-hidden"
        style={{ height, minHeight: "380px", background: "#0b0b0b", borderRadius: "28px" }}
      >
        {videoSrc ? (
          <LazyVideo src={videoSrc} position={position} className="absolute inset-0 h-full w-full object-cover" />
        ) : imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt ?? title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: position }} />
        ) : null}

        {/* Light flat tint, just enough for the white title */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />

        <div className="relative z-10 w-full px-6 pb-8 md:px-12 md:pb-12" style={{ textShadow: "0 2px 28px rgba(0,0,0,0.55)" }}>
          <h2 className="display text-white" style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)" }}>
            {title}
          </h2>
          {subtitle && <p className="eyebrow mt-5" style={{ color: "rgba(255,255,255,0.85)" }}>{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
}
