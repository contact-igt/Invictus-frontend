import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const clientIndustries = [
    {
        name: "Healthcare & Medical",
        portfolio: ["Hospitals", "Clinics", "Doctors", "RCM Companies"],
        services: ["Patient Acquisition", "Brand Awareness", "Lead Generation", "Website Development"]
    },
    {
        name: "Education & EdTech",
        portfolio: ["Universities", "Colleges", "Training Institutes", "Online Courses"],
        services: ["Student Enrollment", "Course Sales", "Brand Positioning", "LMS Development"]
    },
    {
        name: "E-commerce & D2C",
        portfolio: ["Fashion", "Beauty", "Electronics", "Home Decor"],
        services: ["Sales Growth", "ROAS Optimization", "Brand Building", "Shopify Development"]
    },
    {
        name: "Real Estate & Construction",
        portfolio: ["Developers", "Agents", "Architects", "Interior Designers"],
        services: ["Lead Generation", "Project Showcasing", "Brand Awareness", "Virtual Tours"]
    },
    {
        name: "B2B & Consulting",
        portfolio: ["SaaS", "IT Services", "Business Consultants", "Law Firms"],
        services: ["Lead Generation", "LinkedIn Marketing", "Content Strategy", "Website Development"]
    }
];

const clientList = [
    { name: "Pixel Eye Hospital", logoLight: "/client_logo/pixeleye-logo-white.webp", logoDark: "/client_logo/pixeleye-logo-dark.webp", logoClass: "max-h-[100px] md:max-h-[220px] max-w-[98%]" },
    { name: "Antardrashti Netralaya", logoLight: "/client_logo/antardarshti-netralaya-logo-light.webp", logoDark: "/client_logo/antardarshti-netralaya-logo-dark.webp", logoClass: "max-h-14 md:max-h-20 max-w-[80%]" },
    { name: "Naitrika Eye Care", logoLight: "/client_logo/naitrika-logo-light.webp", logoDark: "/client_logo/naitrika-logo-dark.webp", logoClass: "max-h-[100px] md:max-h-20 max-w-[82%]" },
    { name: "Dr. Senthil Ophthall", logoLight: "/client_logo/ophthall-logo-light.webp", logoDark: "/client_logo/ophthall-logo-dark.webp", logoClass: "max-h-[90px] md:max-h-[160px] max-w-[90%]" },
    { name: "HealthPilot.ai", logoLight: "/client_logo/healthpilot-logo-light.webp", logoDark: "/client_logo/healthpilot-logo-dark.webp", logoClass: "max-h-[120px] md:max-h-[130px] max-w-[95%]" },
    { name: "Rio", logoLight: "/client_logo/rio-logo-light.webp", logoDark: "/client_logo/rio-logo-dark.webp", logoClass: "max-h-16 md:max-h-[75px] max-w-[88%]" },
    { name: "NextLevel.in", logoLight: "/client_logo/nextlevel-logo-light.webp", logoDark: "/client_logo/nextlevel-logo-dark.webp", logoClass: "max-h-[85px] md:max-h-[90px] max-w-[90%]" },
    { name: "777 Hosting", logoLight: "/client_logo/777hosting-logo-light.webp", logoDark: "/client_logo/777hosting-logo-dark.webp", logoClass: "max-h-[90px] md:max-h-[90px] max-w-[88%]" },
    { name: "VLS Law Academy", logoLight: "/client_logo/vls-logo-light.webp", logoDark: "/client_logo/vls-logo-dark.webp", logoClass: "max-h-[80px] md:max-h-[85px] max-w-[80%]" },
    { name: "KR Institute", logoLight: "/client_logo/krinstitute-logo-light.webp", logoDark: "/client_logo/krinstitute-logo-dark.webp", logoClass: "max-h-[90px] md:max-h-20 max-w-[85%]" },
    { name: "Wellinit (USA)", logoLight: "/client_logo/wellinit-logo-white.webp", logoDark: "/client_logo/wellinit-logo-dark.webp", logoClass: "max-h-[50px] md:max-h-20 max-w-[85%]" },
    { name: "Wild Funk", logoLight: "/client_logo/wildfunk-logo-light.webp", logoDark: "/client_logo/wildfunk-logo-dark-new.webp", logoClass: "max-h-[80px] md:max-h-20 max-w-[80%]" },
    { name: "Sri Krish Mirra Builders", logoLight: "/client_logo/skmb-logo-light.webp", logoDark: "/client_logo/skmb-logo-dark.webp", logoClass: "max-h-[100px] md:max-h-[160px] max-w-[96%]" },
    { name: "Phoenix Fitness", logoLight: "/client_logo/phoenix-fitness-logo-light.webp", logoDark: "/client_logo/phoenix-fitness-logo-dark.webp", logoClass: "max-h-[90px] md:max-h-20 max-w-[92%]" },
    { name: "Dhiren Eye Care", logoLight: "/client_logo/dhiren-logo-light.webp", logoDark: "/client_logo/dhiren-logo-dark.webp", logoClass: "max-h-[90px] md:max-h-22 max-w-[92%]" },
    { name: "RR Constructions", logoLight: "/client_logo/rr-construction-logo-light.webp", logoDark: "/client_logo/rrconstruction-logo-dark.webp", logoClass: "max-h-[95px] md:max-h-[110px] max-w-[92%]" },
    { name: "Blueray International", logoLight: "/client_logo/blueray-logo-ligh.webp", logoDark: "/client_logo/blueray-logo-dark.webp", logoClass: "max-h-[80px] md:max-h-20 max-w-[88%]" },
    { name: "Pulz Care", logoLight: "/client_logo/pulzcare-logo-light.webp", logoDark: "/client_logo/pulzcare-logo-dark.webp", logoClass: "max-h-[100px] md:max-h-[110px] max-w-[95%]" },
    { name: "Sky Thru Restaurant", logoLight: "/client_logo/skythru-logo-light.webp", logoDark: "/client_logo/skythru-logo-dark.webp", logoClass: "max-h-[100px] md:max-h-[140px] max-w-[88%]" },
    { name: "Global Uninexus", logoLight: "/client_logo/globaluninexus-logo-light.webp", logoDark: "/client_logo/globaluninexus-logo-dark.webp", logoClass: "max-h-[80px] md:max-h-22 max-w-[88%]" },
    { name: "Mahimy Foods", logoLight: "/client_logo/mahimy-foods-logo-light.webp", logoDark: "/client_logo/mahimy-foods-logo-dark.webp", logoClass: "max-h-[100px] md:max-h-[140px] max-w-[92%]" },
    { name: "Lydia Binil", logoLight: "/client_logo/lydia-binil-logo-light.webp", logoDark: "/client_logo/lydiabinil-logo-dark.webp", logoClass: "max-h-[65px] md:max-h-[70px] max-w-[85%]" },
    { name: "Ramanan Financial", logoLight: "/client_logo/ramanan-financial-logo-light.webp", logoDark: "/client_logo/ramanan-financial-logo-dark.webp", logoClass: "max-h-[80px] md:max-h-22 max-w-[88%]" },
    { name: "Triumph Vetrivel Motors", logoLight: "/client_logo/triumph-logo-light.webp", logoDark: "/client_logo/triumph-logo-dark.webp", logoClass: "max-h-[80px] md:max-h-[95px] max-w-[80%]" }
];

