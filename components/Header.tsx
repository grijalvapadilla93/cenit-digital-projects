"use client";

import { useEffect, useState, useRef } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled
          ? "rgba(0, 0, 0, 0.85)"
          : "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(198, 167, 106, 0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 py-4">
        {/* Logo / brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-light tracking-[0.15em] uppercase text-white/90 hover:text-amber transition-colors duration-300"
          style={{ fontSize: 13, letterSpacing: "0.15em" }}
        >
          Cenit
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-light tracking-[0.1em] uppercase transition-all duration-300"
              style={{
                fontSize: 11,
                color: activeSection === link.href ? "#C6A76A" : "rgba(255,255,255,0.65)",
                letterSpacing: "0.12em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C6A76A")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  activeSection === link.href ? "#C6A76A" : "rgba(255,255,255,0.65)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
