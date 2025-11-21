import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ isMenuOpen, toggleMenu, handleNavClick, currentView }) => {
  return (
    <>
      {/* Desktop & Mobile Header */}
      <nav className="fixed w-full z-50 mix-blend-normal bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#333]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <a href="#" onClick={(e) => handleNavClick(e, 'home', 'hero')} className="flex items-center gap-3 group">
            {/* <img src="Logo Invictus.png" alt="Invictus" className="h-10 w-auto object-contain" />  */}
            <span className="font-display font-bold text-xl tracking-tighter uppercase text-white group-hover:text-[#2AB182] transition-colors ">
              Invictus<span className="text-[10px] align-top ml-0.5 text-[#2AB182]">©</span>
            </span>
          </a>

          <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase font-body">
             <a href="#services" onClick={(e) => handleNavClick(e, 'home', 'services')} className="relative hover:text-[#2AB182] transition-colors">Services</a>
             <a href="#industries" onClick={(e) => handleNavClick(e, 'home', 'industries')} className="relative hover:text-[#2AB182] transition-colors">Industries</a>
             <a href="#process" onClick={(e) => handleNavClick(e, 'home', 'process')} className="relative hover:text-[#2AB182] transition-colors">Process</a>
             <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={`relative hover:text-[#2AB182] transition-colors ${currentView === 'about' ? 'text-[#2AB182]' : ''}`}>About</a>
             <a href="#contact" onClick={(e) => handleNavClick(e, 'home', 'contact')} className="relative hover:text-[#2AB182] transition-colors">Contact</a>
          </div>

          <button onClick={toggleMenu} className="md:hidden text-white hover:text-[#2AB182] transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0E0E0E] z-40 flex items-center justify-center transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col text-center gap-8 font-display text-4xl uppercase font-bold">
            <a href="#services" onClick={(e) => handleNavClick(e, 'home', 'services')} className="hover:text-[#2AB182]">Services</a>
            <a href="#industries" onClick={(e) => handleNavClick(e, 'home', 'industries')} className="hover:text-[#2AB182]">Industries</a>
            <a href="#process" onClick={(e) => handleNavClick(e, 'home', 'process')} className="hover:text-[#2AB182]">Process</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-[#2AB182]">About</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'home', 'contact')} className="hover:text-[#2AB182]">Contact</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
