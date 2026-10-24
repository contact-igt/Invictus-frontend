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
                name: 'Contact Us',
                item: 'https://www.invictusglobaltech.com/contact',
            },
        ],
    };

    const contactPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': 'https://www.invictusglobaltech.com/contact#webpage',
        url: 'https://www.invictusglobaltech.com/contact',
        name: 'Contact Us | Invictus Global Tech Pvt Ltd',
        description: "Ready to scale your business? Contact Invictus Global Tech today for a data-driven growth consultation. Let's discuss performance marketing and ROI.",
        isPartOf: {
            '@id': 'https://www.invictusglobaltech.com/#website',
        },
        mainEntity: {
            '@id': 'https://www.invictusglobaltech.com/#organization',
        },
    };

    return (
        <>
            <Head>
                <title>Contact Us | Invictus Global Tech Pvt Ltd</title>
                <meta name="description" content="Ready to scale your business? Contact Invictus Global Tech today for a data-driven growth consultation. Let's discuss performance marketing and ROI." />
                <link rel="canonical" href="https://www.invictusglobaltech.com/contact" />
                <script
                    type="application/ld+json"
                    key="breadcrumb-jsonld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                <script
                    type="application/ld+json"
                    key="contact-jsonld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
                />
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
