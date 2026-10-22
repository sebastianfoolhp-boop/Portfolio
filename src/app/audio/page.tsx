import SectionReveal from "@/components/ui/SectionReveal";
import PageHero from "@/components/ui/PageHero";
import VideoGrid from "@/components/ui/VideoGrid";
import AudioSetsGrid from "@/components/ui/AudioSetsGrid";
import IconLinks from "@/components/ui/IconLinks";
import { AUDIO_SETS, AUDIO_YOUTUBE } from "@/lib/data";
import { getAudioSets, getYouTubeVideos } from "@/sanity/lib/queries";

export const revalidate = 60;

const AUDIO_SOCIALS = [
  { key: "youtube", href: "https://www.youtube.com/@SebasPerez-sp", label: "YouTube" },
  { key: "soundcloud", href: "https://soundcloud.com/", label: "SoundCloud" },
  { key: "tiktok", href: "https://www.tiktok.com/@sebxsjairo", label: "TikTok" },
  { key: "instagram", href: "https://www.instagram.com/sxbxssp/", label: "Instagram" },
];

export default async function AudioPage() {
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
    <main style={{ background: "#FAF9F6" }}>
      <PageHero
        title="Audio"
        subtitle="DJ sets, mixes, and live sessions"
        videoSrc="/images/audio-hero.mp4"
      />

      {/* Socials */}
      <section className="pt-14 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
          <span className="eyebrow" style={{ color: "rgba(44,40,37,0.5)" }}>Follow</span>
          <IconLinks links={AUDIO_SOCIALS} />
        </div>
      </section>

      {/* Latest */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="eyebrow" style={{ color: "#5C2A2E" }}>Latest Set</span>
            </div>
            <div className="w-full md:w-2/3 mx-auto">
              <VideoGrid videos={videos} previewCount={1} sectionLabel="Audio" />
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* Sets */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif leading-none" style={{ color: "#1A1716", fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 400 }}>Sets &amp; Mixes</h2>
              <span className="eyebrow hidden sm:block" style={{ color: "rgba(44,40,37,0.45)" }}>Short form</span>
            </div>
            <AudioSetsGrid sets={sets} />
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* Listen */}
      <section className="py-20 md:py-24 pb-32 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="eyebrow" style={{ color: "rgba(44,40,37,0.5)" }}>Listen</span>
            </div>
            <div className="p-8" style={{ border: "1px solid rgba(27,42,74,0.14)", background: "#FFFFFF" }}>
              {embedSet?.embedCode ? (
                <div dangerouslySetInnerHTML={{ __html: embedSet.embedCode }} />
              ) : (
                <div className="flex flex-col items-center justify-center h-32 gap-2">
                  <span className="eyebrow" style={{ color: "rgba(27,42,74,0.45)" }}>Coming Soon</span>
                  <span className="font-serif italic" style={{ color: "rgba(27,42,74,0.4)", fontSize: "18px" }}>Full-length mixes</span>
                </div>
              )}
            </div>
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
