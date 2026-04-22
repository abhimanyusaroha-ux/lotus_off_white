"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = document.getElementById("lotus-cursor");
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [data-cursor]")) {
        gsap.to(cursor, { width: 32, height: 32, duration: 0.3, ease: "power2.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [data-cursor]")) {
        gsap.to(cursor, { width: 8, height: 8, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div id="lotus-cursor" aria-hidden="true" />;
}
