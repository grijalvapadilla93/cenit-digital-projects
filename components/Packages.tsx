"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  needs: string[];
  budget: string;
  project: string;
  name: string;
  email: string;
  company: string;
  selectedTier?: string;
}

const tiers = [
  {
    name: "Starter",
    price: "from $1,500/mo",
    description: "For businesses ready to show up. Website + GBP + basic ads.",
    features: ["Website design & launch", "Google Business Profile", "Social media setup", "Monthly reporting"],
  },
  {
    name: "Growth",
    price: "from $3,000/mo",
    description: "Full presence + optimization. Everything Starter gets, plus automation.",
    features: ["Everything in Starter", "Local SEO & lead gen", "Automations + chatbots", "Ad campaigns (Meta + Google)", "Content creation"],
    popular: true,
  },
  {
    name: "Scale",
    price: "Custom",
    description: "End-to-end digital operations. We become your team.",
    features: ["Everything in Growth", "AI solutions & dashboards", "Dedicated account manager", "Priority support", "Quarterly strategy reviews"],
  },
];

const formSteps = [
  "What do you need?",
  "What's your budget?",
  "Tell us about your project",
  "Your info",
];

const needsOptions = [
  "Web Development",
  "Digital Marketing",
  "Google Business Profile",
  "SEO & Lead Gen",
  "Automations",
  "AI Solutions",
  "Social Media",
  "Full Package",
];

const budgetOptions = ["Under $2k", "$2k–$5k", "$5k–$10k", "$10k+"];

