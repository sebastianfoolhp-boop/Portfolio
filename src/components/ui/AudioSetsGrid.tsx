"use client";

import SectionReveal from "./SectionReveal";
import Card, { CardArrow, type Tone } from "./Card";
import type { DecorKind } from "./Decor";

interface AudioSet {
  id: string;
  label: string;
  sublabel: string;
  duration: string;
  embedCode?: string;
  href?: string;
  isTikTok?: boolean;
}

// Colors and line art given to the mixes, in order. Add or reorder freely.
const LOOKS: { tone: Tone; decor: DecorKind }[] = [
  { tone: "orange", decor: "arcs" },
  { tone: "lime", decor: "rings" },
  { tone: "cobalt", decor: "lines" },
  { tone: "purple", decor: "burst" },
];

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
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

        const body = isComingSoon ? (
          <div className="flex h-full min-h-[15rem] flex-col justify-between p-6 md:min-h-[17rem] md:p-8">
            <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-xl font-bold text-ink-3">Coming soon</span>
          </div>
        ) : (
          <div className="flex h-full min-h-[15rem] flex-col justify-between p-6 md:min-h-[17rem] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="eyebrow">{set.label || "Mix"}</span>
              {isLink && <span className="card-sub"><TikTokIcon /></span>}
            </div>
            <div className="flex items-end justify-between gap-4">
              <h4 className="display" style={{ fontSize: "clamp(2rem, 3.4vw, 3.1rem)" }}>{set.sublabel || set.label}</h4>
              {isLink && <CardArrow className="mb-1 h-8 w-8 shrink-0" />}
            </div>
          </div>
        );

        const card = (
          <Card
            tone={isComingSoon ? "outline" : look!.tone}
            decor={isComingSoon ? undefined : look!.decor}
            href={isLink ? set.href : undefined}
            external={isLink}
            hover={!isComingSoon}
            className="h-full"
          >
            {body}
          </Card>
        );

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
