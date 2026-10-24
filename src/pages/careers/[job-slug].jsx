import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { careerRoles, getRoleConfig } from "@/config/careerRoles";
import ConversationalApplicationForm from "@/components/careers/ConversationalApplicationForm";

export default function DynamicJobPage({ role: initialRole }) {
  const router = useRouter();
  const { "job-slug": jobSlug } = router.query;
  const role = initialRole || getRoleConfig(typeof jobSlug === "string" ? jobSlug : "");

  if (!role && !router.isReady) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full relative min-h-screen pt-20 md:pt-24 bg-transparent font-body"
      >
        <span className="sr-only">Loading career opportunity details...</span>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-12 md:py-24">
          {/* Back button skeleton */}
          <div className="h-4 w-32 bg-[var(--bg-secondary,#151515)] rounded-sm mb-12 animate-pulse motion-reduce:animate-none" />

          {/* Department badge skeleton */}
          <div className="h-4 w-24 bg-[var(--bg-secondary,#151515)] rounded-sm mb-6 animate-pulse motion-reduce:animate-none" />

          {/* Title skeleton */}
          <div className="h-12 md:h-14 w-3/4 max-w-xl bg-[var(--bg-secondary,#151515)] rounded-sm mb-6 animate-pulse motion-reduce:animate-none" />

          {/* Metadata badges skeleton */}
          <div className="flex gap-3 mb-8">
            <div className="h-8 w-28 bg-[var(--bg-secondary,#151515)] rounded-sm animate-pulse motion-reduce:animate-none" />
            <div className="h-8 w-36 bg-[var(--bg-secondary,#151515)] rounded-sm animate-pulse motion-reduce:animate-none" />
          </div>

          {/* Summary paragraph skeleton */}
          <div className="space-y-3 mb-10 max-w-3xl">
            <div className="h-5 w-full bg-[var(--bg-secondary,#151515)] rounded-sm animate-pulse motion-reduce:animate-none" />
            <div className="h-5 w-5/6 bg-[var(--bg-secondary,#151515)] rounded-sm animate-pulse motion-reduce:animate-none" />
          </div>

          {/* Apply button skeleton */}
          <div className="h-12 w-36 bg-[#2AB182]/20 rounded-sm mb-16 animate-pulse motion-reduce:animate-none" />

          <div className="w-full h-px bg-[var(--border-subtle,#333)] mb-16" />

          {/* Section heading & items skeleton */}
          <div className="space-y-4 max-w-2xl">
            <div className="h-6 w-44 bg-[var(--bg-secondary,#151515)] rounded-sm mb-4 animate-pulse motion-reduce:animate-none" />
            <div className="h-4 w-full bg-[var(--bg-secondary,#151515)] rounded-sm animate-pulse motion-reduce:animate-none" />
            <div className="h-4 w-4/5 bg-[var(--bg-secondary,#151515)] rounded-sm animate-pulse motion-reduce:animate-none" />
            <div className="h-4 w-3/4 bg-[var(--bg-secondary,#151515)] rounded-sm animate-pulse motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-transparent pt-32 text-center text-[var(--text-primary,#E0E0E0)]">
        <h1 className="text-3xl font-bold mb-4">ROLE NOT FOUND</h1>
        <p className="text-[var(--text-secondary,#A0A0A0)] mb-8">The requested career opportunity could not be found.</p>
        <Link href="/careers" className="inline-block bg-[#2AB182] text-black px-6 py-3 font-bold uppercase rounded-sm">
          Return to Careers
        </Link>
      </div>
    );
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: role.title,
        item: `https://www.invictusglobaltech.com/careers/${role.slug}`,
      },
    ],
  };

  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.summary,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Invictus Global Tech Pvt Ltd',
      sameAs: 'https://www.invictusglobaltech.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    },
  };

  return (
    <>
      <Head>
        <title>{`${role.title} | Invictus Careers`}</title>
        <meta name="description" content={role.summary} />
        <link rel="canonical" href={`https://www.invictusglobaltech.com/careers/${role.slug}`} />
        <script
          type="application/ld+json"
          key="breadcrumb-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          key="jobposting-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        />
      </Head>

      <div className="w-full relative min-h-screen pt-20 md:pt-24 bg-transparent text-[var(--text-primary,#E0E0E0)] font-body">
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

            <h2 className="text-2xl font-display font-bold text-[var(--text-primary,#E0E0E0)] mb-6">Preferred</h2>
            <ul className="list-disc pl-5 space-y-3 mb-12 font-body">
              {role.preferred.map((item) => (
                <li key={item} className="leading-relaxed font-body">
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-[var(--bg-secondary,#151515)] border border-[var(--border-subtle,#333)] p-6 md:p-8 rounded-sm mb-4">
              <h2 className="text-xl font-display font-bold text-[var(--text-primary,#E0E0E0)] mb-5">What we look for beyond the tools</h2>
              <ul className="space-y-3 font-body">
                {role.positioning.map((item) => (
                  <li key={item} className="leading-relaxed flex gap-3 font-body">
                    <span className="text-[#2AB182] font-bold shrink-0">•</span>
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
                Complete the form below in about {role.estimatedMinutes}. No account, no Google Form: just a short set of
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const jobSlug = params?.["job-slug"];
  const role = getRoleConfig(typeof jobSlug === "string" ? jobSlug : "");
  if (!role) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      role: JSON.parse(JSON.stringify(role)),
    },
  };
}

