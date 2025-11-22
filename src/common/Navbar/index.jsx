import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const isActive = (path) => router.pathname === path;

  return (
    <>
      <nav className="fixed w-full z-50 mix-blend-normal bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#333]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/assets/invictus_logo.png"
              alt="Invictus Global Tech"
              className="h-8 w-auto invert hue-rotate-180 saturate-150 brightness-90 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase font-body text-white">
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
              href="/contact"
              className={`relative hover:text-[#2AB182] transition-colors ${isActive('/contact') ? 'text-[#2AB182]' : ''}`}
            >
              Contact
            </Link>
          </div>

          <button onClick={toggleMenu} className="lg:hidden text-white hover:text-[#2AB182] transition-colors p-2 rounded-lg">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0E0E0E] z-40 flex items-center justify-center transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col text-center gap-8 font-display text-4xl uppercase font-bold">
          <Link href="/services" className="hover:text-[#2AB182]">Services</Link>
          <Link href="/clients" className="hover:text-[#2AB182]">Clients & Industries</Link>
          <Link href="/global" className="hover:text-[#2AB182]">Where We Are</Link>
          <Link href="/about" className="hover:text-[#2AB182]">About</Link>
          <Link href="/contact" className="hover:text-[#2AB182]">Contact</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
