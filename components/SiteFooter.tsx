export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-white/10 px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#555555", marginBottom: 8 }}>
            No social media.
          </p>
          <p className="font-light tracking-[0.02em]" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3, color: "#888" }}>
            Digital media marketing & solutions.
            <br />
            <span className="text-gray-600">Miami-based.</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 mb-16">
          <a href="#work" className="obsidian-link">Work</a>
          <a href="#services" className="obsidian-link">Services</a>
          <a href="#packages" className="obsidian-link">Packages</a>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-light" style={{ fontSize: 12, color: "#555555" }}>
            © 2026 Cenit Digital.
          </p>
          <a href="#packages" className="close-btn">
            Inquire →
          </a>
        </div>
      </div>
    </footer>
  );
}
