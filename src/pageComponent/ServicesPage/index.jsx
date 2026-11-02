import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronUp,
  Target,
  Share2,
  Code,
  Bot,
  X,
} from "lucide-react";


// Service cards data
const serviceDetails = [
  {
    icon: Target,
    title: "Performance Marketing",
    desc: "Paid acquisition across Meta Ads (Facebook & Instagram), Google Search & Performance Max, and LinkedIn. Structured to improve CAC and scale qualified pipeline.",
    features: [
      "Campaign Strategy & Architecture",
      "In-House Ad Copy & Video Creative",
      "Audience & Creative A/B Testing",
      "Transparent ROAS & Pipeline Reporting",
    ],
    outcome: "Predictable customer acquisition and measurable revenue growth.",
  },
  {
    icon: Share2,
    title: "Social Media & Creative Direction",
    desc: "High-impact short-form video production and content designed to build brand authority, engage high-intent buyers, and fuel paid performance campaigns.",
    features: [
      "Content Strategy & Visual Direction",
      "Short-Form Video Production (Reels)",
      "Performance Ad Creative Direction",
      "Community Engagement & Positioning",
    ],
    outcome: "Stronger brand authority that actively supports paid campaign conversion.",
  },
  {
    icon: Code,
    title: "Web & Conversion Engineering",
    desc: "High-converting landing pages and modern web platforms built with Next.js and React. Engineered for fast mobile loading and conversion rate optimization (CRO).",
    features: [
      "High-Converting Landing Pages",
      "Next.js & React Web Development",
      "Conversion Rate Optimization (CRO)",
      "Technical SEO & Speed Optimization",
    ],
    outcome: "An ultra-fast digital foundation engineered to turn advertising traffic into conversions.",
  },
  {
    icon: Bot,
    title: "AI & Lead Automation",
    desc: "WhatsApp lead automation, automated CRM routing, and workflow triggers that ensure prompt follow-up for every inbound customer enquiry.",
    features: [
      "WhatsApp Business Lead Automation",
      "Automated CRM Routing & Instant Alerts",
      "Automated Lead Nurturing Workflows",
      "Lead Qualification & Scheduling Support",
    ],
    outcome: "Faster lead response times and streamlined customer qualification.",
  },
];

// Values for "Why Choose" section
const antiAgencyValues = [
  {
    title: "No Long-term Contracts",
    desc: "We earn your business every month. No handcuffs, just results.",
  },
  {
    title: "Transparent Reporting",
    desc: "Live dashboards you can check anytime. No hidden fees, no fuzzy math.",
  },
  {
    title: "Dedicated Account Manager",
    desc: "Direct access to the expert managing your growth, not a support ticket.",
  },
  {
    title: "Focus on Unit Economics",
    desc: "We evaluate campaigns against your customer acquisition cost (CAC), lifetime value (LTV), and real profit margins—not superficial platform metrics.",
  },
  {
    title: "Agile Methodology",
    desc: "We test fast, fail cheap, and scale what works immediately.",
  },
  {
    title: "Continuous Innovation",
    desc: "We stay ahead of the algorithm changes so you don't have to.",
  },
];

