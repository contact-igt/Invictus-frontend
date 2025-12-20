import React from 'react';

const Process = () => {
    return (
        <section className="py-20 bg-gray-50 font-open-sans">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy-deep mb-4 uppercase font-montserrat">How It Works</h2>
                    <div className="w-20 h-1 bg-navy-deep mx-auto mb-4"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-navy-deep/10 hidden md:block"></div>

                        {/* Step 1 */}
                        <div className="flex items-start gap-6 relative">
                            <div className="w-16 h-16 bg-navy-deep text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shrink-0 shadow-lg">1</div>
                            <div className="bg-white p-6 rounded-lg shadow-sm w-full">
                                <h4 className="text-lg font-bold text-navy-deep mb-2 font-montserrat">Enquiry / WhatsApp</h4>
                                <p className="text-slate-600">Reach out to us via call or message to express your interest.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-6 relative">
                            <div className="w-16 h-16 bg-navy-midnight text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shrink-0 shadow-lg">2</div>
                            <div className="bg-white p-6 rounded-lg shadow-sm w-full">
                                <h4 className="text-lg font-bold text-navy-deep mb-2 font-montserrat">Profile Discussion</h4>
                                <p className="text-slate-600 text-sm">One-on-one discussion about your career goals and ideal job category.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-6 relative">
                            <div className="w-16 h-16 bg-navy-deep text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shrink-0 shadow-lg">3</div>
                            <div className="bg-white p-6 rounded-lg shadow-sm w-full">
                                <h4 className="text-lg font-bold text-navy-deep mb-2 font-montserrat">Training / Guidance Plan</h4>
                                <p className="text-slate-600">Structured ASNT Level II training and certification roadmap.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-start gap-6 relative">
                            <div className="w-16 h-16 bg-navy-midnight text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shrink-0 shadow-lg">4</div>
                            <div className="bg-white p-6 rounded-lg shadow-sm w-full">
                                <h4 className="text-lg font-bold text-navy-deep mb-2 font-montserrat">Preparation Support</h4>
                                <p className="text-slate-600">Comprehensive resume correction and interview preparation training.</p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex items-start gap-6 relative">
                            <div className="w-16 h-16 bg-gold text-navy-deep rounded-full flex items-center justify-center font-bold text-xl z-10 shrink-0 shadow-lg">5</div>
                            <div className="bg-white p-6 rounded-lg shadow-sm w-full border-l-4 border-gold">
                                <h4 className="text-lg font-bold text-navy-deep mb-2 font-montserrat">Overseas Placement Guidance</h4>
                                <p className="text-slate-600">Guided documentation and placement assistance for international markets.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
