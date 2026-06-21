"use client";

import { motion } from "framer-motion";

interface YouTubeCardProps {
  videoId: string;
  title: string;
  label?: string;
}

export default function YouTubeCard({ videoId, title, label }: YouTubeCardProps) {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      className="group relative block aspect-video rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(27,42,74,0.1)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,9,8,0.88) 0%, rgba(10,9,8,0.2) 55%, transparent 100%)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
          style={{ background: "rgba(250,249,246,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(250,249,246,0.25)" }}
        >
          <div className="w-0 h-0 ml-1"
            style={{ borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "16px solid rgba(250,249,246,0.9)" }} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {label && <span className="text-xs tracking-widest uppercase block mb-1" style={{ color: "rgba(250,249,246,0.5)" }}>{label}</span>}
        <p className="text-white font-bold text-sm leading-snug">{title}</p>
      </div>
    </motion.a>
  );
}

export function YouTubeSlot({ accent = "#1B2A4A", label = "Video" }: { accent?: string; label?: string }) {
  return (
    <div
      className="aspect-video rounded-2xl flex flex-col items-center justify-center gap-3"
      style={{ background: "#FFFFFF", border: "1px dashed rgba(27,42,74,0.15)" }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(27,42,74,0.07)" }}>
        <svg viewBox="0 0 24 24" fill={accent} className="w-5 h-5">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
      <div className="text-center px-4">
        <p className="text-sm font-medium" style={{ color: "rgba(44,40,37,0.4)" }}>Latest {label} Video</p>
        <p className="text-xs mt-1" style={{ color: "rgba(44,40,37,0.25)" }}>
          Add your YouTube video ID in the <span style={{ color: accent }}>Sanity studio</span>
        </p>
      </div>
    </div>
  );
}
