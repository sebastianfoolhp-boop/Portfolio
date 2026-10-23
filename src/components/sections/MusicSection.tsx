import SectionReveal from "@/components/ui/SectionReveal";
import PageHero from "@/components/ui/PageHero";
import VideoGrid from "@/components/ui/VideoGrid";
import AudioSetsGrid from "@/components/ui/AudioSetsGrid";
import IconLinks from "@/components/ui/IconLinks";
import Card, { CardArrow } from "@/components/ui/Card";
import { sectionNumber } from "./SectionHeader";
import { AUDIO_SETS, AUDIO_YOUTUBE, MUSIC_TOPICS, SOCIAL_LINKS } from "@/lib/data";
import { getAudioSets, getYouTubeVideos } from "@/sanity/lib/queries";

const subTitle = "display text-ink";
const subTitleSize = { fontSize: "clamp(2.25rem, 5vw, 4rem)" };
const YOUTUBE = SOCIAL_LINKS.find((s) => s.key === "youtube")?.href ?? "https://www.youtube.com/";

export default async function MusicSection() {
  const [sanitySets, sanityVideos] = await Promise.all([
    getAudioSets().catch(() => []),
    getYouTubeVideos("audio").catch(() => []),
  ]);

  const sets = sanitySets.length > 0
    ? sanitySets.map((s) => ({ id: s._id, label: s.label, sublabel: s.sublabel ?? "", duration: s.duration ?? "", embedCode: s.embedCode, href: undefined, isTikTok: false }))
    : AUDIO_SETS.map((s) => ({ ...s, id: String(s.id), embedCode: undefined }));

  const videos = sanityVideos.length > 0
    ? sanityVideos.map((v) => ({ title: v.title, videoId: v.videoId, label: v.label }))
    : AUDIO_YOUTUBE;

  const embedSet = sets.find((s) => s.embedCode);

  return (
    <section id="music">
      <PageHero number={sectionNumber("music")} title="Music" subtitle="DJ sets, mixes, and live sessions" videoSrc="/images/audio-hero.mp4" />

      <div className="px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Platforms */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-14">
            <span className="eyebrow">Find me on</span>
            <IconLinks links={SOCIAL_LINKS} />
          </div>

          {/* Latest set: a large video next to a call to action */}
          <SectionReveal>
            <div className="pt-16 md:pt-24">
              <span className="eyebrow">Latest set</span>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
                <div className="md:col-span-8">
                  <VideoGrid videos={videos} previewCount={1} sectionLabel="Music" />
                </div>
                <Card tone="cobalt" decor="rings" href={YOUTUBE} external className="min-h-[14rem] p-7 md:col-span-4 md:p-9">
                  <span className="eyebrow">YouTube</span>
                  <p className="display mt-10 md:mt-auto" style={{ fontSize: "clamp(2rem, 3.4vw, 3.1rem)" }}>Watch more sets</p>
                  <CardArrow className="mt-6 h-9 w-9" />
                </Card>
              </div>
            </div>
          </SectionReveal>

          {/* Sets and mixes */}
          <SectionReveal>
            <div className="pt-24 md:pt-36">
              <div className="mb-10 flex items-end justify-between gap-6">
                <h3 className={subTitle} style={subTitleSize}>Sets &amp; Mixes</h3>
                <span className="eyebrow hidden sm:block">Short form</span>
              </div>
              <AudioSetsGrid sets={sets} />
            </div>
          </SectionReveal>

          {/* Topics waiting for real content */}
          <SectionReveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-14 md:gap-5">
              {MUSIC_TOPICS.map((topic, i) => (
                <Card key={topic} tone="outline" hover={false} className="min-h-[9rem] p-6">
                  <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="mt-6 text-2xl font-extrabold tracking-tight">{topic}</h4>
                  <span className="mt-2 text-sm font-bold text-ink-3">Coming soon</span>
                </Card>
              ))}
            </div>
          </SectionReveal>

          {/* Listen */}
          <SectionReveal>
            <div className="pb-32 pt-20 md:pb-40 md:pt-28">
              <span className="eyebrow">Listen</span>
              <Card tone="charcoal" hover={false} className="mt-8 p-6 md:p-8">
                {embedSet?.embedCode ? (
                  <div dangerouslySetInnerHTML={{ __html: embedSet.embedCode }} />
                ) : (
                  <div className="flex h-28 flex-col items-center justify-center gap-2">
                    <span className="eyebrow" style={{ color: "var(--color-ink-3)" }}>Coming Soon</span>
                    <span className="text-lg font-bold text-ink-3">Full-length mixes</span>
                  </div>
                )}
              </Card>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
