"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Transition() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const line = lineRef.current;
    if (!el || !line) return;

    const ctx = gsap.context(() => {
      // Line draws first — anticipation
      gsap.fromTo(
        line,
        { width: 0 },
        {
          width: 60,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 70%", scrub: false, once: true },
        }
      );

      // Then text fades up with stagger
      gsap.fromTo(
        el.querySelectorAll(".bridge-text"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", scrub: false, once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-black px-6 md:px-16 py-32 md:py-48">
      <div className="max-w-3xl mx-auto text-center">
        {/* Animated line — anticipation */}
        <div
          ref={lineRef}
          style={{ width: 0, height: 1, background: "rgba(255,255,255,0.15)", margin: "0 auto 32px" }}
        />
        <p
          className="bridge-text font-light text-white/20 tracking-[0.1em] uppercase"
          style={{ fontSize: 11, marginBottom: 24, opacity: 0 }}
        >
          Our work
        </p>
        <p
          className="bridge-text font-light text-white tracking-[0.02em]"
          style={{ fontSize: "clamp(20px, 3vw, 32px)", lineHeight: 1.4, opacity: 0 }}
        >
          A curated selection of client results &mdash; from Miami businesses
          that chose to be seen differently.
        </p>
      </div>
    </section>
  );
}
