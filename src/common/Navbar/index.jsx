import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';

import SpecularButton from '@/components/SpecularButton';

const LiquidGlassBackground = dynamic(
  () => import('./LiquidGlassBackground'),
  { ssr: false }
);

const emptySubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const mounted = useMounted();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, isMenuOpen]);

  const isActive = (path) => router.pathname === path;

  return (
    <>
      <nav aria-label="Main Navigation" className="fixed w-full z-50 mix-blend-normal bg-[var(--navbar-bg)] backdrop-blur-md border-b border-[var(--border-subtle)]">
        <LiquidGlassBackground />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">
            <img
              src={mounted && theme === 'dark' ? '/assets/logo_dark.webp' : '/assets/logo_6.webp'}
              alt="Invictus Global Tech Pvt Ltd"
              width={145}
              height={42}
              fetchPriority="high"
              className="h-[40px] md:h-[42px] w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 text-xs font-bold tracking-[0.2em] uppercase font-body text-[var(--text-primary)]">
            <Link
              href="/services"
              className={`relative hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded transition-colors ${isActive('/services') ? 'text-[#2AB182]' : ''}`}
            >
              Services
            </Link>
            <Link
              href="/clients"
              className={`relative hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded transition-colors ${isActive('/clients') ? 'text-[#2AB182]' : ''}`}
            >
              Clients & Industries
            </Link>
            <Link
              href="/global"
              className={`relative hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded transition-colors ${isActive('/global') ? 'text-[#2AB182]' : ''}`}
            >
              Where We Are
            </Link>
            <Link
              href="/about"
              className={`relative hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded transition-colors ${isActive('/about') ? 'text-[#2AB182]' : ''}`}
            >
              About
            </Link>
            <Link
              href="/careers"
              className={`relative hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded transition-colors ${isActive('/careers') || router.pathname.startsWith('/careers') ? 'text-[#2AB182]' : ''}`}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className={`relative hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded transition-colors ${isActive('/contact') ? 'text-[#2AB182]' : ''}`}
            >
              Contact
            </Link>
            <SpecularButton
              href="https://whatsnexus.invictusglobaltech.com/"
              target="_blank"
              rel="noopener noreferrer"
              radius={8}
              intensity={0.8}
              idleIntensity={0.15}
              shineSize={10}
              shineFade={34}
              thickness={1.2}
              glow={0.6}
              proximity={200}
              followMouse={true}
              autoAnimate={false}
              lineColor="#ffffff"
              baseColor="rgba(42, 177, 130, 0.45)"
              className="px-6 py-3 bg-gradient-to-r from-[#2AB182] to-[#22956d] text-black font-semibold rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md hover:bg-[#24a074] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none group"
            >
              <span className="relative z-10 text-black">WhatsNexus</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#22956d] to-[#1f8560] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"></div>
            </SpecularButton>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden text-[var(--text-primary)] hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none transition-colors p-2 rounded-lg"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-navigation"
        role="region"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 bg-[var(--bg-primary)] z-40 flex items-center justify-center transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'}`}
      >
        <div className="flex flex-col text-center gap-8 font-display text-4xl uppercase font-bold">
          <Link href="/services" tabIndex={isMenuOpen ? 0 : -1} className="hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">Services</Link>
          <Link href="/clients" tabIndex={isMenuOpen ? 0 : -1} className="hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">Clients & Industries</Link>
          <Link href="/global" tabIndex={isMenuOpen ? 0 : -1} className="hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">Where We Are</Link>
          <Link href="/about" tabIndex={isMenuOpen ? 0 : -1} className="hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">About</Link>
          <Link href="/careers" tabIndex={isMenuOpen ? 0 : -1} className="hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">Careers</Link>
          <Link href="/contact" tabIndex={isMenuOpen ? 0 : -1} className="hover:text-[#2AB182] focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">Contact</Link>
          <a href="https://whatsnexus.invictusglobaltech.com/" target="_blank" rel="noopener noreferrer" tabIndex={isMenuOpen ? 0 : -1} className="text-[#2AB182] hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded">WhatsNexus</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
