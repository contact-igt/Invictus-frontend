import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import CountUp from 'react-countup';
import { useRouter } from 'next/router';

const processStepsData = [
  {
    id: "01.",
    title: "Discovery",
    items: [
      "Market & Competitor Research",
      "Complete Funnel & Sales Process Audit",
      "Requirement Mapping With Founders",
      "Deep-Dive Discovery Call",
      "Feasibility & Unit Economics Study",
      "Lead Quality Gap Analysis",
      "Tracking + CRM Audit",
    ],
  },
  {
    id: "02.",
    title: "Strategy",
    items: [
      "Performance Blueprint Creation",
      "Offer & Funnel Engineering",
      "Audience + Buyer Persona Mapping",
      "Platform & Budget Allocation",
      "AI-Driven Tech Stack Selection",
      "Landing Page & Creative Strategy",
      "Roadmap + KPI Planning",
    ],
  },
  {
    id: "03.",
    title: "Execution",
    items: [
      "High-Intent Performance Campaigns",
      "Full Tracking Setup (Pixels, Events)",
      "CRM + Automation Integration",
      "WhatsApp/Email Nurturing Flows",
      "Creative Production (Reels, Ads)",
      "Continuous Testing",
      "Weekly Data Review",
    ],
  },
  {
    id: "04.",
    title: "Growth",
    items: [
      "Scaling Framework: Budget, Audience",
      "Sales Process Optimization",
      "Weekly Reporting & Insights",
      "Automated Lead Qualification",
      "Retargeting + Funnel Expansion",
      "Long-Term Growth Strategy",
      "Dedicated Support",
    ],
  },
];

const coreCapabilitiesData = [
  {
    number: "01",
    title: "Performance Marketing",
  },
  {
    number: "02",
    title: "Social Media Management",
  },
  {
    number: "03",
    title: "Web & App Development",
  },
  {
    number: "04",
    title: "AI & Automation",
  },
];

const getCarouselFloatIndex = (p) => {
  const clampedP = Math.max(0, Math.min(1, p));
  if (clampedP <= 0.12) return 0;
  if (clampedP < 0.28) {
    const t = (clampedP - 0.12) / (0.28 - 0.12);
    return t * t * (3 - 2 * t);
  }
  if (clampedP <= 0.40) return 1;
  if (clampedP < 0.56) {
    const t = (clampedP - 0.40) / (0.56 - 0.40);
    return 1 + t * t * (3 - 2 * t);
  }
  if (clampedP <= 0.68) return 2;
  if (clampedP < 0.84) {
    const t = (clampedP - 0.68) / (0.84 - 0.68);
    return 2 + t * t * (3 - 2 * t);
  }
  return 3;
};

const industriesData = [
  { id: "01", name: "HEALTHCARE" },
  { id: "02", name: "EDTECH" },
  { id: "03", name: "E-COMMERCE" },
  { id: "04", name: "AUTOMOBILE" },
];

