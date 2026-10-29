import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';

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

/**
 * Scroll progress intervals for the continuous sticky card chain.
 * p goes from 0 to 1 over the pinned section.
 */
const LINE_RANGES = [
    [0.00, 0.07], // Line 0: Heading -> Card 0
    [0.16, 0.23], // Line 1: Card 0 -> Card 1
    [0.34, 0.41], // Line 2: Card 1 -> Card 2
    [0.52, 0.59], // Line 3: Card 2 -> Card 3
    [0.70, 0.77], // Line 4: Card 3 -> Card 4
];

const CARD_RANGES = [
    [0.04, 0.16], // Card 0: Healthcare & Medical
    [0.21, 0.34], // Card 1: Education & EdTech
    [0.39, 0.52], // Card 2: E-commerce & D2C
    [0.57, 0.70], // Card 3: Real Estate & Construction
    [0.75, 0.88], // Card 4: B2B & Consulting
];

const smoothstep = (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * (3 - 2 * clamped);
};

/**
 * Calculates glowing connector line animation state:
 * - Extends downward rapidly with a subtle stretch/overshoot (up to 1.15x)
 * - Bounces back and straightens smoothly to 1.00x
 * - Glowing dot tracks line tip exactly
 */
const getLineState = (index, p) => {
    const [start, end] = LINE_RANGES[index];
    if (p < start) {
        return { scaleY: 0, opacity: 0, isSettled: false };
    }
    if (p >= end) {
        return { scaleY: 1, opacity: 1, isSettled: true };
    }
    const t = (p - start) / (end - start);
    let scaleY = 0;
    if (t <= 0.60) {
        // Stretches quickly with bounce overshoot up to 1.15
        const u = t / 0.60;
        scaleY = (1 - Math.pow(1 - u, 2)) * 1.15;
    } else {
        // Rebounds smoothly and settles straight to 1.00
        const u = (t - 0.60) / 0.40;
        scaleY = 1.15 - 0.15 * Math.sin((u * Math.PI) / 2);
    }
    const opacity = Math.min(1, t * 4);
    return { scaleY, opacity, isSettled: t >= 0.95 };
};

/**
 * Calculates card entrance from bottom of viewport:
 * - Glides upward smoothly with cubic deceleration
 * - Settles and docks cleanly onto the glowing connector dot
 * - Never fades out or vanishes once entered
 */
const getCardState = (index, p) => {
    const [start, end] = CARD_RANGES[index];
    if (p < start) {
        return { translateY: 380, opacity: 0, isDocked: false };
    }
    if (p >= end) {
        return { translateY: 0, opacity: 1, isDocked: true };
    }
    const t = (p - start) / (end - start);
    // Cubic ease-out
    const ease = 1 - Math.pow(1 - t, 3);
    const translateY = (1 - ease) * 380;
    const opacity = Math.min(1, t * 2.5);
    return { translateY, opacity, isDocked: false };
};

/**
 * Smoothly shifts the chain upward as new cards arrive,
 * ensuring the active card stays in view while all earlier cards
 * remain visible in the connected chain above it.
 */
const getChainOffsetY = (p) => {
    // Pitch between cards (height ~175px + connector ~36px = ~211px)
    if (p <= 0.34) return 0;

    // Card 2 entrance: gentle shift of 130px
    if (p <= 0.52) {
        return smoothstep((p - 0.34) / 0.18) * 130;
    }

    // Card 3 entrance: additional 210px shift
    if (p <= 0.70) {
        return 130 + smoothstep((p - 0.52) / 0.18) * 210;
    }

    // Card 4 entrance: additional 210px shift
    if (p <= 0.88) {
        return 340 + smoothstep((p - 0.70) / 0.18) * 210;
    }

    // Settle / natural upward scroll before unpinning
    return 550 + smoothstep((p - 0.88) / 0.12) * 90;
};

