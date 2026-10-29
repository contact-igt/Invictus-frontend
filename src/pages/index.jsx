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
        name: 'How does your pricing and engagement model work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We work on a transparent monthly retainer + performance structure. Performance-sharing arrangements are evaluated based on your historical conversion data, margins, and sales capacity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What advertising budget do we need to start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We typically recommend a minimum monthly advertising spend of $2,000+. This ensures sufficient conversion data for statistical testing and algorithmic learning.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly do campaigns show measurable results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Initial tracking validation and baseline audience response occur within the first 7–10 days. Campaign optimization, creative iteration, and cost-per-lead improvements compound from week 3 onward.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you create the ad visuals and copywriting or do we provide them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our in-house creative team produces direct-response ad copy, static graphic assets, and short-form video ads (Reels). You simply provide raw brand assets and approve the creative before launch.',
        },
      },
    ],
  };

  return (

    <>

      <Head>

        <title>Performance Marketing Agency in Chennai & India | Invictus Global Tech</title>

        <meta name="description" content="Invictus Global Tech is an ROI-driven performance marketing agency in Chennai, India. We scale brands with Meta Ads, Google Ads, AI web development, and data-backed growth systems." />

        <link rel="canonical" href="https://www.invictusglobaltech.com/" />
        <meta property="og:title" content="Performance Marketing Agency in Chennai &amp; India | Invictus Global Tech" />
        <meta property="og:description" content="Invictus Global Tech is an ROI-driven performance marketing agency in Chennai, India. We scale brands with Meta Ads, Google Ads, AI web development, and data-backed growth systems." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/" />
        <meta name="twitter:title" content="Performance Marketing Agency in Chennai &amp; India | Invictus Global Tech" />
        <meta name="twitter:description" content="Invictus Global Tech is an ROI-driven performance marketing agency in Chennai, India. We scale brands with Meta Ads, Google Ads, AI web development, and data-backed growth systems." />

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
          <span className="font-bold text-lg leading-none mb-1 text-left text-black">Conversational AI Search</span>
          <span className="text-[11px] text-black/80 font-medium tracking-wide uppercase text-left">Explore AI Discovery &amp; Strategy</span>
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
