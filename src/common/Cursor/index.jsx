import React, { useEffect, useRef } from "react";

/**
 * VelocityCursor
 * Premium velocity squish cursor effect for Invictus Global Tech.
 *
 * Parameters:
 * - Size: 34px
 * - Follow: 0.16 (frame-rate independent smoothing)
 * - Deform: 0.72 (deformation intensity)
 * - Blend mode: difference (mix-blend-mode: difference)
 * - Colour: #FFFFFF
 * - Shape: Circular cursor that dynamically stretches according to movement
 * - Native system cursor: fully preserved at all times (never hidden or replaced)
 * - Accessibility: aria-hidden="true", pointer-events: none, prefers-reduced-motion respected
 * - Device support: (hover: hover) and (pointer: fine) only
 */
export default function VelocityCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // 1. SSR & Device Accessibility Checks
    if (typeof window === "undefined") return;

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const isSupported = () => hoverQuery.matches && !motionQuery.matches;

    if (!isSupported()) return;

    const el = cursorRef.current;
    if (!el) return;

    // Exact Specification Constants
    const SIZE = 34;
    const FOLLOW = 0.16;
    const DEFORM = 0.72;
    const BASE_FRAME_MS = 1000 / 60; // 16.667ms standard baseline

    // State Tracking (Direct ref variables - 0 React re-renders for maximum performance)
    let isVisible = false;
    let isInteractive = false;
    let targetX = -200;
    let targetY = -200;
    let currX = -200;
    let currY = -200;
    let currAngle = 0;
    let targetAngle = 0;
    let currScaleX = 1;
    let currScaleY = 1;
    let currHoverScale = 1;
    let lastTime = performance.now();
    let rafId = null;

    // Pointer movement handler
    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        currX = targetX;
        currY = targetY;
        el.style.opacity = "1";
      }

      // Check interactive elements: a, button, input
      const target = e.target;
      if (target && typeof target.closest === "function") {
        isInteractive = !!target.closest("a, button, input");
      }
    };

    const onPointerEnter = () => {
      isVisible = true;
      if (el) el.style.opacity = "1";
    };

    const onPointerLeave = () => {
      isVisible = false;
      if (el) el.style.opacity = "0";
    };

    const onWindowBlur = () => {
      isVisible = false;
      if (el) el.style.opacity = "0";
    };

    const onWindowFocus = () => {
      isVisible = true;
      if (el) el.style.opacity = "1";
    };

    // Single requestAnimationFrame animation loop with frame-rate independent physics
    const animate = (now) => {
      const dt = Math.min(Math.max(now - lastTime, 1), 100);
      lastTime = now;
      const dtRatio = dt / BASE_FRAME_MS;

      // 1. Smooth Follow Interpolation (Follow: 0.16)
      const followEase = 1 - Math.pow(1 - FOLLOW, dtRatio);
      const dx = targetX - currX;
      const dy = targetY - currY;
      const dist = Math.hypot(dx, dy);

      currX += dx * followEase;
      currY += dy * followEase;

      // 2. Velocity-Based Rotation Angle
      if (dist > 0.6) {
        targetAngle = Math.atan2(dy, dx);
      }

      // Shortest angle interpolation (avoids 360-degree jump glitch)
      let angleDiff = targetAngle - currAngle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      const angleEase = 1 - Math.pow(1 - 0.28, dtRatio);
      currAngle += angleDiff * angleEase;

      // 3. Velocity Squish Deformation (Deform: 0.72)
      // Slow/stationary -> dist approaches 0 -> stretch approaches 0 -> scaleX=1, scaleY=1 (circle)
      // Fast movement -> scaleX stretches along velocity angle, scaleY compresses perpendicularly
      const rawStretch = (dist / SIZE) * DEFORM * 0.42;
      const clampedStretch = Math.min(rawStretch, 0.92); // Sensible maximum stretch limit

      const baseScaleX = 1 + clampedStretch;
      const baseScaleY = Math.max(0.48, 1 / (1 + clampedStretch * 0.92));

      // 4. Subtle Interactive Hover Response (a, button, input)
      const targetHover = isInteractive ? 1.35 : 1.0;
      const hoverEase = 1 - Math.pow(1 - 0.18, dtRatio);
      currHoverScale += (targetHover - currHoverScale) * hoverEase;

      const targetScaleX = baseScaleX * currHoverScale;
      const targetScaleY = baseScaleY * currHoverScale;

      // Smooth scale interpolation to organically relax back to circle on stop
      const scaleEase = 1 - Math.pow(1 - 0.22, dtRatio);
      currScaleX += (targetScaleX - currScaleX) * scaleEase;
      currScaleY += (targetScaleY - currScaleY) * scaleEase;

      // 5. GPU-composited transform
      el.style.transform = `translate3d(${currX}px, ${currY}px, 0) rotate(${currAngle}rad) scale(${currScaleX}, ${currScaleY})`;

      rafId = requestAnimationFrame(animate);
    };

    // Attach listeners
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseenter", onPointerEnter);
    document.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);

    rafId = requestAnimationFrame(animate);

    // Media query change handlers
    const onMediaChange = () => {
      if (!isSupported()) {
        cleanup();
      }
    };

    hoverQuery.addEventListener("change", onMediaChange);
    motionQuery.addEventListener("change", onMediaChange);

    const cleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseenter", onPointerEnter);
      document.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
      hoverQuery.removeEventListener("change", onMediaChange);
      motionQuery.removeEventListener("change", onMediaChange);
      if (el) el.style.opacity = "0";
    };

    return cleanup;
  }, []);

  return (
    <div
      id="velocity-cursor"
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 34,
        height: 34,
        marginTop: -17,
        marginLeft: -17,
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        transition: "opacity 0.25s ease",
        transformOrigin: "center center",
        willChange: "transform",
      }}
    />
  );
}
