import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const isActive = (path) => router.pathname === path;

  return (
    <>
      <nav className="fixed w-full z-50 mix-blend-normal bg-[var(--navbar-bg)] backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={mounted && theme === 'dark' ? '/assets/logo_dark.png' : '/assets/logo_6.png'}
              alt="Invictus Global Tech Pvt Ltd"
              className="h-[40px] md:h-[42px] w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 text-xs font-bold tracking-[0.2em] uppercase font-body text-[var(--text-primary)]">
            <Link
              href="/services"
              className={`relative hover:text-[#2AB182] transition-colors ${isActive('/services') ? 'text-[#2AB182]' : ''}`}
            >
              Services
            </Link>
            <Link
              href="/clients"
              className={`relative hover:text-[#2AB182] transition-colors ${isActive('/clients') ? 'text-[#2AB182]' : ''}`}
            >
              Clients & Industries
            </Link>
            <Link
              href="/global"
              className={`relative hover:text-[#2AB182] transition-colors ${isActive('/global') ? 'text-[#2AB182]' : ''}`}
            >
              Where We Are
            </Link>
            <Link
              href="/about"
              className={`relative hover:text-[#2AB182] transition-colors ${isActive('/about') ? 'text-[#2AB182]' : ''}`}
            >
              About
            </Link>
            <Link
              href="/careers"
              className={`relative hover:text-[#2AB182] transition-colors ${isActive('/careers') || router.pathname.startsWith('/careers') ? 'text-[#2AB182]' : ''}`}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className={`relative hover:text-[#2AB182] transition-colors ${isActive('/contact') ? 'text-[#2AB182]' : ''}`}
            >
              Contact
            </Link>
            <a
              href="https://whatsnexus.invictusglobaltech.com/"
              target='_blank'
              className="relative px-6 py-3 bg-gradient-to-r from-[#2AB182] to-[#22956d] text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(42,177,130,0.5)] group"
            >
              <span className="relative z-10 text-black">WhatsNexus</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#22956d] to-[#1f8560] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          <button onClick={toggleMenu} className="lg:hidden text-[var(--text-primary)] hover:text-[#2AB182] transition-colors p-2 rounded-lg">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[var(--bg-primary)] z-40 flex items-center justify-center transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col text-center gap-8 font-display text-4xl uppercase font-bold">
          <Link href="/services" className="hover:text-[#2AB182]">Services</Link>
          <Link href="/clients" className="hover:text-[#2AB182]">Clients & Industries</Link>
          <Link href="/global" className="hover:text-[#2AB182]">Where We Are</Link>
          <Link href="/about" className="hover:text-[#2AB182]">About</Link>
          <Link href="/careers" className="hover:text-[#2AB182]">Careers</Link>
          <Link href="/contact" className="hover:text-[#2AB182]">Contact</Link>
          <Link href="https://whatsnexus.invictusglobaltech.com/" className="text-[#2AB182] hover:text-[var(--text-primary)] transition-colors">WhatsNexus</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
