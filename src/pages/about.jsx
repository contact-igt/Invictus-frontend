import React from 'react';
import Head from 'next/head';
import AboutPage from '@/pageComponent/Aboutus';
import { useRouter } from 'next/router';

const About = () => {
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
                name: 'About Us',
                item: 'https://www.invictusglobaltech.com/about',
            },
        ],
    };

    return (
        <>
            <Head>
                <title>About Us | Performance Marketing & Growth Partner | Invictus Global Tech</title>
                <meta name="description" content="Learn about Invictus Global Tech, an ROI-obsessed performance marketing team and growth partner based in Chennai, delivering measurable business outcomes." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/about" />
        <meta property="og:title" content="About Us | Performance Marketing &amp; Growth Partner | Invictus Global Tech" />
        <meta property="og:description" content="Learn about Invictus Global Tech, an ROI-obsessed performance marketing team and growth partner based in Chennai, delivering measurable business outcomes." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/about" />
        <meta name="twitter:title" content="About Us | Performance Marketing &amp; Growth Partner | Invictus Global Tech" />
        <meta name="twitter:description" content="Learn about Invictus Global Tech, an ROI-obsessed performance marketing team and growth partner based in Chennai, delivering measurable business outcomes." />
                <script
                    type="application/ld+json"
                    key="breadcrumb-jsonld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            </Head>
            <AboutPage onContactClick={onContactClick} />
        </>
    );
};

export default About;
