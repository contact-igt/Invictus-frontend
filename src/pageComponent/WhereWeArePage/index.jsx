import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import LocationCard from '@/common/LocationCard';

const LOCATIONS = [
    {
        id: "india",
        title: "India: Headquarters",
        isHQ: true,
        description: "Our headquarters is based in India, where our core strategy, creative, and performance marketing teams operate to support clients globally.",
        services: [
            "Performance Marketing",
            "Social Media Management",
            "Video Production & Branding",
            "Web & App Development",
            "AI + Automation Services"
        ],
        industries: "Healthcare, EdTech, Law Institutes, E-commerce, D2C, Automobile, Consultants, Manufacturing, Hospitals, FMCG & more."
    },
    {
        id: "usa",
        title: "United States",
        isHQ: false,
        description: "We are actively expanding into the US market with the support of our local team.",
        services: [
            "Websites",
            "Performance Marketing funnels",
            "AI-driven automation setups",
            "Appointment generation pipelines"
        ],
        industries: "Healthcare RCM Companies (Wellinit), Doctors & Personal Brands, Consultants, Fitness/Education Brands, E-commerce Stores."
    },
    {
        id: "singapore",
        title: "Singapore",
        isHQ: false,
        description: "We work remotely with clients in Healthcare setups, E-commerce brands, Business consulting firms, and Training institutes.",
        services: [
            "Meta & Google Ads Management",
            "Scaling campaigns",
            "Automation setups",
            "Web funnels"
        ],
        industries: null
    },
    {
        id: "uk",
        title: "United Kingdom",
        isHQ: false,
        description: "We are scaling our services into the UK as we continue to expand globally.",
        services: [
            "Websites",
            "Performance Marketing funnels",
            "AI-driven automation setups",
            "Appointment generation pipelines"
        ],
        industries: null
    }
];

const smoothstep = (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * (3 - 2 * clamped);
};

