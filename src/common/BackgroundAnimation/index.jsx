import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const VantaGlobe = dynamic(() => import("@/components/VantaGlobe"), {
  ssr: false,
});

const BackgroundAnimation = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-[#0A0A0A]"
      aria-hidden="true"
    >
      <VantaGlobe showGlobe={isHomePage} />
    </div>
  );
};

export default BackgroundAnimation;
