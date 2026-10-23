import SectionReveal from "@/components/ui/SectionReveal";
import Card, { CardArrow, type Tone } from "@/components/ui/Card";
import IconLinks from "@/components/ui/IconLinks";
import SectionHeader from "./SectionHeader";
import { WORK_HERO, WORK_NARRATIVE, WORK_CARDS, EXPERIENCE } from "@/lib/data";

// Color is used sparingly here: mostly charcoal, with a few accents.
const EXPERIENCE_DOTS = ["bg-pop-purple", "bg-pop-cobalt", "bg-pop-lime"];  // order of EXPERIENCE

// Colored background cards by title; the rest stay charcoal.
const BG_TONES: Record<string, Tone> = { "Case Competitions": "lime", Leadership: "cobalt" };

const subTitleSize = { fontSize: "clamp(2.25rem, 5vw, 4rem)" };

export default function WorkSection() {
  return (
    <section id="work" className="px-6 pb-32 pt-28 md:px-12 md:pb-40 md:pt-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Title and headline on the left, the headshot (in its real colors) on the right */}
        <SectionReveal>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 lg:gap-20">
            <div className="md:col-span-7">
              <SectionHeader sectionKey="work" title="Work" />
              <h3 className="mt-10 text-3xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
                {WORK_HERO.headline}
              </h3>
              <p className="mt-6 text-lg text-ink-2 md:text-xl">{WORK_HERO.pull}</p>
              <div className="mt-8 space-y-1">
                <p className="eyebrow" style={{ color: "var(--color-ink)", lineHeight: 2 }}>{WORK_HERO.meta1}</p>
                <p className="eyebrow" style={{ lineHeight: 2 }}>{WORK_HERO.meta2}</p>
              </div>
              <div className="mt-8">
                <IconLinks links={[{ key: "linkedin", href: "https://linkedin.com/in/", label: "LinkedIn" }]} />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="card img-zoom aspect-[4/5] w-full" style={{ background: "#0b0b0b", borderRadius: "24px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot.jpg" alt="Sebastian Perez" loading="lazy" className="h-full w-full object-cover object-top" />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Narrative: large type, no cards */}
        <div className="mx-auto mt-28 max-w-5xl space-y-20 md:mt-40 md:space-y-28">
          {WORK_NARRATIVE.map((s) => (
            <SectionReveal key={s.number}>
              <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[110px_1fr] md:gap-10">
                <div className="display select-none text-ink-3" style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}>{s.number}</div>
                <div>
                  <h3 className="display text-ink" style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}>{s.heading}</h3>
                  <div className="mt-6 space-y-2">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-lg leading-relaxed text-ink-2 md:text-xl">{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Experience */}
        <SectionReveal>
          <div className="mt-28 md:mt-40">
            <h3 className="display text-ink" style={subTitleSize}>Experience</h3>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {EXPERIENCE.map((e, i) => (
                <Card key={e.org} tone="charcoal" className="min-h-[16rem] p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${EXPERIENCE_DOTS[i % EXPERIENCE_DOTS.length]}`} />
                    <span className="eyebrow">{e.period}</span>
                  </div>
                  <p className="mt-8 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{e.org}</p>
                  <p className="mt-3 text-sm font-bold text-ink">{e.role}</p>
                  {e.detail && <p className="mt-3 text-sm leading-relaxed text-ink-2">{e.detail}</p>}
                </Card>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Background */}
        <SectionReveal>
          <div className="mt-28 md:mt-40">
            <h3 className="display text-ink" style={subTitleSize}>Background</h3>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {WORK_CARDS.map((card) => (
                <Card key={card.title} tone={BG_TONES[card.title] ?? "charcoal"} className="h-full min-h-[13rem] p-7 md:p-9">
                  <span className="eyebrow" style={BG_TONES[card.title] ? undefined : { color: "var(--color-ink)" }}>{card.title}</span>
                  <p className="mt-6 text-xl font-bold leading-snug md:text-2xl" style={BG_TONES[card.title] ? undefined : { color: "var(--color-ink)" }}>{card.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Link on to Contact */}
        <SectionReveal>
          <div className="mx-auto mt-32 max-w-3xl text-center md:mt-44">
            <h3 className="display text-ink" style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.5rem)" }}>Want to work <mark className="rounded-xl italic bg-pop-cobalt px-3 text-white" style={{ boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>together</mark>?</h3>
            <p className="mt-6 text-lg text-ink-2 md:text-xl">Reach out. Let&apos;s collaborate.</p>
            <a href="#contact" className="pill mt-10 border border-white/30 text-white">
              Get in touch <CardArrow className="h-4 w-4" />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
