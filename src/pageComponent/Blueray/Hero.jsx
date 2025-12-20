import React from 'react';
import { Award, CheckCircle, MessageCircle, PhoneCall, Globe2 } from 'lucide-react';

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-navy-deep to-navy-midnight text-white py-20 px-4 relative overflow-hidden font-open-sans">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 z-10">
                    <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1 mb-6">
                        <Award className="w-4 h-4 text-gold" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gold">10+ Years of Industrial Excellence</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-montserrat">
                        Build a Strong Career in <span className="text-gold">NDT</span> + Overseas Opportunities
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-xl">
                        With over a decade of industry expertise, we provide professional NDT (ASNT Level II) training and offer dedicated career guidance with overseas placement support.
                    </p>

                    <div className="space-y-3 mb-10">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-gold w-5 h-5" />
                            <span>Training Offered: NDT – ASNT Level II (Only)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-gold w-5 h-5" />
                            <span>Guidance & Support: Career direction & certification pathway</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-gold w-5 h-5" />
                            <span>Overseas Support: Resume + interview + documentation guidance</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a href="https://wa.me/917010606321" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-bold flex items-center gap-2 transition shadow-lg">
                            <MessageCircle className="w-5 h-5" /> WhatsApp Now
                        </a>
                        <a href="tel:7010606321" className="border-2 border-white hover:bg-white hover:text-navy-deep px-8 py-3 rounded-md font-bold flex items-center gap-2 transition">
                            <PhoneCall className="w-5 h-5" /> Call Now
                        </a>
                    </div>
                </div>

                <div className="lg:w-1/2 relative">
                    {/* Placeholder for Hero Media */}
                    <div className="bg-navy-midnight/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="aspect-video bg-navy-deep rounded-lg flex items-center justify-center text-center p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div
                                className="absolute inset-0 opacity-20 grayscale bg-cover"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800')" }}
                            ></div>
                            <div className="z-10">
                                <Globe2 className="w-16 h-16 text-gold mx-auto mb-4 opacity-50" />
                                <p className="text-xl font-light italic">"Bridging the gap between training and global careers"</p>
                            </div>
                        </div>
                    </div>
                    {/* Float Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white text-navy-deep p-4 rounded-lg shadow-xl hidden md:block border-l-4 border-gold">
                        <p className="text-[10px] font-bold uppercase tracking-tight text-gold mb-1 italic">10+ Years Expertise</p>
                        <p className="text-xs font-bold uppercase tracking-tighter">Certified Training Center</p>
                        <p className="text-sm font-bold">ASNT LEVEL II Specialist</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
