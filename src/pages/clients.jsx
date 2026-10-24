import React from 'react';
import Head from 'next/head';
import ClientsIndustriesPage from '@/pageComponent/ClientsIndustriesPage';
import { useRouter } from 'next/router';

const Clients = () => {
    const router = useRouter();
    const onContactClick = () => router.push('/contact');
    return (
        <>
            <Head>
                <title>Client Case Studies &amp; Industry Results | Invictus Global Tech</title>
                <meta name="description" content="Industries we transform: Healthcare, EdTech, E-commerce, Real Estate, and B2B Consulting." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/clients" />
            </Head>
            <ClientsIndustriesPage onContactClick={onContactClick} />
        </>
    );
};

export default Clients;
