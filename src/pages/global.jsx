import React from 'react';
import Head from 'next/head';
import WhereWeArePage from '@/pageComponent/WhereWeArePage';
import { useRouter } from 'next/router';

const Global = () => {
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
                name: 'Global Footprint',
                item: 'https://www.invictusglobaltech.com/global',
            },
        ],
    };

    return (
        <>
            <Head>
                <title>Global Footprint & Locations | Invictus Global Tech</title>
                <meta name="description" content="Discover Invictus Global Tech international footprint and Chennai headquarters, delivering enterprise growth and performance marketing globally." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/global" />
        <meta property="og:title" content="Global Footprint &amp; Locations | Invictus Global Tech" />
        <meta property="og:description" content="Discover Invictus Global Tech international footprint and Chennai headquarters, delivering enterprise growth and performance marketing globally." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/global" />
        <meta name="twitter:title" content="Global Footprint &amp; Locations | Invictus Global Tech" />
        <meta name="twitter:description" content="Discover Invictus Global Tech international footprint and Chennai headquarters, delivering enterprise growth and performance marketing globally." />
                <script
                    type="application/ld+json"
                    key="breadcrumb-jsonld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            </Head>
            <WhereWeArePage onContactClick={onContactClick} />
        </>
    );
};

export default Global;
