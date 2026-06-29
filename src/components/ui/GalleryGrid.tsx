"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  category: string;
  aspect: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  previewCount?: number;
}

function PhotoCell({ img, index, onClick }: { img: GalleryImage; index: number; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden relative"
      style={{ background: "#FFFFFF", border: "1px solid rgba(27,42,74,0.09)" }}
    >
      {img.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img.src} alt={img.alt} className={`w-full object-cover ${img.aspect === "portrait" ? "aspect-[3/4]" : "aspect-video"}`} />
      ) : (
        <div
          className={`w-full flex flex-col items-center justify-center gap-2 ${img.aspect === "portrait" ? "aspect-[3/4]" : "aspect-video"}`}
          style={{ background: "rgba(27,42,74,0.04)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        >
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(27,42,74,0.25)" }}>Coming Soon</span>
        </div>
      )}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
        style={{ background: "rgba(27,42,74,0.3)" }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(250,249,246,0.2)", border: "1px solid rgba(250,249,246,0.4)" }}>
          <span className="text-white text-sm">⊕</span>
        </div>
      </div>
      <div className="absolute bottom-3 left-3">
        <span className="text-xs font-medium tracking-widest uppercase px-2 py-1 rounded-lg"
          style={{ background: "rgba(250,249,246,0.9)", color: "rgba(44,40,37,0.5)" }}>
          {img.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function GalleryGrid({ images, previewCount = 4 }: GalleryGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const preview = images.slice(0, previewCount);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {preview.map((img, i) => (
          <PhotoCell key={img.id} img={img} index={i} onClick={() => setLightbox(img)} />
        ))}
      </div>

      {images.length > previewCount && (
        <div className="mt-5 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(27,42,74,0.08)" }} />
          <button onClick={() => setExpanded(true)}
            className="flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-70"
            style={{ color: "#1B2A4A" }}>
            View all {images.length} photos <span className="text-xs">↗</span>
          </button>
          <div className="flex-1 h-px" style={{ background: "rgba(27,42,74,0.08)" }} />
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ background: "rgba(250,249,246,0.98)", backdropFilter: "blur(20px)" }}>
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-5"
              style={{ background: "rgba(250,249,246,0.95)", borderBottom: "1px solid rgba(27,42,74,0.08)" }}>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "rgba(44,40,37,0.4)" }}>
                Photography — All
              </h2>
              <button onClick={() => setExpanded(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(27,42,74,0.07)", color: "rgba(44,40,37,0.6)" }}>✕</button>
            </div>
            <div className="px-6 md:px-12 py-8 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((img, i) => (
                <div key={img.id} className="break-inside-avoid">
                  <PhotoCell img={img} index={i} onClick={() => setLightbox(img)} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            style={{ background: "rgba(26,23,22,0.95)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightbox(null)}>
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              {lightbox.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lightbox.src} alt={lightbox.alt} className="w-full h-auto max-h-[85vh] object-contain" />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center rounded-2xl"
                  style={{ background: "rgba(250,249,246,0.04)", border: "1px solid rgba(250,249,246,0.1)" }}>
                  <span style={{ color: "rgba(250,249,246,0.3)" }} className="text-sm">{lightbox.alt}</span>
                </div>
              )}
              <button onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(250,249,246,0.15)", color: "rgba(250,249,246,0.8)" }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
