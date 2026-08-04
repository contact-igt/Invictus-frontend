import React from "react";

export default function CareersHero() {
  return (
    <section className="py-20 md:py-32 border-b border-[var(--border-primary,#333)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col items-start text-left relative z-10">
        <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-6">
          (01) — CAREERS AT INVICTUS
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1] md:leading-[0.9] uppercase text-[var(--text-primary,#E0E0E0)] w-full max-w-full mb-8">
          BUILD WORK THAT<br className="hidden md:block" /> <span className="text-[#2AB182]">MOVES BUSINESSES</span><br className="hidden md:block" /> FORWARD.
        </h1>
        <p className="font-body text-[var(--text-secondary,#A0A0A0)] text-base sm:text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
          Join a multidisciplinary team working across creativity, technology, marketing and AI-assisted execution to solve meaningful business problems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#open-roles"
            className="min-h-[44px] inline-flex items-center justify-center bg-[var(--accent,#2AB182)] text-black px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#22956d] transition-colors duration-150 ease-out text-center rounded-sm focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none"
          >
            EXPLORE OPEN ROLES
          </a>
        </div>
      </div>
    </section>
  );
}
