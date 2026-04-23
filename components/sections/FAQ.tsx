"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { TextButton } from "../TextButton";
import { PillButton } from "../PillButton";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What types of real estate does Lotus invest in?",
    answer:
      "We focus on value-add multifamily, mixed-use, and ground-up residential development in Chicago's core neighborhoods — primarily the West Loop, Fulton Market, Logan Square, Wicker Park, and River North corridors. We do not pursue suburban, retail-only, or single-tenant net-lease assets.",
  },
  {
    question: "How can I invest alongside Lotus?",
    answer:
      "We raise capital on a deal-by-deal basis from a select group of accredited investors. If you're interested in being considered for a future opportunity, reach out via our contact form. We'll respond within one business day and schedule a call if there's a mutual fit.",
  },
  {
    question: "What is the minimum investment?",
    answer:
      "Our minimum co-investment is $100,000 per transaction. Some deals have higher minimums depending on deal size and structure. All investors must qualify as accredited under SEC Regulation D.",
  },
  {
    question: "How do I access my investment documents and tax forms?",
    answer:
      "All capital partners receive login credentials to our investor portal after closing. The portal gives you access to quarterly reports, K-1 documents, capital call notices, wire instructions, and fund-level performance summaries.",
  },
  {
    question: "Does Lotus accept unsolicited deal submissions?",
    answer:
      "Yes. We actively review off-market opportunities. If you have a property or project you'd like us to consider, submit the details through our contact form. We evaluate every submission and respond to qualified opportunities within 48 hours.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const bodyId = `faq-answer-${index}`;

  useEffect(() => {
    const el = bodyRef.current;
    const icon = iconRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.to(el, { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" });
      if (icon) gsap.to(icon, { rotation: 45, duration: 0.25, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
      if (icon) gsap.to(icon, { rotation: 0, duration: 0.25, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div className="border-b-[0.5px] border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-6 max-[640px]:py-5 text-left group gap-4"
        aria-expanded={isOpen}
        aria-controls={bodyId}
      >
        <span className="heading-sm font-sans font-light text-ink group-hover:text-gray-600 transition-colors duration-200">
          {question}
        </span>
        <span className="flex-shrink-0 text-interactive mt-[3px]" aria-hidden="true">
          <svg ref={iconRef} width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div id={bodyId} ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="body-md font-sans font-light text-gray-600 max-w-[600px] pb-7">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = itemsRef.current?.querySelectorAll<HTMLElement>(".faq-item");
    if (!items?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      Array.from(items),
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: itemsRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-[120px] max-[640px]:py-20 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div className="grid grid-cols-12 gap-x-8 max-[1024px]:grid-cols-1 max-[1024px]:gap-y-12 items-start">

        {/* Left: sticky title column */}
        <div className="col-span-4 max-[1024px]:col-span-1 lg:sticky lg:top-[120px]">
          <SectionMarker label="Frequently Asked" />
          <LineReveal
            as="h2"
            className="display-md font-serif font-light italic uppercase text-ink mt-8"
            stagger={0.08}
            duration={1.2}
          >
            Questions, <span className="not-italic">answered.</span>
          </LineReveal>
        </div>

        {/* Right: scrolling accordion */}
        <div
          ref={itemsRef}
          className="col-start-6 col-span-7 max-[1024px]:col-start-1 max-[1024px]:col-span-1 border-t-[0.5px] border-gray-200"
        >
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-28 max-[640px]:mt-16 flex flex-col items-center gap-5">
        <p className="font-sans text-[11px] text-gray-400 uppercase tracking-[0.12em]">
          Have a different question? Our team responds within one business day.
        </p>
        <PillButton href="/contact">Contact our team</PillButton>
      </div>
    </section>
  );
}
