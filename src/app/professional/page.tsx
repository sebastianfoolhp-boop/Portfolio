"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import IconLinks from "@/components/ui/IconLinks";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import {
  PROFESSIONAL_HERO, PROFESSIONAL_STATS, PROFESSIONAL_NARRATIVE,
  PROFESSIONAL_CARDS, EXPERIENCE,
} from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function Eyebrow({ children, color = "rgba(44,40,37,0.5)" }: { children: React.ReactNode; color?: string }) {
  return <span className="eyebrow block" style={{ color }}>{children}</span>;
}

export default function ProfessionalPage() {
  return (
    <main style={{ background: "#FAF9F6" }}>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden" style={{ background: "#1A1716", minHeight: "calc(100vh - 64px)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 25% 40%, rgba(27,42,74,0.7) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 85%, rgba(31,61,43,0.4) 0%, transparent 50%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="md:col-span-7">
              <Eyebrow color="rgba(250,249,246,0.5)">Professional</Eyebrow>
              <h1 className="font-serif text-white mt-8 leading-[1.02]" style={{ fontSize: "clamp(2.6rem, 5vw, 4.75rem)", fontWeight: 300 }}>
                {PROFESSIONAL_HERO.headline}
              </h1>
              <p className="font-serif italic mt-8" style={{ color: "rgba(250,249,246,0.8)", fontSize: "clamp(1.25rem, 2vw, 1.6rem)", fontWeight: 300 }}>
                {PROFESSIONAL_HERO.pull}
              </p>
              <div className="hairline-light mt-10" style={{ maxWidth: "6rem" }} />
              <p className="eyebrow mt-6" style={{ color: "rgba(250,249,246,0.75)", lineHeight: 2 }}>{PROFESSIONAL_HERO.meta1}</p>
              <p className="eyebrow" style={{ color: "rgba(250,249,246,0.5)", lineHeight: 2 }}>{PROFESSIONAL_HERO.meta2}</p>
              <div className="mt-10">
                <IconLinks dark links={[{ key: "linkedin", href: "https://linkedin.com/in/", label: "LinkedIn" }]} />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease }} className="md:col-span-5">
              <div className="img-zoom aspect-[4/5] w-full" style={{ background: "rgba(250,249,246,0.04)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot.jpg" alt="Sebastian Perez" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-20 md:space-y-28">
          {PROFESSIONAL_NARRATIVE.map((s) => (
            <SectionReveal key={s.number}>
              <div className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-start">
                <div className="font-serif leading-none select-none" style={{ color: "#5C2A2E", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 300 }}>{s.number}</div>
                <div>
                  <h2 className="font-serif leading-[1.1]" style={{ color: "#1A1716", fontSize: "clamp(2rem, 3.6vw, 3rem)", fontWeight: 400 }}>{s.heading}</h2>
                  <div className="mt-6 space-y-3">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="font-serif leading-relaxed" style={{ color: "rgba(44,40,37,0.72)", fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)" }}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* At a glance */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <Eyebrow>At a glance</Eyebrow>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
              {PROFESSIONAL_STATS.map((stat) => (
                <GlassCard key={stat.label} glow className="p-8 text-center">
                  <p className="font-serif leading-none" style={{ color: "#1B2A4A", fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", fontWeight: 400 }}>{stat.value}</p>
                  <p className="eyebrow mt-4" style={{ color: "rgba(44,40,37,0.5)", fontSize: "10px", lineHeight: 1.7 }}>{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* Experience timeline */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <Eyebrow>Experience</Eyebrow>
              <h2 className="font-serif mt-6 leading-[1.05]" style={{ color: "#1A1716", fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 400 }}>
                Where the work has taken me.
              </h2>
            </div>
            <div className="md:col-span-8">
              <ol className="relative" style={{ borderLeft: "1px solid rgba(27,42,74,0.18)" }}>
                {EXPERIENCE.map((e, i) => (
                  <li key={e.org} className="relative pl-10 pb-12 last:pb-0">
                    <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full" style={{ background: i === 0 ? "#5C2A2E" : "#1B2A4A" }} />
                    <span className="eyebrow block" style={{ color: "rgba(44,40,37,0.5)" }}>{e.period}</span>
                    <p className="font-serif mt-2 leading-tight" style={{ color: "#1A1716", fontSize: "clamp(1.5rem, 2.4vw, 2rem)", fontWeight: 400 }}>{e.org}</p>
                    <p className="mt-2 text-sm" style={{ color: "#1B2A4A" }}>{e.role}</p>
                    {e.detail && <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(44,40,37,0.6)", maxWidth: "36rem" }}>{e.detail}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* Proud to have helped */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <Eyebrow>Proud to have helped</Eyebrow>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-5 mt-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 flex items-center justify-center" style={{ border: "1px solid rgba(27,42,74,0.14)", background: "#F2F0EB" }}>
                  <span className="eyebrow" style={{ color: "rgba(27,42,74,0.35)", fontSize: "9px" }}>Coming Soon</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* Background */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <Eyebrow>Background</Eyebrow>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              {PROFESSIONAL_CARDS.map((card, i) => (
                <SectionReveal key={card.title} delay={i * 0.07}>
                  <GlassCard glow className="p-8 h-full">
                    <span className="eyebrow block" style={{ color: "#5C2A2E" }}>{card.title}</span>
                    <p className="font-serif mt-4 leading-relaxed" style={{ color: "rgba(44,40,37,0.78)", fontSize: "1.2rem" }}>{card.body}</p>
                  </GlassCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif leading-[1.05]" style={{ color: "#1A1716", fontSize: "clamp(2.4rem, 4.5vw, 4rem)", fontWeight: 300 }}>Want to work together?</h2>
            <p className="font-serif italic mt-6" style={{ color: "rgba(44,40,37,0.6)", fontSize: "1.3rem" }}>Reach out. Let&apos;s collaborate.</p>
            <Link href="/contact" className="eyebrow link-underline is-active mt-10 inline-block" style={{ color: "#1B2A4A" }}>
              Get in touch
            </Link>
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
