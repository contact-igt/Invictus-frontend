import React, { useState } from "react";
import {
  ArrowRight,
  ChevronUp,
  CheckCircle,
  Check,
  Unlock,
  LineChart,
  UserCheck,
  TrendingUp,
  Zap,
  Rocket,
  Target,
  Share2,
  Code,
  Bot,
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
    icon: <Unlock size={32} />,
    title: "No Long-term Contracts",
    desc: "We earn your business every month. No handcuffs, just results.",
  },
  {
    icon: <LineChart size={32} />,
    title: "Transparent Reporting",
    desc: "Live dashboards you can check anytime. No hidden fees, no fuzzy math.",
  },
  {
    icon: <UserCheck size={32} />,
    title: "Dedicated Account Manager",
    desc: "Direct access to the expert managing your growth, not a support ticket.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Focus on ROI",
    desc: "We don't care about vanity metrics. We care about money in the bank.",
  },
  {
    icon: <Zap size={32} />,
    title: "Agile Methodology",
    desc: "We test fast, fail cheap, and scale what works immediately.",
  },
  {
    icon: <Rocket size={32} />,
    title: "Continuous Innovation",
    desc: "We stay ahead of the algorithm changes so you don't have to.",
  },
];

// Process steps for the central hub
const processStepsData = [
  {
    id: "01",
    title: "Discovery & Strategy",
    items: ["Market Research", "Competitor Analysis", "Goal Setting"],
  },
  {
    id: "02",
    title: "Setup & Execution",
    items: ["Campaign Setup", "Creative Development", "Tracking Implementation"],
  },
  {
    id: "03",
    title: "Optimization & Scaling",
    items: ["Performance Monitoring", "A/B Testing", "Budget Scaling"],
  },
  {
    id: "04",
    title: "Reporting & Analysis",
    items: ["Weekly Reports", "Strategy Review", "Future Planning"],
  },
];

