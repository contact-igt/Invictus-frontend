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
                <title>About Us | Invictus Global Tech Pvt Ltd</title>
                <meta name="description" content="We are not an agency. We are a growth partner obsessed with data, accountability, and clear numbers." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/about" />
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
