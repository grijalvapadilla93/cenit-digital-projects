"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { group: "Presence", label: "We make you visible", items: [
    "Web development",
    "Google Business Profile",
    "Reviews, photos & content",
    "SEO & lead generation",
    "Ads & social media management",
  ]},
  { group: "Optimization", label: "We make you efficient", items: [
    "Automations",
    "Chatbots",
    "AI solutions",
    "Dashboards & reporting",
  ]},
];

export function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Section header — scrub on desktop, one-shot on mobile
      mm.add("(min-width: 768px)", () => {
        const header = el.querySelector<HTMLElement>(".section-header");
        if (header) {
          gsap.fromTo(header, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", end: "top 55%", scrub: true },
          });
        }
      });
      mm.add("(max-width: 767px)", () => {
        const header = el.querySelector<HTMLElement>(".section-header");
        if (header) {
          gsap.fromTo(header, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, ease: "power3.out", duration: 0.8,
            scrollTrigger: { trigger: el, start: "top 80%", scrub: false, toggleActions: "play none none none" },
          });
        }
      });

      // Each service-item animates in with timeline (desktop only — mobile keeps visible)
      mm.add("(min-width: 768px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".service-item");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 55%",
            toggleActions: "play none none none",
          },
        });

        items.forEach((item, i) => {
          const line = item.querySelector<HTMLElement>(".item-line");

          // Line draws from left
          if (line) {
            tl.fromTo(line, { scaleX: 0, opacity: 0 }, {
              scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.inOut",
            }, i * 0.1);
          }

          // Text fades and shifts right
          const text = item.querySelector<HTMLElement>(".item-text");
          if (text) {
            tl.fromTo(text, { x: -15, opacity: 0 }, {
              x: 0, opacity: 1, duration: 0.25, ease: "power3.out",
            }, i * 0.1 + 0.05);
          }
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="services" className="relative px-6 md:px-16 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="section-header mb-24">
          <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#ffffff", marginBottom: 16 }}>
            What We Do
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-20">
          {services.map((group) => (
            <div key={group.group}>
              <p className="service-item mb-10" style={{ fontSize: 11, color: "#ffffff", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                <span className="item-line inline-block w-4 h-[1px] bg-white/20 align-middle mr-2" style={{ transformOrigin: "left center" }} />
                <span className="item-text inline-block">{group.group} — {group.label}</span>
              </p>
              <div className="space-y-5">
                {group.items.map((item) => (
                  <p key={item} className="service-item font-light text-white tracking-[0.02em]" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", lineHeight: 1.4 }}>
                    <span className="item-line inline-block w-3 h-[1px] bg-white/40 align-middle mr-2" style={{ transformOrigin: "left center" }} />
                    <span className="item-text inline-block">{item}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="service-item text-center mt-20 text-opacity-0">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="item-line w-6 h-[1px] bg-white/40" style={{ transformOrigin: "center" }} />
            <div className="item-line w-6 h-[1px] bg-white/40" style={{ transformOrigin: "center" }} />
          </div>
          <p
            className="item-text font-light tracking-[0.02em] leading-relaxed mx-auto"
            style={{ fontSize: "clamp(16px, 2vw, 24px)", lineHeight: 1.6, color: "#ffffff", maxWidth: 500 }}
          >
            We don&apos;t just put you on the internet.
            <br />
            We optimize while you&apos;re there.
          </p>
        </div>
      </div>
    </section>
  );
}
