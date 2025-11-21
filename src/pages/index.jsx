import BackgroundAnimation from "@/common/BackgroundAnimation";
import CustomCursor from "@/common/Cursor";
import Footer from "@/common/Footer";
import Navbar from "@/common/Navbar";
import AboutPageComponent from "@/pageComponent/Aboutus";
import HomePageComponent from "@/pageComponent/Home";
import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formStatus, setFormStatus] = useState("idle");
  const [activeStep, setActiveStep] = useState(0);
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'about'
  const stepRefs = useRef([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleNavClick = (e, targetView, targetId = null) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (targetView === currentView) {
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setCurrentView(targetView);
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  // Intersection Observer for the Home Page process steps
  useEffect(() => {
    if (currentView === "home") {
      const observers = [];
      const options = {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.5,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setActiveStep((prev) => Math.max(prev, index));
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, options);

      // Defensive check: ensure stepRefs.current is an array before iterating
      if (stepRefs.current && Array.isArray(stepRefs.current)) {
        stepRefs.current.forEach((ref) => {
          if (ref) observer.observe(ref);
        });
      }

      return () => observer.disconnect();
    }
  }, [currentView]);

  return (
    <div className="min-h-screen text-[#E0E0E0] font-sans selection:bg-[#2AB182] selection:text-black cursor-none overflow-x-hidden relative">
      <CustomCursor />
      <BackgroundAnimation />

      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleNavClick={handleNavClick}
        currentView={currentView}
      />

      {/* View Rendering */}
      {currentView === "home" ? (
        <HomePageComponent
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          stepRefs={stepRefs}
          activeFaq={activeFaq}
          toggleFaq={toggleFaq}
          handleFormSubmit={handleFormSubmit}
          formStatus={formStatus}
          scrollToContact={(e) => handleNavClick(e, "home", "contact")}
        />
      ) : (
        <AboutPageComponent
          onContactClick={(e) => handleNavClick(e, "home", "contact")}
        />
      )}

      <Footer />
    </div>
  );
};

export default Home;
