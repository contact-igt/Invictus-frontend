import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  Plus,
  Minus,
} from "lucide-react";

const HomePageComponent = ({
  activeStep,
  stepRefs,
  activeFaq,
  toggleFaq,
  handleFormSubmit,
  formStatus,
  scrollToContact,
}) => {
  const processSteps = [
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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-end pb-12 px-6 md:px-12 pt-32 relative border-b border-[#333]"
      >
        <div className="max-w-[1600px] w-full mx-auto relative z-10">
          <div className="mb-12">
            <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
              <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
              Performance Marketing Agency
            </p>
            <h1 className="font-display font-bold text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight text-white uppercase">
              Marketing
              <br />
              That Pays
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">
                You Back.
              </span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 w-full border-t border-[#333] pt-8">
            <p className="font-body max-w-md text-[#888] text-sm md:text-lg leading-relaxed">
              We don't sell clicks or impressions. We sell qualified leads,
              appointments, and measurable revenue.
            </p>

            <button
              onClick={scrollToContact}
              className="group flex items-center gap-4 bg-[#2AB182] text-black px-8 py-4 rounded-none font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 font-body"
            >
              Start Project
              <ArrowRight
                className="group-hover:-rotate-45 transition-transform duration-300"
                size={20}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b border-[#333] bg-[#1A1A1A]/50 backdrop-blur-sm py-6 overflow-hidden relative z-10">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="font-display text-4xl md:text-6xl font-bold stroke-text uppercase">
                Performance First
              </span>
              <div className="w-3 h-3 bg-[#2AB182] rounded-full"></div>
              <span className="font-display text-4xl md:text-6xl font-bold text-white uppercase">
                Data Driven
              </span>
              <div className="w-3 h-3 bg-[#2AB182] rounded-full"></div>
              <span className="font-display text-4xl md:text-6xl font-bold stroke-text uppercase">
                Revenue Focused
              </span>
              <div className="w-3 h-3 bg-[#2AB182] rounded-full"></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="border-b border-[#333] relative z-10">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2">
          <div className="p-8 md:p-20 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-between min-h-[400px] backdrop-blur-sm">
            <span className="font-body text-xs text-[#888] uppercase tracking-widest mb-4">
              (01) — Philosophy
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight text-white">
              Not an Agency.
              <br />A <span className="text-[#2AB182]">Growth Partner.</span>
            </h2>
          </div>
          <div className="p-8 md:p-20 flex flex-col justify-center bg-[#0E0E0E]/80 backdrop-blur-sm">
            <p className="font-body text-lg md:text-xl text-[#888] leading-relaxed mb-10">
              Most agencies sell "branding" and "reach". We work on data,
              accountability, and clear numbers. If it doesn't drive revenue, we
              don't do it.
            </p>
            <ul className="space-y-6 font-display text-lg md:text-xl">
              {[
                "Quality leads, not random enquiries",
                "Full-funnel tracking (Impression → Sale)",
                "Transparent dashboards",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-white group"
                >
                  <CheckCircle className="text-[#2AB182] w-6 h-6" />
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="border-b border-[#333] relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20">
          <span className="font-body text-xs text-[#888] uppercase tracking-widest mb-12 block">
            (02) — Capabilities
          </span>

          <div className="flex flex-col">
            {[
              {
                title: "Paid Media",
                desc: "Google, Meta, & YouTube ads designed to convert. Continuous scaling and optimization.",
              },
              {
                title: "Social ROI",
                desc: "Creatives designed for conversion, not just aesthetics. Retargeting strategies that work.",
              },
              {
                title: "Web & Funnels",
                desc: "High-conversion landing pages. Mobile-first structure with full pixel setup.",
              },
              {
                title: "AI & Auto",
                desc: "Automated WhatsApp flows, lead scoring systems, and AI support assistants.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group border-t border-[#333] py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#1A1A1A]/50 transition-colors cursor-default"
              >
                <h3 className="font-display text-3xl md:text-5xl font-bold uppercase text-white group-hover:text-[#2AB182] group-hover:translate-x-4 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="font-body max-w-sm text-[#888] text-sm md:text-base group-hover:text-[#E0E0E0] transition-colors">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="border-b border-[#333] relative z-10">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 min-h-[50vh]">
          {[
            {
              name: "Healthcare",
              desc: "Patient acquisition funnels & surgery lead generation.",
            },
            {
              name: "EdTech",
              desc: "Admission campaigns & high-ticket course sales.",
            },
            {
              name: "E-commerce",
              desc: "ROAS-focused creative testing & catalog sales.",
            },
            {
              name: "Automobile",
              desc: "Test drive bookings & showroom footfall.",
            },
          ].map((industry, index) => (
            <div
              key={index}
              className="p-8 border-b md:border-b-0 border-r border-[#333] last:border-r-0 flex flex-col justify-between group hover:bg-[#2AB182] hover:text-black transition-colors duration-500 bg-[#0E0E0E]/80 backdrop-blur-sm"
            >
              <span className="font-body text-sm uppercase tracking-widest opacity-50">
                Niche 0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase mb-4">
                  {industry.name}
                </h3>
                <p className="font-body text-sm opacity-70">{industry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-[#333] py-20 px-6 md:px-12 bg-[#1A1A1A]/80 backdrop-blur-sm relative z-10">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-6xl md:text-9xl font-bold text-[#2AB182] mb-2">
              3x
            </h2>
            <p className="font-body text-[#888] uppercase tracking-widest text-sm">
              Avg. Client ROAS
            </p>
          </div>
          <div>
            <h2 className="font-display text-6xl md:text-9xl font-bold text-white mb-2">
              -40%
            </h2>
            <p className="font-body text-[#888] uppercase tracking-widest text-sm">
              Cost Per Lead
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps (Methodology) */}
      <section
        id="process"
        className="py-24 border-b border-[#333] relative z-10 bg-[#0E0E0E]"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-[#2AB182] font-body text-sm tracking-[0.2em] uppercase font-bold mb-4 block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
              The way we build brands that don’t just grow — they scale.
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-[24px] left-0 w-full h-[1px] bg-[#333] z-0"></div>
            <div className="md:hidden absolute top-0 left-[22px] w-[1px] h-full bg-[#333] z-0">
              <div
                className="absolute top-0 left-0 w-full bg-[#2AB182] transition-all duration-1000 ease-out"
                style={{
                  height: `${(activeStep / (processSteps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            <div className="grid md:grid-cols-4 gap-12 md:gap-8">
              {processSteps.map((step, index) => {
                const isMobileActive = index <= activeStep;
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      // Fix: Safe access to refs to prevent "current undefined" errors
                      if (stepRefs && stepRefs.current) {
                        stepRefs.current[index] = el;
                      }
                    }}
                    data-index={index}
                    className="relative z-10 group pl-16 md:pl-0"
                  >
                    <div
                      className={`
                        absolute left-0 top-0 md:relative w-12 h-12 rounded-full border flex items-center justify-center mb-8 mx-auto md:mx-0 
                        transition-all duration-500
                        ${
                          isMobileActive
                            ? "border-[#2AB182] md:border-white md:group-hover:border-[#2AB182]"
                            : "border-white md:group-hover:border-[#2AB182]"
                        }
                        bg-[#0E0E0E]
                     `}
                    >
                      <div
                        className={`
                           w-4 h-4 rounded-full transition-all duration-500
                           ${
                             isMobileActive
                               ? "bg-[#2AB182] md:bg-white md:group-hover:bg-[#2AB182]"
                               : "bg-white md:group-hover:bg-[#2AB182]"
                           }
                        `}
                      ></div>
                    </div>

                    <h3
                      className={`
                        font-display text-xl font-bold mb-6 transition-colors duration-500
                        ${
                          isMobileActive
                            ? "text-[#2AB182] md:text-white md:group-hover:text-[#2AB182]"
                            : "text-white md:group-hover:text-[#2AB182]"
                        }
                     `}
                    >
                      <span className="mr-2">{step.id}</span>
                      {step.title}
                    </h3>

                    <ul className="space-y-3 font-body text-sm transition-colors duration-500">
                      {step.items.map((item, idx) => (
                        <li
                          key={idx}
                          className={`
                             flex items-start gap-2 transition-colors duration-500
                             ${
                               isMobileActive
                                 ? "text-white md:text-[#888] md:group-hover:text-white"
                                 : "text-[#888] md:group-hover:text-white"
                             }
                          `}
                        >
                          <div
                            className={`
                               w-1 h-1 rounded-full flex-shrink-0 mt-2 transition-colors duration-500
                               ${
                                 isMobileActive
                                   ? "bg-[#2AB182] md:bg-[#888] md:group-hover:bg-[#2AB182]"
                                   : "bg-[#888] md:group-hover:bg-[#2AB182]"
                               }
                            `}
                          ></div>
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
          <h2 className="font-display text-4xl font-bold uppercase mb-12 text-white text-center">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do you work on performance-based pricing?",
                a: "We primarily work on a retainer + performance structure. Pure performance deals are evaluated on a case-by-case basis depending on your margins and historical data.",
              },
              {
                q: "What is the minimum budget?",
                a: "We typically recommend a minimum monthly ad spend that ensures statistical significance for testing and scaling (usually $2k+).",
              },
              {
                q: "How soon can we see results?",
                a: "For lead-gen campaigns, we usually start seeing data in the first 7–10 days, and meaningful optimisation from week 3 onwards.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div
                  className={`flex justify-between items-center border-b border-[#333] pb-4 transition-colors ${
                    activeFaq === index ? "border-[#2AB182]" : ""
                  }`}
                >
                  <h3
                    className={`font-body text-lg md:text-xl font-medium transition-all ${
                      activeFaq === index
                        ? "text-[#2AB182] pl-4"
                        : "text-white group-hover:text-[#2AB182]"
                    }`}
                  >
                    {item.q}
                  </h3>
                  {activeFaq === index ? (
                    <Minus className="text-[#2AB182]" size={24} />
                  ) : (
                    <Plus
                      className="text-[#888] group-hover:text-white"
                      size={24}
                    />
                  )}
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    activeFaq === index
                      ? "grid-rows-[1fr] opacity-100 pt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
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

      {/* Contact Section */}
      <section
        id="contact"
        className="grid md:grid-cols-2 border-b border-[#333] min-h-screen relative z-10"
      >
        <div className="p-8 md:p-20 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-center relative overflow-hidden backdrop-blur-sm">
          <div className="relative z-10">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-tight mb-8 text-white">
              Let's
              <br />
              <span className="text-[#2AB182]">Scale.</span>
            </h2>
            <div className="space-y-6 font-body text-[#888] text-sm md:text-base">
              <div className="flex items-center gap-4 hover:text-white transition-colors">
                <Mail className="text-[#2AB182]" size={20} />
                <a href="mailto:contact@invictusglobaltech.com">
                  contact@invictusglobaltech.com
                </a>
              </div>
              <div className="flex items-center gap-4 hover:text-white transition-colors">
                <Phone className="text-[#2AB182]" size={20} />
                <a href="tel:6369757054">6369 757 054</a>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-20 flex flex-col justify-center bg-[#0E0E0E]/80 backdrop-blur-sm">
          {formStatus === "success" ? (
            <div className="text-center animate-fade-in">
              <CheckCircle className="mx-auto text-[#2AB182] w-16 h-16 mb-6" />
              <h3 className="font-display text-3xl uppercase text-white mb-2">
                Received
              </h3>
              <p className="font-body text-[#888]">
                We'll analyze your business and get back to you shortly.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="mt-8 text-[#2AB182] font-bold underline underline-offset-4"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#888] font-bold font-body">
                  Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border-b border-[#333] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-white placeholder-[#333]"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#888] font-bold font-body">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-transparent border-b border-[#333] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-white placeholder-[#333]"
                  placeholder="Email Address"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#888] font-bold font-body">
                    Budget
                  </label>
                  <select className="w-full bg-transparent border-b border-[#333] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-white appearance-none rounded-none cursor-pointer">
                    <option className="bg-[#1A1A1A]">&lt; $5k</option>
                    <option className="bg-[#1A1A1A]">$5k - $20k</option>
                    <option className="bg-[#1A1A1A]">$20k+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#888] font-bold font-body">
                    Industry
                  </label>
                  <select className="w-full bg-transparent border-b border-[#333] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-white appearance-none rounded-none cursor-pointer">
                    <option className="bg-[#1A1A1A]">Healthcare</option>
                    <option className="bg-[#1A1A1A]">EdTech</option>
                    <option className="bg-[#1A1A1A]">E-commerce</option>
                    <option className="bg-[#1A1A1A]">Automobile</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full bg-white text-black font-display font-bold uppercase tracking-widest py-5 mt-8 hover:bg-[#2AB182] transition-all duration-300 disabled:opacity-50"
              >
                {formStatus === "submitting"
                  ? "Sending..."
                  : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePageComponent;
