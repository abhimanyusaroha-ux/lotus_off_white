"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { EditorialImage } from "../EditorialImage";
import { PillButton } from "../PillButton";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Investors() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Image reveal flipped: now comes from left-to-right (image is on the left)
    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 0 100%)" },
      {
        clipPath: "inset(0 0 0 0%)",
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <motion.section
      id="investors"
      ref={ref}
      className="py-[120px] max-[640px]:py-20 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-2 gap-20 items-center max-[1024px]:grid-cols-1 max-[1024px]:gap-12 max-[640px]:gap-10">
        {/* Left: image (flipped from V1) */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div ref={imgRef} style={{ overflow: "hidden" }}>
            <EditorialImage
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80"
              caption="(04) West Loop Acquisition · Chicago, 2024"
              aspectRatio="4/5"
              alt="West Loop acquisition, Chicago, 2024"
            />
          </div>
        </motion.div>

        {/* Right: marker + heading + body + CTA */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <SectionMarker number="04" label="For Investors" />
          <LineReveal
            as="h2"
            className="display-md font-serif font-light italic uppercase text-ink mt-8"
            stagger={0.08}
            duration={1.2}
          >
            For <span className="not-italic">partners.</span>
          </LineReveal>
          <LineReveal
            as="p"
            className="body-lg font-sans font-light text-gray-600 max-w-[440px] mt-8"
            stagger={0.05}
            duration={1.0}
          >
            Lotus works with a small group of accredited investors on each
            acquisition. Our investor portal gives you real-time access to fund
            performance, K-1 tax documents, capital call notices, and wire
            instructions. Access is by invitation.
          </LineReveal>
          <div className="mt-10">
            <PillButton href="/investors">Investor portal</PillButton>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
