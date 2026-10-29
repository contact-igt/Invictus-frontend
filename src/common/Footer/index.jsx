import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-[var(--text-muted)] font-body relative z-10 bg-[var(--navbar-bg)] backdrop-blur-sm border-t border-[var(--border-subtle)] gap-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
        <span>© 2026 Invictus Global Tech Pvt Ltd</span>
        <span className="hidden sm:inline text-[var(--border-subtle)]">|</span>
        <div className="flex gap-4">
          <Link href="/whatsnexus" className="hover:text-[#2AB182] transition-colors duration-150">
            WhatsNexus
          </Link>
          <span className="text-[var(--border-subtle)]">•</span>
          <Link href="/privacy" className="hover:text-[#2AB182] transition-colors duration-150">
            Privacy Policy
          </Link>
          <span className="text-[var(--border-subtle)]">•</span>
          <Link href="/terms" className="hover:text-[#2AB182] transition-colors duration-150">
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <a
          href="https://www.instagram.com/invictusglobaltech/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-[var(--text-muted)] hover:text-[#2AB182] transition-colors"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://www.facebook.com/people/Invictus-Global-Tech/61557394517942/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-[var(--text-muted)] hover:text-[#2AB182] transition-colors"
        >
          <Facebook size={20} />
        </a>
        <a
          href="https://www.youtube.com/@invictusglobaltech-offl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="text-[var(--text-muted)] hover:text-[#2AB182] transition-colors"
        >
          <Youtube size={20} />
        </a>
        <a
          href="https://www.linkedin.com/company/invictus-global-tech/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-[var(--text-muted)] hover:text-[#2AB182] transition-colors"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
