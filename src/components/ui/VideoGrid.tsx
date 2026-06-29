"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import YouTubeCard, { YouTubeSlot } from "./YouTubeCard";

interface YTVideo { title: string; videoId: string; label?: string; }

interface VideoGridProps {
  videos: YTVideo[];
  previewCount?: number;
  accentColor?: string;
  sectionLabel?: string;
}

export default function VideoGrid({ videos, previewCount = 2, accentColor = "#1B2A4A", sectionLabel = "Video" }: VideoGridProps) {
  const [expanded, setExpanded] = useState(false);
  const preview = videos.slice(0, previewCount);

  return (
    <>
      {videos.length === 0 ? (
        <div className="max-w-2xl">
          <YouTubeSlot accent={accentColor} label={sectionLabel} />
        </div>
      ) : (
        <>
          <div className={`grid gap-4 ${preview.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
            {preview.map((v) => (
              <YouTubeCard key={v.videoId} videoId={v.videoId} title={v.title} label={v.label} />
            ))}
          </div>

          {videos.length > previewCount && (
            <div className="mt-5 flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: "rgba(27,42,74,0.08)" }} />
              <button
                onClick={() => setExpanded(true)}
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: accentColor }}
              >
                View all {videos.length} videos <span className="text-xs">↗</span>
              </button>
              <div className="flex-1 h-px" style={{ background: "rgba(27,42,74,0.08)" }} />
            </div>
          )}

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 overflow-y-auto"
                style={{ background: "rgba(26,23,22,0.97)", backdropFilter: "blur(20px)" }}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-5"
                  style={{ background: "rgba(26,23,22,0.95)", borderBottom: "1px solid rgba(250,249,246,0.08)" }}>
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "rgba(250,249,246,0.4)" }}>
                    {sectionLabel} — All
                  </h2>
                  <button
                    onClick={() => setExpanded(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(250,249,246,0.08)", color: "rgba(250,249,246,0.6)" }}
                  >✕</button>
                </div>
                <div className="px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {videos.map((v) => (
                    <YouTubeCard key={v.videoId} videoId={v.videoId} title={v.title} label={v.label} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
