import type { SectionKey } from "@/lib/data";

interface SectionHeaderProps {
  sectionKey: SectionKey;
  title: string;
  /** Optional line under the title, in gray. */
  lead?: string;
}

/** The shared header for every section: an oversized bold title and an optional lead line. */
export default function SectionHeader({ title, lead }: SectionHeaderProps) {
  return (
    <header>
      <h2 className="display text-ink" style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)" }}>
        {title}
      </h2>
      {lead && <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">{lead}</p>}
    </header>
  );
}
