"use client";

import { motion } from "framer-motion";
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
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

export default function AudioSetsGrid({ sets }: { sets: AudioSet[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sets.map((set, i) => {
        const isComingSoon = !set.href && !set.embedCode;
        const isTikTok = set.isTikTok && set.href;

        const card = (
          <motion.div
            whileHover={isComingSoon ? {} : { scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="group relative h-48 rounded-2xl overflow-hidden"
            style={
              isComingSoon
                ? { background: "rgba(27,42,74,0.04)", border: "1px dashed rgba(27,42,74,0.15)" }
                : isTikTok
                ? { background: "#1A1716", border: "1px solid rgba(250,249,246,0.08)", cursor: "pointer" }
                : { background: "#FFFFFF", border: "1px solid rgba(27,42,74,0.09)", cursor: "pointer" }
            }
          >
            {isComingSoon ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ backdropFilter: "blur(2px)" }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(27,42,74,0.25)" }}>Coming Soon</span>
                <span className="text-base font-black" style={{ color: "rgba(27,42,74,0.15)" }}>{set.label}</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: isTikTok ? "rgba(250,249,246,0.35)" : "rgba(44,40,37,0.3)" }}>{set.sublabel}</span>
                  <span className="mt-1 text-xl font-black" style={{ color: isTikTok ? "#FAF9F6" : "#1A1716" }}>{set.label}</span>
                  {set.duration && <span className="mt-1 text-sm" style={{ color: isTikTok ? "rgba(250,249,246,0.4)" : "rgba(44,40,37,0.4)" }}>{set.duration}</span>}
                </div>
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {isTikTok && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(250,249,246,0.1)", color: "rgba(250,249,246,0.7)" }}>
                      <TikTokIcon />
                      <span className="text-xs font-medium">Watch</span>
                    </div>
                  )}
                  {!isTikTok && (
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(27,42,74,0.08)", border: "1px solid rgba(27,42,74,0.15)" }}>
                      <span className="text-xs ml-0.5" style={{ color: "#1B2A4A" }}>▶</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        );

        return (
          <SectionReveal key={set.id} delay={i * 0.06}>
            {isTikTok ? (
              <a href={set.href} target="_blank" rel="noopener noreferrer" className="block">
                {card}
              </a>
            ) : (
              card
            )}
          </SectionReveal>
        );
      })}
    </div>
  );
}
