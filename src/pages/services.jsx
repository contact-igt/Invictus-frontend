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
                description: 'Data-driven campaigns that maximize ROI across Meta, Google, and LinkedIn.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 2,
                name: 'Social Media Management',
                description: 'Building brand authority and community through engaging content and strategic management.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 3,
                name: 'Web & App Development',
                description: 'Creating high-performance, scalable, and user-centric digital experiences.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 4,
                name: 'AI & Automation',
                description: 'Streamlining operations and enhancing customer experiences with cutting-edge AI solutions.',
                provider: {
                    '@id': 'https://www.invictusglobaltech.com/#organization',
                },
                url: 'https://www.invictusglobaltech.com/services',
            },
            {
                '@type': 'Service',
                position: 5,
                name: 'ChatGPT Ads',
                description: 'First-to-market conversational advertising in ChatGPT to reach high-intent users.',
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
                <title>Performance Marketing &amp; AI Growth Services | Invictus Global Tech</title>
                <meta name="description" content="Explore ChatGPT Ads, performance marketing, web development, and AI automation with Invictus Global Tech. Scale your business with proven ROI." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/services" />
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
