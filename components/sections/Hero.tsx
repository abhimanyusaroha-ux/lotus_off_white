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

  useEffect(() => {
    const mask = wordmarkMaskRef.current;
    const inner = wordmarkInnerRef.current;
    const img = imageRef.current;
    if (!mask || !inner || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline();

    tl.fromTo(
      inner,
      { yPercent: 100 },
      { yPercent: 0, duration: 1.4, ease: "power3.out" }
    );

    tl.fromTo(
      img,
      { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.6,
        ease: "power3.out",
      },
      0.9
    );
  }, []);

  return (
    <section className="bg-canvas pt-[72px] max-[1024px]:pt-[80px]" aria-label="Hero">
      {/* 100vh split — desktop (55% text / 45% image, flush right) */}
      <div className="max-w-[1440px] mx-auto lg:h-[calc(100vh-72px)] grid lg:grid-cols-[55fr_45fr]">

        {/* Left column — marker top, centered stack middle, scroll indicator bottom */}
        <div className="flex flex-col px-[120px] py-10 max-[1024px]:px-12 max-[640px]:px-6 lg:h-full">
          <div>
            <SectionMarker label="Home" />
          </div>

          <div className="lg:flex-1 flex flex-col lg:justify-center mt-10 lg:mt-0">
            {/* Wordmark */}
            <div ref={wordmarkMaskRef} style={{ overflow: "hidden" }}>
              <div
                ref={wordmarkInnerRef}
                className="font-serif font-light italic uppercase text-ink"
                style={{
                  fontSize: "clamp(56px, 9vw, 140px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                }}
                aria-label="Lotus"
              >
                Lotus
              </div>
            </div>

            {/* Body copy — stacked vertically (no longer a row) */}
            <div className="mt-12 max-[640px]:mt-8 space-y-6 max-w-[360px]">
              <LineReveal
                as="p"
                className="body-lg font-sans font-light text-gray-600"
                trigger="mount"
                delay={0.6}
                stagger={0.06}
                duration={1.1}
              >
                Acquiring and developing investment-grade real estate across
                Chicago&apos;s most resilient corridors.
              </LineReveal>
              <LineReveal
                as="p"
                className="body-lg font-sans font-light text-gray-600"
                trigger="mount"
                delay={0.72}
                stagger={0.06}
                duration={1.1}
              >
                A disciplined approach to underwriting, development, and
                long-term value creation for our partners.
              </LineReveal>
            </div>
          </div>

          {/* Scroll indicator — bottom of left column (desktop only) */}
          <div className="max-[1024px]:hidden flex items-center gap-3 pt-10">
            <div
              className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-1 h-1 rounded-full bg-gray-400" />
            </div>
            <span className="font-sans text-[11px] text-gray-400 uppercase tracking-[0.12em]">
              Scroll
            </span>
          </div>
        </div>

        {/* Right column — image with breathing room above and below */}
        <div className="lg:py-16 lg:h-full flex">
          <div
            ref={imageRef}
            className="editorial-img relative overflow-hidden flex-1 lg:h-full max-[1024px]:aspect-[4/3] max-[1024px]:mt-4"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=80"
              fill
              alt="Lotus Property Group — Chicago real estate investment"
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        {/* Scroll indicator — mobile only, after image */}
        <div className="lg:hidden flex items-center gap-3 px-12 max-[640px]:px-6 mt-6">
          <div
            className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
          <span className="font-sans text-[11px] text-gray-400 uppercase tracking-[0.12em]">
            Scroll
          </span>
        </div>
      </div>

      {/* Below 100vh split — hairline + single-line subtitle */}
      <div className="max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6 mt-14 max-[640px]:mt-10">
        <div className="hairline" aria-hidden="true" />
        <p className="font-sans text-[11px] text-gray-400 tracking-[0.12em] uppercase mt-4">
          Est. 2023 · Chicago, IL
        </p>
      </div>
    </section>
  );
}
