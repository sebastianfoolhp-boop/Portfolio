import SectionReveal from "@/components/ui/SectionReveal";
import IconLinks from "@/components/ui/IconLinks";
import Card, { CardArrow } from "@/components/ui/Card";
import CopyEmailCard from "./CopyEmailCard";
import SectionHeader from "./SectionHeader";
import { CONTACT_LINKS, SOCIAL_LINKS } from "@/lib/data";

const EMAIL = CONTACT_LINKS.find((l) => l.icon === "email");
const OTHERS = CONTACT_LINKS.filter((l) => l.icon !== "email");

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-[70svh] px-6 pb-48 pt-28 md:px-12 md:pb-56 md:pt-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeader sectionKey="contact" title="Contact" />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          {/* The one bold card on the page */}
          {EMAIL && (
            <SectionReveal className="md:col-span-8">
              <CopyEmailCard email={EMAIL.description} href={EMAIL.href} />
            </SectionReveal>
          )}

          <SectionReveal className="flex flex-col gap-4 md:col-span-4 md:gap-5" delay={0.08}>
            {OTHERS.map((link) => (
              <Card key={link.icon} tone="charcoal" href={link.href} external className="flex-1 min-h-[10rem] p-7">
                <span className="eyebrow">{link.label}</span>
                <p className="mt-6 text-xl font-bold leading-snug md:mt-auto md:text-2xl">{link.description}</p>
                <CardArrow className="mt-5 h-6 w-6" />
              </Card>
            ))}
          </SectionReveal>
        </div>

        <SectionReveal>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <span className="eyebrow">Elsewhere</span>
            <IconLinks links={SOCIAL_LINKS.filter((s) => s.key !== "soundcloud")} />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
