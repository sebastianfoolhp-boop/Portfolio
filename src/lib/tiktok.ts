import meta from "./tiktok-meta.json";

/** One entry in src/lib/tiktok-videos.json. */
export interface TikTokVideo {
  /** The video's link, exactly as you copy it from TikTok. Extra bits after the ? are fine. */
  url: string;
  /** The label shown big on the card. */
  genre: string;
  /** Optional: your own image (a path like /images/my-cover.jpg) to use instead of TikTok's cover. */
  thumbnail?: string;
}

interface MetaEntry {
  status?: string;
  cover?: string;
  title?: string;
  author?: string;
}

const ALL = meta as Record<string, MetaEntry>;

/** The video's numeric id, taken from a link like https://www.tiktok.com/@name/video/123?x=1 */
export function tiktokVideoId(url: string): string | null {
  const m = url.match(/\/video\/(\d+)/);
  return m ? m[1] : null;
}

export interface TikTokThumb {
  /** Local image path (saved by scripts/tiktok-thumbs.mjs). */
  src: string;
  /** Description for screen readers. */
  alt: string;
}

/** The saved cover for a TikTok link, or null if there isn't one (private, removed, not fetched yet). */
export function getTikTokThumb(url: string): TikTokThumb | null {
  const id = tiktokVideoId(url);
  const entry = id ? ALL[id] : undefined;
  if (!entry || entry.status !== "ok" || !entry.cover) return null;
  const by = entry.author ? ` by ${entry.author}` : "";
  const caption = entry.title ? `: ${entry.title}` : "";
  return { src: entry.cover, alt: `TikTok cover${by}${caption}` };
}
