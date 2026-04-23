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

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // ── Initialise overlay via GSAP on mount — no conflicting inline transform ──
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.set(overlay, { yPercent: -100, display: "none" });
  }, []);

  // ── Header mount animation ────────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const links = linkRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const cta = ctaRef.current;
    const logo = logoRef.current;

    gsap.set(header, { opacity: 0, y: -20 });
    if (logo) gsap.set(logo, { opacity: 0 });
    if (links.length) gsap.set(links, { opacity: 0, y: -8 });
    if (cta) gsap.set(cta, { opacity: 0, y: -8 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(header, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    if (logo) tl.to(logo, { opacity: 1, duration: 0.5 }, "-=0.5");
    if (links.length)
      tl.to(links, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, "-=0.4");
    if (cta)
      tl.to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.15");
  }, []);

  // ── Scroll shrink + backdrop ──────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const past = window.scrollY > 80;
      header.classList.toggle("nav-scrolled", past);
      if (!prefersReduced) {
        gsap.to(header, { height: past ? 60 : 72, duration: 0.4, ease: "power3.out", overwrite: true });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Nav link hover underlines ─────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    linkRefs.current.forEach((link, i) => {
      const line = lineRefs.current[i];
      if (!link || !line) return;

      const isActive = link.getAttribute("data-active") === "true";
      gsap.set(line, { scaleX: isActive ? 1 : 0, transformOrigin: "left" });
      if (prefersReduced || isActive) return;

      const onEnter = () =>
        gsap.to(line, { scaleX: 1, transformOrigin: "left", duration: 0.3, ease: "power2.out", overwrite: true });
      const onLeave = () =>
        gsap.to(line, { scaleX: 0, transformOrigin: "right", duration: 0.3, ease: "power2.out", overwrite: true });

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  // ── Open / close overlay ──────────────────────────────────────────
  const openMenu = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
    gsap.set(overlay, { display: "flex", yPercent: -100 });
    gsap.to(overlay, { yPercent: 0, duration: 0.5, ease: "power3.out" });

    const items = overlay.querySelectorAll<HTMLElement>(".mobile-nav-item");
    if (items.length) {
      gsap.fromTo(
        Array.from(items),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: "power2.out", delay: 0.15 }
      );
    }
  };

  const closeMenu = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    setMenuOpen(false);
    document.body.style.overflow = "";
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => gsap.set(overlay, { display: "none" }),
    });
  };

  // Close on route change (back button etc.)
  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-canvas transition-[background-color,border-color] duration-300"
        style={{ height: "72px" }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-[120px] flex items-center justify-between max-[1024px]:px-12 max-[640px]:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Lotus Property Group">
            <div ref={logoRef} className="flex items-center gap-3">
              <LotusLogoMark size={26} className="text-interactive" />
              <div className="flex flex-col gap-0">
                <span className="font-serif font-light italic text-[15px] text-ink leading-[16px]">
                  Lotus
                </span>
                <span className="font-serif font-light italic text-[15px] text-gray-600 leading-[16px]">
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
                    "relative font-sans text-[11px] uppercase tracking-[0.12em] transition-colors duration-200",
                    isActive ? "text-interactive" : "text-gray-600 hover:text-interactive",
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
            className="lg:hidden p-3 -mr-3"
            style={{ touchAction: "manipulation" }}
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="block w-5 h-px bg-interactive" />
              <span className="block w-5 h-px bg-interactive" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay — GSAP owns display and yPercent from mount */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-canvas flex-col"
        style={{ display: "none" }}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center h-[72px] px-6 border-b border-gray-200 flex-shrink-0">
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            <LotusLogoMark size={24} className="text-interactive" />
            <div className="flex flex-col gap-0">
              <span className="font-serif font-light italic text-[14px] text-ink leading-[15px]">Lotus</span>
              <span className="font-serif font-light italic text-[14px] text-gray-600 leading-[15px]">Property Group</span>
            </div>
          </Link>
          <button
            onClick={closeMenu}
            className="p-3 -mr-3"
            style={{ touchAction: "manipulation" }}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="4" y1="4" x2="16" y2="16" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-6 pt-8 flex flex-col overflow-y-auto" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <div key={link.href} className="mobile-nav-item">
              <Link
                href={link.href}
                className="display-md font-serif font-light italic text-interactive block py-4 border-b-[0.5px] border-gray-100 active:opacity-60 transition-opacity"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-6 py-10 flex-shrink-0">
          <PillButton href="/contact" onClick={closeMenu}>
            Contact us
          </PillButton>
        </div>
      </div>
    </>
  );
}