const getIndustryCardTransform = (index, p) => {
  let translateYPercent = 0;
  let opacity = 1;
  let scale = 1;
  const topOffset = index * 24;

  if (index === 0) {
    if (p <= 0.15) {
      scale = 1;
    } else if (p < 0.40) {
      const t = (p - 0.15) / 0.25;
      scale = 1 - t * 0.04;
    } else if (p < 0.65) {
      const t = (p - 0.40) / 0.25;
      scale = 0.96 - t * 0.04;
    } else {
      const t = Math.min(1, Math.max(0, (p - 0.65) / 0.25));
      scale = 0.92 - t * 0.04;
    }
    opacity = 1;
  } else if (index === 1) {
    if (p < 0.15) {
      translateYPercent = 350;
      opacity = 0;
      scale = 1;
    } else if (p <= 0.40) {
      const t = (p - 0.15) / 0.25;
      const smoothT = t * t * (3 - 2 * t);
      translateYPercent = (1 - smoothT) * 350;
      opacity = 1;
      scale = 1;
    } else if (p < 0.65) {
      const t = (p - 0.40) / 0.25;
      translateYPercent = 0;
      scale = 1 - t * 0.04;
      opacity = 1;
    } else {
      const t = Math.min(1, Math.max(0, (p - 0.65) / 0.25));
      translateYPercent = 0;
      scale = 0.96 - t * 0.04;
      opacity = 1;
    }
  } else if (index === 2) {
    if (p < 0.40) {
      translateYPercent = 350;
      opacity = 0;
      scale = 1;
    } else if (p <= 0.65) {
      const t = (p - 0.40) / 0.25;
      const smoothT = t * t * (3 - 2 * t);
      translateYPercent = (1 - smoothT) * 350;
      opacity = 1;
      scale = 1;
    } else {
      const t = Math.min(1, Math.max(0, (p - 0.65) / 0.25));
      translateYPercent = 0;
      scale = 1 - t * 0.04;
      opacity = 1;
    }
  } else if (index === 3) {
    if (p < 0.65) {
      translateYPercent = 350;
      opacity = 0;
      scale = 1;
    } else if (p <= 0.90) {
      const t = (p - 0.65) / 0.25;
      const smoothT = t * t * (3 - 2 * t);
      translateYPercent = (1 - smoothT) * 350;
      opacity = 1;
      scale = 1;
    } else {
      translateYPercent = 0;
      opacity = 1;
      scale = 1;
    }
  }

  return { translateYPercent, opacity, scale, topOffset };
};

