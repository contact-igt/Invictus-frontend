import React from 'react';
import { ArrowRight, CheckCircle, Mail, Phone, MapPin, Home } from 'lucide-react';
import ContactForm from '@/common/ContactForm';
import ContactDetail from '@/common/ContactDetails';

const chennaiMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.8361988796255!2d80.03545617339073!3d12.789142218855694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f9db37c214d7%3A0xaa963424e598b3de!2sVanginatan%20St%2C%20Maraimalai%20Nagar%2C%20Tamil%20Nadu%20603209!5e0!3m2!1sen!2sin!4v1771054986301!5m2!1sen!2sin";

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
                    <h1 className="font-display font-bold text-[9vw] md:text-[7vw] leading-[0.9] tracking-tight text-white uppercase mb-8">
                        Ready To <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AB182] to-emerald-600">Scale?</span>
                    </h1>
                    <p className="font-body text-lg md:text-xl text-[#888] max-w-2xl">
                        If you're serious about scaling your brand, we should talk. We reply fast. We work fast. And we don’t waste anyone’s time.
                    </p>
                </div>
            </section>

            {/* Main Section */}
            <section className="grid lg:grid-cols-3 border-y border-[#333] relative z-10 bg-[#0E0E0E]">
                {/* Contact Form */}
                <div className="lg:col-span-2 p-8 md:p-16 border-b lg:border-r border-[#333] backdrop-blur-sm">
                    <h2 className="font-display text-4xl font-bold uppercase mb-8 text-white">Get in Touch</h2>
                    <p className="font-body text-[#888] mb-12">
                        Fill out the form and our team will reach out within 24 hours.
                    </p>
                    <ContactForm />
                </div>

                {/* Direct Contact Info & Location */}
                <div className="lg:col-span-1 p-8 md:p-16 flex flex-col justify-between bg-[#1A1A1A]/50 border-t lg:border-t-0 border-[#333]">
                    <div className="space-y-12">
                        <div className="py-8">
                            <h3 className="font-display text-2xl font-bold mb-4 text-white uppercase">
                                Direct Contact Info
                            </h3>
                            <div className="space-y-4 font-body text-[#888]">
                                <ContactDetail icon={Mail} title="Email" details={["contact@invictusglobaltech.com"]} />
                                <ContactDetail icon={Phone} title="Phone" details={["+91-6369757054", "+91-7530070101"]} />
                                <div className="flex gap-4 mt-8">
                                    <a href="mailto:contact@invictusglobaltech.com" className="px-4 py-2 bg-[#2AB182] text-black font-display font-bold uppercase hover:bg-white active:bg-white transition-colors">
                                        Email Us
                                    </a>
                                    <a href="tel:+91-6369757054" className="px-4 py-2 bg-[#2AB182] text-black font-display font-bold uppercase hover:bg-white active:bg-white transition-colors">
                                        Call Us
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="py-8">
                            <h3 className="font-display text-2xl font-bold mb-4 text-white uppercase">
                                Our Office – Chennai (HQ)
                            </h3>
                            <div className="flex items-start gap-4 font-body text-sm text-[#888]">
                                <MapPin className="text-[#2AB182] shrink-0 mt-1" size={20} />
                                <p>LIG 13/19, NH3,
                                    Vanjinathan street,
                                    Maraimalainagar,
                                    Chennai - 603209</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="aspect-video w-full border border-[#333]">
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
