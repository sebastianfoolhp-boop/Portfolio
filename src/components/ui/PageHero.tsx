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
  const height = fullHeight ? "100vh" : "70vh";
  const minHeight = fullHeight ? "600px" : "480px";

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height, minHeight }}
    >
      {/* Video background */}
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
        />
      ) : imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "#1A1716" }} />
      )}

      {/* Color accent gradient */}
      {colorGradient && (
        <div className="absolute inset-0" style={{ background: colorGradient }} />
      )}

      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,9,8,0.45)" }}
      />

      {/* Centered text */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-16">
        <h1
          className="font-black tracking-tighter text-white leading-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-4 text-base md:text-lg max-w-xl"
            style={{ color: "rgba(250,249,246,0.55)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
