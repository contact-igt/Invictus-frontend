import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { useRouter } from 'next/router';

const ThankYouPage = () => {
    const router = useRouter();

    return (
        <div className="pt-32 min-h-screen flex flex-col justify-center items-center px-6 md:px-12 bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#2AB182]/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2AB182]/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-3xl w-full mx-auto text-center relative z-10">
                {/* Success Icon */}
                <div className="mb-8 inline-flex items-center justify-center p-6 rounded-full bg-[#2AB182]/10 border border-[#2AB182]/20 animate-blob">
                    <CheckCircle className="w-16 h-16 text-[#2AB182]" />
                </div>

                {/* Heading */}
                <h1 className="font-display font-bold text-5xl md:text-7xl text-[var(--text-primary)] uppercase mb-6 leading-tight">
                    Message <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">
                        Received.
                    </span>
                </h1>

                {/* Confirmation Text */}
                <p className="font-body text-lg md:text-xl text-[var(--text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
                    Thank you for reaching out to Invictus Global Tech Private Limited. We’ve received your details and our team is already reviewing them. You can expect to hear from us within 24 hours.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 bg-[#2AB182] text-black px-8 py-4 font-display font-bold uppercase tracking-widest hover:bg-[#22956d] hover:text-black transition-all duration-300 rounded-sm"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <Link
                        href="/services"
                        className="group flex items-center gap-3 border border-[var(--border-subtle)] text-[var(--text-primary)] px-8 py-4 font-display font-bold uppercase tracking-widest hover:border-[#2AB182] hover:text-[#2AB182] transition-all duration-300 rounded-sm"
                    >
                        Explore Services
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Bottom Trust Note */}
                <div className="pt-12 border-t border-[var(--border-subtle)]">
                    <p className="font-body text-xs text-[var(--text-muted)] uppercase tracking-widest">
                        Performance Driven Growth • Invictus Global Tech Private Limited
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
