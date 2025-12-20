import Head from 'next/head';
import Navbar from '@/pageComponent/Blueray/Navbar';
import Hero from '@/pageComponent/Blueray/Hero';
import Services from '@/pageComponent/Blueray/Services';
import AreasWeSupport from '@/pageComponent/Blueray/AreasWeSupport';
import Process from '@/pageComponent/Blueray/Process';
import CTA from '@/pageComponent/Blueray/CTA';
import Contact from '@/pageComponent/Blueray/Contact';
import Footer from '@/pageComponent/Blueray/Footer';

export default function Blueray() {
    return (
        <>
            <Head>
                <title>Blueray International | Engineering Quality & NDT Training</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div id="blueray-body" className="bg-gray-50 text-slate-800 font-open-sans">
                <Navbar />
                <Hero />
                <Services />
                <AreasWeSupport />
                <Process />
                <CTA />
                <Contact />
                <Footer />
            </div>
        </>
    );
}
