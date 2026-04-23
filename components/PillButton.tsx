"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface PillButtonProps {
  href?: string;
  children: React.ReactNode;
  size?: "default" | "hero";
  onClick?: () => void;
  variant?: "primary" | "ghost";
  showArrow?: boolean;
}

function useMagnetic(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    const RADIUS = 80;
    const STRENGTH = 0.25;
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
  onClick,
  variant = "primary",
  showArrow = true,
}: PillButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null!);
  useMagnetic(wrapRef);

  const base =
    "inline-flex items-center justify-center gap-[0.6em] border font-sans font-normal uppercase text-[11px] tracking-[0.12em] px-9 py-[18px] transition-colors duration-300";

  const variantClasses =
    variant === "primary"
      ? "bg-interactive text-canvas border-interactive hover:bg-transparent hover:text-interactive"
      : "bg-transparent text-interactive border-interactive hover:bg-interactive hover:text-canvas";

  const classes = `${base} ${variantClasses}`;

  const content = (
    <>
      {children}
      {showArrow && (
        <span aria-hidden="true" className="inline-block">
          →
        </span>
      )}
    </>
  );

  return (
    <div ref={wrapRef} className="inline-block">
      {href ? (
        <Link href={href} className={classes}>
          {content}
        </Link>
      ) : (
        <button onClick={onClick} className={classes}>
          {content}
        </button>
      )}
    </div>
  );
}
