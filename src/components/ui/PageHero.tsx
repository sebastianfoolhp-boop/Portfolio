import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  colorGradient?: string;
  fullHeight?: boolean;
  children?: ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  videoSrc,
  colorGradient,
  fullHeight = false,
  children,
}: PageHeroProps) {
  const height = fullHeight ? "calc(100vh - 64px)" : "72vh";
  const minHeight = fullHeight ? "600px" : "480px";

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden img-zoom"
      style={{ height, minHeight, background: "#1A1716" }}
    >
      {videoSrc ? (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={videoSrc} />
      ) : imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt={imageAlt ?? title} className="absolute inset-0 w-full h-full object-cover" />
      ) : null}

      {colorGradient && <div className="absolute inset-0" style={{ background: colorGradient }} />}

      <div className="absolute inset-0" style={{ background: "rgba(10,9,8,0.42)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-16">
        <h1
          className="font-serif text-white uppercase leading-none"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", letterSpacing: "0.2em", fontWeight: 300, paddingLeft: "0.2em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="eyebrow mt-6" style={{ color: "rgba(250,249,246,0.7)" }}>
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
