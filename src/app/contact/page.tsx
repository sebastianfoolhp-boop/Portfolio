"use client";

import { motion } from "framer-motion";
import { CONTACT_LINKS } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col" style={{ background: "#FAF9F6" }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}
          className="w-full max-w-xl text-center mb-16">
          <span className="eyebrow" style={{ color: "#5C2A2E" }}>Contact</span>
          <h1 className="font-serif mt-6 leading-none" style={{ color: "#1A1716", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 300 }}>
            Let&apos;s talk.
          </h1>
          <p className="font-serif italic mt-6" style={{ color: "rgba(44,40,37,0.6)", fontSize: "1.3rem" }}>Pick a channel and reach out.</p>
        </motion.div>

        <div className="w-full max-w-xl" style={{ borderTop: "1px solid rgba(27,42,74,0.14)" }}>
          {CONTACT_LINKS.map((link, i) => (
            <motion.a
              key={link.icon}
              href={link.href}
              target={link.icon !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease }}
              className="group flex items-center justify-between gap-6 py-7 transition-colors duration-300"
              style={{ borderBottom: "1px solid rgba(27,42,74,0.14)" }}
            >
              <div className="min-w-0">
                <span className="eyebrow block" style={{ color: "rgba(44,40,37,0.5)" }}>{link.label}</span>
                <span className="font-serif block mt-2 truncate" style={{ color: "#1A1716", fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)", fontWeight: 400 }}>
                  {link.description}
                </span>
              </div>
              <span className="eyebrow link-underline whitespace-nowrap" style={{ color: "#1B2A4A", fontSize: "10px" }}>
                {link.icon === "email" ? "Write" : "Open"}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
