"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * A silent looping background video that costs nothing until you scroll near it:
 * the file is not requested until the video is within 300px of the screen, it pauses
 * when it scrolls away, and it stays on its first frame for visitors who prefer
 * reduced motion.
 */
export default function LazyVideo({ src, className = "", position }: { src: string; className?: string; position?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [near, setNear] = useState(false);
  const [armed, setArmed] = useState(false); // becomes true the first time it is near, and stays true

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setArmed(true);
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    if (near && !reduced) el.play().catch(() => {});
    else el.pause();
  }, [near, armed, reduced]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload={armed ? "auto" : "none"}
      src={armed ? src : undefined}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
