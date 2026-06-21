import { client } from "../client";
import { urlFor } from "../client";

export interface SanityGalleryImage {
  _id: string;
  alt?: string;
  category?: string;
  aspect?: string;
  order?: number;
  image: { asset: { _ref: string } };
}

export interface SanityYouTubeVideo {
  _id: string;
  title: string;
  videoId: string;
  page: "audio" | "visual";
  label?: string;
  order?: number;
}

export interface SanityAudioSet {
  _id: string;
  label: string;
  sublabel?: string;
  duration?: string;
  embedCode?: string;
  order?: number;
}

export async function getGalleryImages(): Promise<SanityGalleryImage[]> {
  return client.fetch(
    `*[_type == "galleryImage"] | order(order asc) { _id, alt, category, aspect, order, image }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getYouTubeVideos(page: "audio" | "visual"): Promise<SanityYouTubeVideo[]> {
  return client.fetch(
    `*[_type == "youtubeVideo" && page == $page] | order(order asc) { _id, title, videoId, page, label, order }`,
    { page },
    { next: { revalidate: 60 } }
  );
}

export async function getAudioSets(): Promise<SanityAudioSet[]> {
  return client.fetch(
    `*[_type == "audioSet"] | order(order asc) { _id, label, sublabel, duration, embedCode, order }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export function galleryImageUrl(image: SanityGalleryImage, width = 800): string {
  return urlFor(image.image).width(width).auto("format").url();
}
