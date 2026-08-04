import React from "react";

export default function CultureSection() {
  const principles = [
    { id: "01", title: "Own the Outcome" },
    { id: "02", title: "Understand Before Executing" },
    { id: "03", title: "Move With Speed" },
    { id: "04", title: "Feedback Without Ego" },
    { id: "05", title: "Use AI as Leverage, Not a Replacement for Judgement" },
    { id: "06", title: "Raise the Standard" },
  ];

  return (
    <section id="culture" className="py-20 border-b border-[var(--border-primary,#333)] transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <p className="font-body text-[var(--accent,#2AB182)] text-sm uppercase tracking-widest font-bold mb-4">
          (03) — WORK CULTURE
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl uppercase mb-16 text-[var(--text-primary,#E0E0E0)]">
          HOW WE WORK.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle) => (
            <div key={principle.id} className="border-t border-[var(--border-primary,#333)] pt-6 group hover:border-[var(--accent,#2AB182)]/50 transition-colors duration-150 ease-out">
              <span className="text-[var(--accent,#2AB182)] font-bold text-sm mb-4 block group-hover:translate-x-2 transition-transform duration-150 ease-out">{principle.id}</span>
              <h3 className="font-display font-bold text-xl uppercase text-[var(--text-primary,#E0E0E0)]">{principle.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
