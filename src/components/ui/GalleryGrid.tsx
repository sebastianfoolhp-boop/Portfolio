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

/** One rounded photo. Photos keep their original colors. Empty slots show a quiet dark placeholder. */
function PhotoCell({ img, onClick, className = "" }: { img: GalleryImage; onClick: () => void; className?: string }) {
  return (
    <div
      onClick={onClick}
      className={`group card card-hover cursor-pointer img-zoom ${className}`}
      style={{ background: "#0b0b0b" }}
    >
      {img.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ border: "1px dashed rgba(245,245,242,0.22)", borderRadius: "20px" }}>
          <span className="eyebrow" style={{ color: "var(--color-ink-3)" }}>Coming Soon</span>
        </div>
      )}

      {img.src && (
        <div className="absolute bottom-4 left-4 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-block rounded-xl px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white" style={{ background: "rgba(0,0,0,0.72)" }}>
            {img.category}
          </span>
        </div>
      )}
    </div>
  );
}

// Each photo's cell follows its own orientation (set per photo in Sanity), so photos are never
// squeezed into the wrong shape: landscape photos get wide cells, portrait photos get tall ones.
// Wide (8 of 12 columns) plus tall (4 of 12) fills a row, and "dense" packing tucks later photos into any gap.
const SHAPE: Record<"landscape" | "portrait", string> = {
  landscape: "aspect-[4/3] md:aspect-auto md:col-span-8 md:h-[400px] lg:h-[460px]",
  portrait: "aspect-[4/5] md:aspect-auto md:col-span-4 md:h-[460px] lg:h-[540px]",
};
const shapeOf = (img: GalleryImage) => SHAPE[img.aspect === "portrait" ? "portrait" : "landscape"];

export default function GalleryGrid({ images, previewCount = 4 }: GalleryGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const preview = images.slice(0, previewCount);

  return (
    <>
      <div className="grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-12 md:items-center md:gap-5">
        {preview.map((img) => (
          <PhotoCell
            key={img.id}
            img={img}
            onClick={() => img.src && setLightbox(img)}
            className={shapeOf(img)}
          />
        ))}
      </div>

      {images.length > previewCount && (
        <div className="mt-10 flex justify-center">
          <button onClick={() => setExpanded(true)} className="pill bg-white text-black">
            View all {images.length} photos
          </button>
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto" style={{ background: "#000000" }}>
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 md:px-12"
              style={{ background: "rgba(0,0,0,0.92)", borderBottom: "1px solid var(--color-line)" }}>
              <h2 className="eyebrow">Photography — All</h2>
              <button onClick={() => setExpanded(false)} className="pill bg-white text-black">Close</button>
            </div>
            <div className="columns-1 gap-5 space-y-5 px-6 py-10 sm:columns-2 md:px-12 lg:columns-3">
              {images.map((img) => (
                <div key={img.id} className="break-inside-avoid">
                  <PhotoCell img={img} onClick={() => img.src && setLightbox(img)}
                    className={`relative ${img.aspect === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
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
            style={{ background: "rgba(0,0,0,0.96)" }}
            onClick={() => setLightbox(null)}>
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.src} alt={lightbox.alt} className="h-auto max-h-[85vh] w-full rounded-[20px] object-contain" />
              <div className="mt-4 flex items-center justify-between">
                <span className="eyebrow" style={{ color: "rgba(245,245,242,0.6)" }}>{lightbox.category}</span>
                <button onClick={() => setLightbox(null)} className="pill bg-white text-black">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
