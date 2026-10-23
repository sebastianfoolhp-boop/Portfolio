import { SECTIONS, type SectionKey } from "@/lib/data";

/** "01", "02", ... taken from the section's position in SECTIONS (lib/data.ts). */
export function sectionNumber(key: SectionKey): string {
  return String(SECTIONS.findIndex((s) => s.key === key) + 1).padStart(2, "0");
}

interface SectionHeaderProps {
  sectionKey: SectionKey;
  title: string;
  /** Optional line under the title, in gray. */
  lead?: string;
}

/** The shared header for every section: a number, an oversized bold title, and an optional lead line. */
export default function SectionHeader({ sectionKey, title, lead }: SectionHeaderProps) {
  return (
    <header>
      <span className="eyebrow block">{sectionNumber(sectionKey)}</span>
      <h2 className="display mt-5 text-ink" style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)" }}>
        {title}
      </h2>
      {lead && <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">{lead}</p>}
    </header>
  );
}
