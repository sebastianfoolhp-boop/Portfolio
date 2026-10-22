"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { HOME_HERO, HOME_ABOUT, HOME_TEASERS } from "@/lib/data";

const FOOTER_LINKS = [
  { href: "/audio", label: "Audio" },
  { href: "/visual", label: "Visual" },
  { href: "/professional", label: "Professional" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: "calc(100vh - 64px)", minHeight: "640px", background: "#1A1716" }}>
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease }}
            className="font-serif text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)", letterSpacing: "0.22em", fontWeight: 300, paddingLeft: "0.22em" }}
          >
            Sebastian Perez
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease }}
            className="font-serif italic mt-6"
            style={{ color: "rgba(250,249,246,0.85)", fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", fontWeight: 300 }}
          >
            {HOME_HERO.tagline}
          </motion.p>
          <motion.a
            href="#about"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7, ease }}
            className="eyebrow link-underline is-active text-white mt-12"
          >
            Explore
          </motion.a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-16" style={{ background: "#FAF9F6" }}>
        <SectionReveal>
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <span className="eyebrow" style={{ color: "#5C2A2E" }}>About</span>
              <h2 className="font-serif mt-6 leading-[1.05]" style={{ color: "#1A1716", fontSize: "clamp(2.4rem, 4.5vw, 4rem)", fontWeight: 400 }}>
                {HOME_ABOUT.heading}
              </h2>
              <p className="font-serif mt-8 leading-relaxed" style={{ color: "rgba(44,40,37,0.78)", fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)", fontWeight: 400, maxWidth: "34rem" }}>
                {HOME_ABOUT.body}
              </p>
              <div className="hairline mt-10" style={{ maxWidth: "6rem" }} />
              <p className="eyebrow mt-6" style={{ color: "rgba(44,40,37,0.55)", lineHeight: 1.9 }}>
                {HOME_ABOUT.meta}
              </p>
              <Link href="/professional" className="eyebrow link-underline mt-8 inline-block" style={{ color: "#1B2A4A" }}>
                Read more
              </Link>
            </div>
            <div className="md:col-span-5 order-1 md:order-2">
              <div className="img-zoom aspect-[4/5]" style={{ background: "#F2F0EB" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot.jpg" alt="Sebastian Perez" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* Explore tiles */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16" style={{ background: "#FAF9F6" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-10">
              <span className="eyebrow" style={{ color: "rgba(44,40,37,0.5)" }}>Explore</span>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOME_TEASERS.map((teaser, i) => (
              <SectionReveal key={teaser.href} delay={i * 0.1}>
                <Link href={teaser.href} className="group relative block aspect-[4/5] overflow-hidden img-zoom" style={{ background: "#1A1716" }}>
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="eyebrow block" style={{ color: "rgba(250,249,246,0.55)" }}>Discover</span>
                    <span className="font-serif text-white block mt-3 leading-none" style={{ fontSize: "clamp(2.2rem, 3.4vw, 3rem)", fontWeight: 400 }}>
                      {teaser.label}
                    </span>
                    <span className="eyebrow link-underline text-white mt-6 inline-block" style={{ fontSize: "10px" }}>Enter</span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-16 pt-16 pb-12" style={{ background: "#FAF9F6", borderTop: "1px solid rgba(27,42,74,0.14)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-serif uppercase" style={{ color: "#1A1716", fontSize: "1.25rem", letterSpacing: "0.2em", fontWeight: 400 }}>Sebastian Perez</p>
            <p className="eyebrow mt-3" style={{ color: "rgba(44,40,37,0.45)" }}>Finance · Audio · Visual</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-8">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="eyebrow link-underline" style={{ color: "rgba(44,40,37,0.6)" }}>{label}</Link>
            ))}
          </div>
        </div>
        <p className="max-w-7xl mx-auto mt-12 eyebrow" style={{ color: "rgba(44,40,37,0.3)", fontSize: "10px" }}>
          © {new Date().getFullYear()} Sebastian Perez
        </p>
      </footer>
    </main>
  );
}
