import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import LocationCard from '@/common/LocationCard';

const WhereWeArePage = ({ onContactClick }) => {
    return (
        <div className="pt-32 min-h-screen">
            {/* Hero Section */}
            <section className="px-6 md:px-12 mb-24">
                <div className="max-w-[1600px] mx-auto">
                    <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
                        <Globe className="w-4 h-4" />
                        Where We Work. Where Our Clients Are.
                    </p>
                    <h1 className="font-display font-bold text-[10vw] md:text-[7vw] leading-[0.9] tracking-tight text-white uppercase mb-8">
                        Global <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Footprint.</span>
                    </h1>
                    <p className="font-body text-lg md:text-xl text-[#888] max-w-3xl">
                        Invictus Global Tech works with growth-focused brands across India, Singapore, and the United States. We’re not everywhere — we’re exactly where serious founders need us.
                    </p>
                </div>
            </section>

            {/* Global Presence Details */}
            <section className="border-y border-[#333] relative z-10 bg-[#1A1A1A]/30 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-3">
                    {/* India */}
                    <LocationCard
                        title="India (HQ) — Headquarters"
                        services={[
                            "Performance Marketing", "Social Media Management", "Video Production & Branding",
                            "Web & App Development", "AI + Automation Services"
                        ]}
                        industries="Healthcare, EdTech, Law Institutes, E-commerce, D2C, Automobile, Consultants, Manufacturing, Hospitals, FMCG & more."
                        isHQ={true}
                    />
                    {/* Singapore */}
                    <LocationCard
                        title="Singapore — Clients Served"
                        description="We work remotely with clients in Healthcare setups, E-commerce brands, Business consulting firms, and Training institutes."
                        services={[
                            "Meta & Google Ads Management", "Scaling campaigns", "Automation setups", "Web funnels"
                        ]}
                    />
                    {/* USA */}
                    <LocationCard
                        title="United States — Clients Served"
                        description="We are actively expanding into the US market with the support of our local team."
                        services={[
                            "Websites", "Performance Marketing funnels", "AI-driven automation setups", "Appointment generation pipelines"
                        ]}
                        industries="Healthcare RCM Companies (Wellinit), Doctors & Personal Brands, Consultants, Fitness/Education Brands, E-commerce Stores."
                    />
                </div>
            </section>

            {/* Future Expansion & CTA */}
            <section className="py-24 px-6 md:px-12 text-center bg-[#0E0E0E]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-8 leading-tight">
                        Want to Work With Us <span className="text-[#2AB182]">From Anywhere</span> in the World?
                    </h2>
                    <p className="font-body text-[#888] text-xl mb-12">
                        We operate globally. If your business is serious about growth—we’re ready.
                    </p>
                    <div className="mb-12">
                        <h4 className="font-display text-xl text-[#2AB182] uppercase mb-4">Future Expansion</h4>
                        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 font-body text-white/80">
                            <span>UAE</span> / <span>UK</span> / <span>Malaysia</span>
                        </div>
                    </div>
                    <button
                        onClick={onContactClick}
                        className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-white transition-all duration-300"
                    >
                        Book a Strategy Call
                        <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={20} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default WhereWeArePage;
