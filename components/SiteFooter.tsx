export function SiteFooter() {
  const socialLinks = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-black border-t border-white/10 px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p
            className="font-light tracking-[0.02em]"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3, color: "#ffffff" }}
          >
            Digital media marketing & solutions.
            <br />
            <span className="text-white">Miami-based.</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 mb-16">
          <a href="#work" className="obsidian-link">Work</a>
          <a href="#services" className="obsidian-link">Services</a>
          <a href="#packages" className="obsidian-link">Packages</a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-white/30 hover:text-amber/70 transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <p className="font-light" style={{ fontSize: 12, color: "#ffffff" }}>
              © 2026 Cenit Digital.
            </p>
            <a href="#packages" className="close-btn">
              Inquire →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
