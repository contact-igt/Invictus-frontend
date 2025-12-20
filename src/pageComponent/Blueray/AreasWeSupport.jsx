import React from 'react';
import { Search, Anchor, Droplets, HardHat, ShieldCheck, Users, Settings } from 'lucide-react';

const AreasWeSupport = () => {
    return (
        <section className="py-20 bg-navy-midnight text-white font-open-sans">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold mb-4 uppercase font-montserrat">Areas We Support</h2>
                        <p className="text-gold/80 mb-8 italic">Overseas placement guidance is available across multiple industries and job categories (based on profile).</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-md hover:bg-white/10 transition cursor-default">
                                <Search className="w-5 h-5 text-gold" /> <span>NDT / Inspection</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-md hover:bg-white/10 transition cursor-default">
                                <Anchor className="w-5 h-5 text-gold" /> <span>Marine</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-md hover:bg-white/10 transition cursor-default">
                                <Droplets className="w-5 h-5 text-gold" /> <span>Oil & Gas</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-md hover:bg-white/10 transition cursor-default">
                                <HardHat className="w-5 h-5 text-gold" /> <span>Offshore placements</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-md hover:bg-white/10 transition cursor-default">
                                <ShieldCheck className="w-5 h-5 text-gold" /> <span>QA/QC Categories</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-md hover:bg-white/10 transition cursor-default">
                                <Users className="w-5 h-5 text-gold" /> <span>Engineers & Skilled Labour</span>
                            </div>
                        </div>
                        <p className="mt-8 text-sm opacity-60">* Support for other job categories provided based on candidate profile assessment.</p>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative w-full max-w-sm aspect-square border-2 border-dashed border-white/20 rounded-full flex items-center justify-center p-8">
                            <div className="absolute inset-0 animate-spin-slow opacity-10">
                                <Settings className="w-full h-full" />
                            </div>
                            <div className="text-center z-10">
                                <h4 className="text-4xl font-bold text-gold mb-2 font-montserrat">Global</h4>
                                <p className="uppercase tracking-widest text-xs">Industry Network</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AreasWeSupport;
