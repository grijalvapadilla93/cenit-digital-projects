"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word3Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── ENTRANCE: LIGHT SWEEP + WORD STAGGER ───
      mm.add("(min-width: 768px)", () => {
        // Reset everything to hidden
        gsap.set(videoRef.current, { opacity: 0, scale: 1 });
        gsap.set(sweepRef.current, { x: "-120%", opacity: 1 });
        gsap.set(labelRef.current, { opacity: 0, y: 15 });
        gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], {
          opacity: 0, y: 80, rotationX: 15,
        });
        gsap.set(ctaRef.current, { opacity: 0, y: 30 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });
        gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], {
          opacity: 0, scale: 0.8, y: 60, rotation: -6,
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Video fade in
        tl.to(videoRef.current, { opacity: 0.15, duration: 2, ease: "power2.out" }, 0);

        // Light sweep — gradient crosses from left to right over the text
        tl.to(sweepRef.current, {
          x: "120%", duration: 1.8, ease: "power2.inOut",
        }, 0.3);

        // Images float in staggered
        tl.to([img1Ref.current, img2Ref.current, img3Ref.current], {
          opacity: 0.4, y: 0, scale: 1, rotation: 0,
          duration: 1.6, stagger: 0.12,
        }, 0);

        // Label
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.6);

        // Words — each from a different direction
        tl.to(word1Ref.current, { opacity: 1, y: 0, rotationX: 0, duration: 1 }, 0.8);
        tl.to(word2Ref.current, { opacity: 1, y: 0, rotationX: 0, duration: 1 }, 0.9);
        tl.to(word3Ref.current, { opacity: 1, y: 0, rotationX: 0, duration: 1 }, 1.0);

        // CTA + scroll
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.3);
        tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.8 }, 1.5);
      });

      // Mobile entrance — simpler, no images, no sweep
      mm.add("(max-width: 767px)", () => {
        gsap.set(labelRef.current, { opacity: 0, y: 10 });
        gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], { opacity: 0, y: 20 });
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.2);
        tl.to(word1Ref.current, { opacity: 1, y: 0, duration: 0.5 }, 0.4);
        tl.to(word2Ref.current, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
        tl.to(word3Ref.current, { opacity: 1, y: 0, duration: 0.5 }, 0.6);
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.9);
        tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.5 }, 1.1);
      });

      // ─── SCROLL: SPLIT + PARALLAX ───
      mm.add("(min-width: 768px)", () => {
        // Video zooms out
        gsap.to(videoRef.current, {
          opacity: 0, scale: 1.3, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
        });

        // Words split: CENIT goes left, PROJECTS goes right, DIGITAL fades
        gsap.to(word1Ref.current, {
          x: -200, opacity: 0, ease: "power2.in",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=70%", scrub: 0.8 },
        });
        gsap.to(word2Ref.current, {
          opacity: 0, ease: "power2.in",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=60%", scrub: 0.5 },
        });
        gsap.to(word3Ref.current, {
          x: 200, opacity: 0, ease: "power2.in",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=70%", scrub: 0.8 },
        });

        // Label and CTA fade early
        gsap.to(labelRef.current, {
          opacity: 0, y: -20, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=30%", scrub: true },
        });
        gsap.to(ctaRef.current, {
          opacity: 0, y: -10, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=25%", scrub: true },
        });
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=15%", scrub: true },
        });

        // Images scatter outward at different speeds
        gsap.to(img1Ref.current, {
          x: -300, y: -200, scale: 0.1, opacity: 0, rotation: -20, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
        });
        gsap.to(img2Ref.current, {
          x: 300, y: -150, scale: 0.1, opacity: 0, rotation: 20, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
        });
        gsap.to(img3Ref.current, {
          y: 300, scale: 0.1, opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", scrub: true },
        });

        // Mask expands
        gsap.fromTo(layer1Ref.current, { scale: 0, opacity: 0 }, {
          scale: 4, opacity: 1, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=120%", scrub: true },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(videoRef.current, {
          opacity: 0, scale: 1.15, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=80%", scrub: 0.5 },
        });
        gsap.to(word1Ref.current, {
          x: -40, opacity: 0, ease: "power2.in",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=40%", scrub: 0.5 },
        });
        gsap.to(word2Ref.current, {
          opacity: 0, ease: "power2.in",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=35%", scrub: 0.5 },
        });
        gsap.to(word3Ref.current, {
          x: 40, opacity: 0, ease: "power2.in",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=40%", scrub: 0.5 },
        });
        gsap.to(labelRef.current, { opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=20%", scrub: 0.5 },
        });
        gsap.to(ctaRef.current, { opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=15%", scrub: 0.5 },
        });
        gsap.to(scrollIndicatorRef.current, { opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "+=10%", scrub: 0.5 },
        });
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  // ─── MOUSE 3D TILT ───
  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = x * 4;
      const rotX = -y * 4;
      hero.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

      // Light sweep gradient follows mouse subtly
      if (sweepRef.current) {
        const px = x * 30;
        sweepRef.current.style.background = `linear-gradient(
          ${90 + y * 20}deg,
          rgba(198,167,106,0) 0%,
          rgba(198,167,106,0.03) 40%,
          rgba(198,167,106,0.06) 50%,
          rgba(198,167,106,0.03) 60%,
          rgba(198,167,106,0) 100%
        )`;
      }
    };

    const handleMouseLeave = () => {
      hero.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      data-hero
      className="relative w-full h-dvh overflow-hidden bg-black"
      style={{ transition: "transform 0.08s ease-out", transformStyle: "preserve-3d" }}
    >
      {/* LAYER 0: video */}
      <div className="absolute inset-0 z-[0] scale-110">
        <video
          ref={videoRef}
          src="/hero-video-pingpong.mp4"
          autoPlay muted loop playsInline preload="auto" poster="/hero-fallback.jpeg"
          className="w-full h-full object-cover pointer-events-none select-none"
          onCanPlay={(e) => {
            (e.target as HTMLVideoElement).play().catch(() => {});
          }}
        />
      </div>

      {/* LIGHT SWEEP — golden gradient bar that sweeps across on entry */}
      <div
        ref={sweepRef}
        className="absolute inset-0 z-[1] pointer-events-none select-none"
        style={{
          background: "linear-gradient(90deg, rgba(198,167,106,0) 0%, rgba(198,167,106,0.06) 50%, rgba(198,167,106,0) 100%)",
          width: "80%",
          height: "150%",
          top: "-25%",
          left: "10%",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />

      {/* MASK — dark circle that grows on scroll */}
      <div
        ref={layer1Ref}
        className="absolute z-[1]"
        style={{ bottom: "-60%", left: "50%", transform: "translate(-50%, 0)", width: "180vw", maxWidth: "2500px" }}
      >
        <svg viewBox="0 0 2500 1250" preserveAspectRatio="xMidYMax slice" className="w-full" style={{ display: "block" }}>
          <circle cx="1250" cy="1250" r="1250" fill="black" />
        </svg>
      </div>

      {/* IMAGES — hidden on mobile */}
      <div className="absolute inset-0 z-[2] hidden md:block">
        <div ref={img1Ref} className="absolute" style={{ top: "-5%", left: "-10%", width: "38vw", height: "38vw", maxWidth: "520px" }}>
          <img src="/Imagenpng1.png" alt="" className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
        </div>
        <div ref={img2Ref} className="absolute" style={{ top: "-5%", right: "-5%", width: "35vw", height: "35vw", maxWidth: "460px" }}>
          <img src="/Imagenpng2.png" alt="" className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
        </div>
        <div ref={img3Ref} className="absolute" style={{ bottom: "-15%", left: "50%", transform: "translateX(-50%)", width: "42vw", height: "42vw", maxWidth: "550px" }}>
          <img src="/Imagenpng3.png" alt="" className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
        </div>
      </div>

      {/* TITLE TEXT — each word independently animated */}
      <div className="relative z-[3] min-h-dvh flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        style={{ perspective: "1200px" }}
      >
        <p
          ref={labelRef}
          className="font-light uppercase tracking-[0.15em] text-amber/60"
          style={{ fontSize: 11, marginBottom: 24 }}
        >
          Miami-based digital agency
        </p>

        <h1
          ref={word1Ref}
          className="font-playfair text-white tracking-[0.06em] uppercase"
          style={{
            fontSize: "clamp(44px, 8vw, 140px)",
            lineHeight: 1.15,
            letterSpacing: "0.1em",
            transformStyle: "preserve-3d",
          }}
        >
          Cenit
        </h1>

        <h1
          ref={word2Ref}
          className="font-playfair text-white/80 tracking-[0.06em] uppercase"
          style={{
            fontSize: "clamp(44px, 8vw, 140px)",
            lineHeight: 1.15,
            letterSpacing: "0.1em",
            transformStyle: "preserve-3d",
          }}
        >
          Digital
        </h1>

        <h1
          ref={word3Ref}
          className="font-playfair text-white/60 tracking-[0.06em] uppercase"
          style={{
            fontSize: "clamp(44px, 8vw, 140px)",
            lineHeight: 1.15,
            letterSpacing: "0.1em",
            transformStyle: "preserve-3d",
          }}
        >
          Projects
        </h1>
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        className="absolute z-[4] bottom-24 left-1/2 -translate-x-1/2 pointer-events-none"
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

      {/* SCROLL INDICATOR */}
      <div
        ref={scrollIndicatorRef}
        className="absolute z-[4] bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
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
