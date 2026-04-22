"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { PillButton } from "../PillButton";
import { TextButton } from "../TextButton";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: "01",
    name: "Fulton District Mixed-Use",
    location: "Completed · Fulton Market, Chicago",
    description:
      "A value-add mixed-use acquisition in Chicago's fastest-growing commercial corridor, repositioned in 2024.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    alt: "Fulton District mixed-use project, Fulton Market, Chicago",
  },
  {
    id: "02",
    name: "Logan Square Multifamily",
    location: "Completed · Logan Square, Chicago",
    description:
      "Twenty-four units of transit-adjacent residential, acquired off-market and renovated in under twelve months.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    alt: "Logan Square multifamily development, Chicago",
  },
  {
    id: "03",
    name: "West Loop Value-Add",
    location: "Completed · West Loop, Chicago",
    description:
      "A ground-up reposition of an underutilized industrial asset, now fully stabilized and cash-flowing.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    alt: "West Loop value-add acquisition, Chicago",
  },
  {
    id: "04",
    name: "Wicker Park Residential",
    location: "Completed · Wicker Park, Chicago",
    description:
      "Nine residential units in one of Chicago's most resilient neighborhoods, acquired and renovated in 2023.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
    alt: "Wicker Park residential development, Chicago",
  },
];

export function Portfolio() {
  const sliderSectionRef = useRef<HTMLDivElement>(null);
  const slideImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideTextGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const slideImgs = slideImgRefs.current.filter(Boolean) as HTMLDivElement[];
        const slideTextGroups = slideTextGroupRefs.current.filter(Boolean) as HTMLDivElement[];
        const n = properties.length;

        // ── Initial states ───────────────────────────────────────────
        gsap.set(slideImgs[0], { clipPath: "inset(0 0% 0 0)" });
        gsap.set(slideImgs.slice(1), { clipPath: "inset(0 0 0 100%)" });

        const slide0Items = slideTextGroups[0]
          ? Array.from(slideTextGroups[0].querySelectorAll<HTMLElement>(".s-text"))
          : [];
        gsap.set(slide0Items, { yPercent: 0, opacity: 1 });

        slideTextGroups.slice(1).forEach((group) => {
          const items = Array.from(group.querySelectorAll<HTMLElement>(".s-text"));
          gsap.set(items, { yPercent: 100, opacity: 0 });
        });

        // ── Build timeline ───────────────────────────────────────────
        // Timeline duration = 3 (one unit per transition between 4 slides).
        // Scroll distance mapped = section height (500vh) − viewport (100vh) = 400vh.
        // Each snap point: 0, 1/3, 2/3, 1.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sliderSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            snap: {
              snapTo: [0, 1 / 3, 2 / 3, 1],
              duration: { min: 0.3, max: 0.6 },
              ease: "power2.inOut",
            },
            onUpdate(self) {
              // rawSlide: 0 at slide 1, 3 at slide 4
              const rawSlide = self.progress * (n - 1);

              // Counter
              if (counterRef.current) {
                const display = Math.min(Math.floor(rawSlide) + 1, n);
                counterRef.current.textContent = String(display).padStart(2, "0");
              }

              // Progress segments: each segment's fill = clamp(rawSlide − i, 0, 1)
              progressFillRefs.current.forEach((fill, i) => {
                if (!fill) return;
                fill.style.width = `${Math.max(0, Math.min(1, rawSlide - i)) * 100}%`;
              });
            },
          },
        });

        for (let i = 0; i < n - 1; i++) {
          const t = i; // start time of this transition in the timeline

          // Image: slide i collapses from the right side (inset right grows)
          tl.to(
            slideImgs[i],
            { clipPath: "inset(0 100% 0 0)", duration: 0.85, ease: "expo.inOut" },
            t
          );

          // Image: slide i+1 reveals from the right (inset left shrinks)
          tl.fromTo(
            slideImgs[i + 1],
            { clipPath: "inset(0 0 0 100%)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "expo.inOut" },
            t + 0.15 // slight offset so incoming trails outgoing
          );

          // Text: slide i exits upward, staggered (ends by t+0.49)
          const outItems = Array.from(
            slideTextGroups[i]?.querySelectorAll<HTMLElement>(".s-text") ?? []
          );
          outItems.forEach((el, j) => {
            tl.to(
              el,
              { yPercent: -60, opacity: 0, duration: 0.4, ease: "power3.in" },
              t + j * 0.03
            );
          });

          // Text: slide i+1 enters from below, staggered (ends by t+0.94)
          const inItems = Array.from(
            slideTextGroups[i + 1]?.querySelectorAll<HTMLElement>(".s-text") ?? []
          );
          inItems.forEach((el, j) => {
            tl.fromTo(
              el,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.6, ease: "expo.out" },
              t + 0.25 + j * 0.03
            );
          });
        }

        return () => {
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="portfolio">
      {/* ── Intro — normal flow ──────────────────────────────────────── */}
      <div className="pt-[160px] max-[640px]:pt-24 pb-14 max-[640px]:pb-10 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6">
        <SectionMarker number="02" label="Select Portfolio" />
        <div className="mt-8">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink max-w-[500px]"
            stagger={0.08}
            duration={1.0}
          >
            Four completions. Five more underway.
          </LineReveal>
        </div>
      </div>

      {/* ── Desktop pinned slider (hidden on mobile / reduced-motion) ── */}
      <div
        ref={sliderSectionRef}
        className="hidden lg:block relative"
        style={{ height: "500vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-canvas">
          {/* Slides — all absolutely stacked; clip-path controls visibility */}
          {properties.map((property, i) => (
            <div key={property.id} className="absolute inset-0 grid grid-cols-2">
              {/* Left column: full-bleed image, clip-path animated */}
              <div
                ref={(el) => { slideImgRefs.current[i] = el; }}
                className="relative h-full overflow-hidden"
              >
                <Image
                  src={property.image}
                  fill
                  alt={property.alt}
                  className="object-cover"
                  priority={i === 0}
                  sizes="50vw"
                />
              </div>

              {/* Right column: text content, vertically centered */}
              <div className="flex items-center px-[80px] h-full overflow-hidden">
                <div
                  ref={(el) => { slideTextGroupRefs.current[i] = el; }}
                  className="w-full max-w-[520px]"
                >
                  {/* Property name */}
                  <div className="overflow-hidden">
                    <h3
                      className="s-text font-sans font-bold text-ink"
                      style={{
                        fontSize: "clamp(38px, 3.8vw, 62px)",
                        letterSpacing: "-0.035em",
                        lineHeight: 1.0,
                      }}
                    >
                      {property.name}
                    </h3>
                  </div>

                  {/* Status · Location */}
                  <div className="overflow-hidden mt-6">
                    <p className="s-text body-lg font-sans text-gray-600">
                      {property.location}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="overflow-hidden mt-3">
                    <p className="s-text body-md font-sans text-gray-600 max-w-[400px]">
                      {property.description}
                    </p>
                  </div>

                  {/* CTA row */}
                  <div className="s-text flex items-center gap-6 mt-10">
                    <PillButton href="/portfolio">View project</PillButton>
                    <TextButton href="/portfolio">All projects</TextButton>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Top-left: section marker */}
          <div className="absolute top-8 left-10 z-10 pointer-events-none">
            <SectionMarker number="02" label="Select Portfolio" />
          </div>

          {/* Top-right: slide counter */}
          <div className="absolute top-8 right-10 z-10 pointer-events-none">
            <span className="caption font-sans text-gray-600 uppercase tracking-[0.08em]">
              <span ref={counterRef}>01</span>{" / 04"}
            </span>
          </div>

          {/* Bottom-center: 4-segment progress bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {properties.map((_, i) => (
              <div key={i} className="w-16 h-[2px] bg-gray-200 overflow-hidden">
                <div
                  ref={(el) => { progressFillRefs.current[i] = el; }}
                  className="h-full bg-ink"
                  style={{ width: "0%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile fallback: vertical stack ─────────────────────────── */}
      <div className="lg:hidden px-12 max-[640px]:px-6 pb-24 max-[640px]:pb-16 space-y-14">
        {properties.map((property) => (
          <div key={property.id}>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={property.image}
                fill
                alt={property.alt}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="mt-6">
              <p className="caption font-sans text-gray-400 uppercase tracking-[0.08em]">
                {property.location}
              </p>
              <h3 className="heading-lg font-sans font-bold text-ink mt-2">
                {property.name}
              </h3>
              <p className="body-md font-sans text-gray-600 mt-3 max-w-[480px]">
                {property.description}
              </p>
              <div className="mt-5">
                <TextButton href="/portfolio">View project</TextButton>
              </div>
            </div>
          </div>
        ))}
        <PillButton href="/portfolio">View full portfolio</PillButton>
      </div>
    </section>
  );
}
