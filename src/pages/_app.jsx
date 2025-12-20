import "@/styles/globals.css";
import Navbar from '@/common/Navbar';
import Footer from '@/common/Footer';
import { useRouter } from 'next/router';
import CustomCursor from '@/common/Cursor';
import BackgroundAnimation from '@/common/BackgroundAnimation';

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isBluerayPage = pathname === '/blueray';

  return (
    <div className={`min-h-screen ${!isBluerayPage ? 'text-[#E0E0E0] font-sans selection:bg-[#2AB182] selection:text-black cursor-none overflow-x-hidden relative' : ''}`}>
      {!isBluerayPage && (
        <>
          <CustomCursor />
          <BackgroundAnimation />
          <Navbar />
        </>
      )}
      <Component {...pageProps} />
      {!isBluerayPage && <Footer />}
    </div>
  );
}
