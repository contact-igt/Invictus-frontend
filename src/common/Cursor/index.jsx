import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailer = trailerRef.current;
    
    let mouseX = 0;
    let mouseY = 0;
    let trailerX = 0;
    let trailerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const animateTrailer = () => {
      const distX = mouseX - trailerX;
      const distY = mouseY - trailerY;
      
      trailerX += distX * 0.1;
      trailerY += distY * 0.1;
      
      if (trailer) {
        trailer.style.transform = `translate3d(${trailerX}px, ${trailerY}px, 0)`;
      }
      
      requestAnimationFrame(animateTrailer);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-[#2AB182] rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={trailerRef} className="fixed top-0 left-0 w-8 h-8 border border-[#2AB182]/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block" />
    </>
  );
};

export default CustomCursor;
