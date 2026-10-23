"use client";

import { useState } from "react";
import Image from "next/image";
import SectionReveal from "./SectionReveal";
import Card, { CardArrow, type Tone } from "./Card";
import type { DecorKind } from "./Decor";
import type { TikTokThumb } from "@/lib/tiktok";

interface AudioSet {
  id: string;
  label: string;
  sublabel: string;
  duration: string;
  embedCode?: string;
  href?: string;
  isTikTok?: boolean;
  /** The saved TikTok cover for this link, if there is one. */
  thumb?: TikTokThumb | null;
}

// Colors and line art given to the mixes, in order. Add or reorder freely.
const LOOKS: { tone: Tone; decor: DecorKind }[] = [
  { tone: "orange", decor: "arcs" },
  { tone: "lime", decor: "rings" },
  { tone: "cobalt", decor: "lines" },
  { tone: "purple", decor: "burst" },
];

/** Shown when a video has no saved cover (private, removed, or not fetched yet) or the image fails to load. */
const FALLBACK = "/images/tiktok-fallback.svg";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

/** The cover image, cropped to fill the card without stretching. Falls back to the local placeholder on any failure. */
function Cover({ thumb }: { thumb?: TikTokThumb | null }) {
  const [failed, setFailed] = useState(false);
  const useFallback = !thumb || failed;
  return (
    <Image
      src={useFallback ? FALLBACK : thumb.src}
      alt={useFallback ? "" : thumb.alt}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      unoptimized={useFallback}
      onError={() => setFailed(true)}
      // object-cover keeps the proportions; the focus sits a little above center, where faces usually are
      className="object-cover object-[50%_30%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    />
  );
}

export default function AudioSetsGrid({ sets }: { sets: AudioSet[] }) {
  let colored = 0; // counts the real mixes so the colors run in order, skipping empty slots

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {sets.map((set, i) => {
        const isComingSoon = !set.href && !set.embedCode;
        const isLink = Boolean(set.isTikTok && set.href);
        const look = isComingSoon ? null : LOOKS[colored++ % LOOKS.length];

        let card;
        if (isLink && look) {
          // A linked TikTok: cover photo fills the card, with a dark "TikTok" label above and a dark genre box below.
          card = (
            <Card tone={look.tone} href={set.href} external className="group aspect-[4/5] w-full">
              <div className="absolute inset-0 -z-10 bg-[#121212]"><Cover thumb={set.thumb} /></div>
              <div className="flex h-full flex-col justify-between p-4 md:p-5">
                <div className="flex items-start">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-black/70 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    <TikTokIcon /> TikTok
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 rounded-2xl bg-black/70 px-5 py-4 text-white">
                  <h4 className="display" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)" }}>{set.sublabel || set.label}</h4>
                  <CardArrow className="mb-1 h-7 w-7 shrink-0" />
                </div>
              </div>
            </Card>
          );
        } else if (look) {
          // A mix with an embed instead of a link: a plain colored card.
          card = (
            <Card tone={look.tone} decor={look.decor} className="h-full">
              <div className="flex h-full min-h-[15rem] flex-col justify-between p-6 md:min-h-[17rem] md:p-8">
                <span className="eyebrow">{set.label || "Mix"}</span>
                <h4 className="display" style={{ fontSize: "clamp(2rem, 3.4vw, 3.1rem)" }}>{set.sublabel || set.label}</h4>
              </div>
            </Card>
          );
        } else {
          card = (
            <Card tone="outline" hover={false} className="h-full">
              <div className="flex h-full min-h-[15rem] flex-col justify-between p-6 md:min-h-[17rem] md:p-8">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl font-bold text-ink-3">Coming soon</span>
              </div>
            </Card>
          );
        }

        return (
          // The middle column sits a little lower on wide screens, for an editorial stagger
          <SectionReveal key={set.id} delay={i * 0.06} className={i % 3 === 1 ? "lg:mt-10" : ""}>
            {card}
          </SectionReveal>
        );
      })}
    </div>
  );
}
