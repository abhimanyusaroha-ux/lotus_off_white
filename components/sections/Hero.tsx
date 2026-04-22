"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import LineReveal from "../LineReveal";
import { SectionMarker } from "../SectionMarker";

export function Hero() {
  const wordmarkMaskRef = useRef<HTMLDivElement>(null);
  const wordmarkInnerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mask = wordmarkMaskRef.current;
    const inner = wordmarkInnerRef.current;
    const img = imageRef.current;
    if (!mask || !inner || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline();

    // Wordmark rises as one line from yPercent 100
    tl.fromTo(
      inner,
      { yPercent: 100 },
      { yPercent: 0, duration: 1.2, ease: "expo.out" }
    );

    // Image clip-path reveal from bottom + scale
    tl.fromTo(
      img,
      { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
      },
      0.9
    );
  }, []);

  return (
    <section className="pt-[72px] bg-canvas" aria-label="Hero">
      <div className="max-w-[1440px] mx-auto px-[120px] pt-10 max-[1024px]:px-12 max-[640px]:px-6 max-[640px]:pt-6">

        {/* Section marker */}
        <div className="mb-6">
          <SectionMarker number="01" label="Home" />
        </div>

        {/* Wordmark — single line reveal */}
        <div ref={wordmarkMaskRef} style={{ overflow: "hidden" }}>
          <div
            ref={wordmarkInnerRef}
            className="font-sans font-black text-ink"
            style={{
              fontSize: "clamp(72px, 18vw, 260px)",
              lineHeight: 0.85,
              letterSpacing: "-0.055em",
            }}
            aria-label="Lotus"
          >
            Lotus
          </div>
        </div>

        {/* Subtitle */}
        <p className="body-sm font-sans text-gray-400 mt-4 tracking-[0.06em] uppercase">
          Est. 2023 · Chicago, IL
        </p>

        {/* Body copy row — line-reveal on scroll (delay 0.6s after mount) */}
        <div className="mt-8 flex gap-20 max-[768px]:flex-col max-[768px]:gap-5">
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 max-w-[340px]"
            trigger="mount"
            delay={0.6}
            stagger={0.06}
            duration={0.9}
          >
            Acquiring and developing investment-grade real estate across
            Chicago&apos;s most resilient corridors.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 max-w-[340px]"
            trigger="mount"
            delay={0.72}
            stagger={0.06}
            duration={0.9}
          >
            A disciplined approach to underwriting, development, and long-term
            value creation for our partners.
          </LineReveal>
        </div>

        {/* 16:9 hero image — clip-path + scale reveal */}
        <div
          ref={imageRef}
          className="mt-10 relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", transformOrigin: "center" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=80"
            fill
            alt="Lotus Property Group — Chicago real estate investment"
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Scroll indicator */}
        <div className="mt-5 flex items-center gap-3 pb-6">
          <div
            className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
          <span className="caption font-sans text-gray-400 uppercase tracking-[0.1em]">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
