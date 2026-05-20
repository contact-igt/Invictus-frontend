import React from 'react';
import { Facebook, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-navy-deep text-[var(--text-primary)] py-12 px-4 border-t-4 border-gold font-open-sans">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4 brand-font tracking-widest font-montserrat">BLUERAY INTERNATIONAL</h3>
                        <p className="text-sm opacity-60 mb-4 italic">College of Advanced NDT</p>
                        <p className="text-sm opacity-80 leading-relaxed mb-6">Providing high-quality engineering training and global career pathways, backed by 10+ years of industrial expertise.</p>
                        <div className="flex gap-4">
                            <Facebook className="w-5 h-5 opacity-60 cursor-pointer hover:opacity-100 hover:text-gold transition" />
                            <Linkedin className="w-5 h-5 opacity-60 cursor-pointer hover:opacity-100 hover:text-gold transition" />
                            <Instagram className="w-5 h-5 opacity-60 cursor-pointer hover:opacity-100 hover:text-gold transition" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gold uppercase tracking-wider text-sm font-montserrat">Services</h4>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li>• NDT - ASNT Level II Training</li>
                            <li>• Career Path Guidance</li>
                            <li>• International Certification Support</li>
                            <li>• Resume Enhancement</li>
                            <li>• Interview Preparation</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gold uppercase tracking-wider text-sm font-montserrat">Quick Contacts</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex gap-2">
                                <MapPin className="w-4 h-4 text-gold shrink-0" />
                                <span className="opacity-80">No.77, Neyveli Main Road, Vadalur, TN – 607303</span>
                            </div>
                            <div className="flex gap-2">
                                <Phone className="w-4 h-4 text-gold shrink-0" />
                                <span className="opacity-80">7010606321 | 8939886655</span>
                            </div>
                            <div className="flex gap-2">
                                <Mail className="w-4 h-4 text-gold shrink-0" />
                                <span className="opacity-80">senthilvadi@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-40 gap-4">
                    <p>© 2025 Blueray International. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
