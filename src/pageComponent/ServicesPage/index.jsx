import React, { useState } from 'react';
import { ArrowRight, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react';

const serviceDetails = [
    {
        title: "Performance Marketing",
        desc: "Data-driven campaigns that maximize ROI across Meta, Google, and LinkedIn.",
        features: ["Campaign Strategy & Setup", "Ad Creative Production", "A/B Testing & Optimization", "Detailed Analytics & Reporting"],
        outcome: "Predictable lead generation and sales growth."
    },
    {
        title: "Social Media Management",
        desc: "Building brand authority and community through engaging content and strategic management.",
        features: ["Content Calendar & Strategy", "Community Management", "Influencer Collaboration", "Trend Analysis"],
        outcome: "Increased brand awareness and customer loyalty."
    },
    {
        title: "Web & App Development",
        desc: "Creating high-performance, scalable, and user-centric digital experiences.",
        features: ["Custom Website Design", "E-commerce Development", "Mobile App Development", "SEO Optimization"],
        outcome: "A robust digital presence that converts visitors into customers."
    },
    {
        title: "AI & Automation",
        desc: "Streamlining operations and enhancing customer experiences with cutting-edge AI solutions.",
        features: ["Chatbot Implementation", "Workflow Automation", "CRM Integration", "Data Analysis"],
        outcome: "Improved efficiency and reduced operational costs."
    }
];

const antiAgencyValues = [
    "No Long-term Contracts", "Transparent Reporting", "Dedicated Account Manager",
    "Focus on ROI", "Agile Methodology", "Continuous Innovation"
];

const processStepsData = [
    {
        id: "01",
        title: "Discovery & Strategy",
        items: ["Market Research", "Competitor Analysis", "Goal Setting"]
    },
    {
        id: "02",
        title: "Setup & Execution",
        items: ["Campaign Setup", "Creative Development", "Tracking Implementation"]
    },
    {
        id: "03",
        title: "Optimization & Scaling",
        items: ["Performance Monitoring", "A/B Testing", "Budget Scaling"]
    },
    {
        id: "04",
        title: "Reporting & Analysis",
        items: ["Weekly Reports", "Strategy Review", "Future Planning"]
    }
];

const ServicesPage = ({ onContactClick }) => {
    const [openServiceIndex, setOpenServiceIndex] = useState(null);

    const toggleService = (index) => {
        setOpenServiceIndex(openServiceIndex === index ? null : index);
    };

    const processSteps = processStepsData;

    return (
        <div className="pt-32 min-h-screen">
            {/* SECTION 1 — Services Hero */}
            <section className="px-6 md:px-12 mb-24">
                <div className="max-w-[1600px] mx-auto">
                    <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
                        What We Do
                    </p>
                    <h1 className="font-display font-bold text-[10vw] md:text-[7vw] leading-[0.9] tracking-tight text-white uppercase mb-8">
                        Performance-Driven <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Growth Systems.</span>
                    </h1>
                    <p className="font-body text-lg md:text-xl text-[#888] max-w-2xl">
                        We don’t offer “digital marketing services.” We build scalable growth systems powered by ads, data, and AI.
                    </p>
                </div>
            </section>

            {/* SECTION 2 — Services Overview (4 Core Services - Detailed) */}
            <section id="services-details" className="border-y border-[#333] relative z-10 bg-[#1A1A1A]/30 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20">
                    <h2 className="font-display text-4xl text-white font-bold mb-12 uppercase">4 Core Services</h2>
                    <div className="flex flex-col">
                        {serviceDetails.map((service, index) => {
                            const isOpen = openServiceIndex === index;
                            return (
                                <div key={index} className="border-t border-[#333] last:border-b">
                                    <div
                                        className="group py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#0E0E0E]/50 transition-colors cursor-pointer"
                                        onClick={() => toggleService(index)}
                                    >
                                        <h3 className="font-display text-2xl md:text-4xl font-bold uppercase text-white group-hover:text-[#2AB182] transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <p className="font-body max-w-sm text-[#888] text-sm md:text-base group-hover:text-[#E0E0E0] transition-colors hidden sm:block">
                                                {service.desc.substring(0, 70)}...
                                            </p>
                                            <button className="p-2 border border-[#333] rounded-full group-hover:border-[#2AB182] transition-colors">
                                                {isOpen ? <ChevronUp className="text-[#2AB182]" size={20} /> : <ChevronDown className="text-white group-hover:text-[#2AB182]" size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Collapsible Details */}
                                    <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden pb-8 md:pb-12 pt-0">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="md:w-full mb-6 md:mb-0">
                                                    <h4 className="font-display text-xl text-white font-bold mb-4">What this includes:</h4>
                                                    <ul className="space-y-3 font-body text-sm text-[#888]">
                                                        {service.features.map((feature, i) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <CheckCircle className="w-3 h-3 shrink-0 text-[#2AB182]" />
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="md:w-full p-8 border border-[#333] rounded-lg bg-[#0E0E0E]">
                                                    <h4 className="font-display text-xl text-[#2AB182] font-bold mb-3">Core Outcome:</h4>
                                                    <p className="font-body text-white text-lg italic leading-relaxed">{service.outcome}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — Why Choose Invictus (Anti-Agency Positioning) */}
            <section className="py-24 px-6 md:px-12 border-b border-[#333] bg-[#0E0E0E] relative z-10">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                        <div className="lg:col-span-1">
                            <h2 className="font-display text-4xl md:text-5xl text-white font-bold uppercase leading-tight mb-4">
                                Why Brands <span className="text-[#2AB182]">Choose Us</span>
                            </h2>
                            <p className="font-body text-[#888] text-lg">
                                If you want real outcomes, not random reports — you’ll love working with us.
                            </p>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="grid md:grid-cols-3 gap-6">
                                {antiAgencyValues.map((value, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 border border-[#333] rounded-lg bg-[#1A1A1A]/50">
                                        <CheckCircle className="text-[#2AB182] shrink-0 mt-1" size={20} />
                                        <p className="font-body text-sm font-medium text-white">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5 — Our Process (Process Steps) */}
            <section className="py-24 border-b border-[#333] relative z-10 bg-[#0E0E0E]">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                        <span className="text-[#2AB182] font-body text-sm tracking-[0.2em] uppercase font-bold mb-4 block">OUR METHODOLOGY</span>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
                            The 4-Step Performance Engine
                        </h2>
                        <p className="font-body text-[#888] mt-4">Performance is engineered — not guessed.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative z-10 group">
                                <h3 className="font-display text-xl font-bold mb-6 text-[#2AB182] transition-colors duration-500">
                                    <span className="mr-2">{step.id}</span>
                                    {step.title}
                                </h3>
                                <ul className="space-y-3 font-body text-sm text-[#888]">
                                    {step.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-white/80">
                                            <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2 bg-[#2AB182]"></div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — Strong Final CTA */}
            <section className="py-32 border-t border-[#333] text-center px-6 bg-[#1A1A1A]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-8 leading-tight">
                        If You’re Serious About <span className="text-[#2AB182]">Scaling</span> — Let’s Talk.
                    </h2>
                    <p className="font-body text-[#888] text-xl mb-12">
                        We don’t take on every project. We take on the right ones. <br className="hidden md:block" />
                        <span className="text-white">If you’re growth-ready and want a partner who owns the numbers with you:</span>
                    </p>
                    <button
                        onClick={onContactClick}
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

export default ServicesPage;
