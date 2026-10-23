"use client";

import { useEffect, useState } from "react";
import { HOME_INTRO } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// ============================================================
// Typewriter timing: change these to taste
// ============================================================
const START_DELAY_MS = 650;        // pause before the first character
const MIN_CHAR_MS = 60;            // fastest gap between characters
const MAX_CHAR_MS = 90;            // slowest gap between characters
const CARET_BLINK_AFTER_MS = 3600; // how long the caret keeps blinking after the last character

type Phase = "typing" | "blinking" | "done";

const TONE_CLASS: Record<string, string> = {
  base: "text-ink",
  muted: "text-ink-3 italic",
};

const PARTS = HOME_INTRO.headline;
const TOTAL = PARTS.reduce((n, p) => n + p.text.length, 0);
const PLAIN_TEXT = PARTS.map((p) => p.text).join("");
// Index of the first character of each part within the whole sentence.
const STARTS = PARTS.map((_, i) => PARTS.slice(0, i).reduce((n, p) => n + p.text.length, 0));

// Module scope on purpose: this survives in-app navigation but resets on a full
// page load, so the animation plays once when the site first opens and not
// every time you come back to Home.
let hasPlayed = false;

function Caret({ blinking, visible }: { blinking: boolean; visible: boolean }) {
  return (
    <span aria-hidden className="relative inline-block h-[0.84em] w-0 align-[-0.1em]">
      <span
        className={`absolute left-[0.04em] top-0 h-full bg-ink ${blinking ? "caret-blink" : ""}`}
        style={{ width: "max(2px, 0.025em)", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
      />
    </span>
  );
}

export default function HomeIntro({ onTyped }: { onTyped?: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(() => (hasPlayed ? TOTAL : 0));
  const [phase, setPhase] = useState<Phase>(() => (hasPlayed ? "done" : "typing"));

  useEffect(() => {
    // Nothing to animate if it already played, or the visitor prefers reduced motion.
    if (hasPlayed || reduced) {
      // Reduced motion on a first visit: nothing types, but the hint still follows.
      if (!hasPlayed && reduced) onTyped?.();
      hasPlayed = true;
      return;
    }
    let typed = 0;
    let timer: number;
    const step = () => {
      typed += 1;
      setCount(typed);
      if (typed < TOTAL) {
        timer = window.setTimeout(step, MIN_CHAR_MS + Math.random() * (MAX_CHAR_MS - MIN_CHAR_MS));
        return;
      }
      hasPlayed = true;
      onTyped?.();
      setPhase("blinking");
      timer = window.setTimeout(() => setPhase("done"), CARET_BLINK_AFTER_MS);
    };
    timer = window.setTimeout(step, START_DELAY_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // Reduced motion: show everything immediately, no caret.
  const shown = reduced ? TOTAL : count;
  const currentPhase: Phase = reduced ? "done" : phase;
  const sentenceVisible = currentPhase !== "typing";

  // Build the headline. Every character is always laid out (untyped ones are transparent),
  // so the line breaks never jump around while typing.
  // The caret sits at the end of whichever part the last typed character belongs to.
  const caretPart = shown === 0 ? 0 : PARTS.findIndex((p, i) => shown > STARTS[i] && shown <= STARTS[i] + p.text.length);
  const parts = PARTS.map((part, i) => {
    const typedHere = Math.max(0, Math.min(part.text.length, shown - STARTS[i]));
    const caretHere = i === caretPart;
    return (
      <span key={i} className={TONE_CLASS[part.tone] ?? TONE_CLASS.base}>
        {part.text.slice(0, typedHere)}
        {caretHere && <Caret blinking={currentPhase === "blinking"} visible={currentPhase !== "done"} />}
        <span className="text-transparent">{part.text.slice(typedHere)}</span>
      </span>
    );
  });

  return (
    <div>
      <h1 className="hero-headline font-serif font-light leading-[1.04] text-ink">
        {/* Screen readers get the whole sentence at once; the animated copy is decoration. */}
        <span className="sr-only">{PLAIN_TEXT}</span>
        <span aria-hidden className="select-none">{parts}</span>
      </h1>

      <p
        className="hero-sentence text-left leading-relaxed text-ink-2"
        style={{
          opacity: sentenceVisible ? 1 : 0,
          transform: sentenceVisible ? "none" : "translateY(8px)",
          transition: reduced ? "none" : "opacity 1.1s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {HOME_INTRO.sentence}
      </p>
    </div>
  );
}
