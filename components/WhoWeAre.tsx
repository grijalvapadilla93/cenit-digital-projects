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
      // Detect mobile — skip all animations on mobile, content visible by default
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        // Split the headline — chars on desktop
        split = new SplitType(headline, { types: "chars" });
        const elements = split.chars;

        if (!elements || elements.length === 0) return;

        // Set initial state — everything starts hidden on desktop
        gsap.set(elements, { opacity: 0, y: 40, rotateX: -40 });
        gsap.set(body, { opacity: 0, y: 20 });
        gsap.set(".wwa-divider", { width: 0, opacity: 0 });

        // Animate headline — cinematic, slow, one by one
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.025,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 35%",
            scrub: false,
            toggleActions: "play none none none",
          },
        });

        // Body text fades in after
        gsap.to(body, {
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
        });

        // Thin animated line divider
        gsap.to(".wwa-divider", {
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
        });
      }); // end desktop matchMedia

      // Mobile: no GSAP at all — everything visible via CSS
      mm.add("(max-width: 767px)", () => {
        // Do nothing — CSS handles everything on mobile
      }); // end mobile matchMedia
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
          className="font-light text-white tracking-[0.01em] who-we-are-headline"
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
            height: 1,
            background: "rgba(255,255,255,0.3)",
            margin: "40px 0",
          }}
        />

        {/* Body — fades in after */}
        <p
          ref={bodyRef}
          className="font-light text-white/60 leading-relaxed max-w-2xl who-we-are-body"
          style={{
            fontSize: "clamp(16px, 1.8vw, 22px)",
            lineHeight: 1.7,
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
