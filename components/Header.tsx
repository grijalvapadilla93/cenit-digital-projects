"use client";

import { useEffect, useState, useRef } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
];

export function Header() {
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Visible while hero is in view, disappears when hero scrolls out
        setVisible(entry.isIntersecting);
      },
      { threshold: [0, 0.3, 1] }
    );

    observer.observe(hero);
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
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-6 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <nav className="flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="font-light tracking-[0.08em] uppercase text-white/50 hover:text-white transition-colors duration-300"
            style={{ fontSize: 12, letterSpacing: "0.1em" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
