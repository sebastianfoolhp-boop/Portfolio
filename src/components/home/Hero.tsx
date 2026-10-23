"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useMotionValue, useScroll } from "framer-motion";
import HomeIntro from "./HomeIntro";
import ShatteredPortrait from "@/components/shatter/ShatteredPortrait";
import { VIEW } from "@/components/shatter/shards";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * The full-screen homepage (#home): pure black, the typed introduction on the left,
 * the shattered portrait large and centered. All sizing lives in the .hero rules in
 * globals.css. The portrait is NOT fixed to the screen: it scrolls away with the
 * hero, and the pieces drift apart a little as it does.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [hint, setHint] = useState<"idle" | "show" | "gone">("idle");

  // 0 while the hero fills the screen, 1 once it has scrolled completely out of view.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const still = useMotionValue(0);

  // The portrait's shape, shared with the CSS that sizes it.
  const shape = { "--ar": `${VIEW.w} / ${VIEW.h}`, "--ar-num": VIEW.w / VIEW.h } as CSSProperties;

  return (
    <section id="home" ref={ref} aria-label="Home" className="hero" style={shape}>
      <div className="hero-grid">
        <div className="hero-text">
          <HomeIntro onTyped={() => setHint((h) => (h === "idle" ? "show" : h))} />
        </div>
        <div className="hero-portrait">
          <ShatteredPortrait progress={reduced ? still : scrollYProgress} reduced={reduced} />
        </div>
        <div aria-hidden className="hero-spacer" />
      </div>

      {/* One-time hint, shown after the headline has been typed */}
      {hint === "show" && (
        <p aria-hidden className="explore-hint" onAnimationEnd={() => setHint("gone")}>
          <span className="hint-mouse">Explore the pieces</span>
          <span className="hint-touch">Tap to explore</span>
        </p>
      )}
    </section>
  );
}
