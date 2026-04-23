"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LineRevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: "scroll" | "mount";
  start?: string;
}

export default function LineReveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = 0.1,
  duration = 1.2,
  delay = 0,
  trigger = "scroll",
  start = "top 85%",
}: LineRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const originalHTML = el.innerHTML;

    const wrapWords = (parent: Element) => {
      Array.from(parent.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent || "";
          if (!text.trim()) return;
          const parts = text.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part.trim()) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const s = document.createElement("span");
              s.className = "lr-w";
              s.style.display = "inline-block";
              s.textContent = part;
              frag.appendChild(s);
            }
          });
          parent.replaceChild(frag, child);
        } else if (
          child.nodeType === Node.ELEMENT_NODE &&
          (child as Element).tagName !== "BR"
        ) {
          wrapWords(child as Element);
        }
      });
    };

    const setup = (): HTMLElement[] => {
      el.innerHTML = originalHTML;
      wrapWords(el);

      const words = Array.from(el.querySelectorAll<HTMLElement>(".lr-w"));
      if (!words.length) return [];

      // Group by line using viewport top (getBoundingClientRect)
      const lines: HTMLElement[][] = [];
      let line: HTMLElement[] = [];
      let lastTop = -1;

      words.forEach((w) => {
        const top = Math.round(w.getBoundingClientRect().top);
        if (lastTop < 0 || Math.abs(top - lastTop) < 4) {
          line.push(w);
        } else {
          if (line.length) lines.push(line);
          line = [w];
        }
        lastTop = top;
      });
      if (line.length) lines.push(line);

      // Wrap each line in an overflow-hidden mask + animated inner span
      return lines
        .map((lineWords) => {
          if (!lineWords.length) return null;
          const first = lineWords[0];
          const parent = first.parentNode as Element;
          const mask = document.createElement("span");
          mask.style.cssText = "display:block;overflow:hidden;line-height:inherit;padding-top:0.1em;margin-top:-0.1em;padding-bottom:0.2em;margin-bottom:-0.2em;";
          const inner = document.createElement("span");
          inner.style.display = "block";
          mask.appendChild(inner);
          parent.insertBefore(mask, first);
          lineWords.forEach((w) => {
            const next = w.nextSibling;
            inner.appendChild(w);
            if (next?.nodeType === Node.TEXT_NODE) inner.appendChild(next);
          });
          return inner;
        })
        .filter(Boolean) as HTMLElement[];
    };

    let lineInners = setup();
    if (!lineInners.length) return;

    gsap.set(lineInners, { yPercent: 110 });

    const tween = gsap.to(lineInners, {
      yPercent: 0,
      duration,
      ease: "power3.out",
      stagger,
      delay,
      scrollTrigger:
        trigger === "scroll"
          ? { trigger: el, start, once: true }
          : undefined,
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        tween.kill();
        lineInners = setup();
        if (lineInners.length) gsap.set(lineInners, { yPercent: 0 });
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      tween.kill();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer!);
    };
  }, [mounted, stagger, duration, delay, trigger, start]);

  // @ts-expect-error dynamic tag with forwarded ref
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
