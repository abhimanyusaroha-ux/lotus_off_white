"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface PillButtonProps {
  href?: string;
  children: React.ReactNode;
  size?: "default" | "hero";
  onClick?: () => void;
}

function useMagnetic(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    const RADIUS = 80;
    const STRENGTH = 0.3;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.sqrt(dx * dx + dy * dy) < RADIUS) {
        xTo(dx * STRENGTH);
        yTo(dy * STRENGTH);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      xTo(0);
      yTo(0);
    };
  }, [ref]);
}

export function PillButton({
  href,
  children,
  size = "default",
  onClick,
}: PillButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null!);
  useMagnetic(wrapRef);

  const classes = [
    "inline-flex items-center justify-center rounded-full bg-ink text-canvas font-sans font-medium tracking-[0.02em] transition-colors duration-150",
    size === "hero" ? "h-14 px-8 body-sm" : "h-12 px-8 body-sm",
    "hover:bg-ink-muted",
  ].join(" ");

  return (
    <div ref={wrapRef} className="inline-block">
      {href ? (
        <Link href={href} className={classes}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </div>
  );
}
