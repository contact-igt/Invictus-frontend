import React from 'react';
import Head from 'next/head';
import ServicesPage from '@/pageComponent/ServicesPage';
import { useRouter } from 'next/router';

const Services = () => {
    const router = useRouter();
    const onContactClick = () => router.push('/contact');
    return (
        <>
            <Head>
                <title>Services | Invictus Global Tech</title>
                <meta name="description" content="Our core services: Performance Marketing, Social Media Management, Web & App Development, and AI & Automation." />
            </Head>
            <ServicesPage onContactClick={onContactClick} />
        </>
    );
};

export default Services;
