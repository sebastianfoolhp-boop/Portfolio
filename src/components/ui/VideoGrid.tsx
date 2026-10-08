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

export default function VideoGrid({ videos, previewCount = 2, sectionLabel = "Video" }: VideoGridProps) {
  const [expanded, setExpanded] = useState(false);
  const preview = videos.slice(0, previewCount);

  return (
    <>
      {videos.length === 0 ? (
        <YouTubeSlot label={sectionLabel} />
      ) : (
        <>
          <div className={`grid gap-6 ${preview.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
            {preview.map((v) => (
              <YouTubeCard key={v.videoId} videoId={v.videoId} title={v.title} label={v.label} />
            ))}
          </div>

          {videos.length > previewCount && (
            <div className="mt-8 flex items-center gap-6">
              <div className="flex-1 hairline" />
              <button onClick={() => setExpanded(true)} className="eyebrow link-underline" style={{ color: "#1B2A4A" }}>
                View all {videos.length} videos
              </button>
              <div className="flex-1 hairline" />
            </div>
          )}

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] overflow-y-auto"
                style={{ background: "#FAF9F6" }}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-5"
                  style={{ background: "rgba(250,249,246,0.96)", borderBottom: "1px solid rgba(27,42,74,0.12)" }}>
                  <h2 className="eyebrow" style={{ color: "rgba(44,40,37,0.6)" }}>{sectionLabel} — All Videos</h2>
                  <button onClick={() => setExpanded(false)} className="eyebrow link-underline" style={{ color: "#1B2A4A" }}>Close</button>
                </div>
                <div className="px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
