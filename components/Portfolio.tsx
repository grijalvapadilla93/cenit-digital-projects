"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    slug: "meridian-construction",
    name: "Meridian Construction Group",
    tag: "High-end residential & commercial",
    previewUrl: "https://al-carbon.vercel.app/",
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
    previewUrl: "https://nexusadvisorymiami.com",
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
    previewUrl: "https://crystalsurfaceco.com",
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
    previewUrl: "https://casaalbamiami.com",
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

function BrowserFrame({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    setLoaded(true);
  };

  const handleIframeError = () => {
    setError(true);
    setLoaded(true);
  };

  return (
    <div className="w-full border border-white/[0.08] overflow-hidden bg-white/[0.02]">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-black">
        {/* Traffic light dots */}
        <div className="flex items-center gap-[5px] flex-shrink-0">
          <div className="w-[10px] h-[10px] rounded-full bg-red-500/40" />
          <div className="w-[10px] h-[10px] rounded-full bg-yellow-500/40" />
          <div className="w-[10px] h-[10px] rounded-full bg-green-500/40" />
        </div>
        {/* URL bar */}
        <div className="flex-1 mx-2">
          <div className="text-center text-[10px] font-light tracking-[0.05em] text-white/40 truncate px-3 py-1 bg-white/[0.03] max-w-fit mx-auto">
            {url.replace(/^https?:\/\//, "")}
          </div>
        </div>
        {/* Spacer for balance */}
        <div className="w-[46px] flex-shrink-0" />
      </div>

      {/* Iframe container */}
      <div className="relative w-full" style={{ height: "clamp(300px, 55vh, 600px)" }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={url}
          className={`w-full h-full border-0 transition-opacity duration-500 ${loaded && !error ? "opacity-100" : "opacity-0"}`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Website preview"
          loading="eager"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <p className="text-white/40 font-light text-sm tracking-[0.05em]">
              Preview not available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectInfo({ project }: { project: typeof projects[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mt-12 md:mt-16 max-w-2xl">
        <div className="mb-10">
          <p
            className="font-light uppercase tracking-[0.1em] text-white/50 mb-3"
            style={{ fontSize: 11 }}
          >
            Who They Are
          </p>
          <p
            className="font-light text-white/80 leading-relaxed"
            style={{ fontSize: 16, lineHeight: 1.7 }}
          >
            {project.who}
          </p>
        </div>

        <div className="mb-10">
          <p
            className="font-light uppercase tracking-[0.1em] text-white/50 mb-4"
            style={{ fontSize: 11 }}
          >
            What We Did
          </p>
          <div className="space-y-2">
            {project.what.map((item) => (
              <p key={item} className="font-light text-white/70" style={{ fontSize: 15 }}>
                — {item}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p
            className="font-light uppercase tracking-[0.1em] text-white/50 mb-4"
            style={{ fontSize: 11 }}
          >
            The Result
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-light text-white"
                  style={{ fontSize: "clamp(20px, 3vw, 36px)", lineHeight: 1 }}
                >
                  {stat.value}
                </p>
                <p className="font-light text-white/50 mt-1" style={{ fontSize: 13 }}>
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
          className="inline-block font-light text-white/70 hover:text-white transition-colors tracking-[0.06em]"
          style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
        >
          {project.link} →
        </a>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const activeProject = projects[activeIndex];

  const handleSelect = useCallback((i: number) => {
    setActiveIndex(i);
    setIframeKey((k) => k + 1); // force iframe remount so it reloads
  }, []);

  // GSAP scroll animations for the sidebar
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sidebarRef.current?.querySelectorAll<HTMLElement>(".sidebar-item");
      items?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 65%",
              scrub: false,
            },
            delay: i * 0.1,
          }
        );
      });
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-black px-6 md:px-16 py-24 md:py-32"
    >
      <div className="mx-auto" style={{ maxWidth: 1400 }}>
        <div className="flex flex-col md:flex-row md:gap-16 lg:gap-20">
          {/* ─── Right (desktop) / Top (mobile): project list sidebar ─── */}
          <div
            ref={sidebarRef}
            className="w-full md:w-[340px] lg:w-[400px] flex-shrink-0 md:order-2"
          >
            <div className="flex md:flex-col gap-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-6 md:mx-0 px-6 md:px-0 scroll-smooth snap-x snap-mandatory">
              {projects.map((project, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={project.slug}
                    onClick={() => handleSelect(i)}
                    className={`sidebar-item flex-shrink-0 text-left w-[260px] md:w-full py-6 md:py-8 border-b border-white/[0.06] transition-all duration-500 group snap-start ${
                      isActive
                        ? "md:border-l md:border-l-white/20 md:pl-6"
                        : "md:opacity-20 md:hover:opacity-40 md:pl-8"
                    }`}
                  >
                    <div className="flex items-start gap-5 md:gap-6">
                      <span
                        className="font-light select-none flex-shrink-0"
                        style={{
                          fontSize: "clamp(32px, 5vw, 56px)",
                          lineHeight: 0.85,
                          color: isActive
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.08)",
                          transition: "color 0.5s ease",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 pt-1 md:pt-2">
                        <p
                          className={`font-light tracking-[0.1em] uppercase mb-2 transition-colors duration-500 ${
                            isActive ? "text-white" : "text-white/30"
                          }`}
                          style={{ fontSize: 10 }}
                        >
                          {project.tag}
                        </p>
                        <h3
                          className={`font-light tracking-[0.02em] transition-all duration-500 ${
                            isActive ? "text-white" : "text-white/40"
                          }`}
                          style={{ fontSize: "clamp(18px, 2.5vw, 28px)", lineHeight: 1.15 }}
                        >
                          {project.name}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Left (desktop) / Bottom (mobile): preview + info ─── */}
          <div className="flex-1 min-w-0 md:order-1 mt-8 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Browser mockup with iframe */}
                <BrowserFrame
                  key={`iframe-${iframeKey}`}
                  url={activeProject.previewUrl}
                />

                {/* Project info */}
                <ProjectInfo project={activeProject} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
