import SectionReveal from "@/components/ui/SectionReveal";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/ui/GalleryGrid";
import VideoGrid from "@/components/ui/VideoGrid";
import IconLinks from "@/components/ui/IconLinks";
import { CardArrow } from "@/components/ui/Card";
import { GALLERY_IMAGES, VISUAL_YOUTUBE } from "@/lib/data";
import { getGalleryImages, getYouTubeVideos, galleryImageUrl } from "@/sanity/lib/queries";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

const CINEMA_LINKS = [
  { key: "onedrive", href: "https://onedrive.live.com/", label: "OneDrive Photos" },
  { key: "youtube", href: "https://www.youtube.com/@SebasPerez-sp", label: "YouTube Channel" },
];

const ONEDRIVE_PHOTOS = "https://onedrive.live.com/";
const ONEDRIVE_VIDEOS = "https://onedrive.live.com/";

const subTitle = "display text-ink";
const subTitleSize = { fontSize: "clamp(2.25rem, 5vw, 4rem)" };

export default async function CinemaSection() {
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
    <section id="cinema">
      <PageHero title="Cinema" subtitle="Filmmaking, photography, and visual storytelling" videoSrc="/images/visual-hero.mp4" />

      <div className="px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-6 pt-14">
            <span className="eyebrow">Libraries</span>
            <IconLinks links={CINEMA_LINKS} />
          </div>

          {/* Film. The color is kept to the small button so the footage stays the star. */}
          <SectionReveal>
            <div className="pt-16 md:pt-24">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <h3 className={subTitle} style={subTitleSize}>Film</h3>
                <a href={ONEDRIVE_VIDEOS} target="_blank" rel="noopener noreferrer" className="pill bg-pop-purple text-white">
                  Full video library <CardArrow className="h-4 w-4" />
                </a>
              </div>
              <VideoGrid videos={videos} previewCount={2} sectionLabel="Cinema" />
            </div>
          </SectionReveal>

          {/* Photography */}
          <SectionReveal>
            <div className="pb-32 pt-24 md:pb-40 md:pt-36">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <h3 className={subTitle} style={subTitleSize}>Photography</h3>
                <a href={ONEDRIVE_PHOTOS} target="_blank" rel="noopener noreferrer" className="pill bg-pop-sun text-black">
                  Full photo library <CardArrow className="h-4 w-4" />
                </a>
              </div>
              <GalleryGrid images={allPhotos} previewCount={4} />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
