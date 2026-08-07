import React from 'react';
import Image from 'next/image';
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
    { name: "Pixel Eye Hospital", logoLight: "/client_logo/pixeleye-logo-white.png", logoDark: "/client_logo/pixeleye-logo-dark.png", logoClass: "max-h-[100px] md:max-h-[220px] max-w-[98%]" },
    { name: "Antardrashti Netralaya", logoLight: "/client_logo/antardarshti-netralaya-logo-light.png", logoDark: "/client_logo/antardarshti-netralaya-logo-dark.png", logoClass: "max-h-14 md:max-h-20 max-w-[80%]" },
    { name: "Naitrika Eye Care", logoLight: "/client_logo/naitrika-logo-light.png", logoDark: "/client_logo/naitrika-logo-dark.png", logoClass: "max-h-[100px] md:max-h-20 max-w-[82%]" },
    { name: "Dr. Senthil Ophthall", logoLight: "/client_logo/ophthall-logo-light.png", logoDark: "/client_logo/ophthall-logo-dark.png", logoClass: "max-h-[90px] md:max-h-[160px] max-w-[90%]" },
    { name: "HealthPilot.ai", logoLight: "/client_logo/healthpilot-logo-light.png", logoDark: "/client_logo/healthpilot-logo-dark.png", logoClass: "max-h-[120px] md:max-h-[130px] max-w-[95%]" },
    { name: "Rio", logoLight: "/client_logo/rio-logo-light.png", logoDark: "/client_logo/rio-logo-dark.png", logoClass: "max-h-16 md:max-h-[75px] max-w-[88%]" },
    { name: "NextLevel.in", logoLight: "/client_logo/nextlevel-logo-light.png", logoDark: "/client_logo/nextlevel-logo-dark.png", logoClass: "max-h-[85px] md:max-h-[90px] max-w-[90%]" },
    { name: "777 Hosting", logoLight: "/client_logo/777hosting-logo-light.png", logoDark: "/client_logo/777hosting-logo-dark.png", logoClass: "max-h-[90px] md:max-h-[90px] max-w-[88%]" },
    { name: "VLS Law Academy", logoLight: "/client_logo/vls-logo-light.png", logoDark: "/client_logo/vls-logo-dark.png", logoClass: "max-h-[80px] md:max-h-[85px] max-w-[80%]" },
    { name: "KR Institute", logoLight: "/client_logo/krinstitute-logo-light.png", logoDark: "/client_logo/krinstitute-logo-dark.png", logoClass: "max-h-[90px] md:max-h-20 max-w-[85%]" },
    { name: "Wellinit (USA)", logoLight: "/client_logo/wellinit-logo-white.png", logoDark: "/client_logo/wellinit-logo-dark.png", logoClass: "max-h-[50px] md:max-h-20 max-w-[85%]" },
    { name: "Wild Funk", logoLight: "/client_logo/wildfunk-logo-light.png", logoDark: "/client_logo/wildfunk-logo-dark-new.png", logoClass: "max-h-[80px] md:max-h-20 max-w-[80%]" },
    { name: "Sri Krish Mirra Builders", logoLight: "/client_logo/skmb-logo-light.png", logoDark: "/client_logo/skmb-logo-dark.png", logoClass: "max-h-[100px] md:max-h-[160px] max-w-[96%]" },
    { name: "Phoenix Fitness", logoLight: "/client_logo/phoenix-fitness-logo-light.png", logoDark: "/client_logo/phoenix-fitness-logo-dark.png", logoClass: "max-h-[90px] md:max-h-20 max-w-[92%]" },
    { name: "Dhiren Eye Care", logoLight: "/client_logo/dhiren-logo-light.png", logoDark: "/client_logo/dhiren-logo-dark.png", logoClass: "max-h-[90px] md:max-h-22 max-w-[92%]" },
    { name: "RR Constructions", logoLight: "/client_logo/rr-construction-logo-light.png", logoDark: "/client_logo/rrconstruction-logo-dark.png", logoClass: "max-h-[95px] md:max-h-[110px] max-w-[92%]" },
    { name: "Blueray International", logoLight: "/client_logo/blueray-logo-ligh.png", logoDark: "/client_logo/blueray-logo-dark.png", logoClass: "max-h-[80px] md:max-h-20 max-w-[88%]" },
    { name: "Pulz Care", logoLight: "/client_logo/pulzcare-logo-light.png", logoDark: "/client_logo/pulzcare-logo-dark.png", logoClass: "max-h-[100px] md:max-h-[110px] max-w-[95%]" },
    { name: "Sky Thru Restaurant", logoLight: "/client_logo/skythru-logo-light.png", logoDark: "/client_logo/skythru-logo-dark.png", logoClass: "max-h-[100px] md:max-h-[140px] max-w-[88%]" },
    { name: "Global Uninexus", logoLight: "/client_logo/globaluninexus-logo-light.png", logoDark: "/client_logo/globaluninexus-logo-dark.png", logoClass: "max-h-[80px] md:max-h-22 max-w-[88%]" },
    { name: "Mahimy Foods", logoLight: "/client_logo/mahimy-foods-logo-light.png", logoDark: "/client_logo/mahimy-foods-logo-dark.png", logoClass: "max-h-[100px] md:max-h-[140px] max-w-[92%]" },
    { name: "Lydia Binil", logoLight: "/client_logo/lydia-binil-logo-light.png", logoDark: "/client_logo/lydiabinil-logo-dark.png", logoClass: "max-h-[65px] md:max-h-[70px] max-w-[85%]" },
    { name: "Ramanan Financial", logoLight: "/client_logo/ramanan-financial-logo-light.png", logoDark: "/client_logo/ramanan-financial-logo-dark.png", logoClass: "max-h-[80px] md:max-h-22 max-w-[88%]" },
    { name: "Triumph Vetrivel Motors", logoLight: "/client_logo/triumph-logo-light.png", logoDark: "/client_logo/triumph-logo-dark.png", logoClass: "max-h-[80px] md:max-h-[95px] max-w-[80%]" }
];

