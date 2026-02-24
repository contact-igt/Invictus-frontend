import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import TeamCard from "./TeamCard";

const TeamModal = ({ isOpen, onClose, teamMembers, initialSlide = 0 }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Force a window resize event after a short delay
            const timer = setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 50); // Faster trigger
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: initialSlide,
        centerMode: false,
        centerPadding: "0px",
        arrows: false,
        adaptiveHeight: true, // Added for better mobile height handling
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "120px",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "40px",
                }
            }
        ]
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[1010]"
            >
                <X size={40} strokeWidth={1} />
            </button>

            <div className="w-full max-w-7xl relative">
                {/* Navigation Arrows */}
                <button
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full hidden md:flex items-center justify-center text-white/30 hover:text-white transition-colors h-full px-8"
                >
                    <ChevronLeft size={60} strokeWidth={1} />
                </button>

                <button
                    onClick={() => sliderRef.current?.slickNext()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full hidden md:flex items-center justify-center text-white/30 hover:text-white transition-colors h-full px-8"
                >
                    <ChevronRight size={60} strokeWidth={1} />
                </button>

                {/* Adding key={isOpen} here to force remount when modal opens */}
                <Slider key={isOpen ? 'open' : 'closed'} ref={sliderRef} {...settings}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className="px-4 outline-none">
                            <div className="flex justify-center transition-transform duration-500 hover:scale-105">
                                <TeamCard
                                    name={member.name}
                                    role={member.role}
                                    isSlider={true}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Background hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-sm tracking-[0.3em] uppercase pointer-events-none text-center px-4 w-full">
                Use arrows or drag to navigate
            </div>
        </div>
    );
};

export default TeamModal;
