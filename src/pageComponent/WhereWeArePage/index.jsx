import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Globe, ArrowRight, MapPin, Building, Sparkles } from 'lucide-react';
import LocationCard from '@/common/LocationCard';
import { InteractiveMap } from '@/common/InteractiveMap';

const RealisticGlobe = dynamic(() => import('@/components/RealisticGlobe'), { ssr: false });

const LOCATIONS = [
    {
        id: "india",
        title: "India: Headquarters",
        region: "ASIA • HEADQUARTERS",
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
        region: "NORTH AMERICA",
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
        region: "SOUTHEAST ASIA",
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
        region: "EUROPE",
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
    const [mobileLocationIdx, setMobileLocationIdx] = useState(0);
    const mobileCardRefs = useRef([]);
    const [headingMetrics, setHeadingMetrics] = useState({
        headingWidth: 680,
        headingHeight: 120,
        containerLeft: 64,
        containerTop: 240,
        windowWidth: 1440,
        windowHeight: 800,
    });

    const footprintSectionRef = useRef(null);
    const headingColumnRef = useRef(null);
    const headingBoxRef = useRef(null);

    // Measure exact dimensions and offsets of the heading group
    useEffect(() => {
        const updateMetrics = () => {
            if (headingBoxRef.current && headingColumnRef.current) {
                const hRect = headingBoxRef.current.getBoundingClientRect();
                const colRect = headingColumnRef.current.getBoundingClientRect();
                const winW = window.innerWidth || 1440;
                const winH = window.innerHeight || 800;

                setHeadingMetrics({
                    headingWidth: hRect.width || 680,
                    headingHeight: hRect.height || 120,
                    containerLeft: colRect.left || 64,
                    containerTop: colRect.top || 240,
                    windowWidth: winW,
                    windowHeight: winH,
                });
            }
        };

        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        const timer = setTimeout(updateMetrics, 100);
        return () => {
            window.removeEventListener('resize', updateMetrics);
            clearTimeout(timer);
        };
    }, []);

    // Scroll listener for pinned storytelling progress
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

    // Mobile scroll-controlled location observer
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute('data-idx'));
                        if (!isNaN(idx)) setMobileLocationIdx(idx);
                    }
                });
            },
            { threshold: 0.45 }
        );
        mobileCardRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Stage Progress Calculations:
    // Stage 1 (p: 0.00 -> 0.06): Heading centered at top-center. Globe offscreen right.
    // Stage 2 (p: 0.06 -> 0.20): Heading glides to left column; description fades in.
    // Stage 3 (p: 0.06 -> 0.20): 3D Globe enters from right and settles in center-right.
    const headingMoveProgress = smoothstep((scrollProgress - 0.05) / 0.12);
    const descProgress = smoothstep((scrollProgress - 0.10) / 0.09);
    const globeEnterProgress = smoothstep((scrollProgress - 0.05) / 0.12);

    // Stage 4 (p: 0.20 -> 0.28): Heading and description fade out to make room for location journey
    const introFadeProgress = smoothstep((scrollProgress - 0.20) / 0.08);
    const introOpacity = 1 - introFadeProgress;
    const introY = -introFadeProgress * 30;

    // Heading transform calculations (center of viewport -> left column)
    const winW = headingMetrics.windowWidth;
    const winH = headingMetrics.windowHeight;
    const colLeft = headingMetrics.containerLeft;
    const colTop = headingMetrics.containerTop;
    const hWidth = headingMetrics.headingWidth;
    const hHeight = headingMetrics.headingHeight;

    // Center of viewport horizontally: (winW / 2)
    // Sized so heading is horizontally centered in the viewport initially
    const centerShiftX = (winW / 2) - colLeft - (hWidth / 2);
    // Vertical centering matching Screenshot 2 (vertically centered in viewable area below navbar)
    const centerShiftY = (winH * 0.48) - colTop - (hHeight / 2);

    const groupShiftX = centerShiftX * (1 - headingMoveProgress);
    const groupShiftY = centerShiftY * (1 - headingMoveProgress);

    // Globe positioning (enters from right edge towards center-right)
    const globeTranslateX = (1 - globeEnterProgress) * 80; // in percent
    const globeOpacity = globeEnterProgress;

    // Active Location index calculation based on scroll progress:
    // Stages 5-8:
    // 0: India HQ (p: 0.28 -> 0.46)
    // 1: United States (p: 0.46 -> 0.64)
    // 2: Singapore (p: 0.64 -> 0.82)
    // 3: United Kingdom (p: 0.82 -> 1.00)
    let activeLocationIdx = -1;
    if (scrollProgress >= 0.28 && scrollProgress < 0.46) {
        activeLocationIdx = 0;
    } else if (scrollProgress >= 0.46 && scrollProgress < 0.64) {
        activeLocationIdx = 1;
    } else if (scrollProgress >= 0.64 && scrollProgress < 0.82) {
        activeLocationIdx = 2;
    } else if (scrollProgress >= 0.82) {
        activeLocationIdx = 3;
    }

    // Card Transitions with generous visibility plateaus:
    // Card 1: India (p: 0.28 -> 0.46)
    const c1Enter = smoothstep((scrollProgress - 0.28) / 0.05);
    const c1Exit = smoothstep((scrollProgress - 0.42) / 0.04);
    const c1Opacity = c1Enter * (1 - c1Exit);
    const c1Y = (1 - c1Enter) * 30 - c1Exit * 15;

    // Card 2: United States (p: 0.46 -> 0.64)
    const c2Enter = smoothstep((scrollProgress - 0.46) / 0.05);
    const c2Exit = smoothstep((scrollProgress - 0.60) / 0.04);
    const c2Opacity = c2Enter * (1 - c2Exit);
    const c2Y = (1 - c2Enter) * 30 - c2Exit * 15;

    // Card 3: Singapore (p: 0.64 -> 0.82)
    const c3Enter = smoothstep((scrollProgress - 0.64) / 0.05);
    const c3Exit = smoothstep((scrollProgress - 0.78) / 0.04);
    const c3Opacity = c3Enter * (1 - c3Exit);
    const c3Y = (1 - c3Enter) * 30 - c3Exit * 15;

    // Card 4: United Kingdom (p: 0.82 -> 1.00)
    const c4Enter = smoothstep((scrollProgress - 0.82) / 0.05);
    const c4Opacity = c4Enter;
    const c4Y = (1 - c4Enter) * 30;

    return (
        <div className="pt-24 min-h-screen">
            {/* SECTION 1: Global Footprint Interactive Pinned Storytelling */}
            <div
                ref={footprintSectionRef}
                id="global-footprint-section"
                className="relative lg:min-h-[520vh] w-full"
            >
                {/* Desktop Split-Screen Sticky Viewport (>= lg) */}
                <div className="hidden lg:flex motion-reduce:hidden sticky top-0 h-screen w-full items-center justify-center overflow-hidden px-6 md:px-12 pt-16 pb-8 pointer-events-none">
                    <div className="max-w-[1600px] w-full mx-auto flex flex-row items-center justify-between gap-8 lg:gap-12 relative h-full">
                        
                        {/* LEFT COLUMN: Headings, Intro Description, and Sequential Location Cards */}
                        <div
                            ref={headingColumnRef}
                            className="w-[46%] xl:w-[45%] shrink-0 flex flex-col justify-center relative z-20 pointer-events-auto h-full"
                        >
                            {/* Heading & Eyebrow Group (Stages 1-3 Visible, Stage 4 Fades Out) */}
                            <div
                                ref={headingBoxRef}
                                className="relative origin-top-left transition-opacity duration-200"
                                style={{
                                    transform: `translate3d(${groupShiftX}px, ${groupShiftY}px, 0)`,
                                    opacity: introOpacity,
                                    visibility: introOpacity > 0.01 ? 'visible' : 'hidden',
                                }}
                            >
                                {/* Eyebrow Tag: Always visible above heading */}
                                <div className="flex items-center gap-2.5 text-[#2AB182] font-body text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4 select-none">
                                    <Globe className="w-4 h-4 shrink-0 text-[#2AB182]" />
                                    <span>Where We Work. Where Our Clients Are.</span>
                                </div>

                                {/* Main Heading: GLOBAL FOOTPRINT. */}
                                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[4rem] leading-none tracking-tight uppercase select-none whitespace-nowrap">
                                    <span className="text-white">GLOBAL </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] via-[#2AB182] to-emerald-400">
                                        FOOTPRINT.
                                    </span>
                                </h1>

                                {/* Introductory Description: Appears as heading settles on the left */}
                                <p
                                    className="font-body text-base lg:text-lg text-[var(--text-muted)] max-w-xl mt-8 leading-relaxed"
                                    style={{
                                        opacity: descProgress,
                                        transform: `translate3d(0, ${(1 - descProgress) * 16}px, 0)`,
                                    }}
                                >
                                    Invictus Global Tech Pvt Ltd works with growth-focused brands across India, the United States, Singapore, and the United Kingdom. We’re not everywhere; we’re exactly where serious founders need us.
                                </p>

                                {/* Scroll Hint */}
                                <div
                                    className="flex items-center gap-2 mt-6 text-xs font-mono text-[#2AB182]/80 uppercase tracking-widest"
                                    style={{ opacity: descProgress }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] animate-ping" />
                                    <span>Scroll to explore our international locations</span>
                                </div>
                            </div>

                            {/* LOCATION JOURNEY CARDS (Stages 5-8): Dedicated Slot in Left Column */}
                            <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
                                <div className="relative w-full max-w-[560px]">
                                    
                                    {/* STAGE 5: Location 1 — India: Headquarters */}
                                    <div
                                        className="w-full transition-all duration-300"
                                        style={{
                                            opacity: c1Opacity,
                                            transform: `translate3d(0, ${c1Y}px, 0)`,
                                            pointerEvents: c1Opacity > 0.3 ? 'auto' : 'none',
                                            visibility: c1Opacity > 0.01 ? 'visible' : 'hidden',
                                            position: c1Opacity > 0.01 ? 'relative' : 'absolute',
                                        }}
                                    >
                                        <div className="flex items-center gap-2 text-[#2AB182] font-mono text-xs uppercase tracking-widest mb-2 font-bold">
                                            <span className="w-2 h-2 rounded-full bg-[#2AB182] animate-pulse" />
                                            <span>LOCATION 01 / 04 • ASIA</span>
                                        </div>
                                        <LocationCard
                                            title={LOCATIONS[0].title}
                                            description={LOCATIONS[0].description}
                                            services={LOCATIONS[0].services}
                                            industries={LOCATIONS[0].industries}
                                            isHQ={LOCATIONS[0].isHQ}
                                            className="w-full"
                                        />
                                        {/* Interactive Map view of Chennai HQ */}
                                        <div className="mt-3">
                                            <InteractiveMap />
                                        </div>
                                    </div>

                                    {/* STAGE 6: Location 2 — United States */}
                                    <div
                                        className="w-full transition-all duration-300"
                                        style={{
                                            opacity: c2Opacity,
                                            transform: `translate3d(0, ${c2Y}px, 0)`,
                                            pointerEvents: c2Opacity > 0.3 ? 'auto' : 'none',
                                            visibility: c2Opacity > 0.01 ? 'visible' : 'hidden',
                                            position: c2Opacity > 0.01 ? 'relative' : 'absolute',
                                        }}
                                    >
                                        <div className="flex items-center gap-2 text-[#2AB182] font-mono text-xs uppercase tracking-widest mb-2 font-bold">
                                            <span className="w-2 h-2 rounded-full bg-[#2AB182] animate-pulse" />
                                            <span>LOCATION 02 / 04 • NORTH AMERICA</span>
                                        </div>
                                        <LocationCard
                                            title={LOCATIONS[1].title}
                                            description={LOCATIONS[1].description}
                                            services={LOCATIONS[1].services}
                                            industries={LOCATIONS[1].industries}
                                            isHQ={LOCATIONS[1].isHQ}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* STAGE 7: Location 3 — Singapore */}
                                    <div
                                        className="w-full transition-all duration-300"
                                        style={{
                                            opacity: c3Opacity,
                                            transform: `translate3d(0, ${c3Y}px, 0)`,
                                            pointerEvents: c3Opacity > 0.3 ? 'auto' : 'none',
                                            visibility: c3Opacity > 0.01 ? 'visible' : 'hidden',
                                            position: c3Opacity > 0.01 ? 'relative' : 'absolute',
                                        }}
                                    >
                                        <div className="flex items-center gap-2 text-[#2AB182] font-mono text-xs uppercase tracking-widest mb-2 font-bold">
                                            <span className="w-2 h-2 rounded-full bg-[#2AB182] animate-pulse" />
                                            <span>LOCATION 03 / 04 • SOUTHEAST ASIA</span>
                                        </div>
                                        <LocationCard
                                            title={LOCATIONS[2].title}
                                            description={LOCATIONS[2].description}
                                            services={LOCATIONS[2].services}
                                            industries={LOCATIONS[2].industries}
                                            isHQ={LOCATIONS[2].isHQ}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* STAGE 8: Location 4 — United Kingdom */}
                                    <div
                                        className="w-full transition-all duration-300"
                                        style={{
                                            opacity: c4Opacity,
                                            transform: `translate3d(0, ${c4Y}px, 0)`,
                                            pointerEvents: c4Opacity > 0.3 ? 'auto' : 'none',
                                            visibility: c4Opacity > 0.01 ? 'visible' : 'hidden',
                                            position: c4Opacity > 0.01 ? 'relative' : 'absolute',
                                        }}
                                    >
                                        <div className="flex items-center gap-2 text-[#2AB182] font-mono text-xs uppercase tracking-widest mb-2 font-bold">
                                            <span className="w-2 h-2 rounded-full bg-[#2AB182] animate-pulse" />
                                            <span>LOCATION 04 / 04 • EUROPE</span>
                                        </div>
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

                        {/* RIGHT COLUMN: Realistic 3D Globe with Geographic Pin Accuracy */}
                        <div
                            className="w-[52%] xl:w-[53%] shrink-0 relative pointer-events-auto h-full flex items-center justify-center"
                            style={{
                                transform: `translate3d(${globeTranslateX}%, 0, 0)`,
                                opacity: globeOpacity,
                                transition: 'transform 0.1s linear, opacity 0.2s linear',
                                visibility: globeOpacity > 0.01 ? 'visible' : 'hidden',
                            }}
                        >
                            <div className="w-full h-[540px] xl:h-[600px] max-w-[600px] relative flex items-center justify-center">
                                {/* Ambient emerald radial backdrop glow behind globe - soft, subtle, non-intrusive */}
                                <div
                                    className="absolute inset-0 pointer-events-none rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle at 50% 50%, rgba(42, 177, 130, 0.07) 0%, rgba(10, 18, 15, 0.0) 70%)',
                                        filter: 'blur(28px)',
                                    }}
                                />

                                {/* Realistic 3D Globe Component */}
                                <RealisticGlobe
                                    activeLocationIndex={activeLocationIdx}
                                    globeOpacity={globeOpacity}
                                    className="w-full h-full relative z-10"
                                />

                                {/* Active Location Badge floating in bottom-right corner of Globe */}
                                {activeLocationIdx >= 0 && (
                                    <div className="absolute bottom-6 right-6 z-20 bg-[#0A120F]/90 backdrop-blur-md border border-[#2AB182]/40 rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3 animate-fade-in pointer-events-none">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#2AB182] animate-ping" />
                                        <div>
                                            <span className="block text-[10px] font-mono uppercase text-[#2AB182] font-semibold tracking-wider">
                                                Active Focus
                                            </span>
                                            <span className="block text-xs font-display font-bold uppercase text-white tracking-wide">
                                                {LOCATIONS[activeLocationIdx].title}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Mobile & Reduced-Motion Layout (< lg) */}
                <div className="lg:hidden motion-reduce:block px-4 sm:px-6 py-12">
                    <div className="max-w-2xl mx-auto">
                        {/* Mobile Eyebrow */}
                        <div className="flex items-center gap-2 text-[#2AB182] font-body text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                            <Globe className="w-4 h-4" />
                            <span>Where We Work. Where Our Clients Are.</span>
                        </div>

                        {/* Mobile Heading */}
                        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase leading-tight mb-4">
                            <span className="text-white">GLOBAL </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-400">
                                FOOTPRINT.
                            </span>
                        </h1>

                        {/* Mobile Description */}
                        <p className="font-body text-sm sm:text-base text-[var(--text-muted)] mb-6 leading-relaxed">
                            Invictus Global Tech Pvt Ltd works with growth-focused brands across India, the United States, Singapore, and the United Kingdom. We’re not everywhere; we’re exactly where serious founders need us.
                        </p>

                        {/* Mobile 3D Globe View - Floating fully visible sphere with zero clipping */}
                        <div className="w-full max-w-[300px] xs:max-w-[340px] aspect-square mx-auto relative mb-5 flex items-center justify-center">
                            <div
                                className="absolute inset-0 pointer-events-none rounded-full"
                                style={{
                                    background: 'radial-gradient(circle at 50% 50%, rgba(42, 177, 130, 0.07) 0%, transparent 70%)',
                                    filter: 'blur(20px)',
                                }}
                            />
                            <RealisticGlobe
                                activeLocationIndex={mobileLocationIdx}
                                globeOpacity={1}
                                className="w-full h-full relative z-10"
                            />
                        </div>

                        {/* Mobile Location Quick Selectors / Pills */}
                        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
                            {LOCATIONS.map((loc, idx) => (
                                <button
                                    key={loc.id}
                                    type="button"
                                    onClick={() => {
                                        setMobileLocationIdx(idx);
                                        const el = mobileCardRefs.current[idx];
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                                        mobileLocationIdx === idx
                                            ? 'bg-[#2AB182] text-black font-bold shadow-md shadow-[#2AB182]/20'
                                            : 'bg-[#0A120F] text-white/70 border border-white/10 hover:border-[#2AB182]/40'
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${mobileLocationIdx === idx ? 'bg-black' : 'bg-[#2AB182]'}`} />
                                    {loc.id === 'india' ? '01 India (HQ)' : loc.id === 'usa' ? '02 USA' : loc.id === 'singapore' ? '03 Singapore' : '04 UK'}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Sequential Location Cards */}
                        <div className="flex flex-col gap-6">
                            {LOCATIONS.map((loc, idx) => (
                                <div
                                    key={loc.id}
                                    ref={(el) => (mobileCardRefs.current[idx] = el)}
                                    data-idx={idx}
                                    className={`relative transition-all duration-300 rounded-xl p-1 ${
                                        mobileLocationIdx === idx ? 'ring-1 ring-[#2AB182]/50' : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-2 text-[#2AB182] font-mono text-[11px] uppercase tracking-wider mb-2 font-bold">
                                        <span className={`w-1.5 h-1.5 rounded-full ${mobileLocationIdx === idx ? 'bg-[#2AB182] animate-ping' : 'bg-[#2AB182]'}`} />
                                        <span>{loc.region}</span>
                                    </div>
                                    <LocationCard
                                        title={loc.title}
                                        description={loc.description}
                                        services={loc.services}
                                        industries={loc.industries}
                                        isHQ={loc.isHQ}
                                    />
                                    {loc.isHQ && (
                                        <div className="mt-3">
                                            <InteractiveMap />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* SECTION 2: Future Expansion & CTA */}
            <section className="py-20 md:py-28 px-6 md:px-12 text-center bg-transparent relative z-20 border-t border-[var(--border-subtle)]">
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
