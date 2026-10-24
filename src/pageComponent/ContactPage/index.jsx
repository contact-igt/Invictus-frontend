import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/common/ContactForm';
import ContactDetail from '@/common/ContactDetails';
import InteractiveMap from '@/common/InteractiveMap';
import { cn } from '@/lib/utils';

const ContactPage = ({ handleFormSubmit, formStatus, setFormStatus }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [scrollRatio, setScrollRatio] = useState(0);

    useEffect(() => {
        // Mount entrance animation
        const frame = requestAnimationFrame(() => {
            setHasMounted(true);
        });

        // Scroll listener for hero description reveal
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const sy = window.scrollY || window.pageYOffset || 0;
                    // Reveal begins after 15px scroll and settles completely by 85px
                    const ratio = Math.max(0, Math.min(1, (sy - 15) / 70));
                    setScrollRatio(ratio);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="pt-28 md:pt-32 min-h-screen">
            {/* ─── Hero Section: READY TO SCALE? ─────────────────────────── */}
            <section className="px-6 md:px-12 pt-6 pb-16 md:pb-24 overflow-hidden">
                <div className="max-w-[1600px] mx-auto">
                    {/* Eyebrow: Smooth initial entrance */}
                    <div
                        className={cn(
                            "transition-all duration-700 ease-out",
                            hasMounted
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-3"
                        )}
                    >
                        <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-xs sm:text-sm uppercase font-semibold flex items-center gap-3 select-none">
                            <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse shrink-0"></span>
                            Let’s Talk Performance.
                        </p>
                    </div>

                    {/* Main Heading: Gentle rise from bottom, settles into final position */}
                    <div
                        className={cn(
                            "transition-all duration-800 delay-150 ease-out will-change-transform",
                            hasMounted
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                        )}
                    >
                        <h1 className="font-display font-bold text-[11vw] sm:text-[9vw] lg:text-[7vw] leading-[0.92] tracking-tight text-[var(--text-primary)] uppercase mb-8 select-none">
                            Ready To <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] via-[#2AB182] to-emerald-400">
                                Scale?
                            </span>
                        </h1>
                    </div>

                    {/* Scroll-Triggered Hero Description */}
                    <div
                        style={{
                            opacity: scrollRatio,
                            transform: `translate3d(0, ${(1 - scrollRatio) * 18}px, 0)`,
                            pointerEvents: scrollRatio > 0.3 ? 'auto' : 'none',
                        }}
                        className="transition-opacity duration-150 ease-out motion-reduce:!opacity-100 motion-reduce:!transform-none"
                    >
                        <p className="font-body text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
                            If you&apos;re serious about scaling your brand, we should talk. We reply fast. We work fast. And we don’t waste anyone’s time.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Main Transition Section: GET IN TOUCH ───────────────────── */}
            <section
                id="get-in-touch"
                className="scroll-mt-24 px-6 md:px-12 py-12 md:py-20 relative z-10"
            >
                <div className="max-w-[1600px] mx-auto">
                    {/* Balanced 2-Column Desktop Grid / Stacked on Mobile */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Left Column: Contact Form */}
                        <div className="lg:col-span-7 bg-[var(--bg-card)]/40 p-6 sm:p-10 md:p-14 rounded-2xl border border-[var(--border-subtle)] backdrop-blur-sm">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase mb-3 text-[var(--text-primary)]">
                                Get in Touch
                            </h2>
                            <p className="font-body text-[var(--text-muted)] mb-8 text-sm sm:text-base">
                                Fill out the form and our team will reach out within 24 hours.
                            </p>
                            <ContactForm />
                        </div>

                        {/* Right Column: Direct Contact Info & Office Location with Interactive Map */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Direct Contact Info Card */}
                            <div className="bg-[var(--bg-card)]/40 p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] backdrop-blur-sm space-y-6">
                                <h3 className="font-display text-xl font-bold uppercase text-[var(--text-primary)] tracking-wide">
                                    Direct Contact Info
                                </h3>

                                <div className="space-y-4">
                                    <ContactDetail
                                        icon={Mail}
                                        title="Email"
                                        details={["contact@invictusglobaltech.com"]}
                                    />
                                    <ContactDetail
                                        icon={Phone}
                                        title="Phone"
                                        details={["+91-6369757054"]}
                                    />
                                </div>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    <a
                                        href="mailto:contact@invictusglobaltech.com"
                                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#2AB182] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#22956d] hover:text-white active:bg-[#1f8560] active:text-white focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none transition-all duration-200 cursor-pointer shadow-md"
                                        aria-label="Email Us at contact@invictusglobaltech.com"
                                    >
                                        Email Us
                                    </a>
                                    <a
                                        href="tel:+91-6369757054"
                                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#2AB182] hover:text-[#2AB182] active:bg-[#2AB182]/10 font-display font-bold text-xs uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none transition-all duration-200 cursor-pointer"
                                        aria-label="Call +91 6369757054"
                                    >
                                        Call Us
                                    </a>
                                </div>
                            </div>

                            {/* Office Location & Interactive Map View Card */}
                            <div className="bg-[var(--bg-card)]/40 p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] backdrop-blur-sm space-y-5">
                                <div>
                                    <h3 className="font-display text-xl font-bold uppercase text-[var(--text-primary)] tracking-wide mb-3">
                                        Our Office – Chennai (HQ)
                                    </h3>
                                    <div className="flex items-start gap-3 font-body text-sm text-[var(--text-muted)] leading-relaxed">
                                        <MapPin className="text-[#2AB182] shrink-0 mt-0.5" size={18} />
                                        <p>
                                            5/9, Deena Dayalu St, Pondy Bazaar, T. Nagar, Chennai, Tamil Nadu 600017
                                        </p>
                                    </div>
                                </div>

                                {/* Interactive Map View: Starts collapsed as "Map View" button, expands on click */}
                                <div className="pt-2">
                                    <InteractiveMap />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
