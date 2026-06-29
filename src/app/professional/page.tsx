"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/layout/NavBar";
import IconLinks from "@/components/ui/IconLinks";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import {
  PROFESSIONAL_STATS, PROFESSIONAL_NARRATIVE, PROFESSIONAL_CARDS,
} from "@/lib/data";

export default function ProfessionalPage() {
  return (
    <main style={{ background: "#FAF9F6" }}>
      {/* Intro — dark hero with headshot */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "#1A1716" }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 30% 40%, rgba(27,42,74,0.4) 0%, transparent 60%)"
        }} />
        <NavBar />
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-16 pt-24 pb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(250,249,246,0.35)" }}>Professional</p>
              <div className="flex items-center gap-4 mb-10">
                <div className="flex flex-col gap-2">
                  <p className="text-sm" style={{ color: "rgba(250,249,246,0.4)" }}>Finance · Consulting · Strategy</p>
                  <IconLinks dark links={[{ key: "linkedin", href: "https://linkedin.com/in/", label: "LinkedIn" }]} />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
                Hi, I&apos;m Sebastian. Building a career at the edge of finance and strategy.
              </h1>
              <p className="mt-5 text-base" style={{ color: "rgba(250,249,246,0.4)" }}>Based in Florida.</p>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="mt-14 flex items-center gap-2" style={{ color: "rgba(250,249,246,0.2)" }}>
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <span>↓</span>
              </motion.div>
            </motion.div>

            {/* Right — headshot */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm md:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/headshot.jpg"
                  alt="Sebastian Perez"
                  className="w-full rounded-2xl object-cover object-top"
                  style={{ height: "580px", display: "block" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"; }}
                />
                {/* Placeholder shown until real photo is added */}
                <div
                  className="w-full rounded-2xl items-center justify-center flex-col gap-3"
                  style={{ height: "580px", background: "rgba(250,249,246,0.04)", border: "1px dashed rgba(250,249,246,0.12)", display: "none" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(250,249,246,0.2)" strokeWidth={1} className="w-16 h-16">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  <p className="text-xs text-center px-6" style={{ color: "rgba(250,249,246,0.2)" }}>
                    Add your photo at<br /><code style={{ color: "rgba(250,249,246,0.35)" }}>/public/images/headshot.jpg</code>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto space-y-24">
          {PROFESSIONAL_NARRATIVE.map((s) => (
            <SectionReveal key={s.number}>
              <div className="grid md:grid-cols-[80px_1fr] gap-6 md:gap-12 items-start">
                <div className="text-6xl md:text-7xl font-black leading-none select-none"
                  style={{ color: "rgba(27,42,74,0.22)" }}>{s.number}</div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight mb-5" style={{ color: "#1A1716" }}>{s.heading}</h2>
                  <div className="space-y-4">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed" style={{ color: "rgba(44,40,37,0.6)" }}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <div className="px-6 md:px-16"><div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.07)" }} /></div>

      {/* Stats */}
      <section className="py-20 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(44,40,37,0.3)" }}>By the numbers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROFESSIONAL_STATS.map((stat) => (
                <GlassCard key={stat.label} className="p-6 text-center">
                  <p className="text-4xl font-black" style={{ color: "#1B2A4A" }}>{stat.value}</p>
                  <p className="mt-2 text-xs font-medium tracking-wide" style={{ color: "rgba(44,40,37,0.4)" }}>{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-16"><div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.07)" }} /></div>

      {/* Proud to have helped */}
      <section className="py-16 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(44,40,37,0.3)" }}>Proud to have helped</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(27,42,74,0.04)", border: "1px dashed rgba(27,42,74,0.15)", backdropFilter: "blur(4px)" }}>
                  <span className="text-xs tracking-widest" style={{ color: "rgba(27,42,74,0.2)" }}>Logo</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-16"><div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.07)" }} /></div>

      {/* Background cards */}
      <section className="py-16 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(44,40,37,0.3)" }}>Background</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROFESSIONAL_CARDS.map((card, i) => (
                <SectionReveal key={card.title} delay={i * 0.07}>
                  <GlassCard glow={i === 0 || i === 3} className="p-6 h-full">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "#1B2A4A" }}>{card.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(44,40,37,0.6)" }}>{card.body}</p>
                  </GlassCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-16"><div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.07)" }} /></div>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "#1A1716" }}>Want to work together?</h2>
            <p className="mt-4 text-base" style={{ color: "rgba(44,40,37,0.5)" }}>Reach out. Let&apos;s collaborate.</p>
            <Link href="/contact"
              className="inline-block mt-8 px-8 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 hover:opacity-80"
              style={{ background: "#1B2A4A", color: "#FAF9F6" }}>
              Get in touch →
            </Link>
          </div>
        </SectionReveal>
      </section>

      <div className="pb-28" />
    </main>
  );
}
