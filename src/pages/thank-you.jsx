import React from 'react';
import Head from 'next/head';
import ThankYouPage from '@/pageComponent/ThankYouPage';

export default function ThankYou() {
    return (
        <>
            <Head>
                <title>Thank You | Invictus Global Tech</title>
                <meta name="description" content="Thank you for contacting Invictus Global Tech. We have received your message and will get back to you shortly." />
            </Head>
            <ThankYouPage />
        </>
    );
}
