"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { DOCK_ITEMS } from "./dockItems";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { scrollToSection } from "@/lib/scrollToSection";

// ============================================================
// Dock behaviour: change these to taste
// ============================================================
const SHOW_AFTER_PX = 90;    // the dock appears once you have scrolled further than this
const HIDE_BELOW_PX = 40;    // and disappears again once you are back above this (the gap stops flicker)
const TOUCH_HINT_MS = 1400;  // how long a tooltip stays up after a touch tap

export default function Dock() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const [hint, setHint] = useState<string | null>(null);
  const hintTimer = useRef<number | null>(null);

  // Show or hide with the page's scroll position. Two thresholds (not one) prevent flicker.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible((isVisible) => (isVisible ? y >= HIDE_BELOW_PX : y > SHOW_AFTER_PX));
  });

  // If the page opens already scrolled (a direct link like /#cinema, or a restored position), show the dock.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const away = window.scrollY > SHOW_AFTER_PX || (window.location.hash !== "" && window.location.hash !== "#home");
      if (away) setVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Which section is on screen: whichever one crosses a thin line through the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveId(entry.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    for (const item of DOCK_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => { if (hintTimer.current) window.clearTimeout(hintTimer.current); }, []);

  // Touch screens have no hover, so a tap briefly shows the name as well as scrolling.
  const showTouchHint = (id: string) => {
    setHint(id);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(null), TOUCH_HINT_MS);
  };

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-3"
      style={{
        bottom: "max(18px, env(safe-area-inset-bottom))",
        // Hidden: faded, nudged down, and removed from the tab order. Visible: fades and slides up.
        opacity: visible ? 1 : 0,
        transform: visible || reduced ? "translateY(0)" : "translateY(22px)",
        visibility: visible ? "visible" : "hidden",
        transition: reduced
          ? "opacity 0.2s linear, visibility 0s linear"
          : visible
            ? "opacity 0.55s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear"
            : "opacity 0.4s ease, transform 0.45s ease, visibility 0s linear 0.45s",
      }}
    >
      <ul
        className="pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5 sm:gap-1 sm:p-2"
        style={{
          background: "rgba(34, 34, 36, 0.82)",
          backdropFilter: "blur(22px) saturate(150%)",
          WebkitBackdropFilter: "blur(22px) saturate(150%)",
          border: "1px solid rgba(255, 255, 255, 0.11)",
          boxShadow: "0 14px 44px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {DOCK_ITEMS.map((item) => {
          const active = activeId === item.id;
          const Icon = item.icon;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={active ? "location" : undefined}
                data-show={hint === item.id}
                onClick={(e) => {
                  // Let ctrl/cmd/shift-click and middle-click behave normally.
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                onPointerDown={(e) => { if (e.pointerType !== "mouse") showTouchHint(item.id); }}
                className="group relative flex h-[38px] w-[38px] items-center justify-center rounded-full outline-none min-[360px]:h-11 min-[360px]:w-11 sm:h-12 sm:w-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
              >
                {active && (
                  <motion.span
                    layoutId="dock-active"
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <Icon
                  strokeWidth={1.6}
                  aria-hidden
                  className={`relative h-5 w-5 transition-[transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-active:scale-95 sm:h-[22px] sm:w-[22px] ${
                    reduced ? "" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"
                  } ${active ? "text-white" : "text-white/70 group-hover:text-white group-focus-visible:text-white"}`}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] leading-5 text-ink opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-data-[show=true]:translate-y-0 group-data-[show=true]:opacity-100"
                  style={{
                    background: "rgba(34, 34, 36, 0.96)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.55)",
                  }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
