import { useState } from "react";
import TeamMember from "../../components/TeamMember";
import TeamModal from "../../components/TeamModal";
import { useTheme } from "@/context/ThemeContext";
// eslint-disable-next-line import/no-webpack-loader-syntax
// Use public path for static assets

import { BarChart3, Target, Zap, Users, CheckCircle } from "lucide-react";

const AboutPage = ({ onContactClick }) => {
  const { theme } = useTheme();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    { name: "IYYAPPAN", role: "Web Developer" },
    { name: "DR. SENTHIL", role: "Strategist & Advisor" },
    { name: "THARIQ", role: "CTO" },
    { name: "KARAN", role: "Performance Marketing Head" },
    { name: "DIKSHITA", role: "Performance Marketing Executive" },
    { name: "AALAM", role: "Operations" },
    { name: "SUSHIL", role: "CEO" },
    { name: "VEERAVEL", role: "Web Developer" },
    { name: "CREATIVE", role: "Generalist" },
    { name: "ANITHA", role: "Operations Head" },
    { name: "ABHILASH", role: "HR & Ops" },
    { name: "TANIA", role: "Bde" },
    { name: "SUMITH", role: "Graphic Designer" },
  ];

  const handleMemberClick = (index) => {
    setSelectedMemberIndex(index);
    setIsModalOpen(true);
  };

  const values = [
    {
      icon: <BarChart3 className="text-[#2AB182]" size={32} />,
      title: "Data over Opinions",
      desc: "We don't guess. We test, track, and optimize based on hard numbers and unit economics.",
    },
    {
      icon: <Target className="text-[#2AB182]" size={32} />,
      title: "Clarity over Confusion",
      desc: "No marketing jargon. Just clear reporting on leads, bookings, and revenue.",
    },
    {
      icon: <Zap className="text-[#2AB182]" size={32} />,
      title: "Performance over Vanity",
      desc: "Likes and impressions don't pay bills. We focus entirely on ROI and Growth.",
    },
    {
      icon: <Users className="text-[#2AB182]" size={32} />,
      title: "Partnership over Service",
      desc: "We aren't just a vendor. We integrate with your team to fix sales funnels and bottlenecks.",
    },
  ];

  const pillars = [
    {
      title: "01. Extreme Accountability",
      desc: "We take responsibility for the numbers—from lead volume and quality to final booked appointments or revenue. No excuses. No stories. Only outcomes.",
    },
    {
      title: "02. Obsession With Data",
      desc: "Every click, lead, call, and conversion is tracked. Every campaign decision is backed by real numbers, not “gut feel”. You’ll always know what’s working, what’s wasting money, and what needs to change.",
      extra: "We provide clean dashboards, not confusing spreadsheets.",
    },
    {
      title: "03. AI in Every Layer",
      desc: "We use AI for funnel analysis, creative variations, audience research, automation in follow-ups, lead scoring, and performance testing.",
      extra: "AI doesn’t replace strategy. It accelerates it.",
    },
  ];

  return (
    <div className="pt-21 min-h-screen">
      <section className="py-16 md:py-32 lg:py-70 px-6 md:px-12 lg:px-20 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] grid-bg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 max-w-[1600px] mx-auto">
          {/* Left: Text Section */}
          <div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center relative z-10"
          >
            <p
              className="mb-4 uppercase text-center lg:text-left text-[28px] md:text-[36px] lg:text-[44px] text-[var(--text-secondary)]"
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 400,
                lineHeight: "90%",
                letterSpacing: "-0.05em"
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
                  marginLeft: "0.2rem"
                }}
              >
                our
              </span>
              <span
                className="block text-[#2AB182] font-bold not-italic text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  lineHeight: "0.85",
                  letterSpacing: "-0.04em"
                }}
              >
                PEOPLE
              </span>
              {/* Arrow image below PEOPLE - theme conditional */}
              <img
                src={theme === 'light' ? '/assets/arrowblack.png' : '/assets/arrow1.png'}
                alt="arrow"
                className="w-full max-w-[420px] mx-auto lg:mx-0 mt-2"
                style={{ height: 'auto', maxHeight: '35px', objectFit: 'contain' }}
              />
            </div>
            <div className="flex text-center mt-2 w-full lg:justify-start" >
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

             {/* Right: Team Collage */}
                    {/* Right: Team Collage */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] scale-[0.6] sm:scale-[0.7] md:scale-90 lg:scale-100 mt-20 sm:mt-24 lg:mt-0">
            {/* Collage of team members, absolute positioning for overlap */}
            <div className="absolute left-[-20%] top-[-50%]  md:left-[-45%]   md:top-[-42%] lg:left-[-25%] lg:top-[-35%] xl:left-[-15%] xl:top-[-33%] z-30 transform hover:scale-110 transition-transform">
              <TeamMember name="IYYAPPAN" image="/assets/team/alam.png" rotation={0} onClick={() => handleMemberClick(0)} />
            </div>
             <div className="absolute left-[-30%] top-[-20%]  md:left-[-30%]   md:top-[-16%] lg:left-[-25%] lg:top-[-3%] xl:left-[-10%] xl:top-[-0%] z-30 transform hover:scale-110 transition-transform">
              <TeamMember name="Jashwanth" image="/assets/team/iyyappan1.png" rotation={0} onClick={() => handleMemberClick(0)} />
            </div>
             <div className="absolute left-[-25%] top-[10%]  md:left-[-85%]   md:top-[-15%] lg:left-[-70%] lg:top-[-20%] xl:left-[-50%] xl:top-[-10%] z-30 transform hover:scale-110 transition-transform">
              <TeamMember name="Param" image="/assets/team/param.png" rotation={0} onClick={() => handleMemberClick(0)} />
            </div>
            <div className="absolute  left-[25%] top-[-55%]  md:left-[10%] md:top-[-40%] lg:left-[30%] lg:top-[-40%] xl:left-[30%] xl:top-[-35%] z-20 transform hover:scale-110 transition-transform">
              <TeamMember name="DR. SENTHIL" image="/assets/team/senthil.png" rotation={2} onClick={() => handleMemberClick(1)} />
            </div>
            <div className="absolute left-[80%] top-[-30%]  md:right-[20%] md:top-[-30%] lg:right-[-10%] lg:top-[-25%] xl:right-[-10%] xl:top-[-20%] z-10 transform hover:scale-110 transition-transform">
              <TeamMember name="THARIQ" image="/assets/team/thariq.png" rotation={3} onClick={() => handleMemberClick(2)} />
            </div>
            <div className="absolute left-[30%] top-[20%]   md:left-[-35%] md:top-[10%] lg:left-[-10%] lg:top-[29%] xl:left-[-10%] xl:top-[34%] z-40 transform hover:scale-110 transition-transform">
              <TeamMember name="KARAN" image="/assets/team/karan1.png" rotation={-3} onClick={() => handleMemberClick(3)} />
            </div>
            <div className="absolute left-[30%] bottom-[23%]   md:left-[20%] md:top-[30%] lg:left-[35%] lg:top-[24%] xl:left-[40%] xl:top-[35%] z-30 transform hover:scale-110 transition-transform">
              <TeamMember
                name="DIKSHITA"
                image="/assets/team/dikshita.png"
                rotation={4}
                onClick={() => handleMemberClick(4)}
              />
            </div>
            <div className="absolute  left-[30%] top-[-15%]  md:left-[25%] md:top-[-15%] lg:left-[30%] lg:top-[-10%] xl:left-[30%] xl:top-[0%] z-20 transform hover:scale-110 transition-transform">
              <TeamMember name="AALAM" image="/assets/team/sushil.png" rotation={-2} onClick={() => handleMemberClick(5)} />
            </div>
            <div className="absolute  right-[-20%] top-[10%]  md:right-[-15%] md:top-[10%] lg:right-[-20%] lg:top-[10%] xl:right-[-10%] xl:top-[15%] z-10 transform hover:scale-110 transition-transform">
              <TeamMember name="SUSHIL" image="/assets/team/aiswarya.png" rotation={5} onClick={() => handleMemberClick(6)} />
            </div>
            <div className="absolute  left-[-20%] bottom-[29%]  md:left-[-35%] md:bottom-[15%] lg:left-[-10%] lg:bottom-[11%] xl:left-[-10%] xl:bottom-[-2%] z-50 transform hover:scale-110 transition-transform">
              <TeamMember name="VEERAVEL" image="/assets/team/veeravel.png" rotation={-6} onClick={() => handleMemberClick(7)} />
            </div>
            <div className="absolute   left-[-20%] bottom-[-30%]  md:left-[-15%] md:bottom-[-13%] lg:left-[-15%] lg:bottom-[-22%] xl:left-[-15%] xl:bottom-[-36%] z-40 transform hover:scale-110 transition-transform">
              <TeamMember name="CREATIVE" image="/assets/team/creative.png" rotation={-3} onClick={() => handleMemberClick(8)} />
            </div>
            <div className="absolute   left-[-20%] bottom-[-3%]  md:left-[-70%] md:bottom-[-10%] lg:left-[-60%] lg:bottom-[-10%] xl:left-[-52%] xl:bottom-[-15%] z-40 transform hover:scale-110 transition-transform">
              <TeamMember name="Yogesh" image="/assets/team/yogesh.png" rotation={-3} onClick={() => handleMemberClick(8)} />
            </div>
            <div className="absolute  left-[50%] bottom-[-5%]  md:left-[53%] md:bottom-[10%] lg:left-[53%] lg:bottom-[10%] xl:left-[50%] xl:bottom-[0%] -translate-x-1/2 z-[60] transform hover:scale-110 transition-transform">
              <TeamMember name="ANITHA" image="/assets/team/anitha.png" rotation={2} onClick={() => handleMemberClick(9)} />
            </div>
            <div className="absolute right-[-25%] bottom-[20%]  md:right-[-15%] md:bottom-[30%] lg:right-[-15%] lg:bottom-[30%] xl:right-[-10%] xl:bottom-[10%] z-30 transform hover:scale-110 transition-transform">
              <TeamMember name="ABHILASH" image="/assets/team/abhilash1.png" rotation={4} onClick={() => handleMemberClick(10)} />
            </div>
            <div className="absolute right-[-25%] bottom-[-20%]  md:right-[-15%] md:bottom-[-10%] lg:right-[-15%] lg:bottom-[-10%] xl:right-[-10%] xl:bottom-[-30%] z-30 transform hover:scale-110 transition-transform">
              <TeamMember name="TANIA" image="/assets/team/tania.png" rotation={4} onClick={() => handleMemberClick(11)} />
            </div>
            <div className="absolute right-[30%] bottom-[-40%]  md:left-[30%] md:bottom-[-25%] lg:left-[30%] lg:bottom-[-25%] xl:left-[30%] xl:bottom-[-35%] z-30 transform hover:scale-110 transition-transform">
              <TeamMember name="Jashwanth" image="/assets/team/jashwanth.jpeg" rotation={4} onClick={() => handleMemberClick(12)} />
            </div>
          </div>
        </div>

        <TeamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          teamMembers={teamMembers}
          initialSlide={selectedMemberIndex !== null ? selectedMemberIndex : 0}
        />
      </section>

      {/* Hero */}
      <section className="px-6 md:px-12 mb-24 pt-21">
        <div className="max-w-[1600px] mx-auto">
          <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
            <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
            Who We Are
          </p>
          <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-[var(--text-primary)] uppercase mb-12">
            Built On
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">
              Accountability.
            </span>
          </h1>
        </div>
      </section>

      {/* Intro / Origin Story */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-card)]/30 backdrop-blur-sm py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text-primary)] font-bold leading-tight">
              The Anti-Agency for <br />
              <span className="text-[#2AB182]">Serious Brands.</span>
            </h2>
          </div>
          <div className="font-body text-[var(--text-secondary)] text-lg leading-relaxed space-y-6">
            <p>
              Invictus Global Tech started with a simple frustration: most
              agencies talk big, but don’t own the numbers. We wanted to build a
              team that thinks like a partner, not a vendor.
            </p>
            <p>
              We come from a background of working closely with founders,
              doctors, educators, and brand owners. We’ve seen first-hand where
              money is wasted in ads, and where it compounds into real growth.
            </p>
            <p>
              Today, we operate as a performance marketing engine for businesses
              that are ready to scale. We stay lean, focused, and obsessed with
              one thing—making your numbers better month after month.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid (Non-Negotiables) */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-display text-4xl text-[var(--text-primary)] font-bold mb-16 text-center">
            Our Non-Negotiables
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-8 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-primary)] hover:border-[#2AB182] active:border-[#2AB182] transition-colors duration-300 group"
              >
                <div className="mb-6 p-4 bg-[var(--bg-card)] rounded-full w-fit group-hover:bg-[#2AB182]/10 transition-colors">
                  {val.icon}
                </div>
                <h3 className="font-display text-xl text-[var(--text-primary)] font-bold mb-4">
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

      {/* Who We Work With */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold leading-tight mb-8">
              We Work Only With People Who Are{" "}
              <span className="text-[#2AB182]">Serious About Growth.</span>
            </h2>
            <p className="font-body text-[var(--text-muted)] text-lg mb-8">
              We don't work with everyone intentionally. If you want an agency
              that posts random reels and sends “engagement reports”, we’re not
              for you.
            </p>
            <div className="p-6 border-l-2 border-[#2AB182] bg-[var(--bg-card)]/20">
              <p className="text-[var(--text-primary)] font-bold font-display italic">
                "If you want a partner who owns the numbers with you, we fit
                perfectly."
              </p>
            </div>
          </div>
          <div className="bg-[var(--bg-card)]/30 p-8 md:p-12 border border-[var(--border-subtle)]">
            <h3 className="font-display text-2xl text-[var(--text-primary)] font-bold mb-6 uppercase">
              We partner with founders who:
            </h3>
            <ul className="space-y-4 font-body text-[var(--text-secondary)]">
              {[
                "Treat marketing as an investment, not an expense",
                "Want full visibility on numbers, tracking, and ROI",
                "Expect accountability, speed, and high standards",
                "Are willing to fix sales processes, not blame ads",
                "Value clarity over fluff, performance over vanity",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="text-[#2AB182] shrink-0 mt-1"
                    size={18}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Invictus Way */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-[var(--border-subtle)] bg-[var(--bg-card)]/20">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold mb-4">
              The Invictus Way
            </h2>
            <p className="font-body text-[var(--text-muted)]">
              We’re a performance marketing engine built on three core pillars:
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-primary)] hover:border-[#2AB182] active:border-[#2AB182] transition-colors duration-500 group"
              >
                <h3 className="font-display text-2xl text-[#2AB182] font-bold mb-6">
                  {pillar.title}
                </h3>
                <p className="font-body text-[var(--text-secondary)] leading-relaxed mb-4">
                  {pillar.desc}
                </p>
                {pillar.extra && (
                  <p className="font-body text-[var(--text-primary)] font-medium italic border-t border-[var(--border-subtle)] pt-4">
                    {pillar.extra}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story (Detailed) */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl text-[var(--text-primary)] font-bold mb-8">
            Our Story
          </h2>
          <div className="font-body text-[var(--text-secondary)] text-lg leading-relaxed space-y-6 text-left md:text-center">
            <p>
              Invictus Global Tech began as a small team helping a few brands
              scale through paid ads and automation. What we noticed early was
              that most “digital marketing agencies” were selling posters,
              reels, and vanity metrics.
            </p>
            <div className="py-6">
              <p className="mb-4 font-bold text-[var(--text-primary)]">
                Businesses weren't getting:
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 font-display text-sm uppercase tracking-widest text-[#2AB182]">
                <span>Clarity</span>/<span>Proper Tracking</span>/
                <span>Quality Leads</span>/<span>ROI</span>/
                <span>Accountability</span>
              </div>
            </div>
            <p>
              So we built the opposite model—a performance-first, data-backed,
              AI-integrated engine that focuses on one thing: actual business
              outcomes.
            </p>
            <p className="pt-4">
              Today, we partner with brands across{" "}
              <strong>Healthcare, EdTech, E-commerce, and Automotive</strong>.
              Across all these industries, our approach stays the same:{" "}
              <span className="text-[var(--text-primary)] font-bold">
                Test fast, scale what works, cut what doesn’t.
              </span>
            </p>
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className="py-16 md:py-32 border-t border-[var(--border-subtle)] text-center px-6 bg-[var(--bg-card)]/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold mb-8 leading-tight">
            If You’re Serious About{" "}
            <span className="text-[#2AB182]">Growth</span>, Let’s Talk.
          </h2>
          <p className="font-body text-[var(--text-muted)] text-xl mb-12">
            We don’t take on every project. We take on the right ones.{" "}
            <br className="hidden md:block" />
            <span className="text-[var(--text-primary)]">
              If you’re growth-ready and want a partner who owns the numbers
              with you:
            </span>
          </p>
          <button
            onClick={onContactClick}
            className="bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300"
          >
            Book a Discovery Call
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
