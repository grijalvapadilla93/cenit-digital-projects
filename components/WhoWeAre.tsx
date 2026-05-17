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
      const mm = gsap.matchMedia();

      // Same animations for ALL screen sizes — desktop and mobile
      mm.add("(min-width: 0px)", () => {
        // Only split on wider screens (too many chars on tiny phones breaks layout)
        const isSmall = window.innerWidth < 480;

        if (!isSmall) {
          split = new SplitType(headline, { types: "chars" });
        }
        const elements = isSmall ? null : split?.chars;

        if (elements && elements.length > 0) {
          // SplitType path — character animation
          gsap.set(elements, { opacity: 0, y: 40, rotateX: -40 });
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
        } else {
          // No SplitType — just fade the whole headline in
          gsap.set(headline, { opacity: 0, y: 30 });
          gsap.to(headline, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });
        }

        // Body text fades in after
        gsap.set(body, { opacity: 0, y: 20 });
        gsap.to(body, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            scrub: false,
            toggleActions: "play none none none",
          },
        });

        // Thin animated line divider
        gsap.set(".wwa-divider", { width: 0, opacity: 0 });
        gsap.to(".wwa-divider", {
          width: 60,
          opacity: 1,
          duration: 0.6,
          ease: "power3.inOut",
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            scrub: false,
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    // Safety net: if GSAP/ScrollTrigger fails to fire, force visibility after 3s
    const safetyTimer = setTimeout(() => {
      if (!mounted) return;
      gsap.set(headline, { opacity: 1, y: 0, clearProps: "opacity,y,rotateX" });
      gsap.set(body, { opacity: 1, y: 0, clearProps: "opacity,y" });
      gsap.set(".wwa-divider", { opacity: 1, width: 60, clearProps: "opacity,width" });
    }, 3000);

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
      if (split) {
        split.revert();
        split = null;
      }
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