const ServicesPage = ({ onContactClick }) => {
  const [openServiceIndex, setOpenServiceIndex] = useState(null);
  const toggleService = (index) => {
    setOpenServiceIndex(openServiceIndex === index ? null : index);
  };
  const processSteps = processStepsData;

  return (
    <div className="pt-32 min-h-screen">
      {/* SECTION 1 – Hero */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-[1600px] mx-auto">
          <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
            <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse" />
            What We Do
          </p>
          <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-[var(--text-primary)] uppercase mb-8">
            Performance-Driven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">
              Growth Systems.
            </span>
          </h1>
          <p className="font-body text-lg md:text-xl text-[var(--text-muted)] max-w-2xl">
            We don't offer "digital marketing services." We build scalable growth systems powered by ads, data, and AI.
          </p>
        </div>
      </section>

      {/* SECTION 2 – Services Overview (Accordion) */}
      <section id="services-details" className="border-y border-[var(--border-subtle)] bg-[var(--bg-primary)] relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <h2 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] font-bold mb-10 md:mb-12 uppercase border-l-4 border-[#2AB182] pl-4 inline-block">
            CORE SERVICES
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {serviceDetails.map((service, index) => {
              const isOpen = openServiceIndex === index;
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 transition-all duration-300 hover:border-[#2AB182] active:border-[#2AB182] hover:shadow-[0_0_30px_rgba(42,177,130,0.15)] cursor-pointer"
                  onClick={() => toggleService(index)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-primary)] border border-[#2AB182]/30 flex items-center justify-center group-hover:border-[#2AB182] group-active:border-[#2AB182] transition-colors">
                      <IconComponent className="text-[#2AB182]" size={28} />
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleService(index); }}
                      className="w-12 h-12 rounded-full bg-[#2AB182] flex items-center justify-center hover:bg-[#24a074] active:bg-[#24a074] transition-all duration-300 hover:scale-110"
                    >
                      {isOpen ? <ChevronUp className="text-black" size={20} /> : <ArrowRight className="text-black" size={20} />}
                    </button>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4 uppercase">{service.title}</h3>
                  <p className="font-body text-[var(--text-muted)] text-base mb-6 leading-relaxed">{service.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#2AB182]">
                        <Check size={16} className="shrink-0" />
                        <span className="font-body">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="pt-4 border-t border-[var(--border-subtle)]">
                      <h4 className="font-display text-sm uppercase text-[#2AB182] font-bold mb-3">Complete Features:</h4>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle className="w-4 h-4 shrink-0 text-[#2AB182] mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-4 bg-[var(--bg-primary)] border border-[#2AB182]/30 rounded-lg">
                        <p className="font-body text-sm text-[var(--text-primary)] italic">
                          <span className="text-[#2AB182] font-bold">Outcome: </span>
                          {service.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 – Why Choose Invictus */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] relative z-10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl text-[var(--text-primary)] font-bold uppercase leading-tight mb-6">
              Why Brands Choose <span className="text-[#2AB182]">Invictus</span>
            </h2>
            <p className="font-body text-lg text-[var(--text-muted)]">
              We built the agency we always wanted to hire. No fluff, no bloat, just a relentless focus on your bottom line.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {antiAgencyValues.map((value, index) => (
              <div
                key={index}
                className="group relative p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl hover:border-[#2AB182] active:border-[#2AB182] hover:shadow-[0_0_30px_rgba(42,177,130,0.3)] transition-all duration-300 h-full min-h-[280px] flex flex-col overflow-hidden"
              >
                <div className="absolute bottom-4 right-4 text-[120px] font-display font-black text-[var(--text-primary)]/5 leading-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="text-[#2AB182] mb-6 relative z-10">{value.icon}</div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wide relative z-10">
                  {value.title}
                </h3>
                <p className="font-body text-[var(--text-muted)] text-base leading-relaxed relative z-10">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 – Central Hub (4‑Step Performance Engine) */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--bg-card)]/50 border-b border-[var(--border-subtle)] relative overflow-hidden">
        {/* Background ambient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2AB182]/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl text-[var(--text-primary)] font-bold uppercase leading-tight mb-6">
              The 4‑Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-400">Performance Engine</span>
            </h2>
            <p className="font-body text-lg text-[var(--text-muted)]">Our proven process for predictable, scalable growth.</p>
          </div>

          {/* Central hub wrapper */}
          <div className="relative mt-20 min-h-[600px] md:min-h-[700px]">
            {/* Straight connection thread lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradUpLeft" x1="50%" y1="50%" x2="25%" y2="25%">
                  <stop offset="0%" stopColor="#2AB182" stopOpacity="1" />
                  <stop offset="50%" stopColor="#2AB182" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2AB182" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="gradUpRight" x1="50%" y1="50%" x2="75%" y2="25%">
                  <stop offset="0%" stopColor="#2AB182" stopOpacity="1" />
                  <stop offset="50%" stopColor="#2AB182" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2AB182" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="gradDownLeft" x1="50%" y1="50%" x2="25%" y2="75%">
                  <stop offset="0%" stopColor="#2AB182" stopOpacity="1" />
                  <stop offset="50%" stopColor="#2AB182" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2AB182" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="gradDownRight" x1="50%" y1="50%" x2="75%" y2="75%">
                  <stop offset="0%" stopColor="#2AB182" stopOpacity="1" />
                  <stop offset="50%" stopColor="#2AB182" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2AB182" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <line x1="50%" y1="50%" x2="25%" y2="25%" vectorEffect="non-scaling-stroke" stroke="url(#gradUpLeft)" strokeWidth="2" filter="url(#glow)" />
              <line x1="50%" y1="50%" x2="75%" y2="25%" vectorEffect="non-scaling-stroke" stroke="url(#gradUpRight)" strokeWidth="2" filter="url(#glow)" />
              <line x1="50%" y1="50%" x2="25%" y2="75%" vectorEffect="non-scaling-stroke" stroke="url(#gradDownLeft)" strokeWidth="2" filter="url(#glow)" />
              <line x1="50%" y1="50%" x2="75%" y2="75%" vectorEffect="non-scaling-stroke" stroke="url(#gradDownRight)" strokeWidth="2" filter="url(#glow)" />
            </svg>

            {/* Layout: top grid – orb – bottom grid */}
            <div className="flex flex-col items-center gap-12 md:gap-16 relative z-10">
              {/* Top two steps */}
              <div className="grid grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl">
                {processSteps.slice(0, 2).map((step, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-[var(--bg-card)] backdrop-blur-xl border border-[#2AB182]/20 rounded-2xl p-6 lg:p-8 hover:border-[#2AB182]/60 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(42,177,130,0.25)] hover:-translate-y-1"
                  >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2AB182]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-4xl lg:text-5xl font-black text-[#2AB182]/10 group-hover:text-[#2AB182]/30 transition-colors duration-500">
                          {step.id}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-[#2AB182] shadow-[0_0_10px_#2AB182] animate-pulse" />
                      </div>
                      <h3 className="font-display text-base lg:text-xl font-bold text-[var(--text-primary)] uppercase tracking-wide leading-tight mb-4 group-hover:text-[#2AB182] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <ul className="space-y-2 lg:space-y-3">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs lg:text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2AB182] mt-1.5 shrink-0 shadow-[0_0_6px_#2AB182]" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2AB182]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>

              {/* Enhanced Central orb */}
              <div className="relative z-20 shrink-0 my-4">
                {/* Outer glow rings */}
                <div className="absolute inset-0 -m-8 md:-m-12">
                  <div className="w-full h-full rounded-full bg-[#2AB182]/5 blur-2xl animate-pulse" />
                </div>
                <div className="absolute inset-0 -m-4 md:-m-6">
                  <div className="w-full h-full rounded-full border border-[#2AB182]/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Main orb container */}
                <div className="relative w-32 h-32 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-[#0A0A0A] via-[#0E1419] to-[#0A0A0A] border-2 border-[#2AB182]/30 flex items-center justify-center shadow-[0_0_60px_rgba(42,177,130,0.3),inset_0_0_60px_rgba(42,177,130,0.1)]">
                  {/* Animated rotating gradient background */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2AB182]/20 via-transparent to-[#2AB182]/10 animate-spin-slow" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-[#2AB182]/10 via-transparent to-transparent animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
                  </div>

                  {/* Middle ring */}
                  <div className="relative w-20 h-20 md:w-36 md:h-36 rounded-full border-2 border-[#2AB182]/50 shadow-[0_0_30px_#2AB182,inset_0_0_30px_rgba(42,177,130,0.3)] flex items-center justify-center backdrop-blur-sm">
                    {/* Inner core */}
                    <div className="relative w-12 h-12 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#2AB182] via-[#2AB182]/80 to-emerald-500 shadow-[0_0_40px_#2AB182,inset_0_0_20px_rgba(255,255,255,0.3)] animate-pulse">
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
                      {/* Pulsing inner glow */}
                      <div className="absolute inset-2 rounded-full bg-[#2AB182] blur-md opacity-60 animate-pulse" />
                    </div>
                  </div>

                  {/* Orbiting particles */}
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '12s' }}>
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-[#2AB182] rounded-full shadow-[0_0_8px_#2AB182] -translate-x-1/2" />
                  </div>
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_6px_#2AB182] -translate-x-1/2" />
                  </div>
                </div>
              </div>

              {/* Bottom two steps */}
              <div className="grid grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl">
                {processSteps.slice(2, 4).map((step, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-[var(--bg-card)] backdrop-blur-xl border border-[#2AB182]/20 rounded-2xl p-6 lg:p-8 hover:border-[#2AB182]/60 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(42,177,130,0.25)] hover:-translate-y-1"
                  >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2AB182]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-4xl lg:text-5xl font-black text-[#2AB182]/10 group-hover:text-[#2AB182]/30 transition-colors duration-500">
                          {step.id}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-[#2AB182] shadow-[0_0_10px_#2AB182] animate-pulse" />
                      </div>
                      <h3 className="font-display text-base lg:text-xl font-bold text-[var(--text-primary)] uppercase tracking-wide leading-tight mb-4 group-hover:text-[#2AB182] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <ul className="space-y-2 lg:space-y-3">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs lg:text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2AB182] mt-1.5 shrink-0 shadow-[0_0_6px_#2AB182]" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2AB182]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-32 text-center px-6 bg-[var(--bg-primary)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold mb-8 leading-tight">
            Ready to Build Your <span className="text-[#2AB182]">Growth System?</span>
          </h2>
          <p className="font-body text-[var(--text-muted)] text-xl mb-12">
            Let's talk about your goals and how we can help you achieve them.
          </p>
          <button
            onClick={onContactClick}
            className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300"
          >
            Get Started
            <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
