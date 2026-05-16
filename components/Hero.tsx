"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // ─── ENTRANCE ANIMATION (on mount) ───
      const mm = gsap.matchMedia();

      // Desktop entrance — with images
      mm.add("(min-width: 768px)", () => {
        gsap.set(videoRef.current, { opacity: 0 });
        gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], { opacity: 0, y: 80, rotate: -8, scale: 0.9 });
        gsap.set(labelRef.current, { opacity: 0, y: 15 });
        const titleLines = textRef.current?.querySelectorAll<HTMLElement>(".hero-title-line");
        if (titleLines) gsap.set(titleLines, { y: 30 });
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

        const tl = gsap.timeline();
        tl.to(videoRef.current, { opacity: 0.15, duration: 2, ease: "power2.out" })
          .to([img1Ref.current, img2Ref.current, img3Ref.current], {
            opacity: 1, y: 0, rotate: 0, scale: 1,
            duration: 1.6, ease: "power4.out", stagger: 0.15,
          }, "-=0.5")
          .to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
          .to(titleLines, { y: 0, duration: 0.9, ease: "power3.out", stagger: 0.2 }, "-=0.3")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
          .to(scrollIndicatorRef.current, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.2");
      });

      // Mobile entrance — simpler, no images (they're hidden), no video opacity (keep poster visible)
      mm.add("(max-width: 767px)", () => {
        gsap.set(labelRef.current, { opacity: 0, y: 15 });
        const titleLines = textRef.current?.querySelectorAll<HTMLElement>(".hero-title-line");
        if (titleLines) gsap.set(titleLines, { y: 15 });
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

        const tl = gsap.timeline();
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
          .to(titleLines, { y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15 }, "-=0.2")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
          .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.2");
      });

      // ─── SCROLL ANIMATIONS ───

      // Desktop: full scrub
      mm.add("(min-width: 768px)", () => {
        gsap.to(videoRef.current, {
          opacity: 0, scale: 1.15, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
        });

        gsap.to(textRef.current, {
          opacity: 0, y: -60, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=40%", scrub: true },
        });

        gsap.to(ctaRef.current, {
          opacity: 0, y: -20, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=30%", scrub: true },
        });

        gsap.to(scrollIndicatorRef.current, {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=20%", scrub: true },
        });

        gsap.fromTo(maskRef.current, { scale: 0, opacity: 0 }, {
          scale: 4, opacity: 1, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=120%", scrub: true },
        });

        [img1Ref, img2Ref, img3Ref].forEach((ref, i) => {
          gsap.fromTo(ref.current, { scale: 1, opacity: 1 }, {
            scale: 0.15, opacity: 0, y: 400 + i * 50, x: 0, ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
          });
        });
      });

      // Mobile: simpler
      mm.add("(max-width: 767px)", () => {
        gsap.to(videoRef.current, {
          opacity: 0, scale: 1.1, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=80%", scrub: 0.5 },
        });
        gsap.to(textRef.current, {
          opacity: 0, y: -30, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=30%", scrub: 0.5 },
        });
        gsap.to(ctaRef.current, {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=15%", scrub: 0.5 },
        });
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=10%", scrub: 0.5 },
        });
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} data-hero className="relative w-full h-dvh overflow-hidden bg-black">
      {/* LAYER 0: video */}
      <div className="absolute inset-0 z-[0] scale-110">
        <video
          ref={videoRef}
          src="/hero-video-pingpong.mp4"
          autoPlay muted loop playsInline preload="metadata" poster="/hero-fallback.jpeg"
          className="w-full h-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* LAYER 1: mask */}
      <div
        ref={maskRef}
        className="absolute z-[1]"
        style={{ bottom: "-60%", left: "50%", transform: "translate(-50%, 0)", width: "180vw", maxWidth: "2500px" }}
      >
        <svg viewBox="0 0 2500 1250" preserveAspectRatio="xMidYMax slice" className="w-full" style={{ display: "block" }}>
          <circle cx="1250" cy="1250" r="1250" fill="black" />
        </svg>
      </div>

      {/* LAYER 2: images — hidden on mobile (bad positioning) */}
      <div className="absolute inset-0 z-[2] hidden md:block">
        <div ref={img1Ref} className="absolute" style={{ top: "-5%", left: "-10%", width: "38vw", height: "38vw", maxWidth: "520px" }}>
          <img src="/Imagenpng1.png" alt="" className="w-full h-full object-contain pointer-events-none select-none" />
        </div>
        <div ref={img2Ref} className="absolute" style={{ top: "-5%", right: "-5%", width: "35vw", height: "35vw", maxWidth: "460px" }}>
          <img src="/Imagenpng2.png" alt="" className="w-full h-full object-contain pointer-events-none select-none" />
        </div>
        <div ref={img3Ref} className="absolute" style={{ bottom: "-15%", left: "50%", transform: "translateX(-50%)", width: "42vw", height: "42vw", maxWidth: "550px" }}>
          <img src="/Imagenpng3.png" alt="" className="w-full h-full object-contain pointer-events-none select-none" />
        </div>
      </div>

      {/* LAYER 3: title text */}
      <div
        ref={textRef}
        className="relative z-[3] min-h-dvh flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <p
          ref={labelRef}
          className="font-light uppercase tracking-[0.15em] text-amber/60"
          style={{ fontSize: 11, marginBottom: 24, opacity: 0 }}
        >
          Miami-based digital agency
        </p>
        <h1 className="hero-title-line font-playfair text-white tracking-[0.06em] uppercase"
          style={{ fontSize: "clamp(44px, 8vw, 140px)", lineHeight: 1.15, letterSpacing: "0.1em" }}
        >
          Cenit
        </h1>
        <h1 className="hero-title-line font-playfair text-white/80 tracking-[0.06em] uppercase"
          style={{ fontSize: "clamp(44px, 8vw, 140px)", lineHeight: 1.15, letterSpacing: "0.1em" }}
        >
          Digital
        </h1>
        <h1 className="hero-title-line font-playfair text-white/60 tracking-[0.06em] uppercase"
          style={{ fontSize: "clamp(44px, 8vw, 140px)", lineHeight: 1.15, letterSpacing: "0.1em" }}
        >
          Projects
        </h1>
      </div>

      {/* LAYER 4: CTA */}
      <div
        ref={ctaRef}
        className="absolute z-[4] bottom-24 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none"
      >
        <a
          href="#work"
          onClick={scrollToWork}
          className="inline-block font-light tracking-[0.1em] uppercase transition-all duration-500 hover:text-amber hover:border-amber/50 pointer-events-auto"
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "12px 28px",
            letterSpacing: "0.12em",
          }}
        >
          View our work
        </a>
      </div>

      {/* LAYER 5: scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute z-[4] bottom-8 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none flex flex-col items-center gap-2"
      >
        <span className="font-light tracking-[0.1em] uppercase" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
          Scroll
        </span>
        <div
          className="w-[1px] bg-gradient-to-b from-white/30 to-transparent"
          style={{ height: 24, animation: "scrollPulse 2s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}
