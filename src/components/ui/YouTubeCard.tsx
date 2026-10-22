"use client";

interface YouTubeCardProps {
  videoId: string;
  title: string;
  label?: string;
}

export default function YouTubeCard({ videoId, title, label }: YouTubeCardProps) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-video img-zoom"
      style={{ background: "#1A1716" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "rgba(10,9,8,0.45)" }} />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          style={{ border: "1px solid rgba(250,249,246,0.6)", background: "rgba(10,9,8,0.25)", backdropFilter: "blur(6px)" }}>
          <div className="w-0 h-0 ml-1" style={{ borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "13px solid #FAF9F6" }} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        {label && <span className="eyebrow block mb-2" style={{ color: "rgba(250,249,246,0.6)" }}>{label}</span>}
        <p className="font-serif text-white leading-tight" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", fontWeight: 400 }}>{title}</p>
        <span className="eyebrow link-underline mt-3 text-white" style={{ fontSize: "10px" }}>Watch</span>
      </div>
    </a>
  );
}

export function YouTubeSlot({ label = "Video" }: { accent?: string; label?: string }) {
  return (
    <div
      className="aspect-video flex flex-col items-center justify-center gap-2"
      style={{ background: "#F2F0EB", border: "1px solid rgba(27,42,74,0.14)" }}
    >
      <span className="eyebrow" style={{ color: "rgba(27,42,74,0.45)" }}>Coming Soon</span>
      <span className="font-serif italic" style={{ color: "rgba(27,42,74,0.35)", fontSize: "18px" }}>Latest {label.toLowerCase()} video</span>
    </div>
  );
}