export function Packages() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    needs: [],
    budget: "",
    project: "",
    name: "",
    email: "",
    company: "",
  });
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const reveals = el.querySelectorAll<HTMLElement>(".scroll-reveal");
          reveals.forEach((r, i) => {
            setTimeout(() => r.classList.add("revealed"), i * 200);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const selectTier = (name: string) => {
    setSelectedTier(name);
    setFormData((prev) => ({ ...prev, selectedTier: name }));
  };

  const startForm = () => {
    setShowForm(true);
    setStep(0);
    // Smooth scroll to form after state update
    setTimeout(() => {
      document.getElementById("packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section id="packages" ref={containerRef} className="relative px-6 md:px-16 py-24 md:py-32" style={{ position: "relative" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 scroll-reveal">
          <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#ffffff", marginBottom: 16 }}>
            Packages
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showForm ? (
            // === PACKAGES VIEW ===
            <motion.div
              key="packages"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {tiers.map((tier) => {
                  const isSelected = selectedTier === tier.name;
                  return (
                    <div
                      key={tier.name}
                      className={`relative border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-white/40"
                          : tier.popular
                          ? "border-white/30 hover:border-white/40"
                          : "border-white/10 hover:border-white/25"
                      } p-8`}
                      onClick={() => selectTier(tier.name)}
                    >
                      {tier.popular && (
                        <p className="font-light uppercase tracking-[0.15em] mb-4" style={{ fontSize: 10, color: "#ffffff" }}>
                          Most popular
                        </p>
                      )}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 border border-white/40 flex items-center justify-center">
                          <span className="text-white text-xs">●</span>
                        </div>
                      )}
                      <h3 className="font-light text-white tracking-[0.03em] mb-2" style={{ fontSize: 24 }}>
                        {tier.name}
                      </h3>
                      <p className="font-light text-white mb-6" style={{ fontSize: 14 }}>
                        {tier.price}
                      </p>
                      <p className="font-light text-white leading-relaxed mb-6" style={{ fontSize: 14, lineHeight: 1.6 }}>
                        {tier.description}
                      </p>
                      <div className="line-divider mb-6" />
                      <ul className="space-y-2">
                        {tier.features.map((f) => (
                          <li key={f} className="font-light text-white" style={{ fontSize: 14 }}>
                            — {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-20">
                <button
                  onClick={startForm}
                  className="font-light tracking-[0.05em] text-white border border-white/20 px-8 py-4 hover:border-white/60 transition-colors duration-300"
                  style={{ fontSize: 14, background: "transparent" }}
                >
                  I want to work with you
                </button>
              </div>
            </motion.div>
          ) : submitted ? (
            // === SUBMITTED VIEW ===
            <motion.div
              key="submitted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 border border-white/30 flex items-center justify-center mx-auto mb-8">
                <span className="text-white text-2xl">✓</span>
              </div>
              <p className="font-light text-white tracking-[0.02em] mb-2" style={{ fontSize: 28 }}>
                We&apos;ve got it.
              </p>
              <p className="font-light text-white" style={{ fontSize: 14 }}>
                We&apos;ll reach out within 24 hours.
              </p>
            </motion.div>
          ) : (
            // === FORM VIEW ===
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Package reminder */}
              <div className="mb-12">
                <p className="font-light uppercase tracking-[0.1em]" style={{ fontSize: 11, color: "#ffffff", marginBottom: 4 }}>
                  Selected package
                </p>
                <p className="font-playfair text-white" style={{ fontSize: 24 }}>
                  {selectedTier}
                </p>
              </div>

              {/* Step indicators */}
              <div className="flex gap-2 mb-12">
                {formSteps.map((_, i) => (
                  <div key={i} className={`h-px flex-1 transition-colors duration-300 ${i <= step ? "bg-white/40" : "bg-white/10"}`} />
                ))}
              </div>

              {/* Step title */}
              <p className="font-light text-white uppercase tracking-[0.1em] mb-8" style={{ fontSize: 11 }}>
                {formSteps[step]}
              </p>

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                  {step === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {needsOptions.map((need) => (
                        <button
                          key={need}
                          onClick={() => setFormData((prev) => ({ ...prev, needs: prev.needs.includes(need) ? prev.needs.filter((n) => n !== need) : [...prev.needs, need] }))}
                          className={`font-light text-left px-4 py-3 transition-colors duration-200 ${formData.needs.includes(need) ? "border-white/30 text-white" : "border-white/10 text-white hover:text-white/80"}`}
                          style={{ fontSize: 14, border: "1px solid" }}
                        >
                          {formData.needs.includes(need) ? "·" : "·"} {need}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-4">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          onClick={() => setFormData((prev) => ({ ...prev, budget: b }))}
                          className={`font-light w-full text-left px-4 py-3 transition-colors duration-200 ${formData.budget === b ? "border-white/30 text-white" : "border-white/10 text-white hover:text-white/80"}`}
                          style={{ fontSize: 14, border: "1px solid" }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <textarea
                      value={formData.project}
                      onChange={(e) => setFormData((prev) => ({ ...prev, project: e.target.value }))}
                      placeholder="Tell us about your business, your goals, your timeline..."
                      className="font-light w-full bg-transparent text-white resize-none focus:outline-none"
                      style={{ fontSize: 16, lineHeight: 1.7, minHeight: 160, borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 12 }}
                    />
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <label className="font-light text-white block mb-2" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          Name
                        </label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="font-light w-full bg-transparent text-white focus:outline-none" style={{ fontSize: 16, borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 8 }} placeholder="John Smith" />
                      </div>
                      <div>
                        <label className="font-light text-white block mb-2" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          Email
                        </label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} className="font-light w-full bg-transparent text-white focus:outline-none" style={{ fontSize: 16, borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 8 }} placeholder="john@company.com" />
                      </div>
                      <div>
                        <label className="font-light text-white block mb-2" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          Company <span className="text-white">(optional)</span>
                        </label>
                        <input type="text" value={formData.company} onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))} className="font-light w-full bg-transparent text-white focus:outline-none" style={{ fontSize: 16, borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 8 }} placeholder="Your company" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12">
                <button onClick={() => setShowForm(false)} className="close-btn">
                  ← back to packages
                </button>
                <div className="flex gap-3">
                  {step < 3 ? (
                    <button onClick={() => setStep((s) => s + 1)} className="font-light text-white border border-white/30 hover:border-white/60 transition-colors px-8 py-3" style={{ fontSize: 13, letterSpacing: "0.05em", background: "transparent" }}>
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="font-light text-white border border-white/30 hover:border-white/60 transition-colors px-8 py-3"
                      style={{ fontSize: 13, letterSpacing: "0.05em", background: "transparent" }}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
