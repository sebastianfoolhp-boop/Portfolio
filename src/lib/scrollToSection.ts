/**
 * Smoothly scroll to a section of the single-page site and record it in the URL.
 *
 * - Honors the visitor's reduced-motion setting (jumps instead of gliding).
 * - Adds a history entry (#about, #music, ...) so the browser Back and Forward
 *   buttons and shared links keep working. Clicking the section you are already
 *   on replaces the entry instead of stacking duplicates.
 * - Does nothing if the section does not exist.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  const hash = `#${id}`;
  if (window.location.hash === hash) window.history.replaceState(null, "", hash);
  else window.history.pushState(null, "", hash);
}
