import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import HomePage from '@/pageComponent/Home';
import WhatsNexusPopup from '@/components/WhatsNexusPopup';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showWhatsNexusPopup, setShowWhatsNexusPopup] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const stepRefs = useRef([]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const closeWhatsNexusPopup = () => {
    setShowWhatsNexusPopup(false);
  };

  // Intersection Observer for the Home Page process steps (mobile progress tracking)
  useEffect(() => {
    const options = {
      root: null,
      // Intersecting when centered in the viewport
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.5
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index, 10);
          // Only update forward to show progress
          setActiveStep(prev => Math.max(prev, index));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Observe all step elements
    if (stepRefs.current) {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    // Scroll listener for sticky button
    const handleScroll = () => {
      // Show sticky button after scrolling past hero section (~400px)
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Invictus Global Tech Pvt Ltd - Performance Marketing Agency</title>
        <meta name="description" content="Invictus Global Tech Pvt Ltd - A performance marketing agency built on data, accountability, and clear numbers." />
      </Head>

      {/* WhatsNexus Product Announcement Popup */}
      <WhatsNexusPopup isOpen={showWhatsNexusPopup} onClose={closeWhatsNexusPopup} />

      <HomePage
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        stepRefs={stepRefs}
        activeFaq={activeFaq}
        toggleFaq={toggleFaq}
        scrollToContact={scrollToContact}
      />

      {/* Sticky WhatsNexus Button */}
      <a
        href="https://whatsnexus.invictusglobaltech.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#2AB182] to-[#22956d] text-black font-jakarta shadow-md shadow-[#2AB182]/20 hover:scale-105 hover:shadow-lg hover:shadow-[#2AB182]/30 transition-all duration-500 group overflow-hidden border border-[#2AB182]/30 ${showSticky ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Spark/Chat Icon */}
        <div className="bg-black/10 p-2.5 rounded-xl relative z-10 flex-shrink-0 text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        <div className="flex flex-col relative z-10 pr-2">
          <span className="font-bold text-lg leading-none mb-1 text-left text-black">Your 24/7 AI Receptionist</span>
          <span className="text-[11px] text-black/80 font-medium tracking-wide uppercase text-left">WhatsNexus by Invictus</span>
        </div>

        {/* Arrow Icon */}
        <div className="relative z-10 pl-2 opacity-80 group-hover:opacity-100 text-black">
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </a>
    </>
  );
};

export default Home;
