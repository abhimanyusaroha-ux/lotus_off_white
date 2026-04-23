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
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(target);
      return;
    }

    const obj = { val: 0 };

    const anim = gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = String(Math.round(obj.val));
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
  }, [target, duration]);

  return (
    <span className={className}>
      {prefix && <span>{prefix}</span>}
      <span ref={numRef}>0</span>
      {suffix && (
        <span
          className="font-serif font-normal italic"
          style={{
            fontSize: "0.4em",
            verticalAlign: "0.55em",
            marginLeft: "0.08em",
            letterSpacing: "0",
          }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
