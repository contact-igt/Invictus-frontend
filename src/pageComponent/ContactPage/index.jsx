import React from 'react';
import { ArrowRight, CheckCircle, Mail, Phone, MapPin, Home } from 'lucide-react';
import ContactForm from '@/common/ContactForm';
import ContactDetail from '@/common/ContactDetails';

const chennaiMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.6477945823717!2d80.23509367507762!3d13.040105587281628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52665409d1c93d%3A0x63741c4fe929f692!2s26RQ%2B33P%2C%205%2F9%2C%20Deena%20Dayalu%20St%2C%20Pondy%20Bazaar%2C%20T.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu%20600017!5e1!3m2!1sen!2sin!4v1779281712721!5m2!1sen!2sin";

const ContactPage = () => {
    return (
        <div className="pt-32 min-h-screen">
            {/* Hero Section */}
            <section className="px-6 md:px-12 mb-24">
                <div className="max-w-[1600px] mx-auto">
                    <p className="font-body text-[#2AB182] mb-6 tracking-[0.2em] text-sm uppercase font-semibold flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#2AB182] rounded-full animate-pulse"></span>
                        Let’s Talk Performance.
                    </p>
                    <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-[var(--text-primary)] uppercase mb-8">
                        Ready To <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Scale?</span>
                    </h1>
                    <p className="font-body text-lg md:text-xl text-[var(--text-muted)] max-w-2xl">
                        If you're serious about scaling your brand, we should talk. We reply fast. We work fast. And we don’t waste anyone’s time.
                    </p>
                </div>
            </section>

            {/* Main Section */}
            <section className="grid lg:grid-cols-3 border-y border-[var(--border-subtle)] relative z-10 bg-[var(--bg-primary)]">
                {/* Contact Form */}
                <div className="lg:col-span-2 p-8 md:p-16 border-b lg:border-r border-[var(--border-subtle)] backdrop-blur-sm">
                    <h2 className="font-display text-4xl font-bold uppercase mb-8 text-[var(--text-primary)]">Get in Touch</h2>
                    <p className="font-body text-[var(--text-muted)] mb-12">
                        Fill out the form and our team will reach out within 24 hours.
                    </p>
                    <ContactForm />
                </div>

                {/* Direct Contact Info & Location */}
                <div className="lg:col-span-1 p-8 md:p-16 flex flex-col justify-between bg-[var(--bg-card)]/50 border-t lg:border-t-0 border-[var(--border-subtle)]">
                    <div className="space-y-12">
                        <div className="py-8">
                            <h3 className="font-display text-2xl font-bold mb-4 text-[var(--text-primary)] uppercase">
                                Direct Contact Info
                            </h3>
                            <div className="space-y-4 font-body text-[var(--text-muted)]">
                                <ContactDetail icon={Mail} title="Email" details={["contact@invictusglobaltech.com"]} />
                                <ContactDetail icon={Phone} title="Phone" details={["+91-6369757054"]} />
                                <div className="flex gap-4 mt-8">
                                    <a href="mailto:contact@invictusglobaltech.com" className="px-4 py-2 bg-[#2AB182] text-black font-display font-bold uppercase hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-colors">
                                        Email Us
                                    </a>
                                    <a href="tel:+91-6369757054" className="px-4 py-2 bg-[#2AB182] text-black font-display font-bold uppercase hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-colors">
                                        Call Us
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="py-8">
                            <h3 className="font-display text-2xl font-bold mb-4 text-[var(--text-primary)] uppercase">
                                Our Office – Chennai (HQ)
                            </h3>
                            <div className="flex items-start gap-4 font-body text-sm text-[var(--text-muted)]">
                                <MapPin className="text-[#2AB182] shrink-0 mt-1" size={20} />
                                <p>5/9, Deena Dayalu St, Pondy Bazaar, T. Nagar, Chennai, Tamil Nadu 600017</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="aspect-video w-full border border-[var(--border-subtle)]">
                            <iframe
                                src={chennaiMapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Invictus Chennai HQ Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
