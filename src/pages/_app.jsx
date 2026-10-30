import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from '@/common/Navbar';
import Footer from '@/common/Footer';
import { useRouter } from 'next/router';
import BackgroundAnimation from '@/common/BackgroundAnimation';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import VelocityCursor from '@/common/Cursor';

import Head from "next/head";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.invictusglobaltech.com/#organization",
  "name": "Invictus Global Tech Pvt Ltd",
  "url": "https://www.invictusglobaltech.com",
  "logo": "https://www.invictusglobaltech.com/assets/logo_6.webp",
  "image": "https://www.invictusglobaltech.com/assets/logo_6.webp",
  "telephone": "+916369757054",
  "email": "contact@invictusglobaltech.com",
  "description": "A performance marketing agency built on data, accountability, and clear numbers.",
  "sameAs": [
    "https://www.linkedin.com/company/invictus-global-tech/",
    "https://www.instagram.com/invictusglobaltech/",
    "https://www.facebook.com/people/Invictus-Global-Tech/61557394517942/",
    "https://www.youtube.com/@invictusglobaltech-offl"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5/9, Deena Dayalu St, Pondy Bazaar, T. Nagar",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600017",
    "addressCountry": "IN"
  }
};

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isBluerayPage = pathname === '/blueray';

  return (
    <ThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Invictus Global Tech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.invictusglobaltech.com/assets/logo_6.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.invictusglobaltech.com/assets/logo_6.webp" />
        <script
          type="application/ld+json"
          key="organization-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>
      <div className={`min-h-screen ${jakarta.variable} ${!isBluerayPage ? 'font-sans selection:bg-[#2AB182] selection:text-black overflow-x-clip relative' : 'relative'} isolate`}>
        <VelocityCursor />
        <BackgroundAnimation />
        {!isBluerayPage && (
          <>
            <Navbar />
            <ThemeToggle />
          </>
        )}
        <Component {...pageProps} />
        {!isBluerayPage && <Footer />}
      </div>
    </ThemeProvider>
  );
};