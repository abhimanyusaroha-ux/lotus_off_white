"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionMarker } from "../SectionMarker";
import { EditorialImage } from "../EditorialImage";
import { TextButton } from "../TextButton";
import { Counter } from "../Counter";
import LineReveal from "../LineReveal";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const stats = [
  { target: 4, suffix: "", label: "Projects completed since 2023" },
  { target: 5, suffix: "", label: "In active pre-development" },
  { target: 48, suffix: "hrs", label: "Average response to opportunities" },
  { target: 100, suffix: "%", label: "Investor capital deployed on schedule" },
];

export function WhyLotus() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id="why"
      ref={ref}
      className="py-[160px] max-[640px]:py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Top row — 50/50 split */}
      <div className="grid grid-cols-2 gap-x-20 max-[1024px]:grid-cols-1 max-[1024px]:gap-y-16">

        {/* Left column — marker, heading, paragraph, text link */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
          <SectionMarker number="03" label="Why Lotus" />

          <LineReveal
            as="h2"
            className="display-lg font-serif font-light italic uppercase text-ink mt-10"
            stagger={0.1}
            duration={1.3}
          >
            Built on conviction.<br />
            <span className="not-italic">Measured by returns.</span>
          </LineReveal>

          <LineReveal
            as="p"
            className="body-lg font-sans font-light italic text-gray-600 max-w-[500px] mt-10"
            stagger={0.05}
            duration={1.0}
          >
            &ldquo;We launched Lotus in 2023 because Chicago&apos;s
            middle-market was chronically underserved by institutional capital.
            Two years in, we&apos;ve closed four acquisitions and broken ground
            on five more — each one disciplined, each one deliberate.&rdquo;
          </LineReveal>

          <div className="mt-8">
            <TextButton href="/about">Read our philosophy</TextButton>
          </div>
        </motion.div>

        {/* Right column — 2×2 stat grid with cross hairline */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-2 self-center"
        >
          {stats.map((stat, i) => {
            const isRightCol = i % 2 === 1;
            const isBottomRow = i >= 2;
            const borders = [
              !isRightCol ? "border-r-[0.5px] border-gray-200" : "",
              !isBottomRow ? "border-b-[0.5px] border-gray-200" : "",
            ].join(" ");
            return (
              <div key={i} className={`p-12 max-[640px]:p-8 min-w-0 ${borders}`}>
                <div
                  className="font-serif font-light italic text-ink"
                  style={{
                    fontSize: "clamp(40px, 4.5vw, 72px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 0.95,
                  }}
                >
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-gray-600 mt-4">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Feature image — col-start-2 through col-end-11, 96px gap */}
      <motion.div
        className="mt-24 max-[640px]:mt-16 grid grid-cols-12 max-[1024px]:grid-cols-1"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.24, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="col-start-2 col-span-10 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
          <EditorialImage
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=80"
            caption="(03) Exterior · Fulton Market Project · Chicago, 2024"
            aspectRatio="3/2"
            alt="Exterior of Fulton Market project, Chicago, 2024"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
