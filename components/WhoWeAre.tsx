"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let mounted = true;
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    if (!section || !headline || !body) return;

    let split: SplitType | null = null;

    const ctx = gsap.context(() => {
      // Detect mobile
      const isMobile = window.innerWidth < 768;
      
      // Split the headline — chars on desktop, words on mobile (lighter)
      const split = new SplitType(headline, { types: isMobile ? "words" : "chars" });
      const elements = split[isMobile ? "words" : "chars"];

      if (!elements || elements.length === 0) return;

      // Set initial state
      gsap.set(elements, { opacity: 0, y: isMobile ? 20 : 40, rotateX: isMobile ? 0 : -40 });

      // Animate — lighter stagger on mobile
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: isMobile ? 0.4 : 0.5,
        ease: "power3.out",
        stagger: isMobile ? 0.04 : 0.025,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 35%",
          scrub: false,
          toggleActions: "play none none none",
        },
      });

      // Body text fades in after
      gsap.fromTo(
        body,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      // Thin animated line divider
      gsap.fromTo(
        ".wwa-divider",
        { width: 0, opacity: 0 },
        {
          width: 60,
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => {
      mounted = false;
      // Revert SplitType first (restore original DOM)
      if (split) {
        split.revert();
        split = null;
      }
      // Then revert GSAP context (kill ScrollTriggers + tweens)
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex items-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full relative z-[1] px-6 md:px-16">
        {/* Label */}
        <p
          className="font-light uppercase tracking-[0.15em] mb-12"
          style={{ fontSize: 11, color: "#ffffff" }}
        >
          Who We Are
        </p>

        {/* Poster headline — SplitType target */}
        <h2
          ref={headlineRef}
          className="font-light text-white tracking-[0.01em]"
          style={{
            fontSize: "clamp(36px, 5vw, 80px)",
            lineHeight: 1.15,
            perspective: 800,
          }}
        >
          We build, optimize, and grow digital presence for Miami businesses.
        </h2>

        {/* Divider */}
        <div
          className="wwa-divider"
          style={{
            width: 0,
            height: 1,
            background: "rgba(255,255,255,0.3)",
            margin: "40px 0",
            opacity: 0,
          }}
        />

        {/* Body — fades in after */}
        <p
          ref={bodyRef}
          className="font-light text-white/60 leading-relaxed max-w-2xl"
          style={{
            fontSize: "clamp(16px, 1.8vw, 22px)",
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          From a website that converts to the systems that keep you visible — SEO, ads,
          automations, content, and dashboards that show you what&apos;s working. Based in Miami,
          we work with businesses that want to be seen — not just online, but in front of the
          right people, with the right message.
        </p>
      </div>
    </section>
  );
}
