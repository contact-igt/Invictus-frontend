import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TeamCircularCarousel from "@/components/TeamCircularCarousel";
import TeamModal from "../../components/TeamModal";
import { useTheme } from "@/context/ThemeContext";

const smoothstep = (t) => {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
};

const AboutPage = ({ onContactClick }) => {
  const { theme } = useTheme();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Entrance state for non-pinned animated sections
  const [isBuiltVisible, setIsBuiltVisible] = useState(false);
  const [isOriginVisible, setIsOriginVisible] = useState(false);

  // Scroll progress for sticky sections
  const [antiAgencyProgress, setAntiAgencyProgress] = useState(0);
  const [invictusWayProgress, setInvictusWayProgress] = useState(0);
  const [growthStoryProgress, setGrowthStoryProgress] = useState(0);

  const builtRef = useRef(null);
  const antiAgencyRef = useRef(null);
  const originRef = useRef(null);
  const invictusWayRef = useRef(null);
  const growthStoryRef = useRef(null);

  const teamMembers = [
    { name: "IYYAPPAN", role: "Web Developer" },
    { name: "DR. SENTHIL", role: "Strategist & Advisor" },
    { name: "THARIQ", role: "CTO" },
    { name: "ANJU", role: "performance marketer" },
    { name: "DIKSHITA", role: "performance marketer" },
    { name: "AALAM", role: "Operations" },
    { name: "SUSHIL", role: "CEO" },
    { name: "VEERAVEL", role: "Web Developer" },
    { name: "VIGNESH RAJAN", role: "creative head" },
    { name: "ANITHA", role: "Operations Head" },
    { name: "ABHILASH", role: "HR & Ops" },
    { name: "NAVEEN RAJ", role: "Web Developer" },
    { name: "RUTUJA", role: "Operations" },
    { name: "AISHWARYA", role: "performance marketer" },
    { name: "ABI", role: "" },
    { name: "KOUSHIK", role: "" },
    { name: "ASWATHY", role: "" },
  ];

  const handleMemberClick = (index) => {
    setSelectedMemberIndex(index);
    setIsModalOpen(true);
  };

  const values = [
    {
      title: "Data over Opinions",
      desc: "We do not guess. We test, track, and optimize based on hard conversion numbers and verified unit economics.",
    },
    {
      title: "Clarity over Confusion",
      desc: "No marketing jargon. Just transparent reporting on qualified leads, pipeline, and customer acquisition cost.",
    },
    {
      title: "Performance over Vanity",
      desc: "We do not report on reach or superficial impressions. If an activity does not advance pipeline revenue or customer acquisition, we don't celebrate it.",
    },
    {
      title: "Complete Data Ownership",
      desc: "You retain 100% ownership of your ad accounts, analytics data, and creative assets. No hidden fees, no opaque numbers.",
    },
  ];

    const pillars = [
    {
      title: "01. Extreme Accountability",
      desc: "We take responsibility for the numbers, from lead volume and quality to final booked appointments or revenue. No excuses. No stories. Only outcomes.",
    },
    {
      title: "02. Obsession With Data & Technical Infrastructure",
      desc: "From high-speed landing pages to server-side tracking (CAPI) and lead automations, every click, lead, and conversion is tracked. Every campaign decision is backed by real numbers, not guesswork.",
      extra: "We provide live dashboards and weekly reviews, not confusing spreadsheets.",
    },
    {
      title: "03. AI in Every Layer",
      desc: "We use AI for funnel analysis, creative variations, audience research, automation in follow-ups, lead scoring, and performance testing.",
      extra: "AI doesn’t replace strategy. It accelerates it.",
    },
  ];

  // IntersectionObserver for non-sticky entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === builtRef.current && entry.isIntersecting) {
            setIsBuiltVisible(true);
          }
          if (entry.target === originRef.current && entry.isIntersecting) {
            setIsOriginVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (builtRef.current) observer.observe(builtRef.current);
    if (originRef.current) observer.observe(originRef.current);

    return () => observer.disconnect();
  }, []);

  // Scroll listener for sticky progress calculations
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight || 800;

          if (antiAgencyRef.current) {
            const rect = antiAgencyRef.current.getBoundingClientRect();
            const totalDistance = rect.height - windowHeight;
            if (totalDistance > 50) {
              const p = Math.max(0, Math.min(1, -rect.top / totalDistance));
              setAntiAgencyProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p));
            }
          }

          if (invictusWayRef.current) {
            const rect = invictusWayRef.current.getBoundingClientRect();
            const totalDistance = rect.height - windowHeight;
            if (totalDistance > 50) {
              const p = Math.max(0, Math.min(1, -rect.top / totalDistance));
              setInvictusWayProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p));
            }
          }

          if (growthStoryRef.current) {
            const rect = growthStoryRef.current.getBoundingClientRect();
            const totalDistance = rect.height - windowHeight;
            if (totalDistance > 50) {
              const p = Math.max(0, Math.min(1, -rect.top / totalDistance));
              setGrowthStoryProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p));
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // The Anti-Agency calculations
  // Heading enters as p: 0 -> 0.22, settles in place with 100% opacity
  const antiAgencyHeadingY = isMobile
    ? 0
    : (1 - smoothstep(Math.min(1, antiAgencyProgress / 0.22))) * 50;
  // Description enters after heading settles as p: 0.22 -> 0.55
  const antiAgencyDescProgress = Math.max(0, Math.min(1, (antiAgencyProgress - 0.22) / 0.33));
  const antiAgencyDescY = isMobile ? 0 : (1 - smoothstep(antiAgencyDescProgress)) * 40;
  const antiAgencyDescOpacity = isMobile ? 1 : antiAgencyDescProgress;

  // The Invictus Way calculations
  // Heading enters as p: 0 -> 0.12, stays pinned at top with 100% opacity
  const invictusHeadingY = (1 - smoothstep(Math.min(1, invictusWayProgress / 0.12))) * 40;

  // Card 0 (01. Extreme Accountability): enters as p: 0.15 -> 0.36, then completely settled
  const c0Progress = Math.max(0, Math.min(1, (invictusWayProgress - 0.15) / 0.21));
  const c0Y = (1 - smoothstep(c0Progress)) * 240;
  const c0Opacity = smoothstep(Math.min(1, c0Progress * 2.2));

  // Card 1 (02. Obsession With Data): enters as p: 0.42 -> 0.63, strictly AFTER Card 0 has settled
  const c1Progress = Math.max(0, Math.min(1, (invictusWayProgress - 0.42) / 0.21));
  const c1Y = (1 - smoothstep(c1Progress)) * 240;
  const c1Opacity = smoothstep(Math.min(1, c1Progress * 2.2));

  // Card 2 (03. AI in Every Layer): enters as p: 0.69 -> 0.90, strictly AFTER Card 1 has settled
  const c2Progress = Math.max(0, Math.min(1, (invictusWayProgress - 0.69) / 0.21));
  const c2Y = (1 - smoothstep(c2Progress)) * 240;
  const c2Opacity = smoothstep(Math.min(1, c2Progress * 2.2));

  const cardTransforms = [
    { translateY: c0Y, opacity: c0Opacity },
    { translateY: c1Y, opacity: c1Opacity },
    { translateY: c2Y, opacity: c2Opacity },
  ];

  // 7. We Work Only With People Who Are Serious About Growth (Storytelling Scroll Animation)
  // Stage 1: Heading enters from bottom to visual center (p: 0.00 -> 0.14)
  const growthHeadingY = (1 - smoothstep(Math.min(1, growthStoryProgress / 0.14))) * 220;
  const growthHeadingOpacity = smoothstep(Math.min(1, growthStoryProgress / 0.08));

  // Stage 2: Description appears beneath heading in center (p: 0.16 -> 0.28)
  const descProgress = Math.max(0, Math.min(1, (growthStoryProgress - 0.16) / 0.12));
  const growthDescOpacity = smoothstep(descProgress);
  const growthDescY = (1 - smoothstep(descProgress)) * 25;

  // Stage 3: Heading and description move left (p: 0.32 -> 0.46)
  const shiftLeftProgress = Math.max(0, Math.min(1, (growthStoryProgress - 0.32) / 0.14));
  const leftGroupShiftX = (1 - smoothstep(shiftLeftProgress)) * 50; // translates from 50% (centered) to 0% (left)

  // Stage 4: Partnership box enters from bottom in right column (p: 0.49 -> 0.63)
  const partnerEnterProgress = Math.max(0, Math.min(1, (growthStoryProgress - 0.49) / 0.14));
  const partnerY = (1 - smoothstep(partnerEnterProgress)) * 200;
  const partnerEnterOpacity = smoothstep(Math.min(1, partnerEnterProgress * 2));

  // Stage 5: Partnership box fades out smoothly in place (p: 0.67 -> 0.77)
  const partnerFadeOutProgress = Math.max(0, Math.min(1, (growthStoryProgress - 0.67) / 0.10));
  const partnerTotalOpacity = partnerEnterOpacity * (1 - smoothstep(partnerFadeOutProgress));

  // Left group (Heading + Description) smoothly fades out before quote takes center stage (p: 0.77 -> 0.82)
  const leftGroupFadeOut = Math.max(0, Math.min(1, (growthStoryProgress - 0.77) / 0.05));
  const leftGroupOpacity = 1 - smoothstep(leftGroupFadeOut);

  // Stage 6: Quote appears and settles in the center (p: 0.80 -> 0.92)
  const quoteProgress = Math.max(0, Math.min(1, (growthStoryProgress - 0.80) / 0.12));
  const quoteY = (1 - smoothstep(quoteProgress)) * 40;
  const quoteOpacity = smoothstep(quoteProgress);

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      {/* 0. ABOUT US / OUR PEOPLE (Preserved exactly with team carousel) */}
      <section className="pt-6 pb-14 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 px-6 md:px-12 lg:px-20 bg-transparent overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-[1600px] mx-auto">
          {/* Left: Text Section */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start justify-center relative z-10">
            <p
              className="mb-4 uppercase text-center lg:text-left text-[28px] md:text-[36px] lg:text-[44px] text-[var(--text-secondary)]"
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 400,
                lineHeight: "90%",
                letterSpacing: "-0.05em",
              }}
            >
              ABOUT US
            </p>
            <div className="leading-[0.8] mb-0 relative text-center lg:text-left">
              <span
                className="block italic text-[var(--text-primary)] text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  marginLeft: "0.2rem",
                }}
              >
                our
              </span>
              <span
                className="block text-[#2AB182] font-bold not-italic text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  lineHeight: "0.85",
                  letterSpacing: "-0.04em",
                }}
              >
                PEOPLE
              </span>
              {/* Arrow image below PEOPLE - theme conditional */}
              <img
                src={theme === "light" ? "/assets/arrowblack.png" : "/assets/arrow1.png"}
                alt=""
                aria-hidden="true"
                width={420}
                height={35}
                loading="lazy"
                decoding="async"
                className="w-full max-w-[420px] mx-auto lg:mx-0 mt-2"
                style={{ height: "auto", maxHeight: "35px", objectFit: "contain" }}
              />
            </div>
            <div className="flex text-center mt-2 w-full lg:justify-start">
              <span
                className="font-body text-[var(--text-primary)] text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] tracking-widest flex items-baseline justify-center lg:justify-start gap-2 w-full"
                style={{ fontWeight: 400, letterSpacing: "0.08em" }}
              >
                MEET{" "}
                <span
                  className="italic text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  the
                </span>{" "}
                TEAM
              </span>
            </div>
          </div>

          {/* Right: 3D Circular Carousel */}
          <div className="w-full lg:w-7/12 relative min-h-[520px] md:min-h-[580px] lg:min-h-[660px] flex items-center justify-center mt-8 lg:mt-0">
            <TeamCircularCarousel teamMembers={teamMembers} initialMemberName="SUSHIL" />
          </div>
        </div>

        <TeamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          teamMembers={teamMembers}
          initialSlide={selectedMemberIndex !== null ? selectedMemberIndex : 0}
        />
      </section>

      {/* 1. BUILT ON ACCOUNTABILITY (Smooth upward entrance on scroll, NOT sticky, scrolls naturally) */}
      <section
        ref={builtRef}
        id="built-on-accountability"
        className="px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 text-left max-w-[1600px] mx-auto overflow-hidden"
      >
        <div
          className={`transition-all duration-700 ease-out ${
            isBuiltVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
            <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
            Who We Are • Invictus Global Tech
          </p>
          <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-[var(--text-primary)] uppercase mb-6">
            Built On <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">
              Accountability.
            </span>
          </h1>
        </div>
      </section>

      {/* 2. THE ANTI-AGENCY FOR SERIOUS BRANDS (Sticky Centered Heading + Sequential Description Entrance) */}
      <section
        ref={antiAgencyRef}
        id="anti-agency"
        className="relative min-h-0 md:min-h-[175vh] bg-transparent"
      >
        <div className="md:sticky md:top-0 md:h-screen w-full flex items-center justify-center px-6 md:px-12 py-16 md:py-0 overflow-hidden">
          <div className="max-w-[1500px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Heading: Animates upward into view, remains pinned with 100% opacity */}
            <div
              style={{
                transform: `translate3d(0, ${antiAgencyHeadingY}px, 0)`,
                willChange: "transform",
              }}
              className="transition-transform duration-75 ease-out"
            >
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] font-bold leading-tight">
                The Anti-Agency for <br />
                <span className="text-[#2AB182]">Serious Brands.</span>
              </h2>
            </div>

            {/* Description: Enters smoothly upward beside heading once heading settles */}
            <div
              style={{
                transform: `translate3d(0, ${antiAgencyDescY}px, 0)`,
                opacity: antiAgencyDescOpacity,
                willChange: "transform, opacity",
              }}
              className="font-body text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed space-y-6 transition-all duration-75 ease-out"
            >
                            <p>
                Invictus Global Tech was founded with a singular purpose: to replace vanity metrics with accountable revenue growth. Impressions, follower counts, and clicks mean nothing if they do not turn into qualified leads and revenue.
              </p>
              <p className="font-body text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                We operate as an embedded growth partner, not an outsourced vendor. Every paid campaign, creative asset, and automation workflow we build is tied directly to measurable business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. OUR ORIGIN & OUR STORY (Matching Floating-Card Design, Side-by-Side on Desktop) */}
      <section
        ref={originRef}
        id="origin-story"
        className="py-16 md:py-24 px-6 md:px-12 bg-transparent"
      >
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Card 1: Our Origin */}
            <div
              className={`rounded-2xl md:rounded-3xl bg-[var(--bg-card)]/40 border border-[#262626] p-8 md:p-10 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-[#2AB182] hover:shadow-[0_20px_45px_rgba(42,177,130,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out group ${
                isOriginVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span className="font-mono text-xs text-[#2AB182] font-semibold bg-[#2AB182]/10 border border-[#2AB182]/30 px-3.5 py-1 rounded-full uppercase tracking-widest inline-block mb-6">
                  OUR ORIGIN
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-bold mb-6 uppercase leading-tight group-hover:text-white transition-colors duration-300">
                  FROM CHENNAI FOUNDATION TO GLOBAL PARTNER.
                </h3>
                <p className="font-body text-[var(--text-muted)] text-base leading-relaxed mb-5">
                  Headquartered in Chennai, Invictus Global Tech began by working directly with founders, healthcare providers, educators, and brand owners. We saw first-hand where advertising budgets are wasted on disconnected tactics, and where systematic execution creates compounding revenue.
                </p>
                <p className="font-body text-[var(--text-secondary)] text-base leading-relaxed">
                  Today, we operate as a full-funnel performance marketing engine for businesses ready to scale. We remain lean, agile, and disciplined—focused on improving customer acquisition efficiency month after month.
                </p>
              </div>
            </div>

            {/* Card 2: Our Story */}
            <div
              style={{ transitionDelay: "150ms" }}
              className={`rounded-2xl md:rounded-3xl bg-[var(--bg-card)]/40 border border-[#262626] p-8 md:p-10 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:border-[#2AB182] hover:shadow-[0_20px_45px_rgba(42,177,130,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out group ${
                isOriginVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span className="font-mono text-xs text-[#2AB182] font-semibold bg-[#2AB182]/10 border border-[#2AB182]/30 px-3.5 py-1 rounded-full uppercase tracking-widest inline-block mb-6">
                  OUR STORY
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-bold mb-6 uppercase leading-tight group-hover:text-white transition-colors duration-300">
                  BUILT FOR ACTUAL BUSINESS OUTCOMES.
                </h3>
                <p className="font-body text-[var(--text-secondary)] text-base leading-relaxed mb-4">
                  Across the digital marketing landscape, we observed that high-growth businesses consistently faced four fundamental gaps in their agency relationships:
                </p>
                <div className="py-3 mb-4 border-y border-[var(--border-subtle)]">
                  <p className="mb-2 text-xs uppercase tracking-wider font-bold text-[var(--text-muted)]">
                    Businesses weren&apos;t getting:
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3 font-mono text-xs uppercase tracking-wider text-[#2AB182]">
                    <span className="bg-[#2AB182]/10 px-2 py-0.5 rounded">Clarity</span>
                    <span className="bg-[#2AB182]/10 px-2 py-0.5 rounded">Proper Tracking</span>
                    <span className="bg-[#2AB182]/10 px-2 py-0.5 rounded">Quality Leads</span>
                    <span className="bg-[#2AB182]/10 px-2 py-0.5 rounded">ROI</span>
                    <span className="bg-[#2AB182]/10 px-2 py-0.5 rounded">Accountability</span>
                  </div>
                </div>
                <p className="font-body text-[var(--text-secondary)] text-base leading-relaxed mb-3">
                  So we built the opposite model: a performance-first, data-backed,
                  AI-integrated engine that focuses on one thing: actual business
                  outcomes.
                </p>
                <p className="font-body text-[var(--text-muted)] text-sm leading-relaxed">
                  Today, we partner with brands across{" "}
                  <strong className="text-[var(--text-primary)]">Healthcare, EdTech, E-commerce, and Automotive</strong>.
                  Across all these industries, our approach stays the same:{" "}
                  <span className="text-[#2AB182] font-semibold">
                    Test fast, scale what works, cut what doesn’t.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR NON-NEGOTIABLES (Completely Static Section — Normal Page Scrolling, Zero Animations) */}
      <section id="non-negotiables" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl text-[var(--text-primary)] font-bold mb-16 text-center tracking-tight">
            Our Non-Negotiables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-8 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-card)]/30 hover:border-[#2AB182] active:border-[#2AB182] transition-colors duration-300 group"
              >
                <h3 className="font-display text-xl text-[var(--text-primary)] font-bold mb-4 group-hover:text-[#2AB182] transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="font-body text-[var(--text-muted)] text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE INVICTUS WAY (Sticky Heading + Staggered Three-Card Sequence) */}
      <section
        ref={invictusWayRef}
        id="the-invictus-way"
        className="relative min-h-0 md:min-h-[320vh] bg-transparent"
      >
        {/* Desktop Sticky Viewport */}
        <div className="hidden md:flex motion-reduce:hidden sticky top-0 h-screen w-full flex-col justify-start pt-20 md:pt-24 pb-12 px-6 md:px-12 overflow-hidden">
          {/* Sticky Heading: Animates upward, settles near top, stays pinned with 100% opacity */}
          <div
            style={{
              transform: `translate3d(0, ${invictusHeadingY}px, 0)`,
              willChange: "transform",
            }}
            className="text-center shrink-0 z-20 max-w-4xl mx-auto px-4 mb-8 md:mb-12 transition-transform duration-75 ease-out"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] font-bold mb-3 tracking-tight">
              The Invictus Way
            </h2>
            <p className="font-body text-[var(--text-muted)] text-base md:text-lg">
              We’re a performance marketing engine built on three core pillars:
            </p>
          </div>

          {/* Three Cards Container: Staggered sequential entrance, settle side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1500px] w-full mx-auto my-auto items-stretch">
            {pillars.map((pillar, idx) => {
              const { translateY, opacity } = cardTransforms[idx];

              return (
                <div
                  key={idx}
                  style={{
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    opacity,
                    willChange: "transform, opacity",
                    pointerEvents: opacity === 0 ? "none" : "auto",
                  }}
                  className="p-8 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-card)]/50 hover:border-[#2AB182] transition-all duration-300 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                >
                  <div>
                    <h3 className="font-display text-2xl text-[#2AB182] font-bold mb-5 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-[var(--text-secondary)] leading-relaxed mb-4 text-base">
                      {pillar.desc}
                    </p>
                  </div>
                  {pillar.extra && (
                    <p className="font-body text-[var(--text-primary)] font-medium italic border-t border-[var(--border-subtle)] pt-4 mt-2 text-sm">
                      {pillar.extra}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Reduced-Motion Fallback (Natural Stacked Layout) */}
        <div className="md:hidden motion-reduce:block py-16 px-6">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <p role="heading" aria-level="2" className="font-display text-3xl sm:text-4xl text-[var(--text-primary)] font-bold mb-3">
              The Invictus Way
            </p>
            <p className="font-body text-[var(--text-muted)] text-sm">
              We’re a performance marketing engine built on three core pillars:
            </p>
          </div>

          <div className="space-y-6 max-w-lg mx-auto">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-7 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-card)]/40 shadow-lg"
              >
                <h3 className="font-display text-xl text-[#2AB182] font-bold mb-3">
                  {pillar.title}
                </h3>
                <p className="font-body text-[var(--text-secondary)] leading-relaxed text-sm mb-3">
                  {pillar.desc}
                </p>
                {pillar.extra && (
                  <p className="font-body text-[var(--text-primary)] font-medium italic border-t border-[var(--border-subtle)] pt-3 text-xs">
                    {pillar.extra}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WE WORK ONLY WITH PEOPLE WHO ARE SERIOUS ABOUT GROWTH (Storytelling Scroll Animation) */}
      <section
        ref={growthStoryRef}
        id="who-we-work-with"
        className="relative min-h-0 lg:min-h-[420vh] bg-transparent"
      >
        {/* Desktop Sticky Viewport */}
        <div className="hidden lg:flex motion-reduce:hidden sticky top-0 h-screen w-full items-center justify-center px-6 md:px-12 overflow-hidden">
          <div className="max-w-[1500px] w-full mx-auto relative flex items-center justify-between min-h-[480px]">
            {/* Left Column (Heading + Description) */}
            <div
              style={{
                transform: `translate3d(${leftGroupShiftX}%, ${growthHeadingY}px, 0)`,
                opacity: leftGroupOpacity,
                willChange: "transform, opacity",
                pointerEvents: leftGroupOpacity === 0 ? "none" : "auto",
              }}
              className="w-1/2 pr-8 shrink-0 z-10 transition-transform duration-75 ease-out"
            >
              <h2
                style={{ opacity: growthHeadingOpacity }}
                className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-bold leading-tight mb-8"
              >
                We Work Only With People Who Are{" "}
                <span className="text-[#2AB182]">Serious About Growth.</span>
              </h2>
              <p
                style={{
                  opacity: growthDescOpacity,
                  transform: `translate3d(0, ${growthDescY}px, 0)`,
                }}
                className="font-body text-[var(--text-muted)] text-base sm:text-lg mb-8 leading-relaxed transition-all duration-75 ease-out"
              >
                We don&apos;t work with everyone intentionally. If you want an agency
                that posts random reels and sends &ldquo;engagement reports&rdquo;, we’re not
                for you.
              </p>
            </div>

            {/* Right Column (Partnership Box) */}
            <div
              style={{
                transform: `translate3d(0, ${partnerY}px, 0)`,
                opacity: partnerTotalOpacity,
                willChange: "transform, opacity",
                pointerEvents: partnerTotalOpacity === 0 ? "none" : "auto",
              }}
              className="w-1/2 pl-8 shrink-0 z-10 transition-transform duration-75 ease-out"
            >
              <div className="bg-[var(--bg-card)]/30 p-8 md:p-12 border border-[var(--border-subtle)] rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.3)]">
                <h3 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] font-bold mb-6 uppercase tracking-wide">
                  We partner with founders who:
                </h3>
                <ul className="space-y-4 font-body text-[var(--text-secondary)] text-base">
                  {[
                    "Treat marketing as an investment, not an expense",
                    "Want full visibility on numbers, tracking, and ROI",
                    "Expect accountability, speed, and high standards",
                    "Are willing to fix sales processes, not blame ads",
                    "Value clarity over fluff, performance over vanity",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stage 6: Quote in the Center */}
            <div
              style={{
                transform: `translate3d(0, ${quoteY}px, 0)`,
                opacity: quoteOpacity,
                willChange: "transform, opacity",
                pointerEvents: quoteOpacity === 0 ? "none" : "auto",
              }}
              className="absolute inset-0 flex items-center justify-center z-20 transition-all duration-75 ease-out"
            >
              <div className="p-8 md:p-14 border border-[#2AB182]/40 bg-[var(--bg-card)]/70 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-3xl w-full text-center">
                <p className="text-[var(--text-primary)] font-bold font-display italic text-2xl sm:text-3xl md:text-4xl leading-relaxed">
                  &ldquo;If you want a partner who owns the numbers with you, we fit
                  perfectly.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet / Reduced-Motion Fallback (Natural Stacked Layout) */}
        <div className="lg:hidden motion-reduce:block py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-bold leading-tight mb-8">
                We Work Only With People Who Are{" "}
                <span className="text-[#2AB182]">Serious About Growth.</span>
              </h2>
              <p className="font-body text-[var(--text-muted)] text-base sm:text-lg mb-8 leading-relaxed">
                We don&apos;t work with everyone intentionally. If you want an agency
                that posts random reels and sends &ldquo;engagement reports&rdquo;, we’re not
                for you.
              </p>
              <div className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)]/30 rounded-xl">
                <p className="text-[var(--text-primary)] font-bold font-display italic text-lg">
                  &ldquo;If you want a partner who owns the numbers with you, we fit
                  perfectly.&rdquo;
                </p>
              </div>
            </div>
            <div className="bg-[var(--bg-card)]/30 p-8 md:p-12 border border-[var(--border-subtle)] rounded-2xl">
              <h3 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] font-bold mb-6 uppercase tracking-wide">
                We partner with founders who:
              </h3>
              <ul className="space-y-4 font-body text-[var(--text-secondary)] text-base">
                {[
                  "Treat marketing as an investment, not an expense",
                  "Want full visibility on numbers, tracking, and ROI",
                  "Expect accountability, speed, and high standards",
                  "Are willing to fix sales processes, not blame ads",
                  "Value clarity over fluff, performance over vanity",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. IF YOU ARE SERIOUS ABOUT GROWTH, LET'S TALK (Final CTA Section) */}
      <section
        id="about-cta"
        className="py-20 md:py-32 text-center px-6 bg-[var(--bg-card)]/20"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-bold mb-8 leading-tight tracking-tight">
            If You’re Serious About{" "}
            <span className="text-[#2AB182]">Growth</span>, Let’s Talk.
          </h2>
          <p className="font-body text-[var(--text-muted)] text-lg sm:text-xl mb-12 leading-relaxed">
            We don’t take on every project. We take on the right ones.{" "}
            <br className="hidden md:block" />
            <span className="text-[var(--text-primary)] font-medium">
              If you’re growth-ready and want a partner who owns the numbers with you:
            </span>
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-10 py-5 rounded hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_8px_25px_rgba(42,177,130,0.3)] hover:shadow-[0_12px_30px_rgba(42,177,130,0.4)] hover:-translate-y-0.5"
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
