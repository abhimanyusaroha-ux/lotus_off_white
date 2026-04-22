"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}: CounterProps) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const obj = { val: 0 };

    const anim = gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
      },
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => anim.play(),
    });

    return () => {
      anim.kill();
      st.kill();
    };
  }, [target, prefix, suffix, duration]);

  return (
    <span ref={elRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
