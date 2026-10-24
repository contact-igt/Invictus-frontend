import React, { useState, useEffect, useRef } from "react";

const smoothstep = (t) => {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
};

const principles = [
  { id: "01", title: "Own the Outcome" },
  { id: "02", title: "Understand Before Executing" },
  { id: "03", title: "Move With Speed" },
  { id: "04", title: "Feedback Without Ego" },
  { id: "05", title: "Use AI as Leverage, Not a Replacement for Judgement" },
  { id: "06", title: "Raise the Standard" },
];

export default function CareersInteractiveSequence() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [heroInitialLoaded, setHeroInitialLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Initial hero entrance animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroInitialLoaded(true);
    }, 60);

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handleMqlChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener("change", handleMqlChange);

    return () => {
      clearTimeout(timer);
      mql.removeEventListener("change", handleMqlChange);
    };
  }, []);

  // Passive scroll tracking with rAF
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || 800;
            const totalDistance = rect.height - windowHeight;
            if (totalDistance > 50) {
              const p = Math.max(0, Math.min(1, -rect.top / totalDistance));
              setProgress((prev) => (Math.abs(prev - p) < 0.0008 ? prev : p));
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

  // ==========================================
  // SECTION 1: HERO CALCULATIONS (p: 0.00 -> 0.28)
  // ==========================================
  // Initial entrance on load:
  const heroInitialY = heroInitialLoaded ? 0 : 26;
  const heroInitialOpacity = heroInitialLoaded ? 1 : 0;

  // Description entrance: reveals smoothly upon scrolling (p: 0.02 -> 0.16)
  const heroDescProgress = smoothstep((progress - 0.02) / 0.14);
  const heroDescY = (1 - heroDescProgress) * 24;
  const heroDescOpacity = heroDescProgress;

  // Hero exit transition toward the left (p: 0.20 -> 0.28)
  const heroExitProgress = smoothstep((progress - 0.20) / 0.08);
  const heroShiftX = -heroExitProgress * 110;
  const heroExitOpacity = 1 - heroExitProgress;
  const heroTotalOpacity = heroInitialOpacity * heroExitOpacity;
  const heroVisible = progress < 0.285 && heroTotalOpacity > 0.001;

  // ==========================================
  // SECTION 2: VALUES CALCULATIONS (p: 0.28 -> 0.57)
  // ==========================================
  // Stage A: Heading entrance upward into prominent position (p: 0.28 -> 0.38)
  const valuesHeadingProgress = smoothstep((progress - 0.28) / 0.10);
  const valuesHeadingY = (1 - valuesHeadingProgress) * 36;
  const valuesHeadingOpacity = valuesHeadingProgress;

  // Stage B: Description entrance beneath heading (p: 0.38 -> 0.48)
  const valuesDescProgress = smoothstep((progress - 0.38) / 0.10);
  const valuesDescY = (1 - valuesDescProgress) * 24;
  const valuesDescOpacity = valuesDescProgress;

  // Stage C: Exit transition together toward the left (p: 0.51 -> 0.57)
  const valuesExitProgress = smoothstep((progress - 0.51) / 0.06);
  const valuesShiftX = -valuesExitProgress * 110;
  const valuesExitOpacity = 1 - valuesExitProgress;
  const valuesVisible = progress >= 0.27 && progress < 0.575 && valuesExitOpacity > 0.001;

  // ==========================================
  // SECTION 3: WORK CULTURE CALCULATIONS (p: 0.57 -> 1.00)
  // ==========================================
  // Heading entrance from lower viewport to stable upper-middle (p: 0.57 -> 0.65)
  const cultureHeadingProgress = smoothstep((progress - 0.57) / 0.08);
  const cultureHeadingY = (1 - cultureHeadingProgress) * 45;
  const cultureHeadingOpacity = cultureHeadingProgress;
  const cultureVisible = progress >= 0.565;

  // Item 01 & Item 02 (p: 0.66 -> 0.73)
  const p01 = smoothstep((progress - 0.66) / 0.065);
  const p02 = smoothstep((progress - 0.67) / 0.065);

  // Item 03 follows and settles (p: 0.74 -> 0.81)
  const p03 = smoothstep((progress - 0.74) / 0.07);

  // Item 04 & Item 05 enter on following progression (p: 0.82 -> 0.89)
  const p04 = smoothstep((progress - 0.82) / 0.065);
  const p05 = smoothstep((progress - 0.83) / 0.065);

  // Item 06 enters last (p: 0.90 -> 0.96)
  const p06 = smoothstep((progress - 0.90) / 0.06);

  const cardProgressList = [p01, p02, p03, p04, p05, p06];

  return (
    <>
      {/* ========================================================
          DESKTOP / INTERACTIVE SCROLL STORYBOARD
          ======================================================== */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[450vh] w-full bg-transparent"
        aria-hidden={reducedMotion ? "true" : "false"}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12 pt-20 md:pt-24 pb-8">
          <div className="max-w-[1240px] w-full mx-auto relative h-full flex items-center">
            {/* ----------------------------------------------------
                1. CAREERS HERO SECTION
                ---------------------------------------------------- */}
            <div
              style={{
                transform: `translate3d(${heroShiftX}px, 0, 0)`,
                opacity: heroTotalOpacity,
                willChange: "transform, opacity",
                pointerEvents: heroVisible ? "auto" : "none",
                display: heroVisible ? "flex" : "none",
              }}
              className="absolute inset-0 flex flex-col justify-center items-start text-left z-10 transition-transform duration-75 ease-out"
            >
              <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-6">
                (01) / CAREERS AT INVICTUS
              </p>

              {/* Complete Main Heading with short, professional entrance on open */}
              <div
                style={{
                  transform: `translate3d(0, ${heroInitialY}px, 0)`,
                  opacity: heroInitialOpacity,
                  transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease-out",
                }}
                className="w-full"
              >
                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1] md:leading-[0.9] uppercase text-[var(--text-primary,#E0E0E0)] w-full max-w-full mb-8">
                  BUILD WORK THAT <br className="hidden md:block" />{" "}
                  <span className="text-[#2AB182]">MOVES BUSINESSES</span> <br className="hidden md:block" />{" "}
                  FORWARD.
                </h1>
              </div>

              {/* Description: Reveals smoothly on scroll, stays readable */}
              <div
                style={{
                  transform: `translate3d(0, ${heroDescY}px, 0)`,
                  opacity: heroDescOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-all duration-75 ease-out max-w-xl"
              >
                <p className="font-body text-[var(--text-secondary,#A0A0A0)] text-base sm:text-lg md:text-xl leading-relaxed">
                  Join a multidisciplinary team working across creativity, technology, marketing and AI-assisted execution to solve meaningful business problems.
                </p>
              </div>

              {/* Note: EXPLORE OPEN ROLES button is intentionally removed */}
            </div>

            {/* ----------------------------------------------------
                2. VALUES SECTION (“IDEAS MATTER. EXECUTION MATTERS MORE.”)
                ---------------------------------------------------- */}
            <div
              style={{
                transform: `translate3d(${valuesShiftX}px, 0, 0)`,
                opacity: valuesExitOpacity,
                willChange: "transform, opacity",
                pointerEvents: valuesVisible ? "auto" : "none",
                display: valuesVisible ? "flex" : "none",
              }}
              className="absolute inset-0 flex flex-col justify-center items-start text-left z-20 transition-transform duration-75 ease-out"
            >
              {/* Stage A: Heading & Label entrance */}
              <div
                style={{
                  transform: `translate3d(0, ${valuesHeadingY}px, 0)`,
                  opacity: valuesHeadingOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-all duration-75 ease-out w-full"
              >
                <p className="font-body text-[#2AB182] text-sm uppercase tracking-widest font-bold mb-4">
                  (02) / WHAT INVICTUS STANDS FOR
                </p>
                <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl uppercase mb-6 text-[var(--text-primary,#E0E0E0)] max-w-4xl">
                  IDEAS MATTER. EXECUTION MATTERS MORE.
                </h2>
              </div>

              {/* Stage B: Description entrance */}
              <div
                style={{
                  transform: `translate3d(0, ${valuesDescY}px, 0)`,
                  opacity: valuesDescOpacity,
                  willChange: "transform, opacity",
                }}
                className="transition-all duration-75 ease-out max-w-2xl"
              >
                <p className="font-body text-[var(--text-secondary,#A0A0A0)] text-lg">
                  We value clear thinking, professional craft, accountability and work that supports real business outcomes.
                </p>
              </div>
            </div>

            {/* ----------------------------------------------------
                3. WORK CULTURE SECTION (“HOW WE WORK.”)
                ---------------------------------------------------- */}
            <div
              style={{
                opacity: cultureVisible ? 1 : 0,
                pointerEvents: cultureVisible ? "auto" : "none",
                display: cultureVisible ? "flex" : "none",
              }}
              className="absolute inset-0 flex flex-col justify-center z-30 transition-opacity duration-100 ease-out"
            >
              {/* Heading: Rises into position and remains centered and stable */}
              <div
                style={{
                  transform: `translate3d(0, ${cultureHeadingY}px, 0)`,
                  opacity: cultureHeadingOpacity,
                  willChange: "transform, opacity",
                }}
                className="text-center mb-10 md:mb-12 lg:mb-14 transition-all duration-75 ease-out shrink-0"
              >
                <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-3">
                  (03) / WORK CULTURE
                </p>
                <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-[var(--text-primary,#E0E0E0)]">
                  HOW WE WORK.
                </h2>
              </div>

              {/* Six Items Sequential Entrance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                {principles.map((principle, index) => {
                  const cardP = cardProgressList[index];
                  const cardY = (1 - cardP) * 32;
                  const cardOpacity = cardP;

                  return (
                    <div
                      key={principle.id}
                      style={{
                        transform: `translate3d(0, ${cardY}px, 0)`,
                        opacity: cardOpacity,
                        willChange: "transform, opacity",
                      }}
                      className="border-t border-[var(--border-primary,#333)] pt-6 group hover:border-[var(--accent,#2AB182)]/50 transition-colors duration-150 ease-out"
                    >
                      <span className="text-[var(--accent,#2AB182)] font-bold text-sm mb-3 block group-hover:translate-x-2 transition-transform duration-150 ease-out">
                        {principle.id}
                      </span>
                      <h3 className="font-display font-bold text-lg md:text-xl uppercase text-[var(--text-primary,#E0E0E0)] leading-snug">
                        {principle.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE / REDUCED MOTION STATIC PRESENTATION
          ======================================================== */}
      <div className="md:hidden motion-reduce:block w-full">
        {/* Section 1: Careers Hero */}
        <section className="pt-28 pb-20 border-b border-[var(--border-primary,#333)] px-6">
          <div className="max-w-[1240px] mx-auto flex flex-col items-start text-left">
            <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-6">
              (01) / CAREERS AT INVICTUS
            </p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight uppercase text-[var(--text-primary,#E0E0E0)] mb-8">
              BUILD WORK THAT <br />{" "}
              <span className="text-[#2AB182]">MOVES BUSINESSES</span> <br />{" "}
              FORWARD.
            </h1>
            <p className="font-body text-[var(--text-secondary,#A0A0A0)] text-base sm:text-lg leading-relaxed">
              Join a multidisciplinary team working across creativity, technology, marketing and AI-assisted execution to solve meaningful business problems.
            </p>
          </div>
        </section>

        {/* Section 2: Values */}
        <section className="py-20 border-b border-[var(--border-subtle,#333)] px-6">
          <div className="max-w-[1240px] mx-auto">
            <p className="font-body text-[#2AB182] text-sm uppercase tracking-widest font-bold mb-4">
              (02) / WHAT INVICTUS STANDS FOR
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-6 text-[var(--text-primary,#E0E0E0)]">
              IDEAS MATTER. EXECUTION MATTERS MORE.
            </h2>
            <p className="font-body text-[var(--text-secondary,#A0A0A0)] text-base sm:text-lg">
              We value clear thinking, professional craft, accountability and work that supports real business outcomes.
            </p>
          </div>
        </section>

        {/* Section 3: Work Culture */}
        <section id="culture" className="py-20 border-b border-[var(--border-primary,#333)] px-6">
          <div className="max-w-[1240px] mx-auto">
            <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-4">
              (03) / WORK CULTURE
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-12 text-[var(--text-primary,#E0E0E0)]">
              HOW WE WORK.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {principles.map((principle) => (
                <div
                  key={principle.id}
                  className="border-t border-[var(--border-primary,#333)] pt-6 group hover:border-[var(--accent,#2AB182)]/50 transition-colors duration-150 ease-out"
                >
                  <span className="text-[var(--accent,#2AB182)] font-bold text-sm mb-4 block group-hover:translate-x-2 transition-transform duration-150 ease-out">
                    {principle.id}
                  </span>
                  <h3 className="font-display font-bold text-xl uppercase text-[var(--text-primary,#E0E0E0)]">
                    {principle.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
