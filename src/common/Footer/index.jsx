import { MessageCircle, Phone, User } from "lucide-react";
import React from "react";
// import { Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-[#888] font-body relative z-10 bg-[#0E0E0E]/80 backdrop-blur-sm border-t border-[#333]">
      <span>© 2025 Invictus Global Tech</span>
      <div className="flex gap-8 mt-6 md:mt-0">
        <a href="#" className="hover:text-[#2AB182] transition-colors">
          <User size={20} />
        </a>
        <a href="#" className="hover:text-[#2AB182] transition-colors">
          <Phone size={20} />
        </a>
        <a href="#" className="hover:text-[#2AB182] transition-colors">
          <MessageCircle size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
