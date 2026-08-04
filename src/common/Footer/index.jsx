import { MessageCircle, Phone, User } from "lucide-react";
import Image from "next/image";
import React from "react";
// import { Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-[var(--text-muted)] font-body relative z-10 bg-[var(--navbar-bg)] backdrop-blur-sm border-t border-[var(--border-subtle)]">
      <div className="flex items-center gap-6">
        <span>© 2026 Invictus Global Tech</span>
        <a href="/careers" className="hover:text-[#2AB182] transition-colors font-bold">
          Careers
        </a>
      </div>
      <div className="flex gap-8 mt-6 md:mt-0">
        <a
          href="https://www.instagram.com/invictusglobaltech/"
          className="hover:text-[#2AB182] transition-colors"
        >
          <Image src={"/assets/instagram.png"} width={20} height={20} />
        </a>
        <a
          href="https://www.facebook.com/people/Invictus-Global-Tech/61557394517942/"
          className="hover:text-[#2AB182] transition-colors"
        >
          <Image src={"/assets/social-media.png"} width={20} height={20} />
        </a>
        <a
          href="https://www.youtube.com/@invictusglobaltech-offl"
          className="hover:text-[#2AB182] transition-colors mt-1"
        >
          <Image src={"/assets/youtube.png"} width={20} height={20} />
        </a>
        <a
          href="https://www.linkedin.com/company/invictus-global-tech/posts/?feedView=all"
          className="hover:text-[#2AB182] transition-colors"
        >
          <Image src={"/assets/social.png"} width={20} height={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
