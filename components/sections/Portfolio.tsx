"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { TextButton } from "../TextButton";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: "01",
    name: "Fulton District Mixed-Use",
    location: "Fulton Market, Chicago",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    alt: "Fulton District mixed-use project, Fulton Market, Chicago",
  },
  {
    id: "02",
    name: "Logan Square Multifamily",
    location: "Logan Square, Chicago",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    alt: "Logan Square multifamily development, Chicago",
  },
  {
    id: "03",
    name: "West Loop Value-Add",
    location: "West Loop, Chicago",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    alt: "West Loop value-add acquisition, Chicago",
  },
  {
    id: "04",
    name: "Wicker Park Residential",
    location: "Wicker Park, Chicago",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
    alt: "Wicker Park residential development, Chicago",
  },
];

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const userInteractedRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLParagraphElement>(null);

  // ── Crossfade + ken-burns + caption fade on active change ───────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      imgRefs.current.forEach((img, i) => {
        if (img) img.style.opacity = i === activeIndex ? "1" : "0";
      });
      return;
    }

    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      if (i === activeIndex) {
        gsap.to(img, { opacity: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        gsap.fromTo(
          img,
          { scale: 1.04 },
          { scale: 1, duration: 1.2, ease: "power3.out", overwrite: "auto" }
        );
      } else {
        gsap.to(img, { opacity: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      }
    });

    const caption = captionRef.current;
    if (caption) {
      gsap.fromTo(
        caption,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power3.out", overwrite: "auto" }
      );
    }
  }, [activeIndex]);

  // ── Scroll-in animations + scroll-driven auto-advance (desktop) ──
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
      const imgContainer = imageContainerRef.current;

      if (!prefersReduced) {
        if (rows.length) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
            }
          );
        }

        if (imgContainer) {
          gsap.fromTo(
            imgContainer,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "power3.out",
              delay: 0.2,
              scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
            }
          );
        }
      }

      // Scroll-driven auto-advance — disabled once the user hovers/clicks a row
      const advanceTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 60%",
        onUpdate(self) {
          if (userInteractedRef.current) return;
          const n = properties.length;
          const idx = Math.min(Math.floor(self.progress * n), n - 1);
          setActiveIndex((curr) => (curr === idx ? curr : idx));
        },
      });

      return () => advanceTrigger.kill();
    });

    return () => mm.revert();
  }, []);

  const handleRowActivate = (i: number) => {
    userInteractedRef.current = true;
    setActiveIndex((curr) => (curr === i ? curr : i));
  };

  const active = properties[activeIndex];

  return (
    <section id="portfolio" ref={sectionRef}>
      {/* ── Intro ──────────────────────────────────────────────────── */}
      <div className="pt-[160px] max-[640px]:pt-24 pb-14 max-[640px]:pb-10 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6">
        <SectionMarker number="02" label="Select Portfolio" />
        <div className="mt-8">
          <LineReveal
            as="h2"
            className="display-md font-serif font-light italic uppercase text-ink max-w-[820px]"
            stagger={0.08}
            duration={1.2}
          >
            The portfolio.<br />
            <span className="not-italic">Each acquisition deliberate.</span>
          </LineReveal>
        </div>
      </div>

      {/* ── Desktop: editorial index ───────────────────────────────── */}
      <div className="hidden lg:block max-w-[1440px] mx-auto px-[120px] pb-[160px]">
        <div className="mt-32 grid grid-cols-12 gap-x-8 items-stretch">
          {/* Left: numbered list — grid-rows-4 distributes rows to match image height */}
          <div className="col-span-5 self-stretch border-t-[0.5px] border-gray-200 grid grid-rows-4">
            {properties.map((property, i) => {
              const isActive = i === activeIndex;
              return (
                <Link
                  key={property.id}
                  href={`/portfolio#property-${property.id}`}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  onMouseEnter={() => handleRowActivate(i)}
                  onFocus={() => handleRowActivate(i)}
                  onClick={() => handleRowActivate(i)}
                  className="relative flex items-center gap-6 px-1 border-b-[0.5px] border-gray-200"
                >
                  {/* Reading marker — 0.5px vertical line at far left */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[-16px] top-1/2 w-[0.5px] bg-interactive origin-center transition-transform duration-[400ms]"
                    style={{
                      height: "60%",
                      transform: `translateY(-50%) scaleY(${isActive ? 1 : 0})`,
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />

                  {/* Number */}
                  <span
                    className={`font-serif font-light italic flex-shrink-0 transition-colors duration-[400ms] ${
                      isActive ? "text-interactive" : "text-gray-400"
                    }`}
                    style={{
                      fontSize: "clamp(40px, 4vw, 56px)",
                      lineHeight: 1,
                      width: "64px",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {property.id}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`heading-md font-serif font-light italic text-ink transition-all duration-[400ms] ${
                        isActive
                          ? "underline decoration-[0.5px] underline-offset-4"
                          : "no-underline"
                      }`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    >
                      {property.name}
                    </h3>
                    <p className="body-sm font-sans font-light text-gray-600 mt-1">
                      {property.location}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span
                    aria-hidden="true"
                    className="text-ink text-[16px] flex-shrink-0 transition-all duration-[400ms]"
                    style={{
                      opacity: isActive ? 1 : 0.5,
                      transform: `rotate(${isActive ? -12 : 0}deg)`,
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right: sticky image viewer */}
          <div className="col-start-7 col-span-6">
            <div className="sticky top-[120px]">
              <div
                ref={imageContainerRef}
                className="editorial-img relative aspect-[4/5] overflow-hidden"
              >
                {properties.map((property, i) => (
                  <div
                    key={property.id}
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    className="absolute inset-0 will-change-transform"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <Image
                      src={property.image}
                      alt={property.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
              <p
                ref={captionRef}
                className="font-serif font-light italic text-[14px] text-gray-600 mt-3"
              >
                ({active.id}) {active.name} · {active.location}
              </p>
            </div>
          </div>
        </div>

        {/* View full portfolio */}
        <div className="mt-24">
          <TextButton href="/portfolio">View full portfolio</TextButton>
        </div>
      </div>

      {/* ── Mobile: stacked full-width blocks ──────────────────────── */}
      <div className="lg:hidden px-12 max-[640px]:px-6 pb-24 max-[640px]:pb-16 space-y-16">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/portfolio#property-${property.id}`}
            className="block group"
          >
            <div className="editorial-img relative w-full overflow-hidden aspect-[4/5]">
              <Image
                src={property.image}
                fill
                alt={property.alt}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="mt-6 flex items-start gap-5">
              <span
                className="font-serif font-light italic text-gray-400 flex-shrink-0"
                style={{ fontSize: "40px", lineHeight: 1, width: "48px" }}
              >
                {property.id}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="heading-md font-serif font-light italic text-ink">
                  {property.name}
                </h3>
                <p className="body-sm font-sans font-light text-gray-600 mt-1">
                  {property.location}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-interactive text-[16px] flex-shrink-0 mt-[6px]"
              >
                ↗
              </span>
            </div>
          </Link>
        ))}
        <div className="pt-4">
          <TextButton href="/portfolio">View full portfolio</TextButton>
        </div>
      </div>
    </section>
  );
}
