import SectionReveal from "@/components/ui/SectionReveal";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/ui/GalleryGrid";
import VideoGrid from "@/components/ui/VideoGrid";
import IconLinks from "@/components/ui/IconLinks";
import { GALLERY_IMAGES, VISUAL_YOUTUBE } from "@/lib/data";
import { getGalleryImages, getYouTubeVideos, galleryImageUrl } from "@/sanity/lib/queries";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

export const revalidate = 60;

const VISUAL_LINKS = [
  { key: "onedrive", href: "https://onedrive.live.com/", label: "OneDrive Photos" },
  { key: "youtube", href: "https://www.youtube.com/@SebasPerez-sp", label: "YouTube Channel" },
];

const ONEDRIVE_PHOTOS = "https://onedrive.live.com/";
const ONEDRIVE_VIDEOS = "https://onedrive.live.com/";

export default async function VisualPage() {
  const [sanityPhotos, sanityVideos] = await Promise.all([
    getGalleryImages().catch(() => []),
    getYouTubeVideos("visual").catch(() => []),
  ]);

  const allPhotos: GalleryImage[] = sanityPhotos.length > 0
    ? sanityPhotos
        .filter((p) => p.category !== "Cinematography")
        .map((p) => ({
          id: p._id,
          src: galleryImageUrl(p, 1200),
          alt: p.alt ?? "",
          category: p.category ?? "Photography",
          aspect: p.aspect ?? "landscape",
        }))
    : GALLERY_IMAGES.filter((p) => p.category !== "Cinematography");

  const videos = sanityVideos.length > 0
    ? sanityVideos.map((v) => ({ title: v.title, videoId: v.videoId, label: v.label }))
    : VISUAL_YOUTUBE;

  return (
    <main style={{ background: "#FAF9F6" }}>
      <PageHero
        title="Visual"
        subtitle="Photography and cinematography"
        colorGradient="radial-gradient(ellipse at 65% 40%, rgba(27,42,74,0.85) 0%, rgba(31,61,43,0.4) 50%, transparent 75%)"
      />

      <section className="pt-14 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
          <span className="eyebrow" style={{ color: "rgba(44,40,37,0.5)" }}>Libraries</span>
          <IconLinks links={VISUAL_LINKS} />
        </div>
      </section>

      {/* Film */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 gap-6">
              <h2 className="font-serif leading-none" style={{ color: "#1A1716", fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 400 }}>Film</h2>
              <a href={ONEDRIVE_VIDEOS} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline whitespace-nowrap" style={{ color: "#1B2A4A" }}>
                Full video library
              </a>
            </div>
            <VideoGrid videos={videos} previewCount={2} sectionLabel="Visual" />
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-12 lg:px-16"><div className="max-w-7xl mx-auto hairline" /></div>

      {/* Photography */}
      <section className="py-20 md:py-24 pb-32 px-6 md:px-12 lg:px-16">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 gap-6">
              <h2 className="font-serif leading-none" style={{ color: "#1A1716", fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 400 }}>Photography</h2>
              <a href={ONEDRIVE_PHOTOS} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline whitespace-nowrap" style={{ color: "#1B2A4A" }}>
                Full photo library
              </a>
            </div>
            <GalleryGrid images={allPhotos} previewCount={4} />
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
