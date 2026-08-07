import Head from "next/head";
import Link from "next/link";
import { careerRoles } from "@/config/careerRoles";
import ConversationalApplicationForm from "@/components/careers/ConversationalApplicationForm";

const role = careerRoles["telecalling-executive"];

export default function TelecallingExecutivePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.summary,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Invictus Global Tech Private Limited",
      sameAs: "https://www.invictusglobaltech.com",
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
    },
    jobLocationType: "TELECOMMUTE",
  };

  return (
    <>
      <Head>
        <title>{`${role.title} | Invictus Global Tech Private Limited`}</title>
        <meta name="description" content={role.summary} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="w-full relative min-h-screen pt-20 md:pt-24 bg-[var(--bg-primary,#0E0E0E)] text-[var(--text-primary,#E0E0E0)] font-body">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-12 md:py-24">
          <Link
            href="/careers"
            className="inline-flex items-center text-[var(--text-muted,#666)] hover:text-[#2AB182] font-display font-bold uppercase tracking-widest text-xs mb-12 transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none rounded-sm p-1 -ml-1"
          >
            ← Back to Careers
          </Link>

          {/* Hero */}
          <div className="mb-16">
            <span className="text-[#2AB182] font-display font-bold text-sm tracking-widest uppercase mb-6 block">{role.department}</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase text-[var(--text-primary,#E0E0E0)] mb-6 break-words">
              {role.title}
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-4 text-xs font-bold text-[var(--text-secondary,#A0A0A0)] uppercase mb-8 font-body">
              <span className="border border-[var(--border-subtle,#333)] px-4 py-2 font-body">{role.minExperience}</span>
              <span className="border border-[var(--border-subtle,#333)] px-4 py-2 font-body">{role.applicationMaterialLabel} required</span>
              {role.freshersAllowed && (
                <span className="border border-[#2AB182]/40 text-[#2AB182] px-4 py-2 font-body bg-[#2AB182]/5">{role.freshersAllowed}</span>
              )}
            </div>
            <p className="text-xl text-[var(--text-secondary,#A0A0A0)] max-w-3xl leading-relaxed mb-10 font-body">{role.summary}</p>
            <a
              href="#apply"
              className="inline-block min-h-[44px] bg-[#2AB182] text-black px-8 py-4 font-display font-bold uppercase tracking-wider hover:bg-[#22956d] transition-colors duration-150 ease-out rounded-sm focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none"
            >
              Apply Now
            </a>
          </div>

          <div className="w-full h-px bg-[var(--border-subtle,#333)] mb-16" />

          {/* Content */}
          <div className="text-[var(--text-secondary,#A0A0A0)] font-body">
            <h2 className="text-2xl font-display font-bold text-[var(--text-primary,#E0E0E0)] mb-6">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-3 mb-12 font-body">
              {role.responsibilities.map((item) => (
                <li key={item} className="leading-relaxed font-body">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-display font-bold text-[var(--text-primary,#E0E0E0)] mb-6">Requirements</h2>
            <ul className="list-disc pl-5 space-y-3 mb-12 font-body">
              {role.requirements.map((item) => (
                <li key={item} className="leading-relaxed font-body">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-display font-bold text-[var(--text-primary,#E0E0E0)] mb-6">Preferred Skills</h2>
            <ul className="list-disc pl-5 space-y-3 mb-12 font-body">
              {role.preferred.map((item) => (
                <li key={item} className="leading-relaxed font-body">
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-[var(--bg-secondary,#151515)] border border-[var(--border-subtle,#333)] p-6 md:p-8 rounded-sm mb-4">
              <h2 className="text-xl font-display font-bold text-[var(--text-primary,#E0E0E0)] mb-5">Key Role Highlights</h2>
              <ul className="space-y-3 font-body">
                {role.positioning.map((item) => (
                  <li key={item} className="leading-relaxed flex gap-3 font-body">
                    <span className="text-[#2AB182] font-bold shrink-0">—</span>
                    <span className="font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full h-px bg-[var(--border-subtle,#333)] my-16" />

          {/* Application */}
          <div id="apply">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl uppercase text-[var(--text-primary,#E0E0E0)] mb-4">Apply for this role</h2>
              <p className="text-[var(--text-secondary,#A0A0A0)] max-w-xl mx-auto">
                Complete the form below in about {role.estimatedMinutes}. No account, no Google Form — just a short set of
                questions.
              </p>
            </div>

            <ConversationalApplicationForm role={role} />
          </div>
        </div>
      </div>
    </>
  );
}