const getClientInitials = (name) => (
    name
        .replace(/\([^)]*\)/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
);

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
                    <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-[var(--text-primary)] uppercase mb-8">
                        Industries We <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Transform.</span>
                    </h1>
                    <p className="font-body text-lg md:text-xl text-[var(--text-muted)] max-w-3xl">
                        We partner with brands that are serious about scaling across India, Singapore, and the USA.
                    </p>
                </div>
            </section>

            {/* Core Industries Served */}
            <section className="border-y border-[var(--border-subtle)] relative z-10 bg-[var(--bg-card)]/30 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="font-display text-4xl font-bold uppercase p-8 md:p-12 text-[var(--text-primary)] border-b border-[var(--border-subtle)]">Core Industries You Serve</h2>
                    <div className="flex flex-col">
                        {clientIndustries.map((industry, index) => (
                            <div key={index} className="grid lg:grid-cols-3 border-b border-[var(--border-subtle)] group hover:bg-[var(--bg-primary)] active:bg-[var(--bg-primary)] transition-colors duration-300">
                                {/* Industry Title and Portfolio */}
                                <div className="lg:col-span-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
                                    <h3 className="font-display text-2xl font-bold mb-4 text-[#2AB182] group-hover:text-[var(--text-primary)] transition-colors">{industry.name}</h3>
                                    <h4 className="font-body text-sm uppercase tracking-widest text-[var(--text-muted)] mb-3">Client Portfolio Highlights:</h4>
                                    <ul className="space-y-2 font-body text-sm text-[var(--text-primary)]/90">
                                        {industry.portfolio.map((client, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <MapPin className="w-3 h-3 shrink-0 text-[#2AB182]" />
                                                <span>{client}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Services Delivered */}
                                <div className="lg:col-span-2 p-8 md:p-12 bg-[var(--bg-card)] lg:bg-transparent">
                                    <h4 className="font-body text-sm uppercase tracking-widest text-[var(--text-muted)] font-bold mb-4">Services delivered:</h4>
                                    <div className="grid sm:grid-cols-2 gap-4 font-body text-[var(--text-primary)]/90">
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

            {/* Client Logos Grid */}
            <section className="py-16 md:py-24 px-4 md:px-12 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                <div className="max-w-[1600px] mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-[var(--text-primary)] text-center mb-10 md:mb-14 tracking-tight">
                        HIGHLIGHTED CLIENTS
                    </h2>
                    <div className="border-t border-l border-[var(--border-subtle)]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {clientList.map((client, index) => {
                                const lightLogo = client.logoLight || client.logo;
                                const darkLogo = client.logoDark || client.logo || client.logoLight;

                                return (
                                    <div
                                        key={index}
                                        aria-label={client.name}
                                        title={client.name}
                                        className="client-logo-card border-r border-b border-[var(--border-subtle)] h-32 sm:h-36 md:h-40 flex items-center justify-center p-3 sm:p-4 md:p-5 transition-colors duration-300 group relative cursor-pointer"
                                    >
                                        {lightLogo && (
                                            <Image
                                                src={lightLogo}
                                                alt={`${client.name} logo`}
                                                width={240}
                                                height={100}
                                                className={`client-logo-light w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                                                    client.logoClass || 'max-h-14 md:max-h-20 max-w-[85%]'
                                                }`}
                                            />
                                        )}
                                        {darkLogo && (
                                            <Image
                                                src={darkLogo}
                                                alt={`${client.name} logo`}
                                                width={240}
                                                height={100}
                                                className={`client-logo-dark w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                                                    client.invertInDark ? 'logo-invert-dark' : ''
                                                } ${client.logoClass || 'max-h-14 md:max-h-20 max-w-[85%]'}`}
                                            />
                                        )}
                                        {!lightLogo && !darkLogo && (
                                            <span className="font-display text-lg md:text-xl font-bold tracking-widest text-[#2AB182]">
                                                {getClientInitials(client.name)}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>


            {/* Closing CTA */}
            <section className="py-16 md:py-32 border-t border-[var(--border-subtle)] text-center px-6 bg-[var(--bg-card)]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl md:text-6xl text-[var(--text-primary)] font-bold mb-8 leading-tight">
                        If You Are in Any of These Industries, <span className="text-[#2AB182]">We Can Scale You.</span>
                    </h2>
                    <p className="font-body text-[var(--text-muted)] text-xl mb-12">
                        We know the numbers. We know the bottlenecks. We know how to build predictable, profitable growth.
                    </p>
                    <button
                        onClick={onContactClick}
                        className="group flex items-center justify-center mx-auto gap-4 bg-[#2AB182] text-black font-display font-bold uppercase tracking-widest px-12 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-all duration-300"
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


