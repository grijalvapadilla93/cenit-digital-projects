"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    slug: "meridian-construction",
    name: "Meridian Construction Group",
    tag: "High-end residential & commercial",
    who: "Midtown Miami general contractor with 15 years in the market. They do high-end remodels, commercial buildouts, and luxury condo renovations in Brickell and South Beach.",
    what: [
      "Website full redesign & launch",
      "Google Business Profile optimization",
      "Local SEO strategy",
      "Ad campaigns (Google + Meta)",
      "Review generation system",
      "Photo content for portfolio",
    ],
    stats: [
      { label: "Qualified leads", value: "+180%" },
      { label: "Local pack ranking", value: "Top 3" },
      { label: "Growth", value: "47 reviews in 4 months" },
    ],
    link: "meridianmiamiconstruction.com",
  },
  {
    slug: "nexus-advisory",
    name: "Nexus Advisory Partners",
    tag: "Family office consulting",
    who: "Boutique consulting firm in Downtown Miami advising high-net-worth families and expanding businesses into LATAM. Small team, large clients.",
    what: [
      "Website from scratch (premium positioning)",
      "Content strategy",
      "LinkedIn optimization",
      "Lead generation funnel",
      "Monthly performance reporting",
    ],
    stats: [
      { label: "Enterprise leads", value: "12 in month one" },
      { label: "Bounce rate", value: "68% → 23%" },
      { label: "Avg session", value: "4:12 min" },
    ],
    link: "nexusadvisorymiami.com",
  },
  {
    slug: "crystal-surface",
    name: "Crystal Surface Co.",
    tag: "Premium home maintenance",
    who: "Exterior cleaning service for luxury residences in Coral Gables, Star Island, and Fisher Island. Working on $5M-$30M properties. Ultra-exclusive market.",
    what: [
      "Website redesign + launch",
      "Social media management (Instagram)",
      "GBP optimization",
      "Automation: WhatsApp booking + calendar",
      "Lead dashboard by zone",
    ],
    stats: [
      { label: "Booking requests via web", value: "+95%" },
      { label: "Revenue attributed", value: "Q12K/mo" },
      { label: "New elite contracts", value: "3" },
    ],
    link: "crystalsurfaceco.com",
  },
  {
    slug: "casa-alba",
    name: "Casa Alba",
    tag: "Mediterranean coastal cuisine",
    who: "Mediterranean restaurant in Wynwood with outdoor terrace, chef imported from Barcelona. Seafood, natural wines, artisan cocktails. Target: 25-45, young professional.",
    what: [
      "Website from scratch",
      "Monthly food photography content creation",
      "Social media management",
      "Ad campaigns (Instagram + Google)",
      "Reservation chatbot",
      "QR menu system",
    ],
    stats: [
      { label: "Website reservations", value: "+340%" },
      { label: "Instagram", value: "800 → 12K (3 mo)" },
      { label: "Availability", value: "Sold out Fri-Sat" },
    ],
    link: "casaalbamiami.com",
  },
];

function ExpandCard({ project, onClose }: { project: typeof projects[number]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // Reveal items on mount with stagger
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".reveal-item");
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add("revealed"), 200 + i * 200);
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="py-16 max-w-3xl mx-auto px-0 md:px-8">
        <div className="flex justify-between items-start mb-8">
          <h3 className="font-light text-white tracking-[0.02em]" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
            {project.name}
          </h3>
          <button onClick={onClose} className="close-btn group">
            <span className="transition-all duration-300 group-hover:text-amber">close</span>
          </button>
        </div>
        <div className="line-divider mb-12" />

        <div className="reveal-item scroll-reveal mb-12">
          <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#ffffff", marginBottom: 12 }}>
            Who They Are
          </p>
          <p className="font-light text-white leading-relaxed" style={{ fontSize: 16, lineHeight: 1.7 }}>
            {project.who}
          </p>
        </div>

        <div className="reveal-item scroll-reveal mb-12">
          <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#ffffff", marginBottom: 12 }}>
            What We Did
          </p>
          {project.what.map((item) => (
            <p key={item} className="font-light text-white" style={{ fontSize: 15 }}>— {item}</p>
          ))}
        </div>

        <div className="reveal-item scroll-reveal mb-12">
          <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#ffffff", marginBottom: 16 }}>
            The Result
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-light text-white" style={{ fontSize: "clamp(20px, 3vw, 36px)", lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p className="font-light text-white mt-1" style={{ fontSize: 13 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <a
          href={`https://${project.link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-light text-white hover:text-white/80 transition-colors tracking-[0.06em]"
          style={{ fontSize: "clamp(16px, 2vw, 22px)" }}
        >
          {project.link} →
        </a>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray<HTMLElement>(".project-number");
      numbers.forEach((el, i) => {
        const sibling = el.nextElementSibling as HTMLElement;
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", end: "top 60%", scrub: false },
        });
        if (sibling) {
          gsap.fromTo(sibling, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", end: "top 60%", scrub: false },
            delay: i * 0.1,
          });
        }
      });

      const images = sectionRef.current?.querySelectorAll<HTMLElement>(".portfolio-img");
      images?.forEach((img) => {
        gsap.to(img, {
          y: -40, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-black px-6 md:px-16">
      {projects.map((project, i) => (
        <div key={project.slug}>
          <div className="relative w-full overflow-hidden cursor-pointer group"
            style={{ height: "50vh", marginTop: 60, transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            onClick={() => setExpandedId(expandedId === project.slug ? null : project.slug)}
          >
            <div className="portfolio-img w-full h-full flex-shrink-0" style={{ willChange: "transform", transition: "opacity 0.5s ease" }}>
              <img src="/Showcase-image.png" alt={project.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center px-6 md:px-16 pointer-events-none">
              <div className="project-number opacity-0" style={{ marginRight: 24, flexShrink: 0 }}>
                <span className="font-light" style={{ fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 1, color: "rgba(255,255,255,0.3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="project-info opacity-0">
                <p className="font-light tracking-[0.1em] uppercase transition-colors duration-500 group-hover:text-amber" style={{ fontSize: 10, color: "#ffffff", marginBottom: 8 }}>
                  {project.tag}
                </p>
                <h2 className="font-light text-white tracking-[0.02em] transition-all duration-500 group-hover:tracking-[0.04em]" style={{ fontSize: "clamp(24px, 3.5vw, 48px)", lineHeight: 1.1 }}>
                  {project.name}
                </h2>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
              <span className="font-light tracking-[0.08em] text-amber/70" style={{ fontSize: 11, textTransform: "uppercase" }}>
                Open ↓
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {expandedId === project.slug && (
              <ExpandCard project={project} onClose={() => setExpandedId(null)} />
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
}
