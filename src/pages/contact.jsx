import React, { useState } from 'react';
import Head from 'next/head';
import ContactPage from '@/pageComponent/ContactPage';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call delay
        setTimeout(() => {
            setFormStatus('success');
            if (e.target) e.target.reset();
        }, 1500);
    };

    return (
        <>
            <Head>
                <title>Contact Us | Invictus Global Tech Private Limited</title>
                <meta name="description" content="Ready to scale? Get in touch with our team for a discovery call." />
            </Head>
            <ContactPage
                handleFormSubmit={handleFormSubmit}
                formStatus={formStatus}
                setFormStatus={setFormStatus}
            />
        </>
    );
};

export default Contact;
