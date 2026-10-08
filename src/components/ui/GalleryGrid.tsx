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

function PhotoCell({ img, onClick, className = "" }: { img: GalleryImage; onClick: () => void; className?: string }) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer relative img-zoom ${className}`}
      style={{ background: "#F2F0EB" }}
    >
      {img.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ border: "1px solid rgba(27,42,74,0.14)" }}>
          <span className="eyebrow" style={{ color: "rgba(27,42,74,0.45)" }}>Coming Soon</span>
        </div>
      )}

      {img.src && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: "linear-gradient(to top, rgba(10,9,8,0.55) 0%, transparent 55%)" }} />
          <div className="absolute bottom-0 left-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-1 group-hover:translate-y-0">
            <span className="eyebrow block" style={{ color: "rgba(250,249,246,0.7)" }}>{img.category}</span>
            <span className="eyebrow link-underline is-active text-white mt-2 block" style={{ fontSize: "10px" }}>View</span>
          </div>
        </>
      )}
    </div>
  );
}

// Asymmetric lookbook layout for the first four cells
const LAYOUT = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export default function GalleryGrid({ images, previewCount = 4 }: GalleryGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const preview = images.slice(0, previewCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {preview.map((img, i) => (
          <PhotoCell
            key={img.id}
            img={img}
            onClick={() => img.src && setLightbox(img)}
            className={`${LAYOUT[i % LAYOUT.length]} aspect-[4/5] md:aspect-auto md:h-[520px] lg:h-[600px]`}
          />
        ))}
      </div>

      {images.length > previewCount && (
        <div className="mt-10 flex items-center gap-6">
          <div className="flex-1 hairline" />
          <button onClick={() => setExpanded(true)} className="eyebrow link-underline" style={{ color: "#1B2A4A" }}>
            View all {images.length} photos
          </button>
          <div className="flex-1 hairline" />
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto" style={{ background: "#FAF9F6" }}>
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-5"
              style={{ background: "rgba(250,249,246,0.96)", borderBottom: "1px solid rgba(27,42,74,0.12)" }}>
              <h2 className="eyebrow" style={{ color: "rgba(44,40,37,0.6)" }}>Photography — All</h2>
              <button onClick={() => setExpanded(false)} className="eyebrow link-underline" style={{ color: "#1B2A4A" }}>Close</button>
            </div>
            <div className="px-6 md:px-12 py-10 columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {images.map((img) => (
                <div key={img.id} className="break-inside-avoid">
                  <PhotoCell img={img} onClick={() => img.src && setLightbox(img)}
                    className={img.aspect === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]"} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            style={{ background: "rgba(26,23,22,0.96)" }}
            onClick={() => setLightbox(null)}>
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.src} alt={lightbox.alt} className="w-full h-auto max-h-[85vh] object-contain" />
              <div className="mt-4 flex items-center justify-between">
                <span className="eyebrow" style={{ color: "rgba(250,249,246,0.5)" }}>{lightbox.category}</span>
                <button onClick={() => setLightbox(null)} className="eyebrow link-underline text-white">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
