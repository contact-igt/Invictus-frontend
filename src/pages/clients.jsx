import React from 'react';
import Head from 'next/head';
import ClientsIndustriesPage from '@/pageComponent/ClientsIndustriesPage';
import { useRouter } from 'next/router';

const Clients = () => {
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
                name: 'Clients & Industries',
                item: 'https://www.invictusglobaltech.com/clients',
            },
        ],
    };

    return (
        <>
            <Head>
                <title>Client Case Studies & Industry Results | Invictus Global Tech</title>
                <meta name="description" content="Explore verified case studies and industry growth results across Healthcare, EdTech, E-commerce, Real Estate, and B2B sectors by Invictus Global Tech." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/clients" />
        <meta property="og:title" content="Client Case Studies &amp; Industry Results | Invictus Global Tech" />
        <meta property="og:description" content="Explore verified case studies and industry growth results across Healthcare, EdTech, E-commerce, Real Estate, and B2B sectors by Invictus Global Tech." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/clients" />
        <meta name="twitter:title" content="Client Case Studies &amp; Industry Results | Invictus Global Tech" />
        <meta name="twitter:description" content="Explore verified case studies and industry growth results across Healthcare, EdTech, E-commerce, Real Estate, and B2B sectors by Invictus Global Tech." />
                <script
                    type="application/ld+json"
                    key="breadcrumb-jsonld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            </Head>
            <ClientsIndustriesPage onContactClick={onContactClick} />
        </>
    );
};

export default Clients;
