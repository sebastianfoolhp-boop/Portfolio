"use client";

interface YouTubeCardProps {
  videoId: string;
  title: string;
  label?: string;
}

/** A rounded video card. The thumbnail keeps its original colors; the title sits on its own small plate. */
export default function YouTubeCard({ videoId, title, label }: YouTubeCardProps) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group card card-hover relative block aspect-video img-zoom outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      style={{ background: "#0b0b0b" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.7)" }}
        >
          <div className="ml-1 h-0 w-0" style={{ borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "15px solid #fff" }} />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5">
        <div className="inline-block max-w-full rounded-2xl px-4 py-3" style={{ background: "rgba(0,0,0,0.72)" }}>
          {label && <span className="eyebrow block" style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px" }}>{label}</span>}
          <p className="mt-1 text-lg font-bold leading-tight text-white md:text-xl">{title}</p>
        </div>
      </div>
    </a>
  );
}

export function YouTubeSlot({ label = "Video" }: { accent?: string; label?: string }) {
  return (
    <div
      className="card flex aspect-video flex-col items-center justify-center gap-2"
      style={{ background: "#0b0b0b", border: "1px dashed rgba(245,245,242,0.22)" }}
    >
      <span className="eyebrow" style={{ color: "var(--color-ink-3)" }}>Coming Soon</span>
      <span className="text-lg font-bold text-ink-3">Latest {label.toLowerCase()} video</span>
    </div>
  );
}
