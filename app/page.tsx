import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Transition } from "@/components/Transition";
import { Portfolio } from "@/components/Portfolio";
import LightBeams from "@/components/LightBeams";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Packages } from "@/components/Packages";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <section className="relative overflow-hidden bg-black">
        {/* Shared gradient background across WhoWeAre + Transition */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }}>
          <div
            className="absolute"
            style={{
              width: "80vw", height: "80vw", maxWidth: "800px", maxHeight: "800px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(140,180,255,0.4) 0%, transparent 60%)",
              filter: "blur(100px)", top: 0, left: "-20%",
              animation: "driftOrb1 12s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "60vw", height: "60vw", maxWidth: "600px", maxHeight: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,220,255,0.35) 0%, transparent 60%)",
              filter: "blur(80px)", bottom: "-10%", right: "-10%",
              animation: "driftOrb2 15s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "50vw", height: "50vw", maxWidth: "500px", maxHeight: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(80,140,255,0.3) 0%, transparent 60%)",
              filter: "blur(70px)",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "driftOrb3 18s ease-in-out infinite alternate",
            }}
          />
        </div>
        <WhoWeAre />
        <Transition />
      </section>

      {/* Decorative divider */}
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,40 Q360,0 720,40 Q1080,80 1440,40"
            fill="none"
            stroke="rgba(198,167,106,0.08)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <Portfolio />
      <div id="content-beams" className="relative bg-black">
        <LightBeams />
        <div className="relative z-[1]">
          <WhatWeDo />
          <Packages />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
