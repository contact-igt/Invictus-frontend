import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function TermsPage() {
  const lastUpdated = "October 2026";

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.invictusglobaltech.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Terms of Service',
        item: 'https://www.invictusglobaltech.com/terms',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Terms of Service | Invictus Global Tech Pvt Ltd</title>
        <meta
          name="description"
          content="Terms of Service for Invictus Global Tech Pvt Ltd. Learn about terms governing the use of our website, consulting services, and digital platforms."
        />
        <link rel="canonical" href="https://www.invictusglobaltech.com/terms" />
        <script
          type="application/ld+json"
          key="breadcrumb-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <main className="min-h-screen pt-28 md:pt-36 pb-20 px-6 md:px-12 bg-transparent text-[var(--text-primary)] font-body">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 border-b border-[var(--border-subtle)] pb-8">
            <p className="text-[#2AB182] font-display font-semibold text-xs uppercase tracking-widest mb-3">
              Legal Documentation
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-4">
              Terms of <span className="text-[#2AB182]">Service</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Last Updated: {lastUpdated} • Draft for review
            </p>
            <div className="mt-4 p-4 rounded-sm border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs leading-relaxed">
              <strong>Notice:</strong> This document represents a working draft reflecting Invictus Global Tech Pvt Ltd website operations and services. Formal contractual engagements are governed by separate Master Services Agreements (MSAs). <em>[COMPANY CONFIRMATION REQUIRED: Final corporate legal counsel review prior to publication]</em>.
            </div>
          </div>

          {/* Document Content */}
          <div className="space-y-10 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                1. Acceptance of Terms
              </h2>
              <p>
                Welcome to <strong>Invictus Global Tech Pvt Ltd</strong> (&ldquo;Invictus,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing, browsing, or using our website located at <Link href="/" className="text-[#2AB182] underline underline-offset-4">invictusglobaltech.com</Link> and associated subdomains, products, or service portals (including WhatsNexus and Blueray International landing pages), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;) and our <Link href="/privacy" className="text-[#2AB182] underline underline-offset-4">Privacy Policy</Link>.
              </p>
              <p>
                If you do not agree to these Terms, you must discontinue using our website and services immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                2. Scope of Services &amp; Website Informational Nature
              </h2>
              <p>
                Invictus provides digital growth systems, performance marketing, social media management, web and mobile application engineering, conversational AI solutions, and specialized ChatGPT Ads management.
              </p>
              <p>
                The information, case studies, process overviews, and insights presented on this website are for informational and business evaluation purposes. Commercial engagements, scope of deliverables, service-level agreements (SLAs), pricing structures (retainers, performance arrangements), and specific performance guarantees are governed exclusively by formal Master Services Agreements or Statements of Work executed between Invictus and the respective client.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                3. Permitted &amp; Prohibited Use
              </h2>
              <p>You agree to use our website only for lawful business and recruitment purposes. Prohibited activities include, but are not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Attempting to probe, scan, or test the vulnerability of our systems, networks, or API endpoints without prior written authorization.</li>
                <li>Engaging in automated scraping, data extraction, harvesting, or indexing of site content, candidate listings, or client portfolios using bots or spiders without permission.</li>
                <li>Submitting fraudulent, automated, or abusive form submissions through contact forms or career recruitment workflows.</li>
                <li>Introducing viruses, trojans, worms, logic bombs, or any malicious material to the website or its infrastructure.</li>
                <li>Impersonating Invictus, its employees, representatives, or other users.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                4. Intellectual Property Rights
              </h2>
              <p>
                All content, website design, text, graphics, UI components, code repositories, branding, logos, trademarks, and case study presentations on this site are the exclusive property of Invictus Global Tech Pvt Ltd or its licensors and are protected under Indian and international copyright, trademark, and intellectual property laws.
              </p>
              <p>
                Third-party product names, logos, and brands mentioned (such as Meta, Google, LinkedIn, OpenAI, WhatsApp) remain the property of their respective trademark holders. Their reference on our website denotes platform compatibility, client campaign channels, or technology integrations and does not imply official endorsement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                5. Third-Party Links &amp; Integrations
              </h2>
              <p>
                Our website includes links to external third-party services and platforms, including social media profiles (LinkedIn, Instagram, Facebook, YouTube), WhatsApp communication channels, OpenAI documentation, and external domains. Invictus has no control over the content, privacy practices, or availability of third-party websites and accepts no responsibility or liability for your interactions with them.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                6. Disclaimers of Warranties
              </h2>
              <p>
                THIS WEBSITE AND ITS CONTENTS ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, INVICTUS DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                While we strive for accurate, uninterrupted, and secure operation, we do not warrant that the website will be error-free, uninterrupted, or free of harmful components. <em>[COMPANY CONFIRMATION REQUIRED: Specific warranty disclaimers under applicable commercial law]</em>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                7. Limitation of Liability
              </h2>
              <p>
                IN NO EVENT SHALL INVICTUS GLOBAL TECH PVT LTD, ITS DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO YOUR USE OF OR INABILITY TO USE THIS WEBSITE OR CONTENT.
              </p>
              <p>
                <em>[COMPANY CONFIRMATION REQUIRED: Specific contractual liability limits and statutory liability caps applicable to commercial inquiries]</em>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                8. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal suit, action, or proceeding arising out of or related to these Terms or the website shall be instituted exclusively in the competent courts of Chennai, Tamil Nadu, India.
              </p>
              <p>
                <em>[COMPANY CONFIRMATION REQUIRED: Confirmation of governing law and designated dispute resolution / arbitration forum]</em>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                9. Changes to Terms
              </h2>
              <p>
                We reserve the right to amend, update, or replace these Terms at any time at our discretion. The &ldquo;Last Updated&rdquo; date at the top of this document indicates the effective date of the latest revisions. Your continued use of the website following any posted modifications constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                10. Contact Information
              </h2>
              <p>For questions or formal inquiries concerning these Terms of Service, please reach out to our team:</p>
              <div className="p-5 rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-secondary)] space-y-1 text-sm font-mono">
                <p><strong className="font-body text-[var(--text-primary)]">Company:</strong> Invictus Global Tech Pvt Ltd</p>
                <p><strong className="font-body text-[var(--text-primary)]">Registered Address:</strong> 5/9, Deena Dayalu St, Pondy Bazaar, T. Nagar, Chennai, Tamil Nadu 600017, India</p>
                <p><strong className="font-body text-[var(--text-primary)]">Email:</strong> <a href="mailto:contact@invictusglobaltech.com" className="text-[#2AB182] underline">contact@invictusglobaltech.com</a></p>
                <p><strong className="font-body text-[var(--text-primary)]">Phone:</strong> <a href="tel:+916369757054" className="text-[#2AB182] underline">+91-6369757054</a></p>
              </div>
            </section>
          </div>

          {/* Bottom navigation */}
          <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-6 items-center justify-between text-xs uppercase tracking-wider text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[#2AB182] transition-colors">
              ← Return to Home
            </Link>
            <Link href="/privacy" className="hover:text-[#2AB182] transition-colors">
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
