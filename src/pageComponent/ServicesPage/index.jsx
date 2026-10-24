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
    desc: "Data-driven campaigns that maximize ROI across Meta, Google, and LinkedIn.",
    features: [
      "Campaign Strategy & Setup",
      "Ad Creative Production",
      "A/B Testing & Optimization",
      "Detailed Analytics & Reporting",
    ],
    outcome: "Predictable lead generation and sales growth.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Building brand authority and community through engaging content and strategic management.",
    features: [
      "Content Calendar & Strategy",
      "Community Management",
      "Influencer Collaboration",
      "Trend Analysis",
    ],
    outcome: "Increased brand awareness and customer loyalty.",
  },
  {
    icon: Code,
    title: "Web & App Development",
    desc: "Creating high-performance, scalable, and user-centric digital experiences.",
    features: [
      "Custom Website Design",
      "E-commerce Development",
      "Mobile App Development",
      "SEO Optimization",
    ],
    outcome: "A robust digital presence that converts visitors into customers.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    desc: "Streamlining operations and enhancing customer experiences with cutting‑edge AI solutions.",
    features: [
      "Chatbot Implementation",
      "Workflow Automation",
      "CRM Integration",
      "Data Analysis",
    ],
    outcome: "Improved efficiency and reduced operational costs.",
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
    title: "Focus on ROI",
    desc: "We focus on unit economics and bottom-line revenue rather than vanity metrics.",
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
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [hasWhyChooseEntered, setHasWhyChooseEntered] = useState(false);
  const [hasCoreServicesEntered, setHasCoreServicesEntered] = useState(false);
  const whyChooseRef = useRef(null);
  const coreServicesRef = useRef(null);
  const serviceCardRefs = useRef([]);

  const toggleService = (index) => {
    setActiveServiceIndex(activeServiceIndex === index ? null : index);
  };

  // Hero page-load entrance trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroAnimated(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Automatic scroll-triggered active service card reveal
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight || 800;
          // Target focal line in the comfortable eye-level reading zone (upper-middle viewport)
          const focalY = viewportHeight * 0.44;

          if (coreServicesRef.current) {
            const sectionRect = coreServicesRef.current.getBoundingClientRect();
            // If Core Services section is completely above or below the active focal zone:
            if (sectionRect.bottom < focalY - 80 || sectionRect.top > focalY + 80) {
              setActiveServiceIndex((prev) => (prev === null ? prev : null));
              ticking = false;
              return;
            }
          }

          let closestIndex = null;
          let minDistance = Infinity;

          serviceCardRefs.current.forEach((el, index) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(cardCenter - focalY);

            // Card must be within active viewport range
            const inRange = rect.top <= focalY + 140 && rect.bottom >= focalY - 140;
            if (inRange && distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          setActiveServiceIndex((prev) => (prev === closestIndex ? prev : closestIndex));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Scroll-entry trigger for Core Services section
  useEffect(() => {
    const node = coreServicesRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasCoreServicesEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Close active service card on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeServiceIndex !== null) {
        setActiveServiceIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeServiceIndex]);

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
          </span>
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
          We build scalable, performance-driven growth systems powered by ads, data, and AI.
        </p>
      </section>

      <section id="chatgpt-ads" aria-labelledby="chatgpt-service-title" className="font-body scroll-mt-28 px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 rounded-2xl border border-[#2AB182]/40 bg-gradient-to-br from-[#2AB182]/10 to-[var(--bg-card)] p-6 md:p-12">
          <div>
            <p className="mb-5 flex items-center gap-2 text-[#2AB182] text-xs font-bold uppercase tracking-[0.2em]"><span className="h-2 w-2 rounded-full bg-[#2AB182]" /> Now live in India</p>
            <h2 id="chatgpt-service-title" className="font-display text-4xl md:text-5xl font-bold uppercase text-[var(--text-primary)] leading-tight">ChatGPT Ads.<br /><span className="text-[#2AB182]">Be part of the discovery.</span></h2>
            <p className="font-body mt-6 text-lg text-[var(--text-muted)] leading-relaxed">Connect with potential customers as they research products, compare options, and explore their next purchase in ChatGPT.</p>
            <p className="font-body mt-4 text-[var(--text-secondary)] leading-relaxed">Specialist ChatGPT Ads management by Invictus. We bring campaign strategy, creative execution, and a focus on measurable growth to this new advertising channel.</p>
            <button onClick={onContactClick} className="mt-8 inline-flex items-center justify-center gap-3 rounded-lg bg-[#2AB182] px-6 py-4 font-bold text-black hover:bg-[#35c795] cursor-pointer">Plan Your ChatGPT Ads Campaign <ArrowRight size={20} className="shrink-0" /></button>
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
            <p className="sm:col-span-2 text-xs leading-relaxed text-[var(--text-muted)]">ChatGPT ads are labelled paid placements, separate from its answers. Advertising does not influence ChatGPT responses. <a href="https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#2AB182]">Read the launch announcement</a>.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 – Core Services (Vertical List with Right-Side Description Panels) */}
      <section id="services-details" className="border-t border-[var(--border-subtle)] bg-transparent relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Section Header: Minimal, no unrequested instruction paragraph */}
          <div className="mb-10 md:mb-14">
            <p className="font-body text-[#2AB182] mb-3 tracking-[0.2em] text-xs uppercase font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#2AB182] rounded-full animate-pulse" />
              Specialized Solutions
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--text-primary)] font-bold uppercase tracking-tight">
              CORE SERVICES
            </h2>
          </div>

          {/* Vertical Square Service Cards List with Paired Equal-Sized Square Description Panel */}
          <div
            ref={coreServicesRef}
            className="flex flex-col gap-6 sm:gap-7 relative w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[360px]"
          >
            {serviceDetails.map((service, index) => {
              const isActive = activeServiceIndex === index;
              const IconComponent = service.icon;

              return (
                <div
                  key={service.title}
                  style={{
                    transitionDelay: hasCoreServicesEntered ? `${index * 80}ms` : "0ms",
                  }}
                  className={`relative w-full lg:aspect-square flex flex-col transition-all duration-500 ease-out ${
                    hasCoreServicesEntered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {/* Left Service Card: Equal Square (z-20 so description emerges from behind it) */}
                  <div
                    ref={(el) => (serviceCardRefs.current[index] = el)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-label={service.title}
                    onClick={() => setActiveServiceIndex(isActive ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveServiceIndex(isActive ? null : index);
                      }
                    }}
                    className={`relative z-20 w-full aspect-square rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 border group ${
                      isActive
                        ? "border-[#2AB182] bg-[#161616] shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_22px_rgba(42,177,130,0.25)]"
                        : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[#2AB182] hover:shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_18px_rgba(42,177,130,0.18)]"
                    }`}
                  >
                    {/* Top: Service Icon */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          isActive
                            ? "border-[#2AB182] bg-[#2AB182]/10 text-[#2AB182] shadow-[0_0_12px_rgba(42,177,130,0.25)]"
                            : "border-[#2AB182]/30 bg-[var(--bg-primary)] text-[#2AB182] group-hover:border-[#2AB182]"
                        }`}
                      >
                        <IconComponent size={24} />
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#2AB182] animate-pulse" />
                      )}
                    </div>

                    {/* Middle: Title & Brief Description */}
                    <div className="my-auto py-2">
                      <h3
                        className={`font-display text-xl sm:text-2xl font-bold uppercase tracking-tight transition-colors leading-tight mb-2 ${
                          isActive ? "text-white" : "text-[var(--text-primary)] group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                        {service.desc}
                      </p>
                    </div>

                    {/* Bottom: Subtle Emerald Accent Line */}
                    <div className="pt-2 border-t border-[var(--border-subtle)]/60 flex items-center justify-between">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-12 bg-[#2AB182]"
                            : "w-8 bg-[#2AB182]/40 group-hover:bg-[#2AB182] group-hover:w-12"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Right Description Panel: Equal Square, Positioned Immediately Beside (Desktop) or Directly Below (Mobile/Tablet) */}
                  {isActive && (
                    <div
                      key={`desc-${service.title}`}
                      className="relative z-10 mt-4 lg:mt-0 lg:absolute lg:left-[calc(100%+20px)] lg:top-0 w-full lg:h-full aspect-square animate-panel-slide"
                    >
                      <div className="w-full h-full aspect-square rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(42,177,130,0.18)] flex flex-col justify-between overflow-hidden">
                        {/* Top: Service Title and small close icon */}
                        <div className="shrink-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182]" />
                              <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-tight">
                                {service.title}
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveServiceIndex(null);
                              }}
                              aria-label="Close"
                              className="w-7 h-7 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-white hover:border-[#2AB182] flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          {/* Description */}
                          <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                            {service.desc}
                          </p>
                        </div>

                        {/* Middle: Features list */}
                        <div className="my-auto py-2 overflow-y-auto custom-scrollbar">
                          <ul className="space-y-1.5">
                            {service.features.map((feat) => (
                              <li
                                key={feat}
                                className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-body"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] shrink-0" />
                                <span className="leading-tight">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bottom: Outcome / Benefit */}
                        {service.outcome && (
                          <div className="pt-2.5 border-t border-[var(--border-subtle)]/70 shrink-0">
                            <p className="font-body text-xs text-[var(--text-muted)] leading-tight">
                              <span className="text-[#2AB182] font-mono uppercase font-semibold text-[10px] tracking-wider block mb-0.5">
                                Outcome
                              </span>
                              {service.outcome}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
                    {/* Watermark Number */}
                    <div className="absolute bottom-3 right-5 text-[100px] md:text-[120px] font-display font-black text-white/[0.04] leading-none pointer-events-none select-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>

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
            Let&apos;s talk about your goals and how we can help you achieve them.
          </p>
          <button
            onClick={onContactClick}
            className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
