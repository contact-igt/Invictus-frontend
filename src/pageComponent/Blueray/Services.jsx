import React from 'react';
import { BookOpen, ArrowRight, Award, PlaneTakeoff } from 'lucide-react';

const Services = () => {
    return (
        <section id="services" className="py-20 bg-white font-open-sans">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy-deep mb-4 uppercase tracking-tight font-montserrat">What We Do</h2>
                    <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
                    <p className="text-slate-500 max-w-2xl mx-auto italic">Clear training + support to help candidates move forward with confidence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-gray-50 p-8 rounded-xl border-b-4 border-navy-deep shadow-sm hover:translate-y-[-5px] transition-all duration-300 flex flex-col">
                        <div className="w-12 h-12 bg-navy-deep text-[var(--text-primary)] rounded-lg flex items-center justify-center mb-6">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-navy-deep font-montserrat">NDT Training (ASNT Level II)</h3>
                        <p className="text-slate-600 mb-6 flex-grow">Focused training for candidates pursuing ASNT Level II. Practical insights from industry experts with 10+ years of ground experience.</p>
                        <a href="https://wa.me/917010606321" className="text-blue-700 font-bold flex items-center gap-1 hover:gap-3 transition-all">
                            View Training Details <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-50 p-8 rounded-xl border-b-4 border-gold shadow-sm hover:translate-y-[-5px] transition-all duration-300 flex flex-col">
                        <div className="w-12 h-12 bg-gold text-navy-deep rounded-lg flex items-center justify-center mb-6">
                            <Award size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-navy-deep font-montserrat">Career Guidance & Certification Support</h3>
                        <p className="text-slate-600 mb-2">Guidance and support for career pathways and certification planning based on actual global standards.</p>
                        <p className="text-xs font-bold text-red-600 mb-6 uppercase">* Training is provided only for ASNT Level II.</p>
                        <a href="https://wa.me/917010606321" className="text-blue-700 font-bold flex items-center gap-1 hover:gap-3 transition-all">
                            Explore Guidance & Support <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-50 p-8 rounded-xl border-b-4 border-navy-midnight shadow-sm hover:translate-y-[-5px] transition-all duration-300 flex flex-col">
                        <div className="w-12 h-12 bg-navy-midnight text-[var(--text-primary)] rounded-lg flex items-center justify-center mb-6">
                            <PlaneTakeoff size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-navy-deep font-montserrat">Overseas Placement Support</h3>
                        <p className="text-slate-600 mb-6 flex-grow">Resume correction + interview preparation + documentation guidance leveraging 10+ years of international placement insights.</p>
                        <a href="https://wa.me/917010606321" className="text-blue-700 font-bold flex items-center gap-1 hover:gap-3 transition-all">
                            See Overseas Support <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
