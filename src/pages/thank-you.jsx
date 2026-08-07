import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ThankYouPage from '@/pageComponent/ThankYouPage';

export default function ThankYou() {
    const router = useRouter();
    const { type, source } = router.query || {};
    const isCareer = type === 'career' || type === 'careers' || source === 'careers';

    return (
        <>
            <Head>
                <title>
                    {isCareer
                        ? 'Application Submitted | Invictus Global Tech Private Limited'
                        : 'Thank You | Invictus Global Tech Private Limited'}
                </title>
                <meta
                    name="description"
                    content={
                        isCareer
                            ? 'Thank you for submitting your job application to Invictus Global Tech Private Limited. Our recruitment team will review your profile.'
                            : 'Thank you for contacting Invictus Global Tech Private Limited. We have received your message and will get back to you shortly.'
                    }
                />
            </Head>
            <ThankYouPage />
        </>
    );
}
