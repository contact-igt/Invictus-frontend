import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

/**
 * VantaGlobe
 * 3D Animated Globe background using Vanta.js and Three.js r121
 * Target: Services page Hero section ("What We Do / Performance-Driven Growth Systems")
 * Optimized for size 1.6, seamless black background, and high performance (mouse easing, DPR capping, viewport pausing).
 */
export default function VantaGlobe({ showGlobe = true }) {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);
  const initializingRef = useRef(false);
  const updateGlobeVisibilityRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let observer = null;
    let heroObserver = null;
    let handleVisibilityChange = null;

    async function initVanta() {
      if (initializingRef.current || vantaEffectRef.current) return;
      initializingRef.current = true;

      try {
        // 1. Ensure Three.js r121 is loaded
        if (!window.THREE) {
          await new Promise((resolve, reject) => {
            const existing = document.querySelector('script[data-vanta-three]');
            if (existing) {
              if (window.THREE) return resolve();
              existing.addEventListener('load', () => resolve());
              existing.addEventListener('error', reject);
              return;
            }
            const script = document.createElement('script');
            script.src = '/vendor/vanta/three.r121.min.js';
            script.setAttribute('data-vanta-three', 'true');
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => {
              // CDN fallback
              const cdnScript = document.createElement('script');
              cdnScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
              cdnScript.setAttribute('data-vanta-three', 'true');
              cdnScript.async = true;
              cdnScript.onload = () => resolve();
              cdnScript.onerror = reject;
              document.head.appendChild(cdnScript);
            };
            document.head.appendChild(script);
          });
        }

        // 2. Ensure Vanta GLOBE is loaded
        if (!window.VANTA || !window.VANTA.GLOBE) {
          await new Promise((resolve, reject) => {
            const existing = document.querySelector('script[data-vanta-globe]');
            if (existing) {
              if (window.VANTA && window.VANTA.GLOBE) return resolve();
              existing.addEventListener('load', () => resolve());
              existing.addEventListener('error', reject);
              return;
            }
            const script = document.createElement('script');
            script.src = '/vendor/vanta/vanta.globe.min.js';
            script.setAttribute('data-vanta-globe', 'true');
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => {
              // CDN fallback
              const cdnScript = document.createElement('script');
              cdnScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js';
              cdnScript.setAttribute('data-vanta-globe', 'true');
              cdnScript.async = true;
              cdnScript.onload = () => resolve();
              cdnScript.onerror = reject;
              document.head.appendChild(cdnScript);
            };
            document.head.appendChild(script);
          });
        }

        // Check if still mounted and element exists
        if (!isMounted || !vantaRef.current) {
          initializingRef.current = false;
          return;
        }

        if (vantaEffectRef.current) {
          initializingRef.current = false;
          return;
        }

        const isLight = theme === 'light';
        const bgColor = isLight ? 0xf0f4f8 : 0x000001;

        // Initialize Vanta Globe with requested configuration
        const effect = window.VANTA.GLOBE({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x007c39,
          size: 1.25, // Modestly reduced from 1.6 to 1.25 for balanced proportions
          backgroundColor: bgColor,
          backgroundAlpha: 0.0,
          mouseEase: true, // Smooth mouse response without sudden jumps
        });

        vantaEffectRef.current = effect;

        // Position globe slightly to the right to prevent overlapping left-aligned hero headings
        if (effect.cont2) {
          effect.cont2.position.set(10, 15, 0);
          effect.cont2.visible = showGlobe;
        }

        // Network grid lines and connection points opacity: balanced for visibility and foreground contrast
        if (effect.linesMesh && effect.linesMesh.material) {
          effect.linesMesh.material.transparent = true;
          effect.linesMesh.material.opacity = 0.45;
        }
        if (effect.points) {
          effect.points.forEach((point) => {
            if (point.material) {
              point.material.transparent = true;
              point.material.opacity = 0.52;
            }
          });
        }

        // Setup scroll & visibility handler to ensure the 3D globe is visible throughout the Hero section (both "Invictus Global Tech" and "Marketing That Pays You Back" heading states)
        const updateGlobeVisibility = () => {
          const currentEffect = vantaEffectRef.current;
          if (!currentEffect || !currentEffect.cont2) return;

          if (!showGlobe) {
            currentEffect.cont2.visible = false;
            return;
          }

          const heroEl = document.getElementById('hero');
          if (!heroEl) {
            currentEffect.cont2.visible = false;
            return;
          }

          const rect = heroEl.getBoundingClientRect();
          const windowHeight = window.innerHeight || 800;

          // Hero section is active from page top (scrollY=0) until it exits the viewport (rect.bottom > 140)
          const isHeroActive = rect.bottom > 140 && rect.top < windowHeight * 0.9;

          if (isHeroActive) {
            currentEffect.cont2.visible = true;
            // Smooth fade-out as hero section exits into subsequent sections
            const exitOpacity = Math.min(1, Math.max(0, (rect.bottom - 140) / (windowHeight * 0.4)));
            const targetOpacity = Math.min(1, exitOpacity);

            if (currentEffect.sphere && currentEffect.sphere.material) {
              currentEffect.sphere.material.transparent = true;
              currentEffect.sphere.material.opacity = targetOpacity;
            }
            if (currentEffect.linesMesh2 && currentEffect.linesMesh2.material) {
              currentEffect.linesMesh2.material.transparent = true;
              currentEffect.linesMesh2.material.opacity = targetOpacity;
            }
            if (currentEffect.linesMesh3 && currentEffect.linesMesh3.material) {
              currentEffect.linesMesh3.material.transparent = true;
              currentEffect.linesMesh3.material.opacity = targetOpacity;
            }
          } else {
            currentEffect.cont2.visible = false;
          }
        };

        updateGlobeVisibilityRef.current = updateGlobeVisibility;
        window.addEventListener('scroll', updateGlobeVisibility, { passive: true });
        window.addEventListener('resize', updateGlobeVisibility, { passive: true });
        updateGlobeVisibility();

        // Cap pixel ratio to prevent rendering lag on high-DPI (Retina/4K) and mobile devices
        if (effect && effect.renderer) {
          const isMobile = window.innerWidth < 768;
          const targetDpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
          effect.renderer.setPixelRatio(targetDpr);
          effect.resize();
        }

        // Setup IntersectionObserver to pause rendering when section is off-screen
        observer = new IntersectionObserver(
          ([entry]) => {
            const isVisible = entry.isIntersecting && !document.hidden;
            const currentEffect = vantaEffectRef.current;
            if (!currentEffect) return;

            if (!isVisible) {
              if (currentEffect.req) {
                window.cancelAnimationFrame(currentEffect.req);
                currentEffect.req = null;
              }
            } else {
              if (!currentEffect.req) {
                currentEffect.prevNow = performance.now();
                currentEffect.animationLoop();
              }
            }
          },
          { threshold: 0.05 }
        );

        if (vantaRef.current) {
          observer.observe(vantaRef.current);
        }

        // Pause rendering when browser tab is hidden
        handleVisibilityChange = () => {
          const currentEffect = vantaEffectRef.current;
          if (!currentEffect) return;

          if (document.hidden) {
            if (currentEffect.req) {
              window.cancelAnimationFrame(currentEffect.req);
              currentEffect.req = null;
            }
          } else {
            if (!currentEffect.req && vantaRef.current) {
              currentEffect.prevNow = performance.now();
              currentEffect.animationLoop();
            }
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
      } catch (err) {
        console.warn('Vanta Globe initialization failed gracefully:', err);
      } finally {
        initializingRef.current = false;
      }
    }

    initVanta();

    // Clean up Vanta instance, listeners, and observers on unmount
    return () => {
      isMounted = false;
      initializingRef.current = false;

      if (updateGlobeVisibilityRef.current) {
        window.removeEventListener('scroll', updateGlobeVisibilityRef.current);
        window.removeEventListener('resize', updateGlobeVisibilityRef.current);
      }

      if (observer) {
        observer.disconnect();
      }

      if (handleVisibilityChange) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }

      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy();
        } catch {
          // ignore cleanup error
        }
        vantaEffectRef.current = null;
      }
    };
  }, [theme, showGlobe]);

  // Handle route changes dynamically for showGlobe
  useEffect(() => {
    const currentEffect = vantaEffectRef.current;
    if (!currentEffect || !currentEffect.cont2) return;

    if (!showGlobe) {
      currentEffect.cont2.visible = false;
    } else {
      updateGlobeVisibilityRef.current?.();
    }
  }, [showGlobe]);

  return (
    <div
      ref={vantaRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
