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
      { ref: img2Ref, delay: 0.15 },
    ].forEach(({ ref, delay }) => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });
  }, []);

  return (
    <section
      id="about"
      className="py-[160px] max-[640px]:py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      {/* Eyebrow + heading */}
      <div className="grid grid-cols-12 gap-x-8 max-[1024px]:grid-cols-1">
        <div className="col-span-3 max-[1024px]:col-span-1 max-[1024px]:mb-8 pt-2">
          <SectionMarker number="01" label="About" />
        </div>
        <LineReveal
          as="h2"
          className="col-span-9 max-[1024px]:col-span-1 display-lg font-sans font-bold text-ink"
          stagger={0.1}
          duration={1.1}
        >
          Not speculation.
          <span style={{ fontStyle: "italic", display: "block" }}>Conviction.</span>
        </LineReveal>
      </div>

      {/* Body text */}
      <div className="mt-16 grid grid-cols-12 gap-x-8 max-[1024px]:grid-cols-1">
        <div className="col-start-4 col-span-8 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 max-w-[560px]"
            stagger={0.05}
            duration={0.9}
          >
            Lotus Property Group is a Chicago-based real estate investment firm
            focused on value-add acquisitions and ground-up development. We
            target opportunities where disciplined underwriting and active
            management produce superior risk-adjusted returns — not just market
            appreciation.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 max-w-[560px] mt-6"
            stagger={0.05}
            duration={0.9}
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

      {/* Asymmetric images */}
      <div className="mt-28 max-[640px]:mt-16 grid grid-cols-12 gap-x-8 items-start max-[1024px]:grid-cols-1 max-[1024px]:gap-y-10">
        <div
          ref={img1Ref}
          className="col-start-2 col-span-4 max-[1024px]:col-start-1 max-[1024px]:col-span-1"
          style={{ overflow: "hidden" }}
        >
          <EditorialImage
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
            caption="(01) River North Mixed-Use · Chicago, 2024"
            aspectRatio="4/5"
            alt="River North mixed-use project, Chicago, 2024"
          />
        </div>
        <div
          ref={img2Ref}
          className="col-start-8 col-span-4 max-[1024px]:col-start-1 max-[1024px]:col-span-1 mt-24 max-[1024px]:mt-0"
          style={{ overflow: "hidden" }}
        >
          <EditorialImage
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"
            caption="(02) Logan Square Development · Chicago, 2023"
            aspectRatio="4/5"
            alt="Logan Square development project, Chicago, 2023"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-24 flex gap-16 max-[640px]:gap-8">
        <div className="min-w-0">
          <div
            className="font-sans font-bold text-ink"
            style={{ fontSize: "clamp(56px, 7.5vw, 96px)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            <Counter target={4} />
          </div>
          <p className="body-md font-sans text-gray-600 mt-3">
            Projects completed
          </p>
        </div>
        <div className="min-w-0 border-l border-gray-200 pl-8 max-[640px]:pl-6">
          <div
            className="font-sans font-bold text-ink"
            style={{ fontSize: "clamp(56px, 7.5vw, 96px)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            <Counter target={5} />
          </div>
          <p className="body-md font-sans text-gray-600 mt-3">
            In pre-development
          </p>
        </div>
      </div>
    </section>
  );
}
