import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPage() {
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
        name: 'Privacy Policy',
        item: 'https://www.invictusglobaltech.com/privacy',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Privacy Policy | Invictus Global Tech Pvt Ltd</title>
        <meta
          name="description"
          content="Privacy Policy for Invictus Global Tech Pvt Ltd. Learn how we handle information collected through our contact forms, career applications, and website analytics."
        />
        <link rel="canonical" href="https://www.invictusglobaltech.com/privacy" />
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
              Data Governance &amp; Privacy
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-4">
              Privacy <span className="text-[#2AB182]">Policy</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Last Updated: {lastUpdated} • Draft for review
            </p>
            <div className="mt-4 p-4 rounded-sm border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs leading-relaxed">
              <strong>Notice:</strong> This privacy policy describes data processing practices verified in the website codebase. <em>[COMPANY CONFIRMATION REQUIRED: Legal counsel review and confirmation of corporate data governance policies, retention schedules, and statutory Grievance Officer designation under the Digital Personal Data Protection Act (DPDP Act) prior to publication]</em>.
            </div>
          </div>

          {/* Document Content */}
          <div className="space-y-10 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                1. Overview &amp; Scope
              </h2>
              <p>
                <strong>Invictus Global Tech Pvt Ltd</strong> (&ldquo;Invictus,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) values your privacy and is committed to handling personal data transparently and responsibly. This Privacy Policy details the types of information we collect through our website (<Link href="/" className="text-[#2AB182] underline underline-offset-4">invictusglobaltech.com</Link>), how that information is utilized, our reliance on verified analytics providers, and the safeguards we maintain.
              </p>
              <p>
                This policy applies to visitors exploring our services, business prospects inquiring about growth partnerships, and candidates submitting career applications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                2. Information We Collect
              </h2>
              <p>We collect data under two primary categories based on your direct interaction with our website:</p>

              <div className="space-y-4 pl-2">
                <div className="p-4 rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] uppercase mb-2">
                    A. Business Inquiry Data (Contact Forms)
                  </h3>
                  <p className="text-sm mb-2">
                    When you contact our team through our contact page or service inquiries, we collect:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Selected Industry (e.g., Healthcare, EdTech, E-commerce, Automobile, Consulting, SaaS)</li>
                    <li>Project scope, message details, and commercial requirements</li>
                  </ul>
                </div>

                <div className="p-4 rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] uppercase mb-2">
                    B. Career Recruitment Data (Job Applications)
                  </h3>
                  <p className="text-sm mb-2">
                    When you apply for career openings at Invictus through our application workflows, we collect:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Full Name, Contact Email, and Phone Number</li>
                    <li>Current City / Geographic Location and Relocation Availability</li>
                    <li>Relevant Work Experience, Current Employment Status, and Notice Period</li>
                    <li>Professional Links (Portfolio URL, LinkedIn Profile, GitHub, or Behance)</li>
                    <li>Resume / Curriculum Vitae documents or portfolio assets</li>
                    <li>Role-specific screening question answers</li>
                  </ul>
                </div>

                <div className="p-4 rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] uppercase mb-2">
                    C. Technical &amp; Usage Information
                  </h3>
                  <p className="text-sm mb-2">
                    When accessing our site, certain technical data is automatically logged by our infrastructure and authorized third-party tools:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>IP address, browser type, device characteristics, and operating system</li>
                    <li>Local preferences: our site stores your dark/light appearance setting in browser <code>localStorage</code> (key: <code>invictus-theme</code>) without storing personal identity</li>
                    <li>Rate-limiting keys used temporarily on our backend to prevent spam and denial-of-service abuse</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                3. Verified Third-Party Analytics &amp; Advertising Tools
              </h2>
              <p>Our website utilizes the following verified external technology services to optimize user experience and evaluate marketing efficacy:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Microsoft Clarity:</strong> We utilize Microsoft Clarity (Project ID: <code>xx135v8gp1</code>) to capture anonymized user interaction telemetry, including scroll depth, click maps, and session replays. This helps us diagnose site usability issues and improve responsive layout flows. Microsoft collects and uses this information in accordance with the Microsoft Privacy Statement.
                </li>
                <li>
                  <strong>Meta Pixel:</strong> We deploy Meta Pixel code (Pixel ID: <code>1962624237773345</code>) to measure the effectiveness of our marketing campaigns across Meta platforms (Facebook, Instagram) and track conversion events from ad clicks.
                </li>
                <li>
                  <strong>Google Fonts &amp; Maps:</strong> Web fonts are loaded via Google Fonts CDN, and our headquarters location on the contact page is rendered via an embedded Google Maps iframe.
                </li>
              </ul>
              <p className="text-xs text-[var(--text-muted)] italic">
                Note: We do not sell your personal data to third parties. <em>[COMPANY CONFIRMATION REQUIRED: Confirmation of all additional marketing analytics, tag managers, or CRM integrations in active use]</em>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                4. Purpose &amp; Legal Basis for Processing
              </h2>
              <p>We process collected data exclusively for the following operational purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>To evaluate business requirements and respond to client inquiries within 24 hours.</li>
                <li>To evaluate candidate qualifications, conduct interviews, and manage the talent acquisition process.</li>
                <li>To prevent fraudulent submissions, maintain website integrity, and enforce rate limits.</li>
                <li>To measure website performance, campaign ROI, and technical reliability.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                5. Data Retention &amp; Storage
              </h2>
              <p>
                We retain personal data only for as long as necessary to fulfill the purposes for which it was gathered, including responding to business requests or complying with legal accounting and reporting obligations.
              </p>
              <p>
                Candidate data is retained for recruitment evaluation and consideration for future opportunities. <em>[COMPANY CONFIRMATION REQUIRED: Defined corporate data retention schedule for applicant resumes and contact submissions]</em>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                6. Security Safeguards
              </h2>
              <p>
                We implement appropriate administrative and technical safeguards designed to protect personal data against unauthorized access, loss, or destruction. All website data transit is encrypted using Hypertext Transfer Protocol Secure (HTTPS / TLS). Access to submitted application databases and client emails is restricted to authorized company personnel with a business need.
              </p>
              <p>
                <em>[COMPANY CONFIRMATION REQUIRED: Corporate security certifications, server hosting provider commitments, and data encryption-at-rest protocols]</em>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                7. Your Data Rights &amp; Choices
              </h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction or rectification of incomplete or inaccurate data.</li>
                <li>Request deletion or erasure of your job application or inquiry records.</li>
                <li>Opt out of third-party tracking by adjusting browser cookie settings or using ad blockers.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href="mailto:contact@invictusglobaltech.com" className="text-[#2AB182] underline">contact@invictusglobaltech.com</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase">
                8. Contact &amp; Grievance Redressal
              </h2>
              <p>
                If you have questions, feedback, or grievances regarding our privacy practices or data handling, please contact our team:
              </p>
              <div className="p-5 rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-secondary)] space-y-1 text-sm font-mono">
                <p><strong className="font-body text-[var(--text-primary)]">Entity:</strong> Invictus Global Tech Pvt Ltd</p>
                <p><strong className="font-body text-[var(--text-primary)]">Grievance Officer:</strong> <em>[COMPANY CONFIRMATION REQUIRED: Designated Grievance Officer Name &amp; Contact under Indian IT Rules]</em></p>
                <p><strong className="font-body text-[var(--text-primary)]">Registered Office:</strong> 5/9, Deena Dayalu St, Pondy Bazaar, T. Nagar, Chennai, Tamil Nadu 600017, India</p>
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
            <Link href="/terms" className="hover:text-[#2AB182] transition-colors">
              View Terms of Service →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
