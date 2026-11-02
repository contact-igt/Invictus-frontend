import React, { useState, useEffect, useRef } from "react";

export default function CultureSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mql.matches) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const principles = [
    { id: "01", title: "Own the Outcome" },
    { id: "02", title: "Understand Before Executing" },
    { id: "03", title: "Move With Speed" },
    { id: "04", title: "Feedback Without Ego" },
    { id: "05", title: "Use AI as Leverage, Not a Replacement for Judgement" },
    { id: "06", title: "Raise the Standard" },
  ];

  return (
    <section
      ref={sectionRef}
      id="culture"
      className="py-20 transition-colors duration-300"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-4">
          (03) / WORK CULTURE
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl uppercase mb-16 text-[var(--text-primary,#E0E0E0)]">
          HOW WE WORK.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => {
            const isRow1 = index < 3;
            const transitionDelay = isRow1 ? "0ms" : "360ms";

            return (
              <div
                key={principle.id}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
                  transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}`,
                  willChange: isVisible ? "auto" : "opacity, transform",
                }}
                className="pt-2 group transition-colors duration-150 ease-out"
              >
                <span className="text-[var(--accent,#2AB182)] font-bold text-sm mb-4 block group-hover:translate-x-2 transition-transform duration-150 ease-out">
                  {principle.id}
                </span>
                <h3 className="font-display font-bold text-xl uppercase text-[var(--text-primary,#E0E0E0)]">
                  {principle.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
