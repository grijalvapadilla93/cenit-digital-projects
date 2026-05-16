"use client";

import { useRef, useEffect } from "react";

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const reveals = el.querySelectorAll<HTMLElement>(".scroll-reveal");
          reveals.forEach((r, i) => {
            setTimeout(() => r.classList.add("revealed"), i * 400);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-dvh flex items-center justify-center bg-black px-6 md:px-16"
    >
      <div className="max-w-2xl text-center">
        <p
          className="scroll-reveal font-light text-white tracking-[0.02em]"
          style={{ fontSize: "clamp(24px, 3.5vw, 48px)", lineHeight: 1.3 }}
        >
          We don&apos;t build websites.
          <br />
          We build presence.
        </p>
        <div className="scroll-reveal line-divider mx-auto my-12" />
        <p
          className="scroll-reveal font-light tracking-[0.02em] leading-relaxed"
          style={{
            fontSize: "clamp(16px, 2vw, 24px)",
            lineHeight: 1.6,
            color: "#ffffff",
          }}
        >
          Then we put your business where it belongs — in front of the right people,
          with the right systems running while you sleep.
        </p>
      </div>
    </section>
  );
}
