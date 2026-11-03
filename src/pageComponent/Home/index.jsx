import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import CountUp from 'react-countup';
import { useRouter } from 'next/router';
import LayeredPerformanceEngine from '@/components/LayeredPerformanceEngine';

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
  { id: "01", name: "Healthcare & Medical", tagline: "Patient Acquisition & ROAS", slug: "healthcare" },
  { id: "02", name: "Education & EdTech", tagline: "Student Enrollment & Scale", slug: "edtech" },
  { id: "03", name: "E-commerce & D2C", tagline: "High-ROAS D2C Scaling", slug: "ecommerce" },
  { id: "04", name: "Real Estate & Construction", tagline: "High-Intent Buyer Pipeline", slug: "real-estate" },
  { id: "05", name: "B2B & Consulting", tagline: "Enterprise Pipeline Growth", slug: "b2b-consulting" },
];



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
  const [hoveredIndustry, setHoveredIndustry] = useState(null);

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
          setProcessProgress((prev) => {
            if (Math.abs(prev - rawProgress) < 0.002) return prev;
            return rawProgress;
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
                Performance Marketing Agency • Chennai HQ & Global Clients
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
                We don’t sell clicks or vanity impressions. We build revenue-focused acquisition systems powered by Meta Ads, Google Ads, and custom conversion funnels.
              </p>
            </div>
          </div>

          {/* Start Project button anchored to the hero section's bottom-right area */}
          <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-20 pointer-events-auto">
            <Link
              href="/contact"
              className="group flex items-center gap-4 bg-[#2AB182] text-black px-8 py-4 rounded-none font-bold text-sm uppercase tracking-wider hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-colors duration-300 font-body shadow-lg"
            >
              Start Project
              <ArrowRight size={20} />
            </Link>
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
                    Most agencies report on impressions and reach. We manage paid acquisition with strict accountability to pipeline, customer acquisition cost (CAC), and revenue.
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
                    Qualified customer leads, not random enquiries
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
                    Full-funnel tracking (Ad Click &rarr; CRM &rarr; Sale)
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
                    Live reporting dashboards & weekly data reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column — Mobile Natural Stacked Presentation */}
            <div className="md:hidden p-8 flex flex-col justify-center bg-[var(--navbar-bg)]/60 backdrop-blur-sm">
              <p className="font-body text-base text-[var(--text-muted)] leading-relaxed mb-8">
                Most agencies report on impressions and reach. We manage paid acquisition with strict accountability to pipeline, customer acquisition cost (CAC), and revenue.
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
                  <Link
                    href="/services"
                    className="w-full rounded-2xl bg-[#151515] border border-[#2E2E2E] hover:border-[#2AB182]/50 p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[320px] md:min-h-[380px] transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] motion-reduce:hover:transform-none cursor-pointer group block"
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
                  </Link>
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
            <p role="heading" aria-level="2" className="font-display text-3xl font-bold uppercase text-[var(--text-primary)] leading-tight">
              Our Core <span className="text-[#2AB182]">Capabilities</span>
            </p>
          </div>

          <div className="space-y-4 max-w-lg mx-auto">
            {coreCapabilitiesData.map((service, index) => (
              <Link
                key={index}
                href="/services"
                className="p-6 rounded-2xl bg-[#151515] border border-[#2A2A2A] hover:border-[#2AB182] transition-colors cursor-pointer group block"
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
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Industries We Transform — Connected Hexagonal Honeycomb Layout */}
      <section
        id="industries"
        className="relative z-10 bg-transparent pt-20 md:pt-28 lg:pt-32 pb-6 md:pb-8 lg:pb-10 overflow-hidden"
      >
        {/* Section Heading & Subtitle */}
        <div className="text-center shrink-0 z-20 max-w-4xl mx-auto px-6 mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-[var(--text-primary)] leading-tight tracking-tight">
            Industries We <span className="text-[#2AB182]">Transform</span>
          </h2>
          <p className="font-body text-sm md:text-base text-[var(--text-muted)] mt-2.5 max-w-2xl mx-auto">
            We engineer paid campaigns for high-intent industries where customer acquisition economics and lead quality directly dictate profitability.
          </p>
        </div>

        {/* Desktop & Tablet Connected Honeycomb (md and above) */}
        <div className="hidden md:flex flex-col items-center justify-center relative max-w-6xl mx-auto px-4 select-none">
          <div
            className={`flex flex-col items-center relative transition-all duration-300 ${
              hoveredIndustry !== null ? 'has-industry-hover' : ''
            }`}
          >
            {/* Row 1: Exactly 3 Hexagons (01 Healthcare & Medical, 02 Education & EdTech, 03 E-commerce & D2C) */}
            <div
              className={`flex justify-center gap-4 relative transition-transform duration-300 ${
                hoveredIndustry !== null && [0, 1, 2].includes(hoveredIndustry) ? 'z-30' : 'z-10'
              }`}
            >
              {industriesData.slice(0, 3).map((industry, index) => {
                const isHovered = hoveredIndustry === index;
                const isDimmed = hoveredIndustry !== null && !isHovered;

                return (
                  <Link
                    key={industry.id}
                    href={`/clients?industry=${industry.slug}#core-industries`}
                    onMouseEnter={() => setHoveredIndustry(index)}
                    onMouseLeave={() => setHoveredIndustry(null)}
                    aria-label={`Explore ${industry.name} industry`}
                    className={`relative w-[250px] lg:w-[270px] h-[280px] lg:h-[300px] cursor-pointer block transition-all duration-300 ease-out will-change-transform ${
                      isHovered
                        ? 'scale-110 -translate-y-2 z-40'
                        : isDimmed
                        ? 'opacity-35 blur-[1.5px] scale-[0.97] z-10'
                        : 'opacity-100 scale-100 z-10'
                    }`}
                    style={{
                      transformOrigin: 'center center',
                      filter: isHovered
                        ? 'drop-shadow(0 14px 28px rgba(42, 177, 130, 0.45))'
                        : undefined,
                    }}
                  >
                    {/* SVG Vector Hexagon Border */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-20"
                      viewBox="0 0 100 115"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="50,1 99,29.5 99,85.5 50,114 1,85.5 1,29.5"
                        fill="none"
                        stroke={isHovered ? '#2AB182' : 'rgba(255, 255, 255, 0.12)'}
                        strokeWidth={isHovered ? '2.5' : '1.2'}
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-300"
                      />
                    </svg>

                    {/* Hexagon Body */}
                    <div
                      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center relative transition-colors duration-300 ${
                        isHovered
                          ? 'bg-gradient-to-b from-[#1b2a24] via-[#131c19] to-[#0f1412]'
                          : 'bg-gradient-to-b from-[#161a18] via-[#111413] to-[#0c0e0d]'
                      }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      {/* Ambient radial glow inside hexagon */}
                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-40'
                        }`}
                        style={{
                          background: 'radial-gradient(circle at 50% 30%, rgba(42, 177, 130, 0.18) 0%, transparent 70%)',
                        }}
                      />

                      {/* Sector Badge */}
                      <span className="font-mono text-[11px] font-bold text-[#2AB182] bg-[#2AB182]/15 border border-[#2AB182]/35 px-3 py-1 rounded-full tracking-widest mb-2.5 relative z-10">
                        SECTOR {industry.id}
                      </span>

                      {/* Industry Title — Exact Five Headings */}
                      <h3
                        className={`font-display text-base lg:text-lg font-bold uppercase tracking-tight mb-2 relative z-10 transition-colors duration-300 max-w-[200px] mx-auto leading-snug ${
                          isHovered ? 'text-[#2AB182]' : 'text-white'
                        }`}
                      >
                        {industry.name}
                      </h3>

                      {/* Industry Tagline */}
                      <p className="font-body text-[11px] lg:text-xs text-[#7e8f88] uppercase tracking-wider max-w-[170px] leading-relaxed mb-3 relative z-10">
                        {industry.tagline}
                      </p>

                      {/* Explore CTA */}
                      <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#2AB182] font-semibold relative z-10 group">
                        <span>Explore Sector</span>
                        <ArrowRight size={13} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Row 2: Exactly 2 Hexagons (04 Real Estate & Construction, 05 B2B & Consulting) nestling into Row 1 valleys */}
            <div
              className={`flex justify-center gap-4 relative -mt-[65px] lg:-mt-[70px] transition-transform duration-300 ${
                hoveredIndustry !== null && [3, 4].includes(hoveredIndustry) ? 'z-30' : 'z-10'
              }`}
            >
              {industriesData.slice(3, 5).map((industry, index) => {
                const actualIndex = index + 3;
                const isHovered = hoveredIndustry === actualIndex;
                const isDimmed = hoveredIndustry !== null && !isHovered;

                return (
                  <Link
                    key={industry.id}
                    href={`/clients?industry=${industry.slug}#core-industries`}
                    onMouseEnter={() => setHoveredIndustry(actualIndex)}
                    onMouseLeave={() => setHoveredIndustry(null)}
                    aria-label={`Explore ${industry.name} industry`}
                    className={`relative w-[250px] lg:w-[270px] h-[280px] lg:h-[300px] cursor-pointer block transition-all duration-300 ease-out will-change-transform ${
                      isHovered
                        ? 'scale-110 -translate-y-2 z-40'
                        : isDimmed
                        ? 'opacity-35 blur-[1.5px] scale-[0.97] z-10'
                        : 'opacity-100 scale-100 z-10'
                    }`}
                    style={{
                      transformOrigin: 'center center',
                      filter: isHovered
                        ? 'drop-shadow(0 14px 28px rgba(42, 177, 130, 0.45))'
                        : undefined,
                    }}
                  >
                    {/* SVG Vector Hexagon Border */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-20"
                      viewBox="0 0 100 115"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="50,1 99,29.5 99,85.5 50,114 1,85.5 1,29.5"
                        fill="none"
                        stroke={isHovered ? '#2AB182' : 'rgba(255, 255, 255, 0.12)'}
                        strokeWidth={isHovered ? '2.5' : '1.2'}
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-300"
                      />
                    </svg>

                    {/* Hexagon Body */}
                    <div
                      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center relative transition-colors duration-300 ${
                        isHovered
                          ? 'bg-gradient-to-b from-[#1b2a24] via-[#131c19] to-[#0f1412]'
                          : 'bg-gradient-to-b from-[#161a18] via-[#111413] to-[#0c0e0d]'
                      }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      {/* Ambient radial glow inside hexagon */}
                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-40'
                        }`}
                        style={{
                          background: 'radial-gradient(circle at 50% 30%, rgba(42, 177, 130, 0.18) 0%, transparent 70%)',
                        }}
                      />

                      {/* Sector Badge */}
                      <span className="font-mono text-[11px] font-bold text-[#2AB182] bg-[#2AB182]/15 border border-[#2AB182]/35 px-3 py-1 rounded-full tracking-widest mb-2.5 relative z-10">
                        SECTOR {industry.id}
                      </span>

                      {/* Industry Title — Exact Five Headings */}
                      <h3
                        className={`font-display text-base lg:text-lg font-bold uppercase tracking-tight mb-2 relative z-10 transition-colors duration-300 max-w-[200px] mx-auto leading-snug ${
                          isHovered ? 'text-[#2AB182]' : 'text-white'
                        }`}
                      >
                        {industry.name}
                      </h3>

                      {/* Industry Tagline */}
                      <p className="font-body text-[11px] lg:text-xs text-[#7e8f88] uppercase tracking-wider max-w-[170px] leading-relaxed mb-3 relative z-10">
                        {industry.tagline}
                      </p>

                      {/* Explore CTA */}
                      <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#2AB182] font-semibold relative z-10 group">
                        <span>Explore Sector</span>
                        <ArrowRight size={13} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Responsive Interlocking Honeycomb (< md) — Exactly 5 Hexagons (3 in Col 1, 2 in Col 2) */}
        <div className="md:hidden px-4">
          <div className="flex justify-center gap-2.5 max-w-[360px] mx-auto relative select-none">
            {/* Column 1: Sectors 01, 03, 05 */}
            <div className="flex flex-col gap-3">
              {[0, 2, 4].map((idx) => {
                const industry = industriesData[idx];
                const isHovered = hoveredIndustry === idx;
                const isDimmed = hoveredIndustry !== null && !isHovered;

                return (
                  <Link
                    key={industry.id}
                    href={`/clients?industry=${industry.slug}#core-industries`}
                    onTouchStart={() => setHoveredIndustry(idx)}
                    onMouseEnter={() => setHoveredIndustry(idx)}
                    onMouseLeave={() => setHoveredIndustry(null)}
                    aria-label={`Explore ${industry.name} industry`}
                    className={`relative w-[155px] h-[175px] cursor-pointer block transition-all duration-300 ease-out will-change-transform ${
                      isHovered
                        ? 'scale-105 z-20'
                        : isDimmed
                        ? 'opacity-40 blur-[1px]'
                        : 'opacity-100 z-10'
                    }`}
                    style={{
                      filter: isHovered
                        ? 'drop-shadow(0 8px 20px rgba(42, 177, 130, 0.4))'
                        : undefined,
                    }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-20"
                      viewBox="0 0 100 115"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="50,1 99,29.5 99,85.5 50,114 1,85.5 1,29.5"
                        fill="none"
                        stroke={isHovered ? '#2AB182' : 'rgba(255, 255, 255, 0.14)'}
                        strokeWidth={isHovered ? '2.2' : '1.2'}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    <div
                      className={`w-full h-full flex flex-col items-center justify-center p-3 text-center relative ${
                        isHovered
                          ? 'bg-gradient-to-b from-[#1b2a24] to-[#0f1412]'
                          : 'bg-gradient-to-b from-[#161a18] to-[#0c0e0d]'
                      }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      <span className="font-mono text-[9px] font-bold text-[#2AB182] bg-[#2AB182]/15 border border-[#2AB182]/30 px-2 py-0.5 rounded-full tracking-wider mb-1.5">
                        {industry.id}
                      </span>
                      <h3
                        className={`font-display text-[11px] sm:text-xs font-bold uppercase tracking-tight mb-1 max-w-[125px] leading-tight ${
                          isHovered ? 'text-[#2AB182]' : 'text-white'
                        }`}
                      >
                        {industry.name}
                      </h3>
                      <p className="font-body text-[8.5px] text-[#7e8f88] uppercase tracking-tight max-w-[120px] line-clamp-1 mb-1.5">
                        {industry.tagline}
                      </p>
                      <div className="flex items-center gap-1 font-mono text-[9px] uppercase text-[#2AB182] font-semibold">
                        <span>Explore</span>
                        <ArrowRight size={10} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Column 2: Sectors 02, 04 (Shifted down for honeycomb tessellation) */}
            <div className="flex flex-col gap-3 mt-11">
              {[1, 3].map((idx) => {
                const industry = industriesData[idx];
                const isHovered = hoveredIndustry === idx;
                const isDimmed = hoveredIndustry !== null && !isHovered;

                return (
                  <Link
                    key={industry.id}
                    href={`/clients?industry=${industry.slug}#core-industries`}
                    onTouchStart={() => setHoveredIndustry(idx)}
                    onMouseEnter={() => setHoveredIndustry(idx)}
                    onMouseLeave={() => setHoveredIndustry(null)}
                    aria-label={`Explore ${industry.name} industry`}
                    className={`relative w-[155px] h-[175px] cursor-pointer block transition-all duration-300 ease-out will-change-transform ${
                      isHovered
                        ? 'scale-105 z-20'
                        : isDimmed
                        ? 'opacity-40 blur-[1px]'
                        : 'opacity-100 z-10'
                    }`}
                    style={{
                      filter: isHovered
                        ? 'drop-shadow(0 8px 20px rgba(42, 177, 130, 0.4))'
                        : undefined,
                    }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-20"
                      viewBox="0 0 100 115"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="50,1 99,29.5 99,85.5 50,114 1,85.5 1,29.5"
                        fill="none"
                        stroke={isHovered ? '#2AB182' : 'rgba(255, 255, 255, 0.14)'}
                        strokeWidth={isHovered ? '2.2' : '1.2'}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    <div
                      className={`w-full h-full flex flex-col items-center justify-center p-3 text-center relative ${
                        isHovered
                          ? 'bg-gradient-to-b from-[#1b2a24] to-[#0f1412]'
                          : 'bg-gradient-to-b from-[#161a18] to-[#0c0e0d]'
                      }`}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      <span className="font-mono text-[9px] font-bold text-[#2AB182] bg-[#2AB182]/15 border border-[#2AB182]/30 px-2 py-0.5 rounded-full tracking-wider mb-1.5">
                        {industry.id}
                      </span>
                      <h3
                        className={`font-display text-[11px] sm:text-xs font-bold uppercase tracking-tight mb-1 max-w-[125px] leading-tight ${
                          isHovered ? 'text-[#2AB182]' : 'text-white'
                        }`}
                      >
                        {industry.name}
                      </h3>
                      <p className="font-body text-[8.5px] text-[#7e8f88] uppercase tracking-tight max-w-[120px] line-clamp-1 mb-1.5">
                        {industry.tagline}
                      </p>
                      <div className="flex items-center gap-1 font-mono text-[9px] uppercase text-[#2AB182] font-semibold">
                        <span>Explore</span>
                        <ArrowRight size={10} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section — Divider lines removed */}
      <section className="mt-4 md:mt-6 lg:mt-8 py-12 md:py-16 px-6 md:px-12 bg-[var(--bg-card)]/60 backdrop-blur-sm relative z-10">
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

      {/* SECTION 5 — Process Steps (Methodology) — Layer-by-Layer Horizontal Sheet Scroll */}
      <section
        ref={processRef}
        id="process"
        className="relative min-h-[280vh] md:min-h-[300vh] border-b border-[var(--border-subtle)] z-10 bg-transparent"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--bg-primary)]">
          {/* Main Heading — Fixed at the Top (Typography matched to Industries We Transform) */}
          <div className="text-center shrink-0 z-50 max-w-4xl mx-auto px-6 pt-24 md:pt-22 pb-2 select-none">
            <span className="text-[#2AB182] font-body text-xs md:text-sm tracking-[0.2em] uppercase font-bold mb-1.5 block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-[var(--text-primary)] leading-tight tracking-tight">
              The 4-Step <span className="text-[#2AB182]">Performance</span> Engine
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--text-muted)] mt-2 max-w-2xl mx-auto">
              Performance is engineered, not guessed.
            </p>
          </div>

          {/* Layer-by-Layer Overlapping Sheet Panels */}
          <div className="relative flex-1 w-full overflow-hidden">
            <LayeredPerformanceEngine
              steps={processSteps}
              progress={processProgress}
              onStageClick={(idx) => {
                if (processRef.current) {
                  const rect = processRef.current.getBoundingClientRect();
                  const winH = window.innerHeight || 800;
                  const total = rect.height - winH;
                  const targets = [0.02, 0.35, 0.67, 0.98];
                  const targetY = window.scrollY + rect.top + targets[idx] * total;
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-b border-[var(--border-subtle)] px-6 md:px-12 relative z-10 bg-[var(--bg-primary)]/80 backdrop-blur-[2px]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-bold uppercase mb-14 text-[var(--text-primary)] text-center">FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "How does your pricing and engagement model work?", a: "We work on a transparent monthly retainer + performance structure. Performance-sharing arrangements are evaluated based on your historical conversion data, margins, and sales capacity." },
              { q: "What advertising budget do we need to start?", a: "We typically recommend a minimum monthly advertising spend of $2,000+. This ensures sufficient conversion data for statistical testing and algorithmic learning." },
              { q: "How quickly do campaigns show measurable results?", a: "Initial tracking validation and baseline audience response occur within the first 7–10 days. Campaign optimization, creative iteration, and cost-per-lead improvements compound from week 3 onward." },
              { q: "Do you create the ad visuals and copywriting or do we provide them?", a: "Our in-house creative team produces direct-response ad copy, static graphic assets, and short-form video ads (Reels). You simply provide raw brand assets and approve the creative before launch." }
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
            Headquartered in Chennai, India, partnering with ambitious brands across India, the US, UK, and Singapore.
          </p>
          <p className="font-body text-[var(--text-primary)] text-base md:text-lg mb-10 max-w-2xl mx-auto">
            If you’re growth-ready and want a partner who owns the numbers with you:
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-10 md:px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_4px_25px_rgba(42,177,130,0.3)] hover:shadow-[0_0_30px_rgba(42,177,130,0.5)] cursor-pointer text-sm md:text-base rounded-sm"
          >
            <span>BOOK A DISCOVERY CALL</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