const ClientsIndustriesPage = ({ onContactClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    const [flippedIndex, setFlippedIndex] = useState(null);
    const sectionRef = useRef(null);

    // Initial page load entrance trigger
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Smooth scroll progress handler for card stack
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (sectionRef.current) {
                        const rect = sectionRef.current.getBoundingClientRect();
                        const windowHeight = window.innerHeight || 800;
                        const totalDistance = rect.height - windowHeight;
                        if (totalDistance > 100) {
                            const rawProgress = Math.max(0, Math.min(1, -rect.top / totalDistance));
                            // Comfort buffer so the final card rests before section releases
                            const progress = Math.min(1, rawProgress / 0.90);
                            setScrollProgress((prev) => {
                                if (Math.abs(prev - progress) < 0.002) return prev;
                                return progress;
                            });
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

    // Card toggle handler (click / tap only - flips card)
    const handleCardClick = (index, e) => {
        if (e) e.stopPropagation();
        setFlippedIndex((prev) => (prev === index ? null : index));
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(index, e);
        }
    };

    return (
        <div className="pt-24 md:pt-28 min-h-screen">
            {/* 1. Main Heading — Industries We Transform (Animated on load, scrolls away naturally) */}
            <section className="px-6 md:px-12 pt-12 md:pt-20 pb-16 md:pb-24 text-center relative z-10">
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

            {/* 2 & 3. Core Industries We Serve — Continuous Sticky Vertically Connected Card Chain */}
            <section
                ref={sectionRef}
                id="core-industries"
                className="relative min-h-[420vh] md:min-h-[460vh] z-10 bg-transparent"
            >
                {/* Desktop Sticky Viewport */}
                <div className="hidden md:flex motion-reduce:hidden sticky top-0 h-screen w-full flex-col justify-start pt-20 md:pt-24 pb-8 px-6 md:px-12 overflow-hidden">
                    {/* 1. Sticky Centered Heading — 100% Opacity throughout sequence, zero fade-out */}
                    <div className="text-center shrink-0 z-30 max-w-4xl mx-auto px-4 pb-2 bg-gradient-to-b from-black/40 to-transparent w-full">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-[var(--text-primary)] tracking-tight">
                            Core Industries We <span className="text-[#2AB182]">Serve</span>
                        </h2>
                    </div>

                    {/* Connector 0: Thin glowing emerald vertical line from Heading Area to Card 0 */}
                    {(() => {
                        const line0 = getLineState(0, scrollProgress);
                        return (
                            <div className="flex flex-col items-center justify-center shrink-0 h-9 w-full relative z-20 my-1">
                                <div
                                    className="w-[2px] bg-gradient-to-b from-[#2AB182] to-[#2AB182] origin-top"
                                    style={{
                                        height: '32px',
                                        transform: `scaleY(${line0.scaleY})`,
                                        opacity: line0.opacity,
                                        boxShadow: '0 0 10px rgba(42, 177, 130, 0.7), 0 0 20px rgba(42, 177, 130, 0.4)',
                                    }}
                                />
                                <div
                                    className="w-2.5 h-2.5 rounded-full bg-[#2AB182] border-2 border-[#121212] shrink-0 -mt-1"
                                    style={{
                                        opacity: line0.opacity,
                                        transform: `translateY(${Math.max(0, (line0.scaleY - 1) * 32)}px)`,
                                        boxShadow: '0 0 10px #2AB182, 0 0 20px rgba(42, 177, 130, 0.8)',
                                    }}
                                />
                            </div>
                        );
                    })()}

                    {/* Connected Card Chain Window */}
                    <div className="relative w-full flex-1 overflow-hidden mt-1">
                        <div
                            style={{
                                transform: `translate3d(0, ${-getChainOffsetY(scrollProgress)}px, 0)`,
                                willChange: 'transform',
                            }}
                            className="w-full max-w-[820px] mx-auto px-4 flex flex-col items-center pb-24"
                        >
                            {clientIndustries.map((industry, index) => {
                                const cardState = getCardState(index, scrollProgress);
                                const nextLineState = index < clientIndustries.length - 1 ? getLineState(index + 1, scrollProgress) : null;
                                const isFlipped = flippedIndex === index;
                                const isHovered = hoveredCardIndex === index;
                                const isWaiting = cardState.opacity === 0;

                                return (
                                    <React.Fragment key={index}>
                                        {/* Card Container with Entrance Transform */}
                                        <div
                                            style={{
                                                transform: `translate3d(0, ${cardState.translateY}px, 0)`,
                                                opacity: cardState.opacity,
                                                willChange: 'transform, opacity',
                                                pointerEvents: isWaiting ? 'none' : 'auto',
                                            }}
                                            className="w-full shrink-0"
                                        >
                                            {/* 3D Flip Card Container */}
                                            <div
                                                style={{
                                                    perspective: '1200px',
                                                    height: '175px',
                                                    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                                                    transition: 'transform 0.25s ease-out',
                                                }}
                                                className="w-full relative cursor-pointer"
                                                onClick={(e) => handleCardClick(index, e)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onMouseEnter={() => setHoveredCardIndex(index)}
                                                onMouseLeave={() => setHoveredCardIndex(null)}
                                                role="button"
                                                tabIndex={isWaiting ? -1 : 0}
                                                aria-expanded={isFlipped}
                                                aria-label={`${industry.name}. Click to view details.`}
                                            >
                                                <div
                                                    className="w-full h-full relative transition-transform duration-500 ease-out select-none"
                                                    style={{
                                                        transformStyle: 'preserve-3d',
                                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                    }}
                                                >
                                                    {/* FRONT FACE: Badge, Industry Heading, and Sector Highlights */}
                                                    <div
                                                        style={{
                                                            backfaceVisibility: 'hidden',
                                                            WebkitBackfaceVisibility: 'hidden',
                                                        }}
                                                        className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-[#141414] border px-6 py-5 md:px-8 md:py-5 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                                                            isHovered || isFlipped
                                                                ? 'border-[#2AB182] shadow-[0_12px_36px_rgba(42,177,130,0.22)]'
                                                                : 'border-[#262626]'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-mono text-xs tracking-widest text-[#2AB182] uppercase bg-[#2AB182]/10 border border-[#2AB182]/30 px-3 py-0.5 rounded-full font-semibold">
                                                                0{index + 1}
                                                            </span>
                                                            <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase opacity-80">
                                                                Click to view details
                                                            </span>
                                                        </div>

                                                        <div className="my-auto py-1">
                                                            <h3 className="font-display text-2xl sm:text-3xl md:text-3xl font-bold uppercase text-white tracking-tight leading-tight">
                                                                {industry.name}
                                                            </h3>
                                                        </div>

                                                        <div className="flex items-center gap-2 overflow-hidden text-[var(--text-muted)] text-xs font-body">
                                                            <span className="truncate">
                                                                {industry.portfolio.join(" • ")}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* BACK FACE: Preserved Portfolio Highlights & Delivered Services */}
                                                    <div
                                                        style={{
                                                            backfaceVisibility: 'hidden',
                                                            WebkitBackfaceVisibility: 'hidden',
                                                            transform: 'rotateY(180deg)',
                                                        }}
                                                        className="absolute inset-0 rounded-2xl md:rounded-3xl bg-[#161616] border border-[#2AB182] px-6 py-4 md:px-7 md:py-4 flex flex-col justify-between shadow-[0_18px_45px_rgba(0,0,0,0.85)]"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2.5">
                                                                <span className="font-mono text-xs text-[#2AB182] font-semibold bg-[#2AB182]/10 border border-[#2AB182]/30 px-2.5 py-0.5 rounded-full">
                                                                    0{index + 1}
                                                                </span>
                                                                <h3 className="font-display text-base sm:text-lg font-bold uppercase text-white">
                                                                    {industry.name}
                                                                </h3>
                                                            </div>
                                                            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
                                                                Click to flip back
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4 my-auto py-1 text-xs">
                                                            {/* Portfolio Highlights */}
                                                            <div>
                                                                <h4 className="font-body text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1 flex items-center gap-1">
                                                                    Client Portfolio:
                                                                </h4>
                                                                <ul className="space-y-0.5 font-body text-[11px] md:text-xs text-[var(--text-primary)]">
                                                                    {industry.portfolio.map((client, i) => (
                                                                        <li key={i} className="flex items-center gap-1.5">
                                                                            <MapPin className="w-3 h-3 shrink-0 text-[#2AB182]" />
                                                                            <span className="truncate">{client}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* Services Delivered */}
                                                            <div>
                                                                <h4 className="font-body text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1 flex items-center gap-1">
                                                                    Services Delivered:
                                                                </h4>
                                                                <div className="space-y-0.5 font-body text-[11px] md:text-xs text-[var(--text-primary)]">
                                                                    {industry.services.map((service, i) => (
                                                                        <p key={i} className="flex items-center gap-1.5">
                                                                            <ArrowRight className="w-3 h-3 shrink-0 text-[#2AB182]" />
                                                                            <span className="truncate">{service}</span>
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connector Line to Next Card: Extends with bounce, settles straight */}
                                        {nextLineState && (
                                            <div className="flex flex-col items-center justify-center shrink-0 h-9 w-full relative z-10 my-0.5">
                                                <div
                                                    className="w-[2px] bg-gradient-to-b from-[#2AB182] to-[#2AB182] origin-top"
                                                    style={{
                                                        height: '32px',
                                                        transform: `scaleY(${nextLineState.scaleY})`,
                                                        opacity: nextLineState.opacity,
                                                        boxShadow: '0 0 10px rgba(42, 177, 130, 0.7), 0 0 20px rgba(42, 177, 130, 0.4)',
                                                    }}
                                                />
                                                <div
                                                    className="w-2.5 h-2.5 rounded-full bg-[#2AB182] border-2 border-[#121212] shrink-0 -mt-1"
                                                    style={{
                                                        opacity: nextLineState.opacity,
                                                        transform: `translateY(${Math.max(0, (nextLineState.scaleY - 1) * 32)}px)`,
                                                        boxShadow: '0 0 10px #2AB182, 0 0 20px rgba(42, 177, 130, 0.8)',
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile Presentation & Reduced-Motion Interactive List */}
                <div className="md:hidden motion-reduce:block py-16 px-6">
                    <div className="text-center mb-10 max-w-xl mx-auto flex flex-col items-center">
                        <p role="heading" aria-level="2" className="font-display text-3xl font-bold uppercase text-[var(--text-primary)] leading-tight">
                            Core Industries We <span className="text-[#2AB182]">Serve</span>
                        </p>
                        {/* Glowing Green Vertical Timeline Connector for Mobile */}
                        <div className="flex flex-col items-center mt-3">
                            <div
                                className="w-[2px] h-7 bg-gradient-to-b from-[#2AB182]/30 via-[#2AB182] to-[#2AB182]"
                                style={{
                                    boxShadow: '0 0 8px rgba(42, 177, 130, 0.55)',
                                }}
                            />
                            <div
                                className="w-2.5 h-2.5 rounded-full bg-[#2AB182] border-2 border-[#121212] -mt-0.5"
                                style={{
                                    boxShadow: '0 0 8px #2AB182',
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 max-w-lg mx-auto flex flex-col items-center">
                        {clientIndustries.map((industry, index) => {
                            const isFlipped = flippedIndex === index;

                            return (
                                <React.Fragment key={index}>
                                    <div
                                        style={{ perspective: '1000px', height: '240px' }}
                                        className="relative w-full cursor-pointer select-none"
                                        onClick={(e) => handleCardClick(index, e)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        role="button"
                                        tabIndex={0}
                                        aria-expanded={isFlipped}
                                        aria-label={`${industry.name}. Tap to view details.`}
                                    >
                                        <div
                                            className="w-full h-full relative transition-transform duration-500 ease-out"
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            }}
                                        >
                                            {/* Mobile Front Face */}
                                            <div
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                }}
                                                className="absolute inset-0 rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col justify-between shadow-lg"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono text-xs tracking-widest text-[#2AB182] uppercase bg-[#2AB182]/10 border border-[#2AB182]/30 px-3 py-1 rounded-full font-semibold">
                                                        0{index + 1}
                                                    </span>
                                                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                                                        Tap to view details
                                                    </span>
                                                </div>
                                                <h3 className="font-display text-2xl font-bold uppercase text-white my-auto py-2">
                                                    {industry.name}
                                                </h3>
                                                <p className="font-body text-xs text-[var(--text-muted)] truncate">
                                                    {industry.portfolio.join(" • ")}
                                                </p>
                                            </div>

                                            {/* Mobile Back Face */}
                                            <div
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                    transform: 'rotateY(180deg)',
                                                }}
                                                className="absolute inset-0 rounded-2xl bg-[#161616] border border-[#2AB182] p-5 flex flex-col justify-between shadow-xl overflow-y-auto"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-xs text-[#2AB182] font-semibold bg-[#2AB182]/10 border border-[#2AB182]/30 px-2 py-0.5 rounded-full">
                                                            0{index + 1}
                                                        </span>
                                                        <h3 className="font-display text-sm font-bold uppercase text-white">
                                                            {industry.name}
                                                        </h3>
                                                    </div>
                                                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                                                        Tap to flip
                                                    </span>
                                                </div>

                                                <div className="space-y-2.5 my-auto py-1">
                                                    <div>
                                                        <h4 className="font-body text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1">
                                                            Client Portfolio Highlights:
                                                        </h4>
                                                        <ul className="space-y-1 font-body text-xs text-[var(--text-primary)]">
                                                            {industry.portfolio.map((client, i) => (
                                                                <li key={i} className="flex items-center gap-1.5">
                                                                    <MapPin className="w-3 h-3 shrink-0 text-[#2AB182]" />
                                                                    <span>{client}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-body text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1">
                                                            Services delivered:
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-1 font-body text-xs text-[var(--text-primary)]">
                                                            {industry.services.map((service, i) => (
                                                                <p key={i} className="flex items-start gap-1 text-[11px]">
                                                                    <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-[#2AB182]" />
                                                                    <span>{service}</span>
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Glowing Connector Line */}
                                    {index < clientIndustries.length - 1 && (
                                        <div className="flex flex-col items-center my-1">
                                            <div
                                                className="w-[2px] h-6 bg-gradient-to-b from-[#2AB182] to-[#2AB182]"
                                                style={{ boxShadow: '0 0 8px rgba(42, 177, 130, 0.55)' }}
                                            />
                                            <div
                                                className="w-2.5 h-2.5 rounded-full bg-[#2AB182] border-2 border-[#121212] -mt-0.5"
                                                style={{ boxShadow: '0 0 8px #2AB182' }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Client Logos Carousel — Highlighted Clients (Preserved exactly) */}
            <section className="py-16 md:py-24 border-b border-[var(--border-subtle)] bg-transparent overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-4 md:px-12 mb-10 md:mb-14">
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-[var(--text-primary)] text-center tracking-tight">
                        HIGHLIGHTED CLIENTS
                    </h2>
                </div>

                <div
                    className="client-carousel-container relative w-full overflow-hidden border-y border-[var(--border-subtle)] select-none"
                    aria-label="Highlighted clients carousel, moving continuously from left to right. Hover to pause."
                >
                    <div className="client-carousel-track flex w-max">
                        {/* Primary Set */}
                        <div className="flex shrink-0">
                            {clientList.map((client, index) => {
                                const lightLogo = client.logoLight || client.logo;
                                const darkLogo = client.logoDark || client.logo || client.logoLight;

                                return (
                                    <div
                                        key={`client-orig-${index}`}
                                        role="group"
                                        aria-label={client.name}
                                        title={client.name}
                                        tabIndex={0}
                                        className="client-logo-card border-r border-[var(--border-subtle)] w-52 sm:w-60 md:w-72 h-32 sm:h-36 md:h-40 flex items-center justify-center p-3 sm:p-4 md:p-5 transition-colors duration-150 group relative cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2AB182]"
                                    >
                                        <div className="client-logo-item flex items-center justify-center w-full h-full pointer-events-none">
                                            {lightLogo && (
                                                <Image
                                                    src={lightLogo}
                                                    alt={`${client.name} logo`}
                                                    width={240}
                                                    height={100}
                                                    decoding="async"
                                                    className={`client-logo-light w-auto object-contain ${
                                                        client.logoClass || 'max-h-14 md:max-h-20 max-w-[85%]'
                                                    }`}
                                                />
                                            )}
                                            {darkLogo && (
                                                <Image
                                                    src={darkLogo}
                                                    alt={`${client.name} logo`}
                                                    width={240}
                                                    height={100}
                                                    decoding="async"
                                                    className={`client-logo-dark w-auto object-contain ${
                                                        client.invertInDark ? 'logo-invert-dark' : ''
                                                    } ${client.logoClass || 'max-h-14 md:max-h-20 max-w-[85%]'}`}
                                                />
                                            )}
                                            {!lightLogo && !darkLogo && (
                                                <span className="font-display text-lg md:text-xl font-bold tracking-widest text-[#2AB182]">
                                                    {getClientInitials(client.name)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Duplicated Set for Seamless Infinite Looping */}
                        <div className="flex shrink-0" aria-hidden="true">
                            {clientList.map((client, index) => {
                                const lightLogo = client.logoLight || client.logo;
                                const darkLogo = client.logoDark || client.logo || client.logoLight;

                                return (
                                    <div
                                        key={`client-dup-${index}`}
                                        title={client.name}
                                        tabIndex={-1}
                                        className="client-logo-card border-r border-[var(--border-subtle)] w-52 sm:w-60 md:w-72 h-32 sm:h-36 md:h-40 flex items-center justify-center p-3 sm:p-4 md:p-5 transition-colors duration-150 group relative cursor-pointer shrink-0"
                                    >
                                        <div className="client-logo-item flex items-center justify-center w-full h-full pointer-events-none">
                                            {lightLogo && (
                                                <Image
                                                    src={lightLogo}
                                                    alt={`${client.name} partner logo`}
                                                    width={240}
                                                    height={100}
                                                    decoding="async"
                                                    className={`client-logo-light w-auto object-contain ${
                                                        client.logoClass || 'max-h-14 md:max-h-20 max-w-[85%]'
                                                    }`}
                                                />
                                            )}
                                            {darkLogo && (
                                                <Image
                                                    src={darkLogo}
                                                    alt={`${client.name} partner logo`}
                                                    width={240}
                                                    height={100}
                                                    decoding="async"
                                                    className={`client-logo-dark w-auto object-contain ${
                                                        client.invertInDark ? 'logo-invert-dark' : ''
                                                    } ${client.logoClass || 'max-h-14 md:max-h-20 max-w-[85%]'}`}
                                                />
                                            )}
                                            {!lightLogo && !darkLogo && (
                                                <span className="font-display text-lg md:text-xl font-bold tracking-widest text-[#2AB182]">
                                                    {getClientInitials(client.name)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA (Preserved exactly) */}
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
