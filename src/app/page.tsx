"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/layout/NavBar";
import SectionReveal from "@/components/ui/SectionReveal";
import { HOME_ABOUT, HOME_TEASERS } from "@/lib/data";

const FOOTER_LINKS = [
  { href: "/audio", label: "Audio" },
  { href: "/visual", label: "Visual" },
  { href: "/professional", label: "Professional" },
  { href: "/contact", label: "Contact" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "#1A1716" }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(255,80,0,0.3) 0%, transparent 45%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 80% 30%, rgba(0,100,255,0.28) 0%, transparent 45%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(10,9,8,0.98) 0%, rgba(10,9,8,0.15) 50%, transparent 80%)"
        }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tighter leading-none text-white"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            SEBASTIAN
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-lg md:text-xl font-medium max-w-lg"
            style={{ color: "rgba(250,249,246,0.5)" }}
          >
            Finance meets music. Numbers meet frames.
          </motion.p>
        </div>
        <NavBar />
      </section>

      {/* About */}
      <section className="py-28 px-6 md:px-16" style={{ background: "#FAF9F6" }}>
        <SectionReveal>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#1B2A4A" }}>About</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: "#1A1716" }}>
                {HOME_ABOUT.heading}
              </h2>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(44,40,37,0.65)" }}>
              {HOME_ABOUT.body}
            </p>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-16" style={{ background: "#FAF9F6" }}>
        <div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.08)" }} />
      </div>

      {/* Teasers */}
      <section className="py-24 px-6 md:px-16" style={{ background: "#FAF9F6" }}>
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "rgba(44,40,37,0.3)" }}>Explore</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOME_TEASERS.map((teaser, i) => (
                <SectionReveal key={teaser.href} delay={i * 0.08}>
                  <Link href={teaser.href}
                    className="group block h-64 rounded-2xl overflow-hidden relative transition-all duration-300"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(27,42,74,0.09)", boxShadow: "0 1px 12px rgba(27,42,74,0.06)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(27,42,74,0.14)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,42,74,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 12px rgba(27,42,74,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,42,74,0.09)";
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black tracking-tight" style={{ color: "#1A1716" }}>{teaser.label}</span>
                    </div>
                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-bold"
                      style={{ color: "#1B2A4A" }}>→</div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6 md:px-16" style={{ borderColor: "rgba(27,42,74,0.08)", background: "#FAF9F6" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <p className="text-xl font-black tracking-tight" style={{ color: "#1A1716" }}>SEBASTIAN</p>
            <p className="mt-1 text-xs tracking-widest uppercase" style={{ color: "rgba(44,40,37,0.35)" }}>Finance · Audio · Visual</p>
          </div>
          <div className="flex gap-6 text-sm" style={{ color: "rgba(44,40,37,0.4)" }}>
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="transition-colors duration-200 hover:text-[#1B2A4A]">{label}</Link>
            ))}
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-8 text-xs" style={{ color: "rgba(44,40,37,0.2)" }}>
          © {new Date().getFullYear()} Sebastian Perez
        </p>
      </footer>
    </main>
  );
}
