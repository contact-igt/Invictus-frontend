import React from 'react';
import { ArrowRight, CheckCircle, Minus, Plus } from 'lucide-react';
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

const HomePage = ({ activeStep, setActiveStep, stepRefs, activeFaq, toggleFaq }) => {
  const router = useRouter();
  const processSteps = processStepsData;

  const handleNavClick = (path) => {
    router.push(path);
  };

  return (
    <div className="pt-20">
      {/* SECTION 1 — Hero Section (Performance-Driven Growth) */}
      <section id="hero" className="min-h-screen flex flex-col justify-end pb-12 px-6 md:px-12 pt-32 relative border-b border-[#333]">
        <div className="max-w-[1600px] w-full mx-auto relative z-10">
          <div className="mb-12">
            <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
              <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
              Performance-Driven Growth for Serious Brands
            </p>
            <h1 className="font-display font-bold text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight text-white uppercase">
              Marketing<br />
              That Pays<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">You Back.</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 w-full border-t border-[#333] pt-8">
            <p className="font-body max-w-md text-[#888] text-sm md:text-lg leading-relaxed">
              We don’t sell clicks or impressions. We build scalable growth systems powered by ads, data, and AI.
            </p>

            <button
              onClick={() => router.push('/contact')}
              className="group flex items-center gap-4 bg-[#2AB182] text-black px-8 py-4 rounded-none font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 font-body"
            >
              Start Project
              <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Marquee - Key Differentiators */}
      <div className="border-b border-[#333] bg-[#1A1A1A]/50 backdrop-blur-sm py-6 overflow-hidden relative z-10">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="font-display text-4xl md:text-6xl font-bold stroke-text uppercase">Performance First</span>
              <div className="w-3 h-3 bg-[#2AB182] rounded-full"></div>
              <span className="font-display text-4xl md:text-6xl font-bold text-white uppercase">Data Driven</span>
              <div className="w-3 h-3 bg-[#2AB182] rounded-full"></div>
              <span className="font-display text-4xl md:text-6xl font-bold stroke-text uppercase">Revenue Focused</span>
              <div className="w-3 h-3 bg-[#2AB182] rounded-full"></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Philosophy Section (Anti-Agency) */}
      <section className="border-b border-[#333] relative z-10">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-20 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-between min-h-[400px] backdrop-blur-sm">
            <span className="font-body text-xs text-[#888] uppercase tracking-widest mb-4">(01) — Philosophy</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight text-white">
              Not an Agency.<br />
              A <span className="text-[#2AB182]">Growth Partner.</span>
            </h2>
          </div>
          <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-[#0E0E0E]/80 backdrop-blur-sm">
            <p className="font-body text-lg md:text-xl text-[#888] leading-relaxed mb-10">
              Most agencies sell "branding" and "reach". We work on data, accountability, and clear numbers. If it doesn't drive revenue, we don't do it.
            </p>
            <ul className="space-y-6 font-display text-lg md:text-xl">
              {[
                "Quality leads, not random enquiries",
                "Full-funnel tracking (Impression → Sale)",
                "Transparent dashboards"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-white group">
                  <CheckCircle className="text-[#2AB182] w-6 h-6" />
                  <span className="group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services Callout - Points to the new ServicesPage */}
      <section className="py-20 border-b border-[#333] px-6 md:px-12 relative z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-white leading-tight">
            Our Core <span className="text-[#2AB182]">Capabilities</span>
          </h2>
          <p className="font-body max-w-lg text-[#888]">
            We build scalable growth systems powered by ads, data, and AI. View the breakdown of our 4 core services.
          </p>
          <button
            onClick={() => handleNavClick('/services')}
            className="group flex items-center gap-3 border border-[#2AB182] text-[#2AB182] px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-[#2AB182] hover:text-black transition-all duration-300"
          >
            View Detailed Services
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
          </button>
        </div>
      </section>


      {/* Industries Callout - Points to the new ClientsIndustriesPage */}
      <section id="industries" className="border-b border-[#333] relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="p-8 md:p-12 border-b border-[#333] text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-white leading-tight">
              Industries We Transform
              <span className="text-[#2AB182]"> (See Our Client Portfolio)</span>
            </h2>
            <p className="font-body text-[#888] mt-4">We go deep into niches where performance truly matters, from Healthcare to E-commerce.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 min-h-[50vh]">
            {/* Quick Industry Preview */}
            {["Healthcare", "EdTech", "E-commerce", "Automobile"].map((name, index) => (
              <div
                key={index}
                className={`p-8 border-b md:border-b-0 border-r border-[#333] last:border-r-0 flex flex-col justify-center items-center group hover:bg-[#2AB182] hover:text-black transition-colors duration-500 bg-[#0E0E0E]/80 backdrop-blur-sm`}
              >
                <h3 className="font-display text-2xl font-bold uppercase mb-4">{name}</h3>
              </div>
            ))}
          </div>
          <div className="p-8 text-center border-t border-[#333]">
            <button
              onClick={() => handleNavClick('/clients')}
              className="group flex items-center justify-center mx-auto gap-3 border border-[#333] text-white px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              View All Case Studies & Clients
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-[#333] py-20 px-6 md:px-12 bg-[#1A1A1A]/80 backdrop-blur-sm relative z-10">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-9xl font-bold text-[#2AB182] mb-2">
              <CountUp end={3} duration={2} suffix="x" />
            </h2>
            <p className="font-body text-[#888] uppercase tracking-widest text-sm">Avg. Client ROAS</p>
          </div>
          <div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-2">
              <CountUp end={40} duration={2} prefix="-" suffix="%" />
            </h2>
            <p className="font-body text-[#888] uppercase tracking-widest text-sm">Cost Per Lead Reduction</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Process Steps (Methodology) */}
      <section id="process" className="py-24 border-b border-[#333] relative z-10 bg-[#0E0E0E]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-[#2AB182] font-body text-sm tracking-[0.2em] uppercase font-bold mb-4 block">OUR METHODOLOGY</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
              The 4-Step Performance Engine
            </h2>
            <p className="font-body text-[#888] mt-4">Performance is engineered — not guessed.</p>
          </div>

          <div className="relative">
            {/* Horizontal timeline line (Desktop) */}
            <div className="hidden lg:block absolute top-[24px] left-0 w-full h-[1px] bg-[#333] z-0"></div>
            {/* Vertical timeline line (Mobile) */}
            <div className="lg:hidden absolute top-0 left-[22px] w-[1px] h-full bg-[#333] z-0">
              {/* Mobile Progress Bar */}
              <div
                className="absolute top-0 left-0 w-full bg-[#2AB182] transition-all duration-1000 ease-out"
                style={{ height: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
              ></div>
            </div>

            <div className="grid lg:grid-cols-4 gap-12 md:gap-8">
              {processSteps.map((step, index) => {
                // Determine active state for coloring (mobile only uses <= activeStep)
                const isMobileActive = index <= activeStep;
                return (
                  <div
                    key={index}
                    ref={el => {
                      // Assign ref to array element
                      if (stepRefs && stepRefs.current) {
                        stepRefs.current[index] = el;
                      }
                    }}
                    data-index={index}
                    className="relative z-10 group pl-16 lg:pl-0"
                  >

                    {/* Step Indicator Dot */}
                    <div className={`
                        absolute left-0 top-0 lg:relative w-12 h-12 rounded-full border flex items-center justify-center mb-8 mx-auto lg:mx-0 
                        transition-all duration-500
                        ${isMobileActive ? 'border-[#2AB182] lg:border-white lg:group-hover:border-[#2AB182]' : 'border-white lg:group-hover:border-[#2AB182]'}
                        bg-[#0E0E0E]
                      `}>
                      <div className={`
                            w-4 h-4 rounded-full transition-all duration-500
                            ${isMobileActive ? 'bg-[#2AB182] lg:bg-white lg:group-hover:bg-[#2AB182]' : 'bg-white lg:group-hover:bg-[#2AB182]'}
                      `}></div>
                    </div>

                    {/* Step Title */}
                    <h3 className={`
                        font-display text-xl font-bold mb-6 transition-colors duration-500
                        ${isMobileActive ? 'text-[#2AB182] lg:text-white lg:group-hover:text-[#2AB182]' : 'text-white lg:group-hover:text-[#2AB182]'}
                      `}>
                      <span className="mr-2">{step.id}</span>
                      {step.title}
                    </h3>

                    {/* Step Details */}
                    <ul className="space-y-3 font-body text-sm transition-colors duration-500">
                      {step.items.map((item, idx) => (
                        <li key={idx} className={`
                            flex items-start gap-2 transition-colors duration-500
                            ${isMobileActive ? 'text-white lg:text-[#888] lg:group-hover:text-white' : 'text-[#888] lg:group-hover:text-white'}
                          `}>
                          <div className={`
                              w-1 h-1 rounded-full flex-shrink-0 mt-2 transition-colors duration-500
                              ${isMobileActive ? 'bg-[#2AB182] lg:bg-[#888] lg:group-hover:bg-[#2AB182]' : 'bg-[#888] lg:group-hover:bg-[#2AB182]'}
                          `}></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-b border-[#333] px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-bold uppercase mb-12 text-white text-center">FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Do you work on performance-based pricing?", a: "We primarily work on a retainer + performance structure. Pure performance deals are evaluated on a case-by-case basis depending on your margins and historical data." },
              { q: "What is the minimum budget?", a: "We typically recommend a minimum monthly ad spend that ensures statistical significance for testing and scaling (usually $2k+)." },
              { q: "How soon can we see results?", a: "For lead-gen campaigns, we usually start seeing data in the first 7–10 days, and meaningful optimisation from week 3 onwards." }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => toggleFaq(index)}>
                <div className={`flex justify-between items-center border-b border-[#333] pb-4 transition-colors ${activeFaq === index ? 'border-[#2AB182]' : ''}`}>
                  <h3 className={`font-body text-lg md:text-xl font-medium transition-all ${activeFaq === index ? 'text-[#2AB182] pl-4' : 'text-white group-hover:text-[#2AB182]'}`}>
                    {item.q}
                  </h3>
                  {activeFaq === index ?
                    <Minus className="text-[#2AB182]" size={24} /> :
                    <Plus className="text-[#888] group-hover:text-white" size={24} />
                  }
                </div>
                <div className={`grid transition-all duration-300 ease-in-out ${activeFaq === index ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="font-body text-[#888] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Contact CTA (Directs to standalone Contact Page) */}
      <section id="contact-cta" className="py-32 border-t border-[#333] text-center px-6 bg-[#1A1A1A]/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-8 leading-tight">
            If You’re Serious About <span className="text-[#2AB182]">Growth</span>, Let’s Talk.
          </h2>
          <p className="font-body text-[#888] text-xl mb-12">
            We don’t take on every project. We take on the right ones. <br className="hidden md:block" />
            <span className="text-white">If you’re growth-ready and want a partner who owns the numbers with you:</span>
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-white transition-all duration-300"
          >
            Book a Discovery Call
            <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
