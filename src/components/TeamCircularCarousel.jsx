import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TO_RAD = Math.PI / 180;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const wrap = degrees => ((((degrees + 180) % 360) + 360) % 360) - 180;

const cleanImageName = (name) => {
  const clean = name.toLowerCase().replace("dr. ", "").trim();
  const nameMap = {
    "naveen raj": "naveen",
    "alam": "aalam",
    "vignesh rajan": "vignesh rajan",
    "aiswarya": "aishwarya",
  };
  return nameMap[clean] || clean;
};

/**
 * TeamCircularCarousel
 * 3D Circular Team Carousel inspired by React Bits CircularCarousel.
 * Combines smooth mouse parallax 3D tilt with click-to-front horizontal rotation,
 * preserving original green grid card designs and responsive touch interaction.
 */
export default function TeamCircularCarousel({
  teamMembers = [],
  onCardClick,
  className = "",
}) {
  const rootRef = useRef(null);
  const cameraRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const wakeRef = useRef(() => {});

  const count = teamMembers.length;
  const step = 360 / Math.max(count, 1);

  const [active, setActive] = useState(0);
  const [dimensions, setDimensions] = useState({
    cardWidth: 220,
    cardHeight: 480,
    radius: 520,
    perspective: 1600,
  });

  const stateRef = useRef({
    angle: 0,
    target: 0,
    velocity: 0,
    yaw: 0,
    pitch: 0,
    pointer: { inside: false, x: 0, y: 0 },
    press: null,
    dragging: false,
    suppressClick: false,
    last: 0,
    holdUntil: 0,
  });

  // Calculate responsive sizing based on container width
  const updateDimensions = useCallback(() => {
    if (!rootRef.current) return;
    const width = rootRef.current.offsetWidth || window.innerWidth;
    let cardW = 220;
    let cardH = 480;
    let gap = 24;

    if (width < 640) {
      cardW = 150;
      cardH = 330;
      gap = 14;
    } else if (width < 1024) {
      cardW = 180;
      cardH = 400;
      gap = 18;
    } else if (width < 1440) {
      cardW = 210;
      cardH = 460;
      gap = 22;
    }

    const n = Math.max(count, 3);
    const pitch = cardW + gap;
    const radius = Math.max((pitch) / (2 * Math.sin(Math.PI / n)), cardW * 1.5);
    const perspective = Math.max(1200, radius * 2.8);

    setDimensions({
      cardWidth: cardW,
      cardHeight: cardH,
      radius,
      perspective,
    });
  }, [count]);

  // Rotate to specific card index
  const focusIndex = useCallback((index) => {
    const state = stateRef.current;
    let target = -index * step;
    // Pick the shortest circular path
    target += 360 * Math.round((state.angle - target) / 360);
    state.target = target;
    state.holdUntil = performance.now() + 2500;
    wakeRef.current();
  }, [step]);

  const stepBy = useCallback((delta) => {
    const state = stateRef.current;
    const base = state.target !== null ? state.target : Math.round(state.angle / step) * step;
    state.target = base - delta * step;
    state.holdUntil = performance.now() + 2500;
    wakeRef.current();
  }, [step]);

  // Main 3D Animation Loop
  useLayoutEffect(() => {
    const root = rootRef.current;
    const camera = cameraRef.current;
    const ring = ringRef.current;
    if (!root || !camera || !ring) return undefined;

    const state = stateRef.current;
    let raf = 0;
    let isVisible = true;

    const SPRING = 95; // Responsive spring tension
    const damping = 2 * Math.sqrt(SPRING);
    const tilt = -5; // Subtle 3D perspective angle
    const parallax = 0.45; // Subtle mouse tilt strength

    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const advance = (dt, now) => {
      let busy = false;

      // 1. Spring physics towards target angle
      if (state.dragging) {
        state.target = null;
        busy = true;
      } else if (state.target !== null) {
        let remaining = dt;
        while (remaining > 0) {
          const h = Math.min(remaining, 1 / 240);
          const accel = SPRING * (state.target - state.angle) - damping * state.velocity;
          state.velocity += accel * h;
          state.angle += state.velocity * h;
          remaining -= h;
        }

        if (Math.abs(state.target - state.angle) < 0.005 && Math.abs(state.velocity) < 0.03) {
          state.angle = state.target;
          state.velocity = 0;
          state.target = null;
        }
        busy = true;
      } else if (Math.abs(state.velocity) > 0.01) {
        const tau = 0.28;
        state.velocity += (-state.velocity) * (1 - Math.exp(-dt / tau));
        state.angle += state.velocity * dt;
        if (Math.abs(state.velocity) < 6) {
          state.target = Math.round(state.angle / step) * step;
        }
        busy = true;
      }

      // 2. Smooth mouse parallax interpolation
      const ease = 1 - Math.exp(-dt * 6.5);
      const aimYaw = (state.pointer.inside && !prefersReducedMotion) ? state.pointer.x * parallax * 10 : 0;
      const aimPitch = (state.pointer.inside && !prefersReducedMotion) ? -state.pointer.y * parallax * 6 : 0;

      state.yaw += (aimYaw - state.yaw) * ease;
      state.pitch += (aimPitch - state.pitch) * ease;

      if (Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01) {
        busy = true;
      }

      if (now < state.holdUntil) busy = true;

      return busy;
    };

    const render = () => {
      const { radius, perspective } = dimensions;
      const angle = state.angle;

      // Update camera 3D transform (Parallax Yaw & Pitch)
      camera.style.transform = `translate3d(0, 0, ${-radius}px) rotateX(${tilt + state.pitch}deg) rotateY(${state.yaw}deg)`;

      // Update ring rotation (Horizontal Click Rotation)
      ring.style.transform = `rotateY(${angle}deg)`;

      // Update card depth, scale, and visibility
      for (let i = 0; i < count; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        const base = i * step;
        const world = wrap(base + angle);
        const facing = Math.cos(world * TO_RAD); // 1 = facing front, -1 = facing back

        // Subtle depth fade for cards receding into background
        const depth = Math.max(0.15, (facing + 1) / 2);
        const opacity = (0.25 + 0.75 * Math.pow(depth, 1.3)).toFixed(3);
        const scale = (0.75 + 0.25 * depth).toFixed(3);

        card.style.opacity = opacity;
        card.style.transform = `rotateY(${base}deg) translateZ(${radius}px) scale(${scale})`;

        // Give front cards priority in stacking and click handling
        card.style.zIndex = Math.round((facing + 1) * 50);
        card.style.pointerEvents = facing > 0.1 ? 'auto' : 'none';
      }

      // Update active card index
      const activeIdx = ((Math.round(-angle / step) % count) + count) % count;
      setActive(activeIdx);
    };

    const frame = (now) => {
      raf = 0;
      const dt = state.last ? Math.min((now - state.last) / 1000, 0.05) : 1 / 60;
      state.last = now;

      const busy = advance(dt, now);
      render();

      if (busy && isVisible && !document.hidden) {
        raf = requestAnimationFrame(frame);
      } else {
        state.last = 0;
      }
    };

    const wake = () => {
      if (!raf && isVisible && !document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };
    wakeRef.current = wake;

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
      wake();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
        state.last = 0;
      }
    });
    intersectionObserver.observe(root);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        state.last = 0;
      } else {
        wake();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    render();
    wake();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, step, dimensions, updateDimensions]);

  // Mouse & Pointer handlers
  const handlePointerMove = (e) => {
    const state = stateRef.current;
    if (e.pointerType === "mouse") {
      state.pointer.inside = true;
      if (rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect();
        state.pointer.x = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        state.pointer.y = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      }
    }

    if (state.press && state.press.id === e.pointerId) {
      const deltaX = e.clientX - state.press.x;
      if (!state.press.moved) {
        if (Math.abs(deltaX) > 6) {
          state.press.moved = true;
          state.press.origin = deltaX;
          state.dragging = true;
          state.target = null;
          state.velocity = 0;
          try {
            rootRef.current?.setPointerCapture(e.pointerId);
          } catch {}
        }
      }

      if (state.press.moved) {
        const perPixel = 180 / (Math.PI * dimensions.radius);
        state.angle = state.press.angle + (deltaX - state.press.origin) * perPixel;
        const now = performance.now();
        state.press.samples.push({ time: now, angle: state.angle });
        while (state.press.samples.length > 2 && now - state.press.samples[0].time > 100) {
          state.press.samples.shift();
        }
      }
    }

    wakeRef.current();
  };

  const handlePointerDown = (e) => {
    const state = stateRef.current;
    state.suppressClick = false;
    if (e.button !== 0 && e.pointerType === "mouse") return;

    state.press = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      angle: state.angle,
      moved: false,
      origin: 0,
      samples: [{ time: performance.now(), angle: state.angle }],
    };
  };

  const handlePointerUp = (e) => {
    const state = stateRef.current;
    if (!state.press || state.press.id !== e.pointerId) return;

    const moved = state.press.moved;
    state.press = null;

    if (moved) {
      state.dragging = false;
      state.suppressClick = true;

      const first = state.press?.samples[0];
      const last = state.press?.samples[state.press?.samples.length - 1];
      const span = last && first ? (last.time - first.time) / 1000 : 0;
      const velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1000, 1000) : 0;

      state.velocity = velocity;
      state.target = Math.round((state.angle + velocity * 0.2) / step) * step;
      wakeRef.current();
    }
  };

  const handlePointerLeave = (e) => {
    if (e.pointerType === "mouse") {
      stateRef.current.pointer.inside = false;
      wakeRef.current();
    }
  };

  // Card click handler
  const handleCardClick = (index) => {
    const state = stateRef.current;
    if (state.suppressClick) {
      state.suppressClick = false;
      return;
    }

    // Horizontal rotation to front
    focusIndex(index);
    if (onCardClick) {
      onCardClick(teamMembers[index], index);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full min-h-[480px] md:min-h-[560px] lg:min-h-[640px] flex items-center justify-center select-none overflow-visible touch-pan-y ${className}`}
      style={{ perspective: `${dimensions.perspective}px` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {/* 3D Camera Frame */}
      <div
        ref={cameraRef}
        className="relative w-0 h-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 3D Cylinder Ring Frame */}
        <div
          ref={ringRef}
          className="absolute left-0 top-0 w-0 h-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {teamMembers.map((member, index) => {
            const fileName = cleanImageName(member.name);
            const imagePath = `/assets/team/teamscroll/${fileName}.webp`;
            const isActive = index === active;

            return (
              <div
                key={member.name + index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute left-0 top-0 w-0 h-0 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(index);
                }}
                role="button"
                tabIndex={0}
                aria-label={`${member.name} - ${member.role}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(index);
                  }
                }}
              >
                {/* Visual Card Container */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105 active:scale-95 group"
                  style={{
                    width: `${dimensions.cardWidth}px`,
                    height: `${dimensions.cardHeight}px`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "shadow-[0_15px_45px_rgba(42,177,130,0.45)] ring-2 ring-[#2AB182]"
                        : "hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    }`}
                  >
                    <img
                      src={imagePath}
                      alt={member.name}
                      width={273}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--border-subtle)] pointer-events-auto">
        <button
          type="button"
          onClick={() => stepBy(-1)}
          aria-label="Previous team member"
          className="p-1.5 text-[var(--text-muted)] hover:text-[#2AB182] transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="font-body text-xs font-semibold tracking-wider text-[var(--text-primary)] min-w-[70px] text-center">
          {active + 1} / {count}
        </span>

        <button
          type="button"
          onClick={() => stepBy(1)}
          aria-label="Next team member"
          className="p-1.5 text-[var(--text-muted)] hover:text-[#2AB182] transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
