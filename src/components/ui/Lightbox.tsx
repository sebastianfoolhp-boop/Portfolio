"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  src: string;
  alt: string;
  label?: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt, label, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: "rgba(10,10,15,0.92)", backdropFilter: "blur(16px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl w-full rounded-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="w-full h-auto max-h-[85vh] object-contain" />
          ) : (
            <div
              className="w-full aspect-video flex items-center justify-center rounded-3xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-white/30 text-sm">{alt}</span>
            </div>
          )}
          {label && (
            <div className="absolute bottom-0 left-0 right-0 p-5"
              style={{ background: "linear-gradient(to top, rgba(10,10,15,0.9), transparent)" }}>
              <p className="text-white font-semibold">{label}</p>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