const WhereWeArePage = ({ onContactClick }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [headingMetrics, setHeadingMetrics] = useState({
        globalWidth: 210,
        footprintWidth: 420,
        lineHeight: 60,
        containerLeft: 64,
        containerTop: 240,
        windowWidth: 1440,
        windowHeight: 800,
    });

    const footprintSectionRef = useRef(null);
    const headingColumnRef = useRef(null);
    const headingGroupRef = useRef(null);
    const globalWordRef = useRef(null);
    const footprintWordRef = useRef(null);

    // Measure exact text dimensions of "GLOBAL" and "FOOTPRINT." for pixel-perfect word spacing
    useEffect(() => {
        const updateMetrics = () => {
            if (globalWordRef.current && footprintWordRef.current && headingColumnRef.current) {
                const gRect = globalWordRef.current.getBoundingClientRect();
                const fRect = footprintWordRef.current.getBoundingClientRect();
                const colRect = headingColumnRef.current.getBoundingClientRect();
                const winW = window.innerWidth || 1440;
                const winH = window.innerHeight || 800;

                setHeadingMetrics({
                    globalWidth: gRect.width || 230,
                    footprintWidth: fRect.width || 460,
                    lineHeight: gRect.height || 68,
                    containerLeft: colRect.left || 64,
                    containerTop: colRect.top || 240,
                    windowWidth: winW,
                    windowHeight: winH,
                });
            }
        };

        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        const timer = setTimeout(updateMetrics, 80);
        return () => {
            window.removeEventListener('resize', updateMetrics);
            clearTimeout(timer);
        };
    }, []);

    // Scroll listener for sticky storytelling progress
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (footprintSectionRef.current) {
                        const rect = footprintSectionRef.current.getBoundingClientRect();
                        const winH = window.innerHeight || 800;
                        const totalDistance = rect.height - winH;
                        if (totalDistance > 50) {
                            const p = Math.max(0, Math.min(1, -rect.top / totalDistance));
                            setScrollProgress((prev) => (Math.abs(prev - p) < 0.001 ? prev : p));
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

    // Stage 1 & 2: Heading & Eyebrow Group Animation
    // Stage 1 (p: 0.00 -> 0.10): Single line centered with ONE normal word space between GLOBAL and FOOTPRINT.
    // Stage 2 (p: 0.10 -> 0.22): Moves smoothly to left column, FOOTPRINT. glides down to line 2
    const stage2Raw = (scrollProgress - 0.10) / 0.12;
    const stage2Progress = smoothstep(stage2Raw);

    const gWidth = headingMetrics.globalWidth;
    const fWidth = headingMetrics.footprintWidth;
    const lHeight = headingMetrics.lineHeight;
    const wordSpace = 18; // Exactly one normal typographical word space
    const totalSingleLineWidth = gWidth + wordSpace + fWidth;

    const winW = headingMetrics.windowWidth;
    const winH = headingMetrics.windowHeight;
    const colLeft = headingMetrics.containerLeft;
    const colTop = headingMetrics.containerTop;

    // Viewport center shift relative to left column position
    // Balanced in upper-middle area (0.38 of viewport height) with subtle shift to the right (+36px)
    const rightShiftOffset = 36;
    const eyebrowOffset = 24;
    const centerShiftX = (winW / 2) - colLeft - (totalSingleLineWidth / 2) + rightShiftOffset;
    const centerShiftY = (winH * 0.38) - colTop - (lHeight / 2) - eyebrowOffset;

    // Current shifts for entire heading + eyebrow group
    const groupShiftX = centerShiftX * (1 - stage2Progress);
    const groupShiftY = centerShiftY * (1 - stage2Progress);

    // FOOTPRINT. word transforms: Starts immediately next to GLOBAL (with exactly 16px space) on Line 1,
    // and smoothly drops to Line 2 directly beneath GLOBAL as it moves left
    const footprintShiftX = (gWidth + wordSpace) * (1 - stage2Progress);
    const footprintShiftY = -lHeight * (1 - stage2Progress);

    // Stage 3: Description appears ONLY after heading settles on the left (p: 0.24 -> 0.33)
    const descProgress = smoothstep((scrollProgress - 0.24) / 0.09);
    const descOpacity = descProgress;
    const descY = (1 - descProgress) * 18;

    // Sequential Headquarters Scroll: One at a time in the same designated card position
    // Card 1: India: Headquarters (p: 0.35 -> 0.54)
    // Enters: 0.35 -> 0.44 | Plateau: 0.44 -> 0.50 | Exits: 0.50 -> 0.54
    const c1Enter = smoothstep((scrollProgress - 0.35) / 0.09);
    const c1Exit = smoothstep((scrollProgress - 0.50) / 0.04);
    const c1Opacity = c1Enter * (1 - c1Exit);
    const c1Y = (1 - c1Enter) * 60 - c1Exit * 30;

    // Card 2: United States (p: 0.52 -> 0.70)
    // Enters: 0.52 -> 0.60 | Plateau: 0.60 -> 0.66 | Exits: 0.66 -> 0.70
    const c2Enter = smoothstep((scrollProgress - 0.52) / 0.08);
    const c2Exit = smoothstep((scrollProgress - 0.66) / 0.04);
    const c2Opacity = c2Enter * (1 - c2Exit);
    const c2Y = (1 - c2Enter) * 60 - c2Exit * 30;

    // Card 3: Singapore (p: 0.68 -> 0.86)
    // Enters: 0.68 -> 0.76 | Plateau: 0.76 -> 0.82 | Exits: 0.82 -> 0.86
    const c3Enter = smoothstep((scrollProgress - 0.68) / 0.08);
    const c3Exit = smoothstep((scrollProgress - 0.82) / 0.04);
    const c3Opacity = c3Enter * (1 - c3Exit);
    const c3Y = (1 - c3Enter) * 60 - c3Exit * 30;

    // Card 4: United Kingdom (p: 0.84 -> 0.97)
    // Enters: 0.84 -> 0.92 | Plateau: 0.92 -> 0.97 | Unpins: > 0.97
    const c4Enter = smoothstep((scrollProgress - 0.84) / 0.08);
    const c4Opacity = c4Enter;
    const c4Y = (1 - c4Enter) * 60;

    return (
        <div className="pt-24 min-h-screen">
            {/* Desktop Sticky Scroll Storytelling Section */}
            <div
                ref={footprintSectionRef}
                className="relative min-h-0 lg:min-h-[520vh] w-full"
            >
                <div className="hidden lg:flex motion-reduce:hidden sticky top-0 h-screen w-full items-center justify-center overflow-hidden px-6 md:px-12 pt-16 pb-8 pointer-events-none">
                    <div className="max-w-[1600px] w-full mx-auto flex flex-row items-center justify-between gap-12 relative h-full">
                        {/* Left Column: Heading Group (Eyebrow + Heading) & Description */}
                        <div
                            ref={headingColumnRef}
                            className="w-[48%] xl:w-[46%] shrink-0 flex flex-col justify-center relative z-20 pointer-events-auto"
                        >
                            {/* Coordinated Heading Group: Eyebrow + GLOBAL FOOTPRINT. */}
                            <div
                                ref={headingGroupRef}
                                className="relative origin-top-left overflow-visible"
                                style={{
                                    transform: `translate3d(${groupShiftX}px, ${groupShiftY}px, 0)`,
                                }}
                            >
                                {/* Eyebrow Tag: Always visible, positioned directly above heading */}
                                <div className="flex items-center gap-2.5 text-[#2AB182] font-body text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4 select-none">
                                    <Globe className="w-4 h-4 shrink-0 text-[#2AB182]" />
                                    <span>Where We Work. Where Our Clients Are.</span>
                                </div>

                                {/* Main Heading: Exactly one word space between GLOBAL and FOOTPRINT., transforms cleanly */}
                                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] leading-[0.94] tracking-tight uppercase select-none overflow-visible">
                                    <div className="relative inline-block w-fit">
                                        <div>
                                            <span
                                                ref={globalWordRef}
                                                className="inline-block text-[var(--text-primary)]"
                                            >
                                                GLOBAL
                                            </span>
                                        </div>{' '}
                                        <div>
                                            <span
                                                ref={footprintWordRef}
                                                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] via-[#2AB182] to-emerald-400 pr-2"
                                                style={{
                                                    transform: `translate3d(${footprintShiftX}px, ${footprintShiftY}px, 0)`,
                                                }}
                                            >
                                                FOOTPRINT.
                                            </span>
                                        </div>
                                    </div>
                                </h1>
                            </div>

                            {/* Description: Reveals ONLY after heading settles on the left */}
                            <p
                                className="font-body text-base lg:text-lg text-[var(--text-muted)] max-w-xl mt-8 leading-relaxed"
                                style={{
                                    opacity: descOpacity,
                                    transform: `translate3d(0, ${descY}px, 0)`,
                                    pointerEvents: descOpacity > 0.5 ? 'auto' : 'none',
                                }}
                            >
                                Invictus Global Tech Pvt Ltd works with growth-focused brands across India, the United States, Singapore, and the United Kingdom. We’re not everywhere; we’re exactly where serious founders need us.
                            </p>
                        </div>

                        {/* Right Column: Headquarters Cards in Dedicated Slot (One at a time) */}
                        <div
                            className="w-[48%] xl:w-[50%] shrink-0 relative pointer-events-auto h-full flex items-center justify-center"
                        >
                            <div className="relative w-full max-w-[580px] min-h-[380px] flex items-center justify-center">
                                {/* Stage 1: India: Headquarters */}
                                <div
                                    className="absolute inset-0 flex items-center"
                                    style={{
                                        opacity: c1Opacity,
                                        transform: `translate3d(0, ${c1Y}px, 0)`,
                                        pointerEvents: c1Opacity > 0.3 ? 'auto' : 'none',
                                        visibility: c1Opacity > 0.01 ? 'visible' : 'hidden',
                                    }}
                                >
                                    <LocationCard
                                        title={LOCATIONS[0].title}
                                        description={LOCATIONS[0].description}
                                        services={LOCATIONS[0].services}
                                        industries={LOCATIONS[0].industries}
                                        isHQ={LOCATIONS[0].isHQ}
                                        className="w-full"
                                    />
                                </div>

                                {/* Stage 2: United States */}
                                <div
                                    className="absolute inset-0 flex items-center"
                                    style={{
                                        opacity: c2Opacity,
                                        transform: `translate3d(0, ${c2Y}px, 0)`,
                                        pointerEvents: c2Opacity > 0.3 ? 'auto' : 'none',
                                        visibility: c2Opacity > 0.01 ? 'visible' : 'hidden',
                                    }}
                                >
                                    <LocationCard
                                        title={LOCATIONS[1].title}
                                        description={LOCATIONS[1].description}
                                        services={LOCATIONS[1].services}
                                        industries={LOCATIONS[1].industries}
                                        isHQ={LOCATIONS[1].isHQ}
                                        className="w-full"
                                    />
                                </div>

                                {/* Stage 3: Singapore */}
                                <div
                                    className="absolute inset-0 flex items-center"
                                    style={{
                                        opacity: c3Opacity,
                                        transform: `translate3d(0, ${c3Y}px, 0)`,
                                        pointerEvents: c3Opacity > 0.3 ? 'auto' : 'none',
                                        visibility: c3Opacity > 0.01 ? 'visible' : 'hidden',
                                    }}
                                >
                                    <LocationCard
                                        title={LOCATIONS[2].title}
                                        description={LOCATIONS[2].description}
                                        services={LOCATIONS[2].services}
                                        industries={LOCATIONS[2].industries}
                                        isHQ={LOCATIONS[2].isHQ}
                                        className="w-full"
                                    />
                                </div>

                                {/* Stage 4: United Kingdom */}
                                <div
                                    className="absolute inset-0 flex items-center"
                                    style={{
                                        opacity: c4Opacity,
                                        transform: `translate3d(0, ${c4Y}px, 0)`,
                                        pointerEvents: c4Opacity > 0.3 ? 'auto' : 'none',
                                        visibility: c4Opacity > 0.01 ? 'visible' : 'hidden',
                                    }}
                                >
                                    <LocationCard
                                        title={LOCATIONS[3].title}
                                        description={LOCATIONS[3].description}
                                        services={LOCATIONS[3].services}
                                        industries={LOCATIONS[3].industries}
                                        isHQ={LOCATIONS[3].isHQ}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile & Reduced-Motion Static Accessible Layout */}
                <div className="lg:hidden motion-reduce:block px-6 md:px-12 py-12">
                    <div className="max-w-[1600px] mx-auto">
                        {/* Mobile Eyebrow */}
                        <p className="font-body text-[#2AB182] mb-4 tracking-[0.2em] text-xs uppercase font-semibold flex items-center gap-2.5">
                            <Globe className="w-4 h-4" />
                            Where We Work. Where Our Clients Are.
                        </p>

                        {/* Mobile Heading */}
                        <p role="heading" aria-level="1" className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[0.94] tracking-tight text-[var(--text-primary)] uppercase mb-6">
                            GLOBAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-400">
                                FOOTPRINT.
                            </span>
                        </p>

                        {/* Mobile Description */}
                        <p className="font-body text-base text-[var(--text-muted)] max-w-2xl mb-10 leading-relaxed">
                            Invictus Global Tech Pvt Ltd works with growth-focused brands across India, the United States, Singapore, and the United Kingdom. We’re not everywhere; we’re exactly where serious founders need us.
                        </p>

                        {/* Mobile Cards Stack */}
                        <div className="flex flex-col gap-4">
                            {LOCATIONS.map((loc) => (
                                <LocationCard
                                    key={loc.id}
                                    title={loc.title}
                                    description={loc.description}
                                    services={loc.services}
                                    industries={loc.industries}
                                    isHQ={loc.isHQ}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Future Expansion & CTA */}
            <section className="py-20 md:py-28 px-6 md:px-12 text-center bg-transparent relative z-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold mb-8 leading-tight">
                        Want to Work With Us <span className="text-[#2AB182]">From Anywhere</span> in the World?
                    </h2>
                    <p className="font-body text-[var(--text-muted)] text-xl mb-12">
                        We operate globally. If your business is serious about growth, we’re ready.
                    </p>
                    <div className="mb-12">
                        <h4 className="font-display text-xl text-[#2AB182] uppercase mb-4">Future Expansion</h4>
                        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 font-body text-[var(--text-primary)]/80">
                            <span>UAE</span> / <span>Malaysia</span>
                        </div>
                    </div>
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300 rounded-sm"
                    >
                        Book a Strategy Call
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default WhereWeArePage;
