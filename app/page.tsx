import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
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
      <Transition />
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
