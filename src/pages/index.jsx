import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HomePage from '@/pageComponent/Home';
import ChatGPTAdsPopup from '@/components/ChatGPTAdsPopup';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showChatGPTAdsPopup, setShowChatGPTAdsPopup] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const stepRefs = useRef([]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const closeChatGPTAdsPopup = () => {
    setShowChatGPTAdsPopup(false);
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.invictusglobaltech.com/#website',
    url: 'https://www.invictusglobaltech.com/',
    name: 'Invictus Global Tech',
    description: 'Performance marketing agency built on data, accountability, and clear numbers.',
    publisher: {
      '@id': 'https://www.invictusglobaltech.com/#organization',
    },
    inLanguage: 'en-US',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you work on performance-based pricing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We primarily work on a retainer + performance structure. Pure performance deals are evaluated on a case-by-case basis depending on your margins and historical data.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum budget?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We typically recommend a minimum monthly ad spend that ensures statistical significance for testing and scaling (usually $2k+).',
        },
      },
      {
        '@type': 'Question',
        name: 'How soon can we see results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For lead-gen campaigns, we usually start seeing data in the first 7–10 days, and meaningful optimisation from week 3 onwards.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Invictus Global Tech | Performance Marketing Agency India</title>
        <meta name="description" content="Invictus Global Tech Pvt Ltd - A performance marketing agency built on data, accountability, and clear numbers." />
        <link rel="canonical" href="https://www.invictusglobaltech.com/" />
        <script
          type="application/ld+json"
          key="website-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          key="faq-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <HomePage
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        stepRefs={stepRefs}
        activeFaq={activeFaq}
        toggleFaq={toggleFaq}
        scrollToContact={scrollToContact}
      />

      {/* ChatGPT Ads announcement */}
      <ChatGPTAdsPopup isOpen={showChatGPTAdsPopup} onClose={closeChatGPTAdsPopup} />

      {/* Sticky ChatGPT Ads Button */}
      <Link
        href="/services#chatgpt-ads"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 py-3 px-5 rounded-lg bg-gradient-to-r from-[#2AB182] to-[#22956d] text-black font-body shadow-md hover:shadow-lg transition-[opacity,transform,box-shadow] duration-200 group overflow-hidden border border-[#2AB182]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] ${showSticky ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Spark/Chat Icon */}
        <div className="bg-black/10 p-2.5 rounded-md relative z-10 flex-shrink-0 text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        <div className="flex flex-col relative z-10 pr-2">
          <span className="font-bold text-lg leading-none mb-1 text-left text-black">ChatGPT Ads Are Live</span>
          <span className="text-[11px] text-black/80 font-medium tracking-wide uppercase text-left">Now in India · Explore the service</span>
        </div>

        {/* Arrow Icon */}
        <div className="relative z-10 pl-2 opacity-80 group-hover:opacity-100 text-black">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </Link>
    </>
  );
};

export default Home;
