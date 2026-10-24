import Head from "next/head";
import Link from "next/link";
import CareersInteractiveSequence from "@/components/careers/CareersInteractiveSequence";
import { careerRoles } from "@/config/careerRoles";

const roles = Object.values(careerRoles).filter(
  (role, index, self) => index === self.findIndex((r) => r.slug === role.slug)
);

export default function CareersPage() {
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
        name: 'Careers',
        item: 'https://www.invictusglobaltech.com/careers',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Careers | Invictus Global Tech Pvt Ltd</title>
        <meta
          name="description"
          content="Join a multidisciplinary team working across creativity, technology, marketing and AI-assisted execution to solve meaningful business problems."
        />
        <link rel="canonical" href="https://www.invictusglobaltech.com/careers" />
        <script
          type="application/ld+json"
          key="breadcrumb-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <div className="w-full relative bg-transparent text-[var(--text-primary,#E0E0E0)] font-body">
        <CareersInteractiveSequence />

        {/* Open roles */}
        <section id="open-roles" className="py-20 border-b border-[var(--border-subtle,#333)] transition-colors duration-300">
          <div className="max-w-[1240px] mx-auto px-6 md:px-12 font-body">
            <p className="font-body text-[#2AB182] text-sm uppercase tracking-widest font-bold mb-4">(04) / OPEN ROLES</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-[var(--text-primary,#E0E0E0)] mb-12">
              CURRENT OPPORTUNITIES
            </h2>

            <div className="flex flex-col gap-4 font-body">
              {roles.map((role, idx) => {
                const sequenceNumber = (idx + 1).toString().padStart(2, "0");
                return (
                  <div
                    key={role.slug}
                    className="border border-[var(--border-subtle,#333)] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-150 ease-out hover:border-[#2AB182]/50 bg-[var(--bg-secondary,#151515)] rounded-sm font-body"
                  >
                    <div className="flex-1 font-body">
                      <div className="flex items-center gap-3 mb-3 font-body">
                        <span className="text-[#2AB182] font-bold text-xs tracking-widest font-body">{sequenceNumber}</span>
                        <span className="text-[var(--text-muted,#666)] text-xs uppercase tracking-widest font-bold font-body">/ {role.department}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase mb-2 text-[var(--text-primary,#E0E0E0)]">{role.title}</h3>
                      <p className="text-[var(--text-secondary,#A0A0A0)] text-sm max-w-2xl mb-3 font-body">{role.summary}</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="inline-block border border-[var(--border-subtle,#333)] px-3 py-1 text-xs font-bold text-[var(--text-muted,#666)] uppercase font-body">
                          {role.minExperience}
                        </span>
                        {role.freshersAllowed && (
                          <span className="inline-block border border-[#2AB182]/40 text-[#2AB182] px-3 py-1 text-xs font-bold uppercase font-body bg-[#2AB182]/5">
                            {role.freshersAllowed}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 shrink-0">
                      <Link
                        href={`/careers/${role.slug}`}
                        className="min-h-[44px] inline-flex items-center justify-center border border-[var(--border-subtle,#333)] text-[var(--text-primary,#E0E0E0)] px-6 py-3 font-display font-bold uppercase tracking-wider text-sm hover:border-[#2AB182] transition-colors duration-150 ease-out rounded-sm focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none"
                      >
                        View Role
                      </Link>
                      <Link
                        href={`/careers/${role.slug}#apply`}
                        className="min-h-[44px] inline-flex items-center justify-center bg-[#2AB182] text-black px-6 py-3 font-display font-bold uppercase tracking-wider text-sm hover:bg-[#22956d] transition-colors duration-150 ease-out rounded-sm focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
