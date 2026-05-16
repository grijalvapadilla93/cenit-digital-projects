"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: "Meridian", sub: "Construction Group" },
  { name: "Nexus", sub: "Advisory Partners" },
  { name: "Crystal", sub: "Surface Co." },
  { name: "Casa Alba", sub: "Mediterranean Cuisine" },
];

export default function WorkIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title fade in
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: section, start: "top 70%", end: "top 30%", scrub: true },
      });

      // Each project name enters center, then scatters out
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const isLeft = i < 2;
        const row = Math.floor(i / 2);
        const stagger = i * 0.12;

        // Enter from center, fade in
        gsap.fromTo(item, { opacity: 0, scale: 0.8, y: 0 }, {
          opacity: 1, scale: 1, duration: 1,
          scrollTrigger: { trigger: section, start: "top 55%", end: "top 35%", scrub: true },
          delay: stagger,
        });

        // Then scatter to position, fade out
        gsap.to(item, {
          y: row === 0 ? -200 : 200,
          x: isLeft ? -300 : 300,
          opacity: 0,
          scale: 0.6,
          scrollTrigger: { trigger: section, start: "top 40%", end: "bottom 20%", scrub: true },
          delay: stagger,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-black px-6 py-24 md:py-32 overflow-hidden">
      {/* Title */}
      <div ref={titleRef} className="text-center mb-20" style={{ opacity: 0 }}>
        <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#ffffff", marginBottom: 12 }}>
          Our work
        </p>
      </div>

      {/* Project names scattered animation */}
      <div className="max-w-4xl mx-auto relative">
        <div className="grid grid-cols-2 gap-16 md:gap-24">
          {projects.map((project, i) => (
            <div
              key={project.name}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="text-center"
              style={{ opacity: 0 }}
            >
              <h3 className="font-light text-white tracking-[0.04em] uppercase" style={{ fontSize: "clamp(20px, 3vw, 32px)", lineHeight: 1.3 }}>
                {project.name}
              </h3>
              <p className="font-light tracking-[0.06em] uppercase" style={{ fontSize: 11, color: "#ffffff", marginTop: 4 }}>
                {project.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
