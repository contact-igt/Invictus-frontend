import React from 'react';
import { Phone, Mail, MapPin, Map } from 'lucide-react';

const Contact = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <section id="contact" className="py-20 bg-white font-open-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-navy-deep mb-8 uppercase font-montserrat">Contact Us</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-navy-deep" />
                                </div>
                                <div>
                                    <p className="font-bold">Phone / WhatsApp</p>
                                    <p className="text-slate-600">7010606321, 8939886655</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-navy-deep" />
                                </div>
                                <div>
                                    <p className="font-bold">Email</p>
                                    <p className="text-slate-600">senthilvadi@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-navy-deep" />
                                </div>
                                <div>
                                    <p className="font-bold">Address</p>
                                    <p className="text-slate-600 leading-relaxed">
                                        No.77, Neyveli Main Road,<br />
                                        KVB (Upstairs), Vadalur,<br />
                                        Tamil Nadu – 607303
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <a href="https://wa.me/917010606321" className="bg-navy-deep text-white px-6 py-2 rounded font-bold hover:bg-navy-midnight transition">WhatsApp Now</a>
                            <button onClick={scrollToTop} className="border-2 border-navy-deep text-navy-deep px-6 py-2 rounded font-bold hover:bg-navy-deep hover:text-white transition">Back to Top</button>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-200 shadow-inner min-h-[300px] h-full overflow-hidden">
                        <iframe
                            src="https://maps.google.com/maps?q=No.77%2C%20Neyveli%20Main%20Road%2C%20KVB%20(Upstairs)%2C%20Vadalur%2C%20Tamil%20Nadu%20%E2%80%93%20607303&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '300px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Blueray International Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
