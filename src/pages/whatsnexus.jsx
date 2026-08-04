import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import WhatsNexusPopup from '@/components/WhatsNexusPopup';

const WhatsNexus = () => {
    const [showPopup, setShowPopup] = useState(true);

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] font-jakarta text-[var(--text-primary)] pt-20 px-6 md:px-12 relative overflow-hidden">
            <Head>
                <title>WhatsNexus | Invictus Global Tech Private Limited</title>
                <meta name="description" content="Discover WhatsNexus - Our latest product." />
            </Head>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2AB182]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#2AB182]/5 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
            </div>

            {/* Product Announcement Popup */}
            <WhatsNexusPopup isOpen={showPopup} onClose={closePopup} />

            {/* Main Page Content */}
            <div className="max-w-7xl mx-auto relative z-10 py-16">

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center min-h-[70vh] text-center mb-24">
                    <div className="inline-block px-4 py-2 rounded-full border border-[#2AB182]/30 bg-[#2AB182]/10 text-[#2AB182] mb-8 animate-fadeIn">
                        <span className="text-sm font-semibold tracking-wider uppercase">Introducing the Future of Support</span>
                    </div>
                    <h1 className="font-display font-bold text-6xl md:text-8xl mb-8 uppercase animate-slideUp">
                        Whats<span className="text-[#2AB182] inline-block hover:scale-105 transition-transform cursor-default">Nexus</span>
                    </h1>
                    <p className="font-body text-xl text-[#AAA] max-w-2xl mb-12 leading-relaxed animate-slideUp delay-100">
                        The AI Receptionist Hub that transforms how you connect with customers. Automated, intelligent, and always available.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 animate-slideUp delay-200">
                        <a
                            href="https://whatsnexus.invictusglobaltech.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2AB182] to-[#22956d] text-[var(--text-primary)] font-semibold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(42,177,130,0.4)] hover:scale-105"
                        >
                            <span className="relative z-10">Get Started Now</span>
                            <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#22956d] to-[#2AB182] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <button
                            className="px-8 py-4 bg-transparent border border-[var(--border-subtle)] hover:border-[#2AB182] text-[var(--text-primary)] rounded-lg transition-all duration-300 hover:bg-[#2AB182]/5"
                            onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Demo
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {[
                        {
                            title: "24/7 Availability",
                            desc: "Always online to handle customer queries instantly, day or night.",
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )
                        },
                        {
                            title: "Instant Responses",
                            desc: "Zero wait time. Deliver immediate answers to common questions.",
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            )
                        },
                        {
                            title: "Seamless Integration",
                            desc: "Connects effortlessly with your existing CRM and tools.",
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            )
                        },
                        {
                            title: "Deep Analytics",
                            desc: "Gain actionable insights from every customer interaction.",
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            )
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-[#111] border border-[var(--border-subtle)] hover:border-[#2AB182]/50 hover:bg-[var(--bg-card)] transition-all duration-300 group">
                            <div className="w-12 h-12 bg-[#2AB182]/10 rounded-lg flex items-center justify-center text-[#2AB182] mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-[var(--text-muted)] leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Interactive Demo Section */}
                <div id="demo" className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Experience the Intelligence</h2>
                        <p className="text-[var(--text-muted)]">See how WhatsNexus handles conversations naturally.</p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-2xl relative">
                        {/* Fake Browser Bar */}
                        <div className="bg-[#111] px-4 py-3 border-b border-[var(--border-subtle)] flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="mx-auto text-xs text-[var(--text-muted)] font-mono">whats-nexus-demo.exe</div>
                        </div>

                        <div className="grid md:grid-cols-[250px_1fr] h-[500px]">
                            {/* Sidebar */}
                            <div className="bg-[#111] border-r border-[var(--border-subtle)] p-4 hidden md:block">
                                <div className="text-xs font-bold text-[var(--text-muted)] uppercase mb-4">Active Chats</div>
                                <div className="space-y-2">
                                    <div className="p-3 bg-[#2AB182]/10 border border-[#2AB182]/20 rounded-lg cursor-pointer">
                                        <div className="font-semibold text-sm">New Lead (Sarah)</div>
                                        <div className="text-xs text-[#2AB182] mt-1">Typing...</div>
                                    </div>
                                    <div className="p-3 rounded-lg hover:bg-[#222] cursor-pointer opacity-60">
                                        <div className="font-semibold text-sm">Support #4291</div>
                                        <div className="text-xs text-[var(--text-muted)] mt-1">Resolved</div>
                                    </div>
                                    <div className="p-3 rounded-lg hover:bg-[#222] cursor-pointer opacity-60">
                                        <div className="font-semibold text-sm">Booking Inquiry</div>
                                        <div className="text-xs text-[var(--text-muted)] mt-1">Waiting</div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="bg-[var(--bg-primary)] flex flex-col">
                                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                                    {/* Bot Message */}
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2AB182] to-[#1a6e50] flex items-center justify-center font-bold text-xs">AI</div>
                                        <div className="bg-[var(--bg-card)] p-4 rounded-2xl rounded-tl-none border border-[var(--border-subtle)] max-w-[80%]">
                                            <p className="text-sm text-gray-300">Hello! Thanks for reaching out to Invictus Global Tech Private Limited. How can I help you scale your business today?</p>
                                        </div>
                                    </div>

                                    {/* User Message */}
                                    <div className="flex gap-4 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-xs">S</div>
                                        <div className="bg-[#2AB182] p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                                            <p className="text-sm text-black font-medium">I'm interested in your AI automation services. Can you tell me more about pricing?</p>
                                        </div>
                                    </div>

                                    {/* Bot Message w/ Typing */}
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2AB182] to-[#1a6e50] flex items-center justify-center font-bold text-xs">AI</div>
                                        <div className="bg-[var(--bg-card)] p-4 rounded-2xl rounded-tl-none border border-[var(--border-subtle)] max-w-[80%]">
                                            <p className="text-sm text-gray-300 mb-3">Our automation packages are tailored to your needs. They typically include:</p>
                                            <ul className="text-sm text-gray-400 list-disc ml-4 space-y-1">
                                                <li>24/7 AI Lead Capture</li>
                                                <li>CRM Integration</li>
                                                <li>Custom Workflows</li>
                                            </ul>
                                            <div className="mt-3 flex gap-2">
                                                <button className="text-xs bg-[#2AB182]/10 text-[#2AB182] px-3 py-1.5 rounded-md hover:bg-[#2AB182]/20 transition-colors">Book a Demo</button>
                                                <button className="text-xs bg-[#333] text-gray-300 px-3 py-1.5 rounded-md hover:bg-[#444] transition-colors">View Pricing PDF</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area Mockup */}
                                <div className="p-4 border-t border-[var(--border-subtle)] flex gap-3">
                                    <div className="flex-1 bg-[var(--bg-card)] rounded-lg h-10 border border-[var(--border-subtle)] px-3 flex items-center text-sm text-gray-500">
                                        Reply as AI...
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-[#2AB182] flex items-center justify-center cursor-not-allowed opacity-50">
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pb-12">
                    <h2 className="text-3xl font-bold mb-6">Ready to Automate Your Success?</h2>
                    <a
                        href="https://whatsnexus.invictusglobaltech.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-gray-100 font-bold text-xl rounded-full transition-all duration-300 hover:scale-105"
                    >
                        <span>Launch WhatsNexus</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                </div>

            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }

                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
                .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
                .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
                
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-1000 { animation-delay: 1s; }
            `}</style>
        </div>
    );
};

export default WhatsNexus;