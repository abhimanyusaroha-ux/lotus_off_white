"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LotusLogoMark } from "./LotusLogoMark";
import { PillButton } from "./PillButton";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Investors", href: "/investors" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Refs for nav link underline spans (indexed by link)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // ── Mount animation ──────────────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const links = linkRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const cta = ctaRef.current;
    const logo = logoRef.current;

    gsap.set(header, { opacity: 0, y: -20 });
    if (logo) gsap.set(logo, { opacity: 0 });
    if (links.length) gsap.set(links, { opacity: 0, y: -8 });
    if (cta) gsap.set(cta, { opacity: 0, y: -8 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(header, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" });
    if (logo) tl.to(logo, { opacity: 1, duration: 0.5 }, "-=0.5");
    if (links.length)
      tl.to(links, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, "-=0.4");
    if (cta)
      tl.to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.15");
  }, []);

  // ── Scroll shrink + backdrop ─────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const past = window.scrollY > 80;
      if (past) {
        header.classList.add("nav-scrolled");
      } else {
        header.classList.remove("nav-scrolled");
      }
      if (!prefersReduced) {
        gsap.to(header, {
          height: past ? 60 : 72,
          duration: 0.4,
          ease: "expo.out",
          overwrite: true,
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Nav link hover underlines ────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    linkRefs.current.forEach((link, i) => {
      const line = lineRefs.current[i];
      if (!link || !line) return;

      // Active links always show underline
      const isActive = link.getAttribute("data-active") === "true";
      gsap.set(line, { scaleX: isActive ? 1 : 0, transformOrigin: "left" });

      if (prefersReduced || isActive) return;

      const onEnter = () =>
        gsap.to(line, {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });

      const onLeave = () =>
        gsap.to(line, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  // ── Mobile overlay (GSAP, no Framer Motion) ──────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (menuOpen) {
      gsap.set(overlay, { display: "flex", y: "-100%" });
      gsap.to(overlay, { y: "0%", duration: 0.5, ease: "expo.out" });

      const items = overlay.querySelectorAll<HTMLElement>(".mobile-nav-item");
      if (items.length) {
        gsap.fromTo(
          Array.from(items),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: "power2.out", delay: 0.15 }
        );
      }
    } else {
      gsap.to(overlay, {
        y: "-100%",
        duration: 0.4,
        ease: "expo.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-canvas transition-[background-color,border-color] duration-300"
        style={{ height: "72px" }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-[120px] flex items-center justify-between max-[1024px]:px-12 max-[640px]:px-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="Lotus Property Group"
          >
            <div ref={logoRef} className="flex items-center gap-3">
              <LotusLogoMark size={26} className="text-ink" />
              <div className="flex flex-col gap-0">
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-ink leading-[14px]">
                  Lotus
                </span>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-gray-600 leading-[14px]">
                  Property Group
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Main navigation">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  data-active={isActive ? "true" : "false"}
                  className={[
                    "relative font-sans text-[11px] uppercase tracking-[0.1em] transition-colors duration-200",
                    isActive ? "text-ink" : "text-gray-600 hover:text-ink",
                  ].join(" ")}
                >
                  {link.label}
                  <span
                    ref={(el) => { lineRefs.current[i] = el; }}
                    className="absolute inset-x-0 bottom-[-3px] h-[0.5px] bg-current"
                    aria-hidden="true"
                    style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div ref={ctaRef} className="hidden lg:block">
            <PillButton href="/contact">Contact us</PillButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="block w-5 h-px bg-ink" />
            <span className="block w-5 h-px bg-ink" />
          </button>
        </div>
      </header>

      {/* Mobile overlay — always in DOM, GSAP controls display/transform */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-canvas flex-col"
        style={{ display: "none", transform: "translateY(-100%)" }}
      >
        <div className="flex justify-between items-center h-[72px] px-6 border-b border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <LotusLogoMark size={24} className="text-ink" />
            <div className="flex flex-col gap-0">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-ink leading-[13px]">Lotus</span>
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-gray-600 leading-[13px]">Property Group</span>
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 -mr-2"
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="#0A0A0A" strokeWidth="1" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="#0A0A0A" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-10 pt-10 flex flex-col" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <div key={link.href} className="mobile-nav-item">
              <Link
                href={link.href}
                className="display-md font-sans font-bold text-ink block py-4 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="px-10 pb-10">
          <PillButton href="/contact" onClick={() => setMenuOpen(false)}>
            Contact us
          </PillButton>
        </div>
      </div>
    </>
  );
}
