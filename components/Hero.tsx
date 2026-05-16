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

  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // MatchMedia: simpler animations on mobile
      const mm = gsap.matchMedia();
      
      // Desktop: full scrub animations
      mm.add("(min-width: 768px)", () => {
        // Video fades out
        gsap.to(videoRef.current, {
          opacity: 0, scale: 1.15, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
        });

        // Title text fades & moves up
        gsap.to(textRef.current, {
          opacity: 0, y: -60, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=40%", scrub: true },
        });

        // Mask grows
        gsap.fromTo(maskRef.current, { scale: 0, opacity: 0 }, {
          scale: 4, opacity: 1, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=120%", scrub: true },
        });

        // Images drift down and shrink
        [img1Ref, img2Ref, img3Ref].forEach((ref, i) => {
          gsap.fromTo(ref.current, { scale: 1.2, opacity: 1 }, {
            scale: 0.15, opacity: 0, y: 400 + i * 50, x: 0, ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
          });
        });
      });

      // Mobile: simpler one-shot animations (no scrub)
      mm.add("(max-width: 767px)", () => {
        // Just fade out on scroll — no scrub
        gsap.to(videoRef.current, {
          opacity: 0, scale: 1.1, duration: 0.8,
          scrollTrigger: { trigger: hero, start: "top top", end: "+=80%", scrub: false },
        });
        
        gsap.to(textRef.current, {
          opacity: 0, y: -30, duration: 0.8,
          scrollTrigger: { trigger: hero, start: "top top", end: "+=30%", scrub: false },
        });
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} data-hero className="relative w-full h-screen overflow-hidden bg-black">
      {/* LAYER 0: video */}
      <div className="absolute inset-0 z-[0] scale-110">
        <video
          ref={videoRef}
          src="/hero-video-pingpong.mp4"
          autoPlay muted loop playsInline preload="metadata"
          className="w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: 0.10 }}
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

      {/* LAYER 2: images */}
      <div className="absolute inset-0 z-[2]">
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
        className="relative z-[3] min-h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <h1
          className="font-playfair text-white tracking-[0.06em] uppercase"
          style={{ fontSize: "clamp(44px, 8vw, 140px)", lineHeight: 1.15, letterSpacing: "0.1em" }}
        >
          Cenit
        </h1>
        <h1
          className="font-playfair text-white/80 tracking-[0.06em] uppercase"
          style={{ fontSize: "clamp(44px, 8vw, 140px)", lineHeight: 1.15, letterSpacing: "0.1em" }}
        >
          Digital
        </h1>
        <h1
          className="font-playfair text-white/60 tracking-[0.06em] uppercase"
          style={{ fontSize: "clamp(44px, 8vw, 140px)", lineHeight: 1.15, letterSpacing: "0.1em" }}
        >
          Projects
        </h1>
        <p
          className="font-light text-white tracking-[0.08em] uppercase"
          style={{ marginTop: 24, fontSize: "clamp(10px, 1.2vw, 14px)" }}
        >
          Digital media marketing & solutions from Miami
        </p>
      </div>
    </div>
  );
}