const ServicesPage = ({ onContactClick }) => {
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState(null);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [hasWhyChooseEntered, setHasWhyChooseEntered] = useState(false);
  const whyChooseRef = useRef(null);

  // Hero page-load entrance trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroAnimated(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Close active expanded service card on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedServiceIndex !== null) {
        setSelectedServiceIndex(null);
        setHoveredServiceIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedServiceIndex]);

  // Why Brands Choose Invictus entrance trigger
  useEffect(() => {
    const node = whyChooseRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasWhyChooseEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);





  return (
    <div className="min-h-screen">
      {/* SECTION 1 – Hero */}
      <section className="px-6 md:px-12 pt-32 pb-20 md:pb-24 max-w-[1600px] mx-auto">
        <p
          className={`font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse" />
          What We Do
        </p>

        <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight uppercase mb-8">
          <span
            className={`block text-[var(--text-primary)] transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Performance-Driven
          </span>{" "}
          <span
            className={`block text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600 transition-all duration-700 delay-300 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Growth Systems.
          </span>
        </h1>

        <p
          className={`font-body text-lg md:text-xl text-[var(--text-muted)] max-w-2xl transition-all duration-700 delay-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          We build full-funnel acquisition systems combining Meta & Google Ads, high-converting web experiences, and intelligent lead automations to scale your business.
        </p>
      </section>

      <section id="chatgpt-ads" aria-labelledby="chatgpt-service-title" className="font-body scroll-mt-28 px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 rounded-2xl border border-[#2AB182]/40 bg-gradient-to-br from-[#2AB182]/10 to-[var(--bg-card)] p-6 md:p-12">
          <div>
            <p className="mb-5 flex items-center gap-2 text-[#2AB182] text-xs font-bold uppercase tracking-[0.2em]"><span className="h-2 w-2 rounded-full bg-[#2AB182]" /> Emerging AI Search</p>
            <h2 id="chatgpt-service-title" className="font-display text-4xl md:text-5xl font-bold uppercase text-[var(--text-primary)] leading-tight">Conversational Search.<br /><span className="text-[#2AB182]">Be part of the discovery.</span></h2>
            <p className="font-body mt-6 text-lg text-[var(--text-muted)] leading-relaxed">Connect with potential customers as they research products, compare solutions, and explore buying decisions across conversational AI and modern search platforms.</p>
            <p className="font-body mt-4 text-[var(--text-secondary)] leading-relaxed">Strategic AI search optimization by Invictus. We help forward-thinking brands position their content, offers, and value propositions for the next generation of AI-assisted discovery.</p>
            <Link href="/contact" className="mt-8 inline-flex items-center justify-center gap-3 rounded-lg bg-[#2AB182] px-6 py-4 font-bold text-black hover:bg-[#35c795] cursor-pointer">Explore AI Search Strategy <ArrowRight size={20} className="shrink-0" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 content-center">
            {[
              { title: 'Strategy & launch', desc: 'Campaign planning, account setup support, and a launch approach built around your business goals.' },
              { title: 'Copy & creative', desc: 'Clear messaging and ad creative that connect your offer with customer intent.' },
              { title: 'Conversion experience', desc: 'Landing page recommendations and tracking setup to connect ad traffic with business outcomes.' },
              { title: 'Optimise & report', desc: 'Ongoing testing, budget reviews, and transparent performance reporting.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
            <p className="sm:col-span-2 text-xs leading-relaxed text-[var(--text-muted)]">Conversational discovery ecosystems are evolving rapidly. We monitor AI search developments and help brands optimize their digital footprint for emerging search channels.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 – Core Services (Horizontal Focus Carousel & Expanded View) */}
      <section id="services-details" className="border-t border-[var(--border-subtle)] bg-transparent relative z-10 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="mb-10 md:mb-14">
            <p className="font-body text-[#2AB182] mb-3 tracking-[0.2em] text-xs uppercase font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#2AB182] rounded-full animate-pulse" />
              Specialized Solutions
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--text-primary)] font-bold uppercase tracking-tight">
              CORE SERVICES
            </h2>
          </div>

          {/* Conditional Display: If a service is selected, show ONLY the Expanded Card. Otherwise show the Horizontal Carousel */}
          {selectedServiceIndex === null ? (
            /* DEFAULT VIEW: Horizontal Square Card Carousel with Hover Focus */
            <div
              onMouseLeave={() => setHoveredServiceIndex(null)}
              className="relative w-full"
            >
              {/* Cards Container: Horizontal row with smooth scroll/snap on mobile/tablet and centered grid on desktop */}
              <div className="flex flex-nowrap lg:grid lg:grid-cols-4 gap-5 lg:gap-6 overflow-x-auto no-scrollbar py-4 px-1 snap-x snap-mandatory">
                {serviceDetails.map((service, index) => {
                  const isHovered = hoveredServiceIndex === index;
                  const isAnyHovered = hoveredServiceIndex !== null;
                  const isDimmed = isAnyHovered && !isHovered;
                  const IconComponent = service.icon;

                  return (
                    <div
                      key={service.title}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${service.title} details`}
                      onMouseEnter={() => setHoveredServiceIndex(index)}
                      onClick={() => {
                        setSelectedServiceIndex(index);
                        setHoveredServiceIndex(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedServiceIndex(index);
                          setHoveredServiceIndex(null);
                        }
                      }}
                      style={{
                        filter: isDimmed ? "blur(7px)" : "blur(0px)",
                      }}
                      className={`group relative aspect-square w-[280px] sm:w-[300px] lg:w-full shrink-0 snap-center rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 ease-out border overflow-hidden ${
                        isHovered
                          ? "bg-[#161616] border-[#2AB182] shadow-[0_0_30px_rgba(42,177,130,0.25),0_20px_40px_rgba(0,0,0,0.8)] scale-[1.03] -translate-y-2 z-20 opacity-100"
                          : isDimmed
                          ? "bg-[#111111] border-white/[0.04] opacity-35 scale-[0.98] z-10"
                          : "bg-[#131313] border-white/[0.08] hover:border-[#2AB182]/50 opacity-100 scale-100 z-10"
                      }`}
                    >
                      {/* Top Row: Service Number and Icon */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded-full font-semibold border bg-[#2AB182]/10 text-[#2AB182] border-[#2AB182]/30">
                          0{index + 1}
                        </span>
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                            isHovered
                              ? "border-[#2AB182] bg-[#2AB182]/15 text-[#2AB182] shadow-[0_0_15px_rgba(42,177,130,0.3)]"
                              : "border-white/10 bg-white/[0.03] text-white/70 group-hover:text-[#2AB182] group-hover:border-[#2AB182]/40"
                          }`}
                        >
                          <IconComponent size={22} />
                        </div>
                      </div>

                      {/* Middle: Title & Brief Description */}
                      <div className="my-auto py-2">
                        <h3
                          className={`font-display text-base sm:text-lg lg:text-xl font-bold uppercase tracking-tight leading-tight line-clamp-2 mb-2 transition-colors ${
                            isHovered ? "text-white" : "text-[var(--text-primary)]"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="font-body text-xs text-[var(--text-muted)] line-clamp-2 sm:line-clamp-3 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>

                      {/* Bottom Row: Explore Prompt & Accent Bar */}
                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#2AB182] font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                          Explore Service
                          <ArrowRight size={13} />
                        </span>
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${
                            isHovered
                              ? "w-12 bg-[#2AB182] shadow-[0_0_8px_#2AB182]"
                              : "w-6 bg-[#2AB182]/30 group-hover:w-10 group-hover:bg-[#2AB182]"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile / Tablet Horizontal Scroll Hint */}
              <div className="flex items-center justify-center gap-2 mt-4 lg:hidden text-white/40 text-xs font-mono">
                <span>Swipe horizontally to view all services</span>
              </div>
            </div>
          ) : (
            /* CLICK VIEW: Standalone Expanded Service Description Card */
            /* Strictly ONLY the selected service card is rendered. No other cards in background! */
            <div className="w-full max-w-3xl mx-auto py-4 animate-fade-in-scale">
              {(() => {
                const service = serviceDetails[selectedServiceIndex];
                const IconComponent = service.icon;

                return (
                  <div
                    tabIndex={-1}
                    className="relative bg-[#131313] border border-[#2AB182]/60 rounded-3xl p-6 sm:p-9 md:p-11 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(42,177,130,0.2)] overflow-hidden"
                  >
                    {/* Corner Ambient Glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2AB182]/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Card Top: Number, Icon, and Close (X) Button */}
                    <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#2AB182]/10 border border-[#2AB182]/40 text-[#2AB182] flex items-center justify-center shadow-[0_0_15px_rgba(42,177,130,0.2)]">
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#2AB182]/10 border border-[#2AB182]/30 text-[#2AB182] text-xs font-mono font-semibold uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] animate-pulse" />
                            Service 0{selectedServiceIndex + 1}
                          </div>
                          <span className="text-white/40 text-xs font-mono block mt-0.5">
                            0{selectedServiceIndex + 1} / 0{serviceDetails.length}
                          </span>
                        </div>
                      </div>

                      {/* Close (X) Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedServiceIndex(null)}
                        aria-label="Close service details and return to carousel"
                        className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#2AB182] hover:bg-[#2AB182]/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer group shadow-lg"
                      >
                        <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                      </button>
                    </div>

                    {/* Title & Full Description */}
                    <div className="relative z-10 mb-8">
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-[var(--text-primary)] tracking-tight mb-3">
                        {service.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/10 mb-7 relative z-10" />

                    {/* Key Capabilities / Features */}
                    <div className="relative z-10 mb-8">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-[#2AB182] font-semibold mb-3.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182]" />
                        Key Capabilities & Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#2AB182]/30 transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2AB182] shrink-0" />
                            <span className="font-body text-xs sm:text-sm text-[var(--text-primary)] font-normal">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcome & Direct Action CTA */}
                    {service.outcome && (
                      <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2AB182]/10 via-[#2AB182]/5 to-transparent border border-[#2AB182]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#2AB182] font-bold block mb-1">
                            Measurable Business Outcome
                          </span>
                          <p className="font-body text-xs sm:text-sm text-white/90">
                            {service.outcome}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedServiceIndex(null)}
                            className="text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
                          >
                            Back to Grid
                          </button>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2AB182] text-black font-display font-bold uppercase text-xs tracking-wider hover:bg-[#35c795] transition-colors"
                          >
                            Partner With Us
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 – Why Choose Invictus / Why Brands Choose Invictus (Coordinated 6-Card Entrance & 3-Column Alternating Stagger) */}
      <section
        ref={whyChooseRef}
        id="why-choose-us"
        className="py-20 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto z-10"
      >
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2
            className={`font-display text-3xl md:text-5xl text-[var(--text-primary)] font-bold uppercase leading-tight mb-4 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              hasWhyChooseEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Why Brands Choose <span className="text-[#2AB182]">Invictus</span>
          </h2>
          <p
            className={`font-body text-base md:text-lg text-[var(--text-muted)] transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              hasWhyChooseEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            We built the agency we always wanted to hire. No fluff, no bloat, just a relentless focus on your bottom line.
          </p>
        </div>

        {/* 3-Column Responsive Grid with Alternating Vertical Offset and Subtle Floating Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-10">
          {antiAgencyValues.map((value, index) => {
            // Layout offsets on desktop:
            // Card 01: lg:translate-y-0 (unchanged)
            // Card 02: lg:translate-y-8 (unchanged)
            // Card 03: lg:translate-y-0 (unchanged)
            // Card 04: lg:translate-y-8 (unchanged)
            // Card 05: lg:translate-y-4 (moved slightly downward from original position)
            // Card 06: lg:translate-y-8 (unchanged)
            const getLayoutOffset = (idx) => {
              if (idx === 4) return "lg:translate-y-4";
              if (idx % 2 === 1) return "lg:translate-y-8";
              return "lg:translate-y-0";
            };

            const layoutOffsetClass = getLayoutOffset(index);
            // Subtle asynchronous floating delays so cards move independently and not in synchronization
            const floatDelays = ["0s", "1.2s", "2.4s", "3.6s", "1.8s", "3.0s"];

            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
                  hasWhyChooseEntered
                    ? `opacity-100 translate-y-0 ${layoutOffsetClass}`
                    : `opacity-0 translate-y-6 ${index === 4 ? "lg:translate-y-10" : index % 2 === 1 ? "lg:translate-y-14" : "lg:translate-y-6"}`
                }`}
              >
                {/* Independent Floating Animation Container */}
                <div
                  style={{ animationDelay: floatDelays[index] }}
                  className="animate-card-float motion-reduce:animate-none h-full"
                >
                  <div
                    className={`relative p-8 md:p-9 bg-[#141414] rounded-2xl overflow-hidden flex flex-col justify-between min-h-[250px] md:min-h-[270px] h-full
                      border transition-all duration-500
                      ${
                        hasWhyChooseEntered
                          ? "border-[#282828] hover:border-[#2AB182] hover:shadow-[0_12px_32px_rgba(42,177,130,0.14)]"
                          : "border-white/20 shadow-[0_0_24px_rgba(255,255,255,0.05)]"
                      }
                    `}
                  >

                    {/* Card Header with Sequential Number Tag */}
                    <div className="flex items-center justify-between relative z-10 mb-4">
                      <span className="font-mono text-xs md:text-sm tracking-widest uppercase px-3 py-1 rounded-full font-semibold border bg-[#2AB182]/10 text-[#2AB182] border-[#2AB182]/30">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Card Title & Description */}
                    <div className="relative z-10 my-auto py-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="font-body text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="py-16 md:py-32 text-center px-6 bg-transparent">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold mb-8 leading-tight">
            Ready to Build Your <span className="text-[#2AB182]">Growth System?</span>
          </h2>
          <p className="font-body text-[var(--text-muted)] text-xl mb-12">
            Let&apos;s talk about your goals and how we can help you achieve them. Explore our <Link href="/clients" className="text-[#2AB182] underline underline-offset-4 hover:text-[var(--text-primary)]">client case studies</Link> to see how these systems perform in practice.
          </p>
          <Link
            href="/contact"
            className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300 rounded-sm"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
