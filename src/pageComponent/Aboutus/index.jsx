import React from 'react';
import { BarChart3, Target, Zap, Users, CheckCircle } from 'lucide-react';

const AboutPage = ({ onContactClick }) => {
  const values = [
    {
      icon: <BarChart3 className="text-[#2AB182]" size={32} />,
      title: "Data over Opinions",
      desc: "We don't guess. We test, track, and optimize based on hard numbers and unit economics."
    },
    {
      icon: <Target className="text-[#2AB182]" size={32} />,
      title: "Clarity over Confusion",
      desc: "No marketing jargon. Just clear reporting on leads, bookings, and revenue."
    },
    {
      icon: <Zap className="text-[#2AB182]" size={32} />,
      title: "Performance over Vanity",
      desc: "Likes and impressions don't pay bills. We focus entirely on ROI and Growth."
    },
    {
      icon: <Users className="text-[#2AB182]" size={32} />,
      title: "Partnership over Service",
      desc: "We aren't just a vendor. We integrate with your team to fix sales funnels and bottlenecks."
    }
  ];

  const pillars = [
    {
      title: "01. Extreme Accountability",
      desc: "We take responsibility for the numbers—from lead volume and quality to final booked appointments or revenue. No excuses. No stories. Only outcomes."
    },
    {
      title: "02. Obsession With Data",
      desc: "Every click, lead, call, and conversion is tracked. Every campaign decision is backed by real numbers, not “gut feel”. You’ll always know what’s working, what’s wasting money, and what needs to change.",
      extra: "We provide clean dashboards, not confusing spreadsheets."
    },
    {
      title: "03. AI in Every Layer",
      desc: "We use AI for funnel analysis, creative variations, audience research, automation in follow-ups, lead scoring, and performance testing.",
      extra: "AI doesn’t replace strategy. It accelerates it."
    }
  ];

  return (
    <div className="pt-32 min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-[1600px] mx-auto">
          <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
            <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
            Who We Are
          </p>
          <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-white uppercase mb-12">
            Built On<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Accountability.</span>
          </h1>
        </div>
      </section>

      {/* Intro / Origin Story */}
      <section className="border-y border-[#333] bg-[#1A1A1A]/30 backdrop-blur-sm py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight">
              The Anti-Agency for <br />
              <span className="text-[#2AB182]">Serious Brands.</span>
            </h2>
          </div>
          <div className="font-body text-[#BBB] text-lg leading-relaxed space-y-6">
            <p>
              Invictus Global Tech started with a simple frustration: most agencies talk big, but don’t own the numbers. We wanted to build a team that thinks like a partner, not a vendor.
            </p>
            <p>
              We come from a background of working closely with founders, doctors, educators, and brand owners. We’ve seen first-hand where money is wasted in ads, and where it compounds into real growth.
            </p>
            <p>
              Today, we operate as a performance marketing engine for businesses that are ready to scale. We stay lean, focused, and obsessed with one thing—making your numbers better month after month.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid (Non-Negotiables) */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-display text-4xl text-white font-bold mb-16 text-center">Our Non-Negotiables</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="p-8 border border-[#333] rounded-lg bg-[#0E0E0E] hover:border-[#2AB182] active:border-[#2AB182] transition-colors duration-300 group">
                <div className="mb-6 p-4 bg-[#1A1A1A] rounded-full w-fit group-hover:bg-[#2AB182]/10 transition-colors">{val.icon}</div>
                <h3 className="font-display text-xl text-white font-bold mb-4">{val.title}</h3>
                <p className="font-body text-[#888] text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-[#333] bg-[#0E0E0E]">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-white font-bold leading-tight mb-8">
              We Work Only With People Who Are <span className="text-[#2AB182]">Serious About Growth.</span>
            </h2>
            <p className="font-body text-[#888] text-lg mb-8">
              We don't work with everyone intentionally. If you want an agency that posts random reels and sends “engagement reports”, we’re not for you.
            </p>
            <div className="p-6 border-l-2 border-[#2AB182] bg-[#1A1A1A]/20">
              <p className="text-white font-bold font-display italic">
                "If you want a partner who owns the numbers with you, we fit perfectly."
              </p>
            </div>
          </div>
          <div className="bg-[#1A1A1A]/30 p-8 md:p-12 border border-[#333]">
            <h3 className="font-display text-2xl text-white font-bold mb-6 uppercase">We partner with founders who:</h3>
            <ul className="space-y-4 font-body text-[#BBB]">
              {[
                "Treat marketing as an investment, not an expense",
                "Want full visibility on numbers, tracking, and ROI",
                "Expect accountability, speed, and high standards",
                "Are willing to fix sales processes, not blame ads",
                "Value clarity over fluff, performance over vanity"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-[#2AB182] shrink-0 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Invictus Way */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-[#333] bg-[#1A1A1A]/20">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-4">The Invictus Way</h2>
            <p className="font-body text-[#888]">We’re a performance marketing engine built on three core pillars:</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="p-8 border border-[#333] rounded-lg bg-[#0E0E0E] hover:border-[#2AB182] active:border-[#2AB182] transition-colors duration-500 group">
                <h3 className="font-display text-2xl text-[#2AB182] font-bold mb-6">{pillar.title}</h3>
                <p className="font-body text-[#BBB] leading-relaxed mb-4">{pillar.desc}</p>
                {pillar.extra && (
                  <p className="font-body text-white font-medium italic border-t border-[#333] pt-4">
                    {pillar.extra}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story (Detailed) */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-[#333] bg-[#0E0E0E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl text-white font-bold mb-8">Our Story</h2>
          <div className="font-body text-[#BBB] text-lg leading-relaxed space-y-6 text-left md:text-center">
            <p>
              Invictus Global Tech began as a small team helping a few brands scale through paid ads and automation. What we noticed early was that most “digital marketing agencies” were selling posters, reels, and vanity metrics.
            </p>
            <div className="py-6">
              <p className="mb-4 font-bold text-white">Businesses weren't getting:</p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 font-display text-sm uppercase tracking-widest text-[#2AB182]">
                <span>Clarity</span>/
                <span>Proper Tracking</span>/
                <span>Quality Leads</span>/
                <span>ROI</span>/
                <span>Accountability</span>
              </div>
            </div>
            <p>
              So we built the opposite model—a performance-first, data-backed, AI-integrated engine that focuses on one thing: actual business outcomes.
            </p>
            <p className="pt-4">
              Today, we partner with brands across <strong>Healthcare, EdTech, E-commerce, and Automotive</strong>. Across all these industries, our approach stays the same: <span className="text-white font-bold">Test fast, scale what works, cut what doesn’t.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-32 border-t border-[#333] text-center px-6 bg-[#1A1A1A]/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-8 leading-tight">
            If You’re Serious About <span className="text-[#2AB182]">Growth</span>, Let’s Talk.
          </h2>
          <p className="font-body text-[#888] text-xl mb-12">
            We don’t take on every project. We take on the right ones. <br className="hidden md:block" />
            <span className="text-white">If you’re growth-ready and want a partner who owns the numbers with you:</span>
          </p>
          <button
            onClick={onContactClick}
            className="bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-white active:bg-white transition-all duration-300"
          >
            Book a Discovery Call
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
