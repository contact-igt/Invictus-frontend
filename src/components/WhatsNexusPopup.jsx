import React from 'react';

const WhatsNexusPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-jakarta"
            onClick={onClose}
        >
            <div
                className="relative bg-[var(--bg-primary)] rounded-2xl max-w-2xl w-full shadow-[0_0_80px_rgba(42,177,130,0.2)] animate-scaleIn overflow-hidden group/modal"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Glowing Border Gradient */}
                <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-[#2AB182] via-transparent to-[#1a6e50] opacity-50 pointer-events-none"></div>

                {/* Inner Content Container */}
                <div className="relative bg-[var(--bg-primary)] rounded-[14px] overflow-hidden h-full">

                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-[var(--text-primary)]/10 rounded-full text-gray-400 hover:text-[var(--text-primary)] transition-all duration-200 z-[60] cursor-pointer group/close"
                        aria-label="Close popup"
                    >
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover/close:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Popup Content */}
                    <div className="p-8 md:p-12 relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8 animate-slideUp delay-100 opacity-0 fill-mode-forwards">
                            <div className="relative inline-block mb-4">
                                <span className="absolute inset-0 bg-[#2AB182] blur-lg opacity-30 animate-pulse"></span>
                                <div className="relative px-4 py-2 bg-[#2AB182]/10 border border-[#2AB182]/40 rounded-full flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-ping"></span>
                                    <span className="text-[#2AB182] text-xs font-bold uppercase tracking-wider">New Product Launch</span>
                                </div>
                            </div>
                            <div className="relative flex items-center justify-center gap-2 mb-3">
                                <h2 className="relative font-sans font-bold text-3xl md:text-3xl text-[var(--text-primary)] tracking-tight">
                                    WhatsNexus<span className="text-[#2AB182] inline-block w-1.5 h-1.5 bg-[#2AB182] ml-1 mb-0"></span>
                                    <span className="absolute top-0 -right-12 px-2 py-[4px] mb-4 rounded-full border border-[#2AB182]/30 bg-[#2AB182]/10 text-[#2AB182] text-[9px] font-bold tracking-wider">
                                        BETA
                                    </span>
                                </h2>
                            </div>
                            <p className="text-gray-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                                Powered by Invictus Global Tech Private Limited
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {[
                                { title: "24/7 Availability", desc: "Never miss a customer inquiry", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                                { title: "Instant Responses", desc: "AI-powered quick replies", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                                { title: "Smart Automation", desc: "Streamline your workflows", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
                                { title: "Analytics & Insights", desc: "Data-driven decisions", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#2AB182]/50 hover:bg-[#2AB182]/5 transition-all duration-300 group opacity-0 animate-slideUp fill-mode-forwards`}
                                    style={{ animationDelay: `${200 + (idx * 100)}ms` }}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-[#2AB182]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-5 h-5 text-[#2AB182]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[#2AB182] transition-colors">{feature.title}</h3>
                                        <p className="text-sm text-gray-400">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="text-center animate-slideUp delay-700 opacity-0 fill-mode-forwards">
                            <a
                                href="https://whatsnexus.invictusglobaltech.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2AB182] to-[#22956d] text-[var(--text-primary)] font-semibold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(42,177,130,0.6)] hover:scale-105"
                                onClick={onClose}
                            >
                                <span className="relative z-10">Explore WhatsNexus</span>
                                <svg
                                    className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                {/* Shine Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"></div>
                            </a>
                            <p className="text-sm text-gray-500 mt-4 cursor-pointer hover:text-[var(--text-primary)] transition-colors" onClick={onClose}>Maybe later</p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2AB182]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2AB182]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes shine {
                    100% { transform: translateX(100%); }
                }

                .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
                .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
                .animate-shine { animation: shine 1s; }
                
                .fill-mode-forwards { animation-fill-mode: forwards; }
                .delay-100 { animation-delay: 100ms; }
                .delay-700 { animation-delay: 700ms; }
            `}</style>
        </div>
    );
};

export default WhatsNexusPopup;
