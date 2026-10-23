"use client";

import { useRef, useState, type MouseEvent } from "react";
import Card, { CardArrow } from "@/components/ui/Card";

const chip = "inline-flex rounded-full border border-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]";

/** The big "Let's talk." card. Clicking it copies the email address to the clipboard.
 *  If the browser blocks copying, it falls back to opening the visitor's mail app. */
export default function CopyEmailCard({ email, href }: { email: string; href: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const flash = () => {
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const onClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      flash();
    } catch {
      try {
        // Older browsers: copy through a hidden text box
        const box = document.createElement("textarea");
        box.value = email;
        box.setAttribute("readonly", "");
        box.style.position = "fixed";
        box.style.opacity = "0";
        document.body.appendChild(box);
        box.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(box);
        if (!ok) throw new Error("copy blocked");
        flash();
      } catch {
        window.location.href = href;
      }
    }
  };

  return (
    <Card tone="lime" decor="arcs" href={href} onClick={onClick} className="h-full min-h-[22rem] p-7 md:min-h-[26rem] md:p-12">
      <span className="eyebrow">Say hello</span>
      <p className="display mt-10 md:mt-auto" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>Let&apos;s talk.</p>
      <div className="mt-8 flex items-end justify-between gap-4">
        <span className="break-all text-lg font-bold md:text-2xl" aria-live="polite">
          {copied ? "Email copied to clipboard" : email}
        </span>
        <CardArrow className="h-9 w-9 shrink-0" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className={chip}>Professional inquiries</span>
        <span className={chip}>Creative collaborations</span>
      </div>
    </Card>
  );
}
