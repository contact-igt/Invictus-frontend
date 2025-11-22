import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const clientIndustries = [
    {
        name: "Healthcare & Medical",
        portfolio: ["Hospitals", "Clinics", "Doctors", "RCM Companies"],
        services: ["Patient Acquisition", "Brand Awareness", "Lead Generation", "Website Development"]
    },
    {
        name: "Education & EdTech",
        portfolio: ["Universities", "Colleges", "Training Institutes", "Online Courses"],
        services: ["Student Enrollment", "Course Sales", "Brand Positioning", "LMS Development"]
    },
    {
        name: "E-commerce & D2C",
        portfolio: ["Fashion", "Beauty", "Electronics", "Home Decor"],
        services: ["Sales Growth", "ROAS Optimization", "Brand Building", "Shopify Development"]
    },
    {
        name: "Real Estate & Construction",
        portfolio: ["Developers", "Agents", "Architects", "Interior Designers"],
        services: ["Lead Generation", "Project Showcasing", "Brand Awareness", "Virtual Tours"]
    },
    {
        name: "B2B & Consulting",
        portfolio: ["SaaS", "IT Services", "Business Consultants", "Law Firms"],
        services: ["Lead Generation", "LinkedIn Marketing", "Content Strategy", "Website Development"]
    }
];

const clientList = [
    "Pixel Eye Hospital", "Antardrashti Netralaya", "Naitrika Eye Care", "Dr. Senthil Ophthall", "Dr. Ramanan", "Wellinit (USA)", "HealthPilot.ai",
    "NextLevel.in", "Dr. Muruganath", "VLS Law Academy", "KR Institute", "Triumph Vetrivel Motors", "RR Construction", "Wild Funk", "Phone & Co", "Sri Krish Mirra Builders"
];

const ClientsIndustriesPage = ({ onContactClick }) => {
    return (
        <div className="pt-32 min-h-screen">
            {/* Hero Section */}
            <section className="px-6 md:px-12 mb-24">
                <div className="max-w-[1600px] mx-auto">
                    <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
                        Proven Results, Real Partners
                    </p>
                    <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-white uppercase mb-8">
                        Industries We <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Transform.</span>
                    </h1>
                    <p className="font-body text-lg md:text-xl text-[#888] max-w-3xl">
                        We partner with brands that are serious about scaling — across India, Singapore, and the USA.
                    </p>
                </div>
            </section>

            {/* Core Industries Served */}
            <section className="border-y border-[#333] relative z-10 bg-[#1A1A1A]/30 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="font-display text-4xl font-bold uppercase p-8 md:p-12 text-white border-b border-[#333]">Core Industries You Serve</h2>
                    <div className="flex flex-col">
                        {clientIndustries.map((industry, index) => (
                            <div key={index} className="grid lg:grid-cols-3 border-b border-[#333] group hover:bg-[#0E0E0E] active:bg-[#0E0E0E] transition-colors duration-300">
                                {/* Industry Title and Portfolio */}
                                <div className="lg:col-span-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#333]">
                                    <h3 className="font-display text-2xl font-bold mb-4 text-[#2AB182] group-hover:text-white transition-colors">{industry.name}</h3>
                                    <h4 className="font-body text-sm uppercase tracking-widest text-[#888] mb-3">Client Portfolio Highlights:</h4>
                                    <ul className="space-y-2 font-body text-sm text-white/90">
                                        {industry.portfolio.map((client, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <MapPin className="w-3 h-3 shrink-0 text-[#2AB182]" />
                                                <span>{client}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Services Delivered */}
                                <div className="lg:col-span-2 p-8 md:p-12 bg-[#0E0E0E]/50 lg:bg-transparent">
                                    <h4 className="font-body text-sm uppercase tracking-widest text-[#888] font-bold mb-4">Services delivered:</h4>
                                    <div className="grid sm:grid-cols-2 gap-4 font-body text-white/90">
                                        {industry.services.map((service, i) => (
                                            <p key={i} className="flex items-start gap-2 text-sm">
                                                <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-[#2AB182]" />
                                                <span>{service}</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client List (Optional Section) */}
            <section className="py-16 md:py-24 px-6 md:px-12 border-b border-[#333] bg-[#0E0E0E]">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="font-display text-4xl font-bold uppercase mb-12 text-white text-center">Highlighted Clients</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 max-w-5xl mx-auto ">
                        {clientList.map((client, index) => (
                            <div key={index} className="p-4 mt-4 border border-[#333] text-center bg-[#1A1A1A]/50 hover:border-[#2AB182] active:border-[#2AB182] transition-colors duration-300">
                                <p className="font-body text-sm font-medium text-white">{client}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Closing CTA */}
            <section className="py-16 md:py-32 border-t border-[#333] text-center px-6 bg-[#1A1A1A]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-8 leading-tight">
                        If You’re in Any of These Industries — <span className="text-[#2AB182]">We Can Scale You.</span>
                    </h2>
                    <p className="font-body text-[#888] text-xl mb-12">
                        We know the numbers. We know the bottlenecks. We know how to build predictable, profitable growth.
                    </p>
                    <button
                        onClick={onContactClick}
                        className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-white active:bg-white transition-all duration-300"
                    >
                        Book a Discovery Call
                        <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={20} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ClientsIndustriesPage;
