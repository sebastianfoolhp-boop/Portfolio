"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/layout/NavBar";
import { CONTACT_LINKS } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#FAF9F6" }}>
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm text-center mb-12">
          <h1 className="text-6xl font-black tracking-tight" style={{ color: "#1A1716" }}>Let&apos;s talk.</h1>
          <p className="mt-3 text-sm" style={{ color: "rgba(44,40,37,0.4)" }}>Pick a channel and reach out.</p>
        </motion.div>

        <div className="w-full max-w-sm flex flex-col gap-3">
          {CONTACT_LINKS.map((link, i) => (
            <motion.a
              key={link.icon}
              href={link.href}
              target={link.icon !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.015 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl group transition-all duration-200"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(27,42,74,0.09)",
                boxShadow: "0 1px 8px rgba(27,42,74,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,42,74,0.25)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(27,42,74,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,42,74,0.09)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 8px rgba(27,42,74,0.05)";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(27,42,74,0.07)", color: "#1B2A4A" }}>
                {ICONS[link.icon]}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-bold text-sm" style={{ color: "#1A1716" }}>{link.label}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(44,40,37,0.4)" }}>{link.description}</p>
              </div>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: "rgba(27,42,74,0.4)" }}>→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