const HomePage = ({ activeStep, setActiveStep, stepRefs, activeFaq, toggleFaq }) => {
  const router = useRouter();
  const processSteps = processStepsData;

  const philosophyRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const industriesRef = useRef(null);
  const processRef = useRef(null);
  const trackRef = useRef(null);

  const [heroScrolled, setHeroScrolled] = useState(false);
  const [philosophyStage, setPhilosophyStage] = useState(1);
  const [capabilitiesProgress, setCapabilitiesProgress] = useState(0);
  const [industriesProgress, setIndustriesProgress] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [cardPitch, setCardPitch] = useState(0);

  useEffect(() => {
    const updatePitch = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        const card0 = trackRef.current.children[0];
        const card1 = trackRef.current.children[1];
        const dist = card1.offsetLeft - card0.offsetLeft;
        if (dist > 0) setCardPitch(dist);
      }
    };
    updatePitch();
    window.addEventListener('resize', updatePitch, { passive: true });
    return () => window.removeEventListener('resize', updatePitch);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || 0;
      // Trigger heading transition after scrolling past initial threshold
      const shouldScroll = scrollPos > 80;
      setHeroScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));

      // Philosophy scroll storytelling progress
      if (philosophyRef.current) {
        const rect = philosophyRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;

        // Calculate progress within the pinned scroll track
        const totalDistance = rect.height - windowHeight;
        if (totalDistance > 100) {
          const progress = Math.max(0, Math.min(1, -rect.top / totalDistance));
          let newStage = 1;
          if (progress >= 0.75) {
            newStage = 4;
          } else if (progress >= 0.50) {
            newStage = 3;
          } else if (progress >= 0.25) {
            newStage = 2;
          } else {
            newStage = 1;
          }
          setPhilosophyStage((prev) => (prev !== newStage ? newStage : prev));
        }
      }

      // Core Capabilities scroll carousel progress
      if (capabilitiesRef.current) {
        const rect = capabilitiesRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;
        const totalDistance = rect.height - windowHeight;
        if (totalDistance > 100) {
          const progress = Math.max(0, Math.min(1, -rect.top / totalDistance));
          setCapabilitiesProgress((prev) => {
            if (Math.abs(prev - progress) < 0.002) return prev;
            return progress;
          });
        }
      }

      // Industries stacked cards scroll progress
      if (industriesRef.current) {
        const rect = industriesRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;
        const totalDistance = rect.height - windowHeight;
        if (totalDistance > 100) {
          const progress = Math.max(0, Math.min(1, -rect.top / totalDistance));
          setIndustriesProgress((prev) => {
            if (Math.abs(prev - progress) < 0.002) return prev;
            return progress;
          });
        }
      }

      // Four-Step Performance Engine vertical timeline scroll progress
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;
        const totalDistance = rect.height - windowHeight;
        if (totalDistance > 100) {
          const rawProgress = Math.max(0, Math.min(1, -rect.top / totalDistance));
          const progress = Math.min(1, rawProgress / 0.88);
          setProcessProgress((prev) => {
            if (Math.abs(prev - progress) < 0.002) return prev;
            return progress;
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (path) => {
    router.push(path);
  };

  const carouselFloatIndex = getCarouselFloatIndex(capabilitiesProgress);
  const headingOffsetY = Math.max(0, (1 - capabilitiesProgress / 0.08)) * 24;

  const industriesHeadingOffsetY = Math.max(0, (1 - industriesProgress / 0.10)) * 20;
  const processFloatIndex = processProgress * 3;

  return (
    <div className="relative">
      {/* SECTION 1 — Hero Section (Performance-Driven Growth) */}
      <section
        id="hero"
        className="relative min-h-[140vh] md:min-h-[150vh] bg-transparent z-10"
      >
        <div className="sticky top-0 min-h-screen w-full flex flex-col justify-end pb-12 px-6 md:px-12 pt-28 md:pt-32 overflow-hidden">
          <div className="max-w-[1600px] w-full mx-auto relative z-10 pointer-events-auto pb-16 md:pb-0">
            <div className="mb-6 md:mb-8">
              <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
                <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
                Performance-Driven Growth for Serious Brands
              </p>

              <div className="relative min-h-[150px] sm:min-h-[190px] md:min-h-[235px] lg:min-h-[275px] flex items-end">
                {/* Primary Hero Heading — Initial State */}
                <h1
                  className={`font-display font-bold text-[10vw] sm:text-[7.8vw] md:text-[6.2vw] lg:text-[5.4vw] xl:text-[5.1vw] leading-[0.9] tracking-tight uppercase transition-all duration-700 ease-out select-none motion-reduce:transition-none motion-reduce:transform-none max-w-4xl ${
                    heroScrolled
                      ? 'opacity-0 -translate-y-8 pointer-events-none absolute inset-x-0 bottom-0'
                      : 'opacity-100 translate-y-0 relative text-[var(--text-primary)]'
                  }`}
                >
                  Invictus <br />
                  Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Tech</span>
                </h1>

                {/* Revealed Marketing Heading — On Scroll */}
                <h2
                  className={`font-display font-bold text-[9.2vw] sm:text-[7.2vw] md:text-[5.6vw] lg:text-[4.9vw] xl:text-[4.6vw] leading-[0.9] tracking-tight uppercase transition-all duration-700 ease-out select-none motion-reduce:transition-none motion-reduce:transform-none max-w-4xl ${
                    heroScrolled
                      ? 'opacity-100 translate-y-0 relative text-[var(--text-primary)]'
                      : 'opacity-0 translate-y-8 pointer-events-none absolute inset-x-0 bottom-0'
                  }`}
                  aria-hidden={!heroScrolled}
                >
                  Marketing That <br />
                  Pays <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">You Back</span>
                </h2>
              </div>
            </div>

            {/* Supporting Description without horizontal divider */}
            <div className="w-full max-w-xl transition-all duration-700 ease-out pt-3">
              <p className="font-body text-[var(--text-muted)] text-sm md:text-lg leading-relaxed">
                We don’t sell clicks or impressions. We build scalable growth systems powered by ads, data, and AI.
              </p>
            </div>
          </div>

          {/* Start Project button anchored to the hero section's bottom-right area */}
          <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-20 pointer-events-auto">
            <button
              onClick={() => router.push('/contact')}
              className="group flex items-center gap-4 bg-[#2AB182] text-black px-8 py-4 rounded-none font-bold text-sm uppercase tracking-wider hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-colors duration-300 font-body shadow-lg"
            >
              Start Project
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section (Anti-Agency) */}
      <section
        id="philosophy"
        ref={philosophyRef}
        className="relative z-10 bg-transparent md:min-h-[280vh]"
      >
        <div className="md:sticky md:top-0 md:min-h-screen w-full flex flex-col justify-center pt-20 md:pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1600px] w-full mx-auto grid md:grid-cols-2 items-center">
            {/* Left Column — Pinned Heading */}
            <div className="py-6 md:py-8 pr-6 md:pr-12 lg:pr-16 flex flex-col justify-center">
              <div>
                <span className="font-body text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4 block">
                  (01) / Philosophy
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight text-[var(--text-primary)]">
                  Not an Agency.<br />
                  A <span className="text-[#2AB182]">Growth Partner.</span>
                </h2>
              </div>
            </div>

            {/* Right Column — Desktop Scroll Storytelling (4 Sequential Stages) */}
            <div className="hidden md:flex py-6 md:py-8 pl-6 md:pl-12 lg:pl-16 flex-col justify-center">
              <div className="relative min-h-[160px] md:min-h-[200px] w-full flex items-center">
                {/* Stage 1: Introductory Description */}
                <div
                  className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none absolute inset-0 flex items-center ${
                    philosophyStage === 1
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : philosophyStage > 1
                      ? 'opacity-0 -translate-y-8 pointer-events-none'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <p className="font-body text-base md:text-lg lg:text-xl text-[var(--text-muted)] leading-relaxed max-w-xl">
                    Most agencies sell &ldquo;branding&rdquo; and &ldquo;reach&rdquo;. We work on data, accountability, and clear numbers. If it doesn&apos;t drive revenue, we don&apos;t do it.
                  </p>
                </div>

                {/* Stage 2: Benefit 1 — Quality leads, not random enquiries */}
                <div
                  className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none absolute inset-0 flex items-center gap-4 text-[var(--text-primary)] ${
                    philosophyStage === 2
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : philosophyStage > 2
                      ? 'opacity-0 -translate-y-8 pointer-events-none'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2AB182] shrink-0 shadow-[0_0_12px_rgba(42,177,130,0.6)]" />
                  <span className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    Quality leads, not random enquiries
                  </span>
                </div>

                {/* Stage 3: Benefit 2 — Full-funnel tracking (Impression → Sale) */}
                <div
                  className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none absolute inset-0 flex items-center gap-4 text-[var(--text-primary)] ${
                    philosophyStage === 3
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : philosophyStage > 3
                      ? 'opacity-0 -translate-y-8 pointer-events-none'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2AB182] shrink-0 shadow-[0_0_12px_rgba(42,177,130,0.6)]" />
                  <span className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    Full-funnel tracking (Impression &rarr; Sale)
                  </span>
                </div>

                {/* Stage 4: Benefit 3 — Transparent dashboards */}
                <div
                  className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none absolute inset-0 flex items-center gap-4 text-[var(--text-primary)] ${
                    philosophyStage === 4
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2AB182] shrink-0 shadow-[0_0_12px_rgba(42,177,130,0.6)]" />
                  <span className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    Transparent dashboards
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column — Mobile Natural Stacked Presentation */}
            <div className="md:hidden p-8 flex flex-col justify-center bg-[var(--navbar-bg)]/60 backdrop-blur-sm">
              <p className="font-body text-base text-[var(--text-muted)] leading-relaxed mb-8">
                Most agencies sell &ldquo;branding&rdquo; and &ldquo;reach&rdquo;. We work on data, accountability, and clear numbers. If it doesn&apos;t drive revenue, we don&apos;t do it.
              </p>
              <ul className="space-y-5 font-display text-lg">
                {[
                  "Quality leads, not random enquiries",
                  "Full-funnel tracking (Impression → Sale)",
                  "Transparent dashboards"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-[var(--text-primary)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2AB182] shrink-0 mt-1.5 shadow-[0_0_8px_rgba(42,177,130,0.5)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION — Core Capabilities (Scroll-Driven Horizontal Carousel) */}
      <section
        id="core-capabilities"
        ref={capabilitiesRef}
        className="relative min-h-0 md:min-h-[300vh] z-10 bg-transparent"
      >
        {/* Desktop Scroll-Driven Horizontal Carousel */}
        <div className="hidden md:flex motion-reduce:hidden md:sticky md:top-0 md:h-screen w-full flex-col justify-between pt-24 md:pt-28 pb-8 overflow-hidden">
          {/* Sticky Main Heading */}
          <div
            className="w-full text-center px-6 z-20 shrink-0 transition-transform duration-200 ease-out motion-reduce:transform-none"
            style={{ transform: `translate3d(0, ${headingOffsetY}px, 0)` }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-[var(--text-primary)] leading-tight tracking-tight">
              Our Core <span className="text-[#2AB182]">Capabilities</span>
            </h2>
          </div>

          {/* Horizontal Carousel Track */}
          <div className="flex-1 w-full flex items-center justify-start relative overflow-hidden py-8">
            <div
              ref={trackRef}
              className="flex items-center transition-transform duration-75 ease-out will-change-transform"
              style={{
                paddingLeft: 'calc(50vw - min(42vw, 360px))',
                paddingRight: 'calc(50vw - min(42vw, 360px))',
                gap: '2.5rem',
                transform: cardPitch > 0
                  ? `translate3d(-${carouselFloatIndex * cardPitch}px, 0, 0)`
                  : `translate3d(calc(${carouselFloatIndex} * -1 * (min(84vw, 720px) + 2.5rem)), 0, 0)`,
              }}
            >
              {/* 4 Core Service Cards in Exact Order */}
              {coreCapabilitiesData.map((service, index) => (
                <div
                  key={index}
                  className="shrink-0 w-[84vw] max-w-[720px]"
                >
                  <div
                    onClick={() => handleNavClick('/services')}
                    className="w-full rounded-2xl bg-[#151515] border border-[#2E2E2E] hover:border-[#2AB182]/50 p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[320px] md:min-h-[380px] transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] motion-reduce:hover:transform-none cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs md:text-sm tracking-widest text-[#2AB182] uppercase bg-[#2AB182]/15 border border-[#2AB182]/30 px-3.5 py-1.5 rounded-full font-semibold">
                        {service.number}
                      </span>
                      <span className="font-mono text-xs tracking-wider text-[var(--text-secondary)] uppercase">
                        Invictus Core
                      </span>
                    </div>

                    <div className="my-auto py-6">
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight leading-tight group-hover:text-[#2AB182] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-[#2A2A2A] text-xs md:text-sm font-mono tracking-wider text-[var(--text-secondary)] group-hover:text-[#2AB182] transition-colors">
                      <span className="uppercase">Core Service</span>
                      <span className="flex items-center gap-2 uppercase text-[#2AB182]">
                        Explore Service
                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Area: Step Indicators */}
          <div className="w-full px-6 flex items-center justify-center py-4 shrink-0 z-20">
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((step) => {
                const isActive = Math.round(carouselFloatIndex) === step;
                return (
                  <span
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-[#2AB182]'
                        : 'w-2 bg-[var(--border-subtle)]'
                    }`}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Presentation & Reduced-Motion Alternative — Natural Stacked Scroll */}
        <div className="md:hidden motion-reduce:block py-16 px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold uppercase text-[var(--text-primary)] leading-tight">
              Our Core <span className="text-[#2AB182]">Capabilities</span>
            </h2>
          </div>

          <div className="space-y-4 max-w-lg mx-auto">
            {coreCapabilitiesData.map((service, index) => (
              <div
                key={index}
                onClick={() => handleNavClick('/services')}
                className="p-6 rounded-2xl bg-[#151515] border border-[#2A2A2A] hover:border-[#2AB182] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#2AB182] tracking-widest font-semibold">
                    {service.number}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    Core Service
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-[#2AB182] transition-colors">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Industries We Transform — Sticky Heading + Scroll-Driven Stacked Cards */}
      <section
        ref={industriesRef}
        id="industries"
        className="relative min-h-0 md:min-h-[250vh] z-10 bg-transparent"
      >
        {/* Desktop Sticky Container */}
        <div className="hidden md:flex motion-reduce:hidden sticky top-0 h-screen w-full flex-col justify-start pt-28 md:pt-36 lg:pt-40 pb-12 px-6 md:px-12 overflow-hidden">
          {/* Sticky Centered Heading with generous clearance below navbar */}
          <div
            style={{
              transform: `translate3d(0, ${industriesHeadingOffsetY}px, 0)`,
              willChange: 'transform',
            }}
            className="text-center shrink-0 z-20 max-w-4xl mx-auto px-4 mb-8 md:mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-[var(--text-primary)] leading-tight tracking-tight">
              Industries We <span className="text-[#2AB182]">Transform</span>
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--text-muted)] mt-2.5 max-w-2xl mx-auto">
              We go deep into niches where performance truly matters, from Healthcare to E-commerce.
            </p>
          </div>

          {/* Stacked Cards Presentation Area */}
          <div className="relative w-full max-w-[840px] mx-auto h-[300px] md:h-[320px] my-auto flex items-center justify-center">
            {industriesData.map((industry, index) => {
              const { translateYPercent, opacity, scale, topOffset } = getIndustryCardTransform(index, industriesProgress);

              return (
                <div
                  key={industry.id}
                  style={{
                    transform: `translate3d(0, ${translateYPercent}%, 0) scale(${scale})`,
                    opacity,
                    top: `${topOffset}px`,
                    zIndex: 10 + index * 10,
                    transformOrigin: 'top center',
                    willChange: 'transform, opacity',
                    pointerEvents: opacity === 0 ? 'none' : 'auto',
                  }}
                  className="absolute left-0 right-0 mx-auto w-full max-w-[800px]"
                >
                  <div
                    role="link"
                    tabIndex={0}
                    aria-label={`Explore ${industry.name} industry client results`}
                    onClick={() => handleNavClick('/clients')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavClick('/clients');
                      }
                    }}
                    className="rounded-2xl md:rounded-3xl bg-[#141414] border border-[#262626] p-6 sm:p-8 md:p-10 min-h-[190px] md:min-h-[210px] flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#2AB182] hover:shadow-[0_16px_40px_rgba(42,177,130,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:border-[#2AB182] motion-reduce:hover:transform-none cursor-pointer group select-none"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs md:text-sm tracking-widest text-[#2AB182] uppercase bg-[#2AB182]/10 border border-[#2AB182]/30 px-3 py-1 rounded-full font-semibold group-hover:bg-[#2AB182]/20 transition-colors">
                        {industry.id}
                      </span>
                      <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase flex items-center gap-1.5 group-hover:text-[#2AB182] transition-colors">
                        Industry Focus
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </span>
                    </div>

                    <div className="my-auto py-2 md:py-3">
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight group-hover:text-[#2AB182] transition-colors">
                        {industry.name}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Presentation & Reduced Motion Fallback */}
        <div className="md:hidden motion-reduce:block py-16 px-6">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h2 className="font-display text-3xl font-bold uppercase text-[var(--text-primary)] leading-tight">
              Industries We <span className="text-[#2AB182]">Transform</span>
            </h2>
            <p className="font-body text-sm text-[var(--text-muted)] mt-3">
              We go deep into niches where performance truly matters, from Healthcare to E-commerce.
            </p>
          </div>

          <div className="space-y-4 max-w-lg mx-auto">
            {industriesData.map((industry) => (
              <div
                key={industry.id}
                role="link"
                tabIndex={0}
                aria-label={`Explore ${industry.name} industry client results`}
                onClick={() => handleNavClick('/clients')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('/clients');
                  }
                }}
                className="rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#2AB182] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] p-6 flex flex-col justify-between shadow-lg cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs tracking-widest text-[#2AB182] uppercase bg-[#2AB182]/10 border border-[#2AB182]/30 px-3 py-1 rounded-full font-semibold">
                    {industry.id}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1 group-hover:text-[#2AB182] transition-colors">
                    Industry Focus
                    <ArrowRight size={12} />
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-white group-hover:text-[#2AB182] transition-colors">
                  {industry.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section — Divider lines removed */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--bg-card)]/60 backdrop-blur-sm relative z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-30">
          <div>
            <div className="font-display text-6xl md:text-7xl lg:text-9xl font-bold text-[#2AB182] mb-2">
              <CountUp end={3} duration={2} suffix="x" enableScrollSpy={true}
                scrollSpyOnce={true} />
            </div>
            <p className="font-body text-[var(--text-muted)] uppercase tracking-widest text-sm">Avg. Client ROAS</p>
          </div>
          <div>
            <div className="font-display text-6xl md:text-7xl lg:text-9xl font-bold text-[var(--text-primary)] mb-2">
              <CountUp end={40} duration={2} prefix="-" suffix="%" enableScrollSpy={true}
                scrollSpyOnce={true} />
            </div>
            <p className="font-body text-[var(--text-muted)] uppercase tracking-widest text-sm">Cost Per Lead Reduction</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Process Steps (Methodology) — Vertical Thread Timeline */}
      <section
        ref={processRef}
        id="process"
        className="relative min-h-0 md:min-h-[250vh] border-b border-[var(--border-subtle)] z-10 bg-transparent"
      >
        {/* Desktop Sticky Container */}
        <div className="hidden md:flex motion-reduce:hidden sticky top-0 h-screen w-full flex-col justify-start pt-28 md:pt-32 pb-12 px-6 md:px-12 overflow-hidden">
          {/* Section Heading with proper top spacing */}
          <div className="text-center shrink-0 z-20 max-w-4xl mx-auto px-6 mb-10 lg:mb-14">
            <span className="text-[#2AB182] font-body text-xs md:text-sm tracking-[0.2em] uppercase font-bold mb-3 block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
              The 4-Step <span className="text-[#2AB182]">Performance</span> Engine
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--text-muted)] mt-2.5">
              Performance is engineered, not guessed.
            </p>
          </div>

          {/* Vertical Thread Timeline Window */}
          <div className="relative w-full max-w-xl mx-auto h-[320px] overflow-hidden my-auto flex items-center justify-center">
            {/* Center Focal Indicator Band */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[96px] pointer-events-none rounded-xl bg-gradient-to-r from-transparent via-[#2AB182]/5 to-transparent border-y border-[#2AB182]/10 z-0" />

            {/* Moving Reel that translates upward as user scrolls */}
            <div
              style={{
                transform: `translate3d(0, ${112 - processFloatIndex * 96}px, 0)`,
                willChange: 'transform',
              }}
              className="relative flex flex-col transition-transform duration-75 ease-out z-10 w-fit mx-auto"
            >
              {/* Vertical Thread Background */}
              <div
                style={{ top: '24px', height: `${3 * 96}px` }}
                className="absolute left-[23px] w-[2px] bg-[#222222] z-0"
              />

              {/* Vertical Thread Progress Fill */}
              <div
                style={{
                  top: '24px',
                  height: `${Math.min(3 * 96, processProgress * (3 * 96))}px`,
                }}
                className="absolute left-[23px] w-[2px] bg-[#2AB182] shadow-[0_0_8px_rgba(42,177,130,0.6)] z-0 transition-[height] duration-75 ease-out"
              />

              {processStepsData.map((step, index) => {
                const diff = Math.abs(processFloatIndex - index);
                const isActive = diff < 0.5;
                const isPast = processFloatIndex >= index + 0.5;

                return (
                  <div
                    key={index}
                    style={{ height: '96px' }}
                    className="relative z-10 flex items-center gap-6 md:gap-8 group select-none"
                  >
                    {/* Step Connected Dot */}
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'border-[#2AB182] bg-[var(--bg-primary)] shadow-[0_0_20px_rgba(42,177,130,0.5)] scale-110'
                          : isPast
                            ? 'border-[#2AB182]/60 bg-[#161616]'
                            : 'border-[#333333] bg-[#141414]'
                      }`}
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? 'w-4 h-4 bg-[#2AB182] shadow-[0_0_10px_#2AB182]'
                            : isPast
                              ? 'w-3 h-3 bg-[#2AB182]/60'
                              : 'w-2.5 h-2.5 bg-[#444444]'
                        }`}
                      />
                    </div>

                    {/* Step Title Only */}
                    <h3
                      className={`font-display font-bold uppercase transition-all duration-300 tracking-tight ${
                        isActive
                          ? 'text-white text-3xl sm:text-4xl md:text-5xl scale-100 opacity-100'
                          : isPast
                            ? 'text-[var(--text-secondary)] text-2xl sm:text-3xl md:text-4xl scale-95 opacity-50'
                            : 'text-[var(--text-muted)] text-xl sm:text-2xl md:text-3xl scale-90 opacity-25'
                      }`}
                    >
                      <span className={isActive ? 'text-[#2AB182] mr-3 font-mono font-semibold' : 'text-[var(--text-muted)] mr-3 font-mono'}>
                        {step.id}
                      </span>
                      {step.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Presentation & Reduced-Motion Alternative */}
        <div className="md:hidden motion-reduce:block py-16 px-6">
          <div className="text-center mb-12">
            <span className="text-[#2AB182] font-body text-xs tracking-[0.2em] uppercase font-bold mb-3 block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] leading-tight">
              The 4-Step <span className="text-[#2AB182]">Performance</span> Engine
            </h2>
            <p className="font-body text-sm text-[var(--text-muted)] mt-2">
              Performance is engineered, not guessed.
            </p>
          </div>

          <div className="relative max-w-sm mx-auto pl-2">
            {/* Continuous Thread Line */}
            <div
              style={{ top: '24px', bottom: '24px' }}
              className="absolute left-[29px] w-[2px] bg-[#2AB182]/30"
            />

            <div className="space-y-8 relative z-10">
              {processStepsData.map((step, index) => (
                <div key={index} className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full border border-[#2AB182] bg-[var(--bg-primary)] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(42,177,130,0.3)]">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#2AB182]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
                    <span className="text-[#2AB182] mr-2 font-mono">{step.id}</span>
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-b border-[var(--border-subtle)] px-6 md:px-12 relative z-10 bg-[var(--bg-primary)]/80 backdrop-blur-[2px]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-bold uppercase mb-14 text-[var(--text-primary)] text-center">FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Do you work on performance-based pricing?", a: "We primarily work on a retainer + performance structure. Pure performance deals are evaluated on a case-by-case basis depending on your margins and historical data." },
              { q: "What is the minimum budget?", a: "We typically recommend a minimum monthly ad spend that ensures statistical significance for testing and scaling (usually $2k+)." },
              { q: "How soon can we see results?", a: "For lead-gen campaigns, we usually start seeing data in the first 7–10 days, and meaningful optimisation from week 3 onwards." }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => toggleFaq(index)}>
                <div className={`flex justify-between items-center border-b border-[var(--border-subtle)] pb-4 transition-colors ${activeFaq === index ? 'border-[#2AB182]' : ''}`}>
                  <h3 className={`font-body text-lg md:text-xl font-medium transition-all ${activeFaq === index ? 'text-[#2AB182] pl-4' : 'text-[var(--text-primary)] group-hover:text-[#2AB182]'}`}>
                    {item.q}
                  </h3>
                  {activeFaq === index ?
                    <Minus className="text-[#2AB182]" size={24} /> :
                    <Plus className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" size={24} />
                  }
                </div>
                <div className={`grid transition-all duration-300 ease-in-out ${activeFaq === index ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="font-body text-[var(--text-muted)] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Growth CTA (Directs to standalone Contact Page) */}
      <section id="contact-cta" className="py-16 md:py-24 text-center px-6 relative z-10 bg-[var(--bg-primary)]/85 backdrop-blur-[2px]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] font-bold mb-6 leading-tight">
            If You’re Serious About <span className="text-[#2AB182]">Growth</span>, Let’s Talk.
          </h2>
          <p className="font-body text-[var(--text-muted)] text-lg md:text-xl mb-3">
            We don’t take on every project. We take on the right ones.
          </p>
          <p className="font-body text-[var(--text-primary)] text-base md:text-lg mb-10 max-w-2xl mx-auto">
            If you’re growth-ready and want a partner who owns the numbers with you:
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="group inline-flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-10 md:px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_4px_25px_rgba(42,177,130,0.3)] hover:shadow-[0_0_30px_rgba(42,177,130,0.5)] cursor-pointer text-sm md:text-base"
          >
            <span>BOOK A DISCOVERY CALL</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
