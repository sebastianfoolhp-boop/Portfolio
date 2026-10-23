#!/usr/bin/env node
// ============================================================
// TikTok cover images, fetched once and stored in the project
// ============================================================
// Reads the video links in src/lib/tiktok-videos.json, downloads each video's cover image into
// public/images/tiktok/, and records captions and authors in src/lib/tiktok-meta.json.
// The website then shows those local files, so there are no TikTok requests while visitors browse,
// and TikTok's expiring image links can never break a card.
//
// Run it:        npm run tiktok:thumbs          (fetches only videos that are new or missing)
// Refresh all:   npm run tiktok:thumbs -- --force
// It also runs automatically at the start of `npm run build`. It never fails the build.
//
// How a cover is found, in order:
//   1. TikTok's official oEmbed endpoint (uses thumbnail_url when TikTok provides one).
//   2. The public video page's own embedded data (oEmbed currently returns no thumbnail).
// A video that is private, removed, or unreachable is recorded as "unavailable" and the site
// shows its placeholder instead. It is retried the next time this script runs.

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VIDEOS_FILE = process.env.TIKTOK_VIDEOS_FILE ?? path.join(ROOT, "src/lib/tiktok-videos.json");
const META_FILE = process.env.TIKTOK_META_FILE ?? path.join(ROOT, "src/lib/tiktok-meta.json");
const OUT_DIR = path.join(ROOT, "public/images/tiktok");
const PUBLIC_PREFIX = "/images/tiktok";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const QUIET = args.has("--quiet");
const log = (...m) => { if (!QUIET) console.log(...m); };
const warn = (...m) => console.warn(...m);

const exists = (p) => access(p).then(() => true, () => false);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Accepts links like https://www.tiktok.com/@name/video/123?is_from_webapp=1 and returns the clean form. */
function parseVideoUrl(raw) {
  try {
    const u = new URL(raw);
    if (!/(^|\.)tiktok\.com$/.test(u.hostname)) return null;
    const m = u.pathname.match(/^\/@([\w.-]+)\/video\/(\d+)/);
    if (!m) return null;
    return { user: m[1], id: m[2], canonical: `https://www.tiktok.com/@${m[1]}/video/${m[2]}` };
  } catch {
    return null;
  }
}

async function getJson(url, label) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(12000) });
  if (!res.ok) throw new Error(`${label} answered ${res.status}`);
  return res.json();
}

/** Step 1: the official oEmbed endpoint. Returns whatever it offers (often no thumbnail). */
async function fromOEmbed(canonical) {
  const j = await getJson(`https://www.tiktok.com/oembed?url=${encodeURIComponent(canonical)}`, "oEmbed");
  return { cover: j.thumbnail_url || null, title: j.title || "", author: j.author_name || "" };
}

/** Step 2: the data TikTok embeds in the public video page. */
async function fromVideoPage(canonical) {
  const res = await fetch(canonical, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`video page answered ${res.status}`);
  const html = await res.text();
  const m = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error("video page had no embedded data (TikTok may be blocking this network)");
  const detail = JSON.parse(m[1])?.__DEFAULT_SCOPE__?.["webapp.video-detail"];
  if (!detail) throw new Error("video page had no video details");
  if (detail.statusCode && detail.statusCode !== 0) {
    throw new Error(`video not available (TikTok status ${detail.statusCode}${detail.statusMsg ? `: ${detail.statusMsg}` : ""})`);
  }
  const item = detail.itemInfo?.itemStruct;
  const video = item?.video ?? {};
  const cover = video.originCover || video.cover || video.dynamicCover || null;
  return {
    cover,
    title: (item?.desc || "").trim(),
    author: item?.author?.nickname || item?.author?.uniqueId || "",
  };
}

async function downloadImage(url, id) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Referer: "https://www.tiktok.com/" },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`cover image answered ${res.status}`);
  const type = (res.headers.get("content-type") || "").split(";")[0].trim();
  const ext = { "image/jpeg": "jpg", "image/jpg": "jpg", "image/webp": "webp", "image/png": "png" }[type];
  if (!ext) throw new Error(`cover image was an unsupported type (${type || "unknown"})`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length < 2000) throw new Error("cover image was empty");
  await mkdir(OUT_DIR, { recursive: true });
  const file = path.join(OUT_DIR, `${id}.${ext}`);
  await writeFile(file, bytes);
  return { src: `${PUBLIC_PREFIX}/${id}.${ext}`, kb: Math.round(bytes.length / 1024) };
}

async function main() {
  let videos;
  try {
    videos = JSON.parse(await readFile(VIDEOS_FILE, "utf8"));
  } catch (e) {
    warn(`[tiktok] could not read ${VIDEOS_FILE}: ${e.message}`);
    return;
  }

  let meta = {};
  try { meta = JSON.parse(await readFile(META_FILE, "utf8")); } catch { /* first run */ }

  const next = {};
  let downloaded = 0, kept = 0, failed = 0;

  for (const entry of videos) {
    const parsed = parseVideoUrl(entry.url);
    if (!parsed) { warn(`[tiktok] skipped "${entry.url}": not a link like https://www.tiktok.com/@name/video/123`); failed++; continue; }
    const { id, canonical } = parsed;
    const previous = meta[id];

    // A hand-picked local image always wins; nothing to download.
    if (entry.thumbnail) {
      next[id] = { ...previous, url: canonical, status: "ok", cover: entry.thumbnail, custom: true };
      log(`[tiktok] ${id}: using your custom image ${entry.thumbnail}`);
      kept++;
      continue;
    }

    // Already downloaded: keep it.
    const havePrevious = previous?.status === "ok" && previous.cover && (await exists(path.join(ROOT, "public", previous.cover)));
    if (havePrevious && !FORCE) {
      next[id] = previous;
      log(`[tiktok] ${id}: already saved (${previous.cover})`);
      kept++;
      continue;
    }

    try {
      let info = { cover: null, title: "", author: "" };
      let source = "oEmbed";
      try { info = await fromOEmbed(canonical); } catch (e) { log(`[tiktok] ${id}: oEmbed unavailable (${e.message})`); }
      if (!info.cover) {
        source = "video page";
        const page = await fromVideoPage(canonical);
        info = { cover: page.cover, title: page.title || info.title, author: page.author || info.author };
      }
      if (!info.cover) throw new Error("no cover image was listed for this video");

      const img = await downloadImage(info.cover, id);
      next[id] = {
        url: canonical,
        status: "ok",
        cover: img.src,
        title: info.title,
        author: info.author,
        fetchedAt: new Date().toISOString(),
      };
      log(`[tiktok] ${id}: saved ${img.src} (${img.kb} KB, from ${source})`);
      downloaded++;
    } catch (e) {
      failed++;
      warn(`[tiktok] ${id}: ${e.message}. The card will show its placeholder.`);
      // Keep an older good copy if there was one; otherwise record that it is unavailable.
      next[id] = havePrevious
        ? previous
        : { url: canonical, status: "unavailable", reason: e.message, checkedAt: new Date().toISOString() };
    }
    await sleep(400); // be gentle with TikTok
  }

  await writeFile(META_FILE, JSON.stringify(next, null, 2) + "\n");
  log(`[tiktok] done: ${downloaded} downloaded, ${kept} already saved, ${failed} unavailable`);
}

main().catch((e) => {
  // Never break the website build over a thumbnail.
  warn(`[tiktok] unexpected error: ${e.message}`);
}).finally(() => process.exit(0));
