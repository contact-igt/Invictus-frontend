import React, { useState, useEffect, useRef } from "react";

const smoothstep = (t) => {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
};

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
  // SECTION 1: HERO CALCULATIONS (p: 0.00 -> 0.44)
  // ==========================================
  // Initial entrance on load:
  const heroInitialY = heroInitialLoaded ? 0 : 26;
  const heroInitialOpacity = heroInitialLoaded ? 1 : 0;

  // Description entrance: reveals smoothly upon scrolling (p: 0.02 -> 0.20)
  const heroDescProgress = smoothstep((progress - 0.02) / 0.18);
  const heroDescY = (1 - heroDescProgress) * 24;
  const heroDescOpacity = heroDescProgress;

  // Hero exit transition toward the left (p: 0.32 -> 0.44)
  const heroExitProgress = smoothstep((progress - 0.32) / 0.12);
  const heroShiftX = -heroExitProgress * 110;
  const heroExitOpacity = 1 - heroExitProgress;
  const heroTotalOpacity = heroInitialOpacity * heroExitOpacity;
  const heroVisible = progress < 0.45 && heroTotalOpacity > 0.001;

  // ==========================================
  // SECTION 2: VALUES CALCULATIONS (p: 0.38 -> 1.00)
  // ==========================================
  // Stage A: Heading entrance upward into prominent position (p: 0.38 -> 0.52)
  const valuesHeadingProgress = smoothstep((progress - 0.38) / 0.14);
  const valuesHeadingY = (1 - valuesHeadingProgress) * 36;
  const valuesHeadingOpacity = valuesHeadingProgress;

  // Stage B: Description entrance beneath heading (p: 0.50 -> 0.65)
  const valuesDescProgress = smoothstep((progress - 0.50) / 0.15);
  const valuesDescY = (1 - valuesDescProgress) * 24;
  const valuesDescOpacity = valuesDescProgress;

  const valuesVisible = progress >= 0.36;

  return (
    <>
      {/* ========================================================
          DESKTOP / INTERACTIVE SCROLL STORYBOARD (SECTIONS 1 & 2)
          ======================================================== */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[200vh] w-full bg-transparent"
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
            </div>

            {/* ----------------------------------------------------
                2. VALUES SECTION (“IDEAS MATTER. EXECUTION MATTERS MORE.”)
                ---------------------------------------------------- */}
            <div
              style={{
                pointerEvents: valuesVisible ? "auto" : "none",
                display: valuesVisible ? "flex" : "none",
              }}
              className="absolute inset-0 flex flex-col justify-center items-start text-left z-20"
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
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE / REDUCED MOTION STATIC PRESENTATION (SECTIONS 1 & 2)
          ======================================================== */}
      <div className="md:hidden motion-reduce:block w-full">
        {/* Section 1: Careers Hero */}
        <section className="pt-28 pb-20 border-b border-[var(--border-primary,#333)] px-6">
          <div className="max-w-[1240px] mx-auto flex flex-col items-start text-left">
            <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-6">
              (01) / CAREERS AT INVICTUS
            </p>
            <p role="heading" aria-level="1" className="font-display font-bold text-4xl sm:text-5xl leading-tight uppercase text-[var(--text-primary,#E0E0E0)] mb-8">
              BUILD WORK THAT <br />{" "}
              <span className="text-[#2AB182]">MOVES BUSINESSES</span> <br />{" "}
              FORWARD.
            </p>
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
      </div>
    </>
  );
}
