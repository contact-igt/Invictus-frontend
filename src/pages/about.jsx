import React from 'react';
import Head from 'next/head';
import AboutPage from '@/pageComponent/Aboutus';
import { useRouter } from 'next/router';

const About = () => {
    const router = useRouter();
    const onContactClick = () => router.push('/contact');
    return (
        <>
            <Head>
                <title>About Us | Invictus Global Tech Private Limited</title>
                <meta name="description" content="We are not an agency. We are a growth partner obsessed with data, accountability, and clear numbers." />
            </Head>
            <AboutPage onContactClick={onContactClick} />
        </>
    );
};

export default About;
