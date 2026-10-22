"use client";

import SectionReveal from "./SectionReveal";

interface AudioSet {
  id: string;
  label: string;
  sublabel: string;
  duration: string;
  embedCode?: string;
  href?: string;
  isTikTok?: boolean;
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

export default function AudioSetsGrid({ sets }: { sets: AudioSet[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {sets.map((set, i) => {
        const isComingSoon = !set.href && !set.embedCode;
        const isTikTok = Boolean(set.isTikTok && set.href);

        const card = (
          <div
            className="group relative aspect-[4/3] overflow-hidden"
            style={
              isComingSoon
                ? { background: "#F2F0EB", border: "1px solid rgba(27,42,74,0.14)" }
                : { background: "#1A1716", cursor: "pointer" }
            }
          >
            {isComingSoon ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="eyebrow" style={{ color: "rgba(27,42,74,0.45)" }}>Coming Soon</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="eyebrow" style={{ color: "rgba(250,249,246,0.55)" }}>{set.sublabel}</span>
                  <span className="font-serif text-white mt-2 leading-tight" style={{ fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)", fontWeight: 400 }}>{set.label}</span>
                  <span className="eyebrow link-underline mt-4 text-white inline-flex items-center gap-2" style={{ fontSize: "10px" }}>
                    {isTikTok && <TikTokIcon />} Watch
                  </span>
                </div>
              </>
            )}
          </div>
        );

        return (
          <SectionReveal key={set.id} delay={i * 0.06}>
            {isTikTok ? (
              <a href={set.href} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
            ) : card}
          </SectionReveal>
        );
      })}
    </div>
  );
}
