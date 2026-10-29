import React from 'react';
import Head from 'next/head';
import ServicesPage from '@/pageComponent/ServicesPage';
import { useRouter } from 'next/router';

const Services = () => {
    const router = useRouter();
    const onContactClick = () => router.push('/contact');

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
                name: 'Services',
                item: 'https://www.invictusglobaltech.com/services',
            },
        ],
    };

    const serviceListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [
            {
                '@type': 'Service',
                position: 1,
                name: 'Performance Marketing',
                description: 'Paid acquisition across Meta Ads, Google Search & Performance Max, and LinkedIn structured to improve CAC and scale pipeline.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 2,
                name: 'Social Media & Creative Direction',
                description: 'High-impact short-form video production and visual content designed to build brand authority and fuel paid campaigns.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 3,
                name: 'Web & Conversion Engineering',
                description: 'High-converting landing pages and modern web platforms engineered for fast loading and conversion rate optimization.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 4,
                name: 'AI & Lead Automation',
                description: 'WhatsApp lead automation, automated CRM routing, and workflow triggers ensuring prompt follow-up for every inbound enquiry.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 5,
                name: 'Conversational Search & AI Discovery',
                description: 'Strategic positioning for brands across conversational AI and emerging AI search channels.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services#chatgpt-ads',
            },
        ],
    };

    return (
        <>
            <Head>
                <title>Performance Marketing, Meta Ads & AI Web Services | Invictus Global Tech</title>
                <meta name="description" content="Explore Invictus Global Tech services: Meta & Google Ads performance marketing, conversational AI search strategy, lead automation, and conversion web engineering." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/services" />
        <meta property="og:title" content="Performance Marketing, Meta Ads &amp; AI Web Services | Invictus Global Tech" />
        <meta property="og:description" content="Explore Invictus Global Tech services: Meta &amp; Google Ads performance marketing, conversational AI search strategy, lead automation, and conversion web engineering." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/services" />
        <meta name="twitter:title" content="Performance Marketing, Meta Ads &amp; AI Web Services | Invictus Global Tech" />
        <meta name="twitter:description" content="Explore Invictus Global Tech services: Meta &amp; Google Ads performance marketing, conversational AI search strategy, lead automation, and conversion web engineering." />
                <script
                    type="application/ld+json"
                    key="breadcrumb-jsonld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                <script
                    type="application/ld+json"
                    key="services-jsonld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
                />
            </Head>
            <ServicesPage onContactClick={onContactClick} />
        </>
    );
};

export default Services;
