import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import HomePage from '@/pageComponent/Home';
import WhatsNexusPopup from '@/components/WhatsNexusPopup';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showWhatsNexusPopup, setShowWhatsNexusPopup] = useState(true);
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

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Invictus Global Tech - Performance Marketing Agency</title>
        <meta name="description" content="Invictus Global Tech - A performance marketing agency built on data, accountability, and clear numbers." />
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
    </>
  );
};

export default Home;
