"use client";

import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

interface AudioSet {
  id: string;
  label: string;
  sublabel: string;
  duration: string;
  embedCode?: string;
}

export default function AudioSetsGrid({ sets }: { sets: AudioSet[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sets.map((set, i) => (
        <SectionReveal key={set.id} delay={i * 0.06}>
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer"
            style={{ background: "#FFFFFF", border: "1px solid rgba(27,42,74,0.09)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(27,42,74,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,42,74,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,42,74,0.09)";
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(44,40,37,0.3)" }}>{set.sublabel}</span>
              <span className="mt-1 text-xl font-black" style={{ color: "#1A1716" }}>{set.label}</span>
              <span className="mt-1 text-sm" style={{ color: "rgba(44,40,37,0.4)" }}>{set.duration}</span>
            </div>
            <div
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(27,42,74,0.08)", border: "1px solid rgba(27,42,74,0.15)" }}
            >
              <span className="text-xs ml-0.5" style={{ color: "#1B2A4A" }}>▶</span>
            </div>
          </motion.div>
        </SectionReveal>
      ))}
    </div>
  );
}
