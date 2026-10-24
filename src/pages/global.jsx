import React from 'react';
import Head from 'next/head';
import WhereWeArePage from '@/pageComponent/WhereWeArePage';
import { useRouter } from 'next/router';

const Global = () => {
    const router = useRouter();
    const onContactClick = () => router.push('/contact');
    return (
        <>
            <Head>
                <title>Where We Are | Invictus Global Tech Pvt Ltd</title>
                <meta name="description" content="Discover Invictus Global Tech's international presence across India (HQ), Singapore, and the USA. Delivering enterprise growth and performance marketing worldwide." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/global" />
            </Head>
            <WhereWeArePage onContactClick={onContactClick} />
        </>
    );
};

export default Global;
