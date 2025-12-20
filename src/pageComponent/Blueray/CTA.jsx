import React from 'react';
import { MessageCircle } from 'lucide-react';

const CTA = () => {
    return (
        <section className="bg-navy-deep py-12 px-4 font-open-sans">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-montserrat">Send Your Resume on WhatsApp — We’ll Guide the Next Step</h2>
                <p className="text-gold/80 mb-8 max-w-2xl mx-auto">Message format: <span className="font-bold text-white">Name + Location + Qualification + Goal</span></p>
                <a href="https://wa.me/917010606321" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-xl">
                    <MessageCircle className="w-6 h-6" /> Send Resume on WhatsApp
                </a>
            </div>
        </section>
    );
};

export default CTA;
