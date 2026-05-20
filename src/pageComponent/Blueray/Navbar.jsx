import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Sparkle } from 'lucide-react';

const Navbar = () => {
    return (
        <>
            {/* DIV 1 — Top Bar */}
            <div className="bg-navy-deep text-[var(--text-primary)] py-2 px-4 border-b border-navy-midnight font-open-sans">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2">
                    <div className="flex items-center gap-4">
                        <a href="mailto:senthilvadi@gmail.com" className="flex items-center gap-2 hover:text-gold transition">
                            <Mail className="w-4 h-4" /> senthilvadi@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="tel:7010606321" className="flex items-center gap-2 hover:text-gold transition">
                            <Phone className="w-4 h-4" /> 7010606321
                        </a>
                        <span className="hidden md:inline opacity-30">|</span>
                        <a href="https://wa.me/918939886655" target="_blank" className="flex items-center gap-2 hover:text-green-400 transition">
                            <MessageCircle className="w-4 h-4" /> 8939886655
                        </a>
                    </div>
                </div>
            </div>

            {/* DIV 2 — Header Brand */}
            <header className="bg-white sticky top-0 z-50 shadow-md py-4 font-montserrat">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="relative mb-4 md:mb-0">
                        {/* Logo with Ray */}
                        <div
                            className="relative inline-block cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <svg className="absolute -top-[12px] left-[20px] w-[80px] h-[20px] stroke-navy-deep stroke-[1.5] fill-none" viewBox="0 0 100 20">
                                <path d="M5,15 Q50,0 90,10" strokeDasharray="200" strokeDashoffset="0" />
                            </svg>
                            <div className="absolute -top-[18px] left-[95px] text-navy-deep drop-shadow-[0_0_5px_rgba(0,0,0,0.2)]">
                                <Sparkle className="w-4 h-4 fill-navy-deep" />
                            </div>
                            <h1 className="text-3xl font-light tracking-[0.3em] text-black font-montserrat">BLUERAY</h1>
                            <p className="text-[10px] tracking-[0.6em] text-black font-bold mt-[-4px]">INTERNATIONAL</p>
                        </div>
                        <div className="mt-2 block">
                            <div className="bg-white text-black px-[10px] py-[2px] font-bold tracking-[2px] inline-block text-[0.75rem] border border-gray-100 shadow-sm">Engineering Quality</div>
                            <p className="text-xs font-semibold text-[#022C5E] mt-1">College of Advanced NDT</p>
                        </div>
                    </div>
                    <nav className="text-xs md:text-sm font-bold text-black flex flex-wrap justify-center gap-3 md:gap-6 uppercase tracking-wider">
                        <a href="#services" className="hover:text-blue-600">Training</a>
                        <span className="opacity-20 text-black">|</span>
                        <a href="#services" className="hover:text-blue-600 text-center">Certification Guidance</a>
                        <span className="opacity-20 text-black">|</span>
                        <a href="#contact" className="hover:text-blue-600">Consultation</a>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