const getClientInitials = (name) => (
    name
        .replace(/\([^)]*\)/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
);

const smoothstep = (min, max, val) => {
    const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
    return x * x * (3 - 2 * x);
};

const ClientsIndustriesPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const sectionRef = useRef(null);

    // Initial page entrance animation & prefers-reduced-motion check
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 60);

        if (typeof window !== 'undefined') {
            const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
            setReducedMotion(mql.matches);
            const handler = (e) => setReducedMotion(e.matches);
            mql.addEventListener('change', handler);
            return () => {
                clearTimeout(timer);
                mql.removeEventListener('change', handler);
            };
        }
        return () => clearTimeout(timer);
    }, []);

    // Passive scroll tracking for the desktop transition stage
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (sectionRef.current) {
                        const rect = sectionRef.current.getBoundingClientRect();
                        const windowHeight = window.innerHeight || 800;
                        const totalDistance = rect.height - windowHeight;
                        if (totalDistance > 50) {
                            const rawP = Math.max(0, Math.min(1, -rect.top / totalDistance));
                            setScrollProgress((prev) => (Math.abs(prev - rawP) < 0.0008 ? prev : rawP));
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to target industry when user clicks a button in the left navigation
    const scrollToIndustry = (index) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sectionTop = rect.top + scrollTop;
        const windowHeight = window.innerHeight || 800;
        const totalDistance = rect.height - windowHeight;
        const totalSegments = clientIndustries.length - 1;
        const targetScrollY = sectionTop + (index / totalSegments) * totalDistance;
        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    };

    // Transition Progress Calculations (4 segments between the 5 industries)
    const totalSegments = clientIndustries.length - 1; // 4
    const progressVal = scrollProgress * totalSegments;
    const currIndex = Math.min(clientIndustries.length - 2, Math.max(0, Math.floor(progressVal)));
    const nextIndex = currIndex + 1;
    const rawFraction = progressVal - currIndex;
    // Smoothstep transition curve with resting plateaus (0.12 to 0.88)
    const transitionU = smoothstep(0.12, 0.88, rawFraction);
    const activeSidebarIndex = Math.min(
        clientIndustries.length - 1,
        Math.max(0, Math.round(progressVal))
    );

    const currCard = clientIndustries[currIndex];
    const nextCard = clientIndustries[nextIndex];
    const curtainY = (1 - transitionU) * 100;

    // Morph styles for Current Card (gently dissolves and moves upward behind curtain)
    const currMorph = {
        headingStyle: {
            opacity: 1 - smoothstep(0.05, 0.45, transitionU),
            transform: `translate3d(0, -${smoothstep(0.05, 0.45, transitionU) * 12}px, 0)`,
        },
        descStyle: {
            opacity: 1 - smoothstep(0.08, 0.50, transitionU),
            transform: `translate3d(0, -${smoothstep(0.08, 0.50, transitionU) * 12}px, 0)`,
        },
        capabilitiesStyle: {
            opacity: 1 - smoothstep(0.12, 0.60, transitionU),
            transform: `translate3d(0, -${smoothstep(0.12, 0.60, transitionU) * 10}px, 0)`,
        },
        actionStyle: {
            opacity: 1 - smoothstep(0.18, 0.68, transitionU),
        },
    };

    // Morph styles for Next Card (revealed from underneath: heading first, description shortly after)
    const nextMorph = {
        badgeStyle: {
            opacity: smoothstep(0.15, 0.55, transitionU),
            transform: `translate3d(0, ${(1 - smoothstep(0.15, 0.55, transitionU)) * 10}px, 0)`,
        },
        headingStyle: {
            opacity: smoothstep(0.25, 0.65, transitionU),
            transform: `translate3d(0, ${(1 - smoothstep(0.25, 0.65, transitionU)) * 14}px, 0)`,
        },
        descStyle: {
            opacity: smoothstep(0.40, 0.80, transitionU),
            transform: `translate3d(0, ${(1 - smoothstep(0.40, 0.80, transitionU)) * 14}px, 0)`,
        },
        capabilitiesStyle: {
            opacity: smoothstep(0.50, 0.90, transitionU),
            transform: `translate3d(0, ${(1 - smoothstep(0.50, 0.90, transitionU)) * 12}px, 0)`,
        },
        actionStyle: {
            opacity: smoothstep(0.60, 0.95, transitionU),
        },
    };

    const renderCardBody = (industry, index, morphState = {}) => {
        const {
            badgeStyle = {},
            headingStyle = {},
            descStyle = {},
            capabilitiesStyle = {},
            actionStyle = {},
        } = morphState;

        return (
            <div className="flex flex-col justify-between h-full relative z-10 select-none">
                {/* Corner ambient radial glow */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#2AB182]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Card Top Meta */}
                <div style={badgeStyle} className="flex items-center justify-between mb-5 transition-transform duration-75">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2AB182]/10 border border-[#2AB182]/30 text-[#2AB182] text-xs font-mono tracking-wider uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] animate-pulse" />
                        Sector 0{index + 1}
                    </div>
                    <span className="text-white/40 text-xs font-mono tracking-widest">
                        0{index + 1} / 0{clientIndustries.length}
                    </span>
                </div>

                {/* Industry Heading */}
                <h3
                    style={headingStyle}
                    className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[var(--text-primary)] tracking-tight mb-2.5 transition-transform duration-75 leading-tight"
                >
                    {industry.name}
                </h3>

                {/* Industry Description / Who We Serve */}
                <p
                    style={descStyle}
                    className="font-body text-[#2AB182] text-sm sm:text-base font-medium mb-6 leading-relaxed transition-transform duration-75"
                >
                    {industry.portfolio.join(" • ")}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-6" />

                {/* Core Performance Capabilities */}
                <div style={capabilitiesStyle} className="transition-transform duration-75">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
                        Core Performance Capabilities
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                        {industry.services.map((service, sIdx) => (
                            <div
                                key={sIdx}
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-[#2AB182]/30 transition-colors"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2AB182] shrink-0" />
                                <span className="font-body text-xs sm:text-sm text-[var(--text-primary)] font-normal truncate">
                                    {service}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Partner Action */}
                <div style={actionStyle} className="mt-7 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">
                        Tailored Growth Framework
                    </span>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#2AB182] hover:text-white transition-colors group"
                    >
                        Partner With Us
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="pt-24 md:pt-28 min-h-screen">
            {/* 1. Page Header — Industries We Transform */}
            <section className="px-6 md:px-12 pt-12 md:pt-20 pb-12 md:pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    <p
                        className={`font-body text-[#2AB182] mb-5 tracking-[0.2em] text-xs md:text-sm uppercase font-semibold flex items-center justify-center gap-3 transition-all duration-700 ease-out ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
                        Proven Results, Real Partners
                    </p>
                    <h1
                        className={`font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-[var(--text-primary)] uppercase mb-6 transition-all duration-700 delay-100 ease-out ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                    >
                        Industries We <span className="text-[#2AB182]">Transform</span>
                    </h1>
                    <p
                        className={`font-body text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto transition-all duration-700 delay-200 ease-out ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                    >
                        We go deep into niches where performance truly matters, from Healthcare to E-commerce.
                    </p>
                </div>
            </section>

            {/* 2. Core Industries We Serve — Desktop Vertical Curtain + Morphing Card Transition */}
            <section
                ref={sectionRef}
                id="core-industries"
                className="hidden md:block motion-reduce:hidden relative z-10 bg-transparent h-[260vh]"
            >
                <div className="sticky top-20 lg:top-24 h-[calc(100vh-5.5rem)] w-full flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden">
                    {/* Section Sub-heading */}
                    <div className="text-center max-w-4xl mx-auto px-4 mb-6 lg:mb-8 shrink-0">
                        <p className="font-body text-[#2AB182] mb-1.5 tracking-[0.2em] text-xs md:text-sm uppercase font-semibold flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#2AB182] rounded-full animate-pulse" />
                            Sector Specialization
                        </p>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[var(--text-primary)] tracking-tight">
                            Core Industries We <span className="text-[#2AB182]">Serve</span>
                        </h2>
                    </div>

                    {/* Main Two-Column Structure */}
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center relative">
                        {/* Left Column: Vertical Industry Navigation */}
                        <div className="md:col-span-5 lg:col-span-4 space-y-2.5 lg:space-y-3 z-20">
                            <span className="font-mono text-xs uppercase tracking-widest text-white/40 mb-1 px-4 block">
                                Select Industry
                            </span>
                            {clientIndustries.map((ind, i) => {
                                const isActive = activeSidebarIndex === i;
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => scrollToIndustry(i)}
                                        aria-label={`Jump to ${ind.name}`}
                                        className={`w-full group text-left flex items-center gap-3.5 py-3 px-4 rounded-xl transition-all duration-300 relative select-none cursor-pointer ${
                                            isActive
                                                ? 'bg-[#2AB182]/10 border border-[#2AB182]/50 shadow-[0_0_20px_rgba(42,177,130,0.18)] translate-x-2'
                                                : 'hover:bg-white/[0.03] border border-transparent hover:border-white/10 opacity-45 hover:opacity-85'
                                        }`}
                                    >
                                        {/* Active green accent indicator bar */}
                                        <div
                                            className={`w-1 h-6 rounded-full transition-all duration-300 ${
                                                isActive ? 'bg-[#2AB182] shadow-[0_0_10px_#2AB182]' : 'bg-transparent'
                                            }`}
                                        />
                                        {/* Number label */}
                                        <span
                                            className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                                                isActive ? 'text-[#2AB182] font-semibold' : 'text-white/40'
                                            }`}
                                        >
                                            0{i + 1}
                                        </span>
                                        {/* Industry Title */}
                                        <span
                                            className={`font-display text-sm lg:text-base tracking-tight transition-all duration-300 ${
                                                isActive
                                                    ? 'text-white font-bold'
                                                    : 'text-[var(--text-muted)] font-medium group-hover:text-white'
                                            }`}
                                        >
                                            {ind.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column: Vertical Curtain + Morphing Card Stage */}
                        <div className="md:col-span-7 lg:col-span-8 flex justify-center items-center">
                            <div className="relative w-full max-w-xl lg:max-w-2xl h-[490px] lg:h-[510px]">
                                {/* Layer 1: Current Industry Card (Gracefully moves gently upward behind curtain) */}
                                <div
                                    style={{
                                        transform: `translate3d(0, -${transitionU * 22}px, 0)`,
                                        opacity: 1 - transitionU * 0.75,
                                        zIndex: 10,
                                        willChange: 'transform, opacity',
                                    }}
                                    className="absolute inset-0 w-full h-full bg-[#121212]/95 backdrop-blur-xl border border-[var(--border-subtle)] hover:border-[#2AB182]/50 rounded-2xl p-7 sm:p-9 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden transition-colors duration-300"
                                >
                                    {renderCardBody(currCard, currIndex, currMorph)}
                                </div>

                                {/* Layer 2: Next Industry Card (Revealed from underneath via Vertical Curtain clip-path) */}
                                <div
                                    style={{
                                        clipPath: `inset(${curtainY}% 0 0 0)`,
                                        transform: `translate3d(0, ${(1 - transitionU) * 16}px, 0)`,
                                        zIndex: 20,
                                        willChange: 'transform, clip-path',
                                    }}
                                    className="absolute inset-0 w-full h-full bg-[#121212]/95 backdrop-blur-xl border border-[var(--border-subtle)] hover:border-[#2AB182]/50 rounded-2xl p-7 sm:p-9 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden transition-colors duration-300"
                                >
                                    {renderCardBody(nextCard, nextIndex, nextMorph)}
                                </div>

                                {/* Vertical Curtain Luminous Laser Reveal Edge */}
                                {transitionU > 0.02 && transitionU < 0.98 && (
                                    <div
                                        style={{
                                            top: `${curtainY}%`,
                                            transform: 'translateY(-50%)',
                                        }}
                                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2AB182] to-transparent shadow-[0_0_18px_rgba(42,177,130,0.9)] z-30 pointer-events-none"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile / Tablet / Reduced Motion Static Flow Presentation */}
            <section className="md:hidden motion-reduce:block px-6 py-12 relative z-10 bg-transparent">
                <div className="text-center max-w-xl mx-auto px-4 mb-10">
                    <p className="font-body text-[#2AB182] mb-2 tracking-[0.2em] text-xs uppercase font-semibold flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#2AB182] rounded-full animate-pulse" />
                        Sector Specialization
                    </p>
                    <h2 className="font-display text-3xl font-bold uppercase text-[var(--text-primary)] tracking-tight">
                        Core Industries We <span className="text-[#2AB182]">Serve</span>
                    </h2>
                </div>

                <div className="space-y-6 max-w-xl mx-auto">
                    {clientIndustries.map((industry, index) => (
                        <div
                            key={index}
                            className="w-full bg-[#121212]/95 backdrop-blur-xl border border-[var(--border-subtle)] hover:border-[#2AB182]/50 rounded-2xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden transition-colors duration-300"
                        >
                            {renderCardBody(industry, index)}
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Highlighted Clients — Restored Original Static Grid (6 columns x 4 rows) */}
            <section className="py-16 md:py-24 px-4 md:px-12 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-[var(--text-primary)] text-center mb-10 md:mb-14 tracking-tight">
                        HIGHLIGHTED CLIENTS
                    </h2>
                    <div className="border-t border-l border-[var(--border-subtle)]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {clientList.map((client, index) => {
                                const lightLogo = client.logoLight || client.logo;
                                const darkLogo = client.logoDark || client.logo || client.logoLight;

                                return (
                                    <div
                                        key={index}
                                        aria-label={client.name}
                                        title={client.name}
                                        className="client-logo-card border-r border-b border-[var(--border-subtle)] h-32 sm:h-36 md:h-40 flex items-center justify-center p-3 sm:p-4 md:p-5 transition-colors duration-300 group relative cursor-pointer"
                                    >
                                        {lightLogo && (
                                            <Image
                                                src={lightLogo}
                                                alt={`${client.name} logo`}
                                                width={240}
                                                height={100}
                                                className={`client-logo-light w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                                                    client.logoClass || 'max-h-14 md:max-h-20 max-w-[80%]'
                                                }`}
                                            />
                                        )}
                                        {darkLogo && (
                                            <Image
                                                src={darkLogo}
                                                alt={`${client.name} logo`}
                                                width={240}
                                                height={100}
                                                className={`client-logo-dark w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                                                    client.logoClass || 'max-h-14 md:max-h-20 max-w-[80%]'
                                                }`}
                                            />
                                        )}
                                        {!lightLogo && !darkLogo && (
                                            <span className="font-display text-lg md:text-xl font-bold tracking-widest text-[#2AB182]">
                                                {getClientInitials(client.name)}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Closing CTA (Preserved exactly) */}
            <section className="py-16 md:py-32 border-t border-[var(--border-subtle)] text-center px-6 bg-[var(--bg-card)]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold mb-8 leading-tight">
                        If You Are in Any of These Industries, <span className="text-[#2AB182]">We Can Scale You.</span>
                    </h2>
                    <p className="font-body text-[var(--text-muted)] text-xl mb-12">
                        We know the numbers. We know the bottlenecks. We know how to build predictable, profitable growth.
                    </p>
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300 rounded-sm"
                    >
                        Book a Discovery Call
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ClientsIndustriesPage;
