import "@/styles/globals.css";
import Navbar from '@/common/Navbar';
import Footer from '@/common/Footer';
import CustomCursor from '@/common/Cursor';
import BackgroundAnimation from '@/common/BackgroundAnimation';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen text-[#E0E0E0] font-sans selection:bg-[#2AB182] selection:text-black cursor-none overflow-x-hidden relative">
      <CustomCursor />
      <BackgroundAnimation />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
