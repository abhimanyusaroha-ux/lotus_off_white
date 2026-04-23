"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { EditorialImage } from "../EditorialImage";
import { TextButton } from "../TextButton";
import { Counter } from "../Counter";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    [
      { ref: img1Ref, delay: 0 },
      { ref: img2Ref, delay: 0.12 },
    ].forEach(({ ref, delay }) => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.3,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });
  }, []);

  return (
    <section
      id="about"
      className="py-[120px] max-[640px]:py-20 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      {/* Top row — heading left, section marker + body right */}
      <div className="grid grid-cols-12 gap-x-8 max-[1024px]:grid-cols-1">
        <LineReveal
          as="h2"
          className="col-span-7 max-[1024px]:col-span-1 display-lg font-serif font-light italic uppercase text-ink"
          stagger={0.1}
          duration={1.3}
        >
          Not noise. <span className="not-italic">Conviction.</span>
        </LineReveal>

        <div className="col-start-9 col-span-4 max-[1024px]:col-start-1 max-[1024px]:col-span-1 max-[1024px]:mt-10 flex flex-col">
          <div className="flex lg:justify-end">
            <SectionMarker number="01" label="About" />
          </div>
          <LineReveal
            as="p"
            className="body-lg font-sans font-light text-gray-600 max-w-[380px] mt-10"
            stagger={0.05}
            duration={1.0}
          >
            Lotus Property Group is a Chicago-based real estate investment firm
            focused on value-add acquisitions and ground-up development. We
            target opportunities where disciplined underwriting and active
            management produce superior risk-adjusted returns — not just market
            appreciation.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-lg font-sans font-light text-gray-600 max-w-[380px] mt-6"
            stagger={0.05}
            duration={1.0}
          >
            We work with a select group of accredited investors on every
            transaction. Four projects completed. Five currently in
            pre-development. Each one chosen against the same criteria:
            location quality, deal structure, and timing.
          </LineReveal>
          <div className="mt-8">
            <TextButton href="/about">Read our approach</TextButton>
          </div>
        </div>
      </div>

      {/* Side-by-side images — equal height, 32px gap, col-start-3 → col-end-11 */}
      <div className="mt-32 max-[640px]:mt-20 grid grid-cols-12 gap-x-8 max-[1024px]:grid-cols-1">
        <div className="col-start-3 col-span-9 max-[1024px]:col-start-1 max-[1024px]:col-span-1 grid grid-cols-2 gap-8 max-[640px]:grid-cols-1 max-[640px]:gap-10">
          <div ref={img1Ref} style={{ overflow: "hidden" }}>
            <EditorialImage
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
              caption="(01) River North Mixed-Use · Chicago, 2024"
              aspectRatio="4/5"
              alt="River North mixed-use project, Chicago, 2024"
            />
          </div>
          <div ref={img2Ref} style={{ overflow: "hidden" }}>
            <EditorialImage
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"
              caption="(02) Logan Square Development · Chicago, 2023"
              aspectRatio="4/5"
              alt="Logan Square development project, Chicago, 2023"
            />
          </div>
        </div>
      </div>

      {/* Stats — centered horizontal row, 0.5px vertical hairline between */}
      <div className="mt-28 max-[640px]:mt-16 flex items-start justify-center gap-16 max-[640px]:gap-10">
        <div className="min-w-0 text-center">
          <div
            className="font-serif font-light italic text-ink"
            style={{ fontSize: "clamp(72px, 9vw, 120px)", letterSpacing: "-0.01em", lineHeight: 0.95 }}
          >
            <Counter target={4} />
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-gray-600 mt-4">
            Projects completed
          </p>
        </div>

        <div className="self-stretch w-px bg-gray-200" aria-hidden="true" />

        <div className="min-w-0 text-center">
          <div
            className="font-serif font-light italic text-ink"
            style={{ fontSize: "clamp(72px, 9vw, 120px)", letterSpacing: "-0.01em", lineHeight: 0.95 }}
          >
            <Counter target={5} />
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-gray-600 mt-4">
            In pre-development
          </p>
        </div>
      </div>
    </section>
  );
}
