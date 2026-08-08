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
                <meta name="description" content="Our global footprint: India (HQ), Singapore, and the United States." />
            </Head>
            <WhereWeArePage onContactClick={onContactClick} />
        </>
    );
};

export default Global;
