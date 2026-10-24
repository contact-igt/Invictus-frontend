import React, { useEffect, useRef } from 'react';

const PAD = 24;
const TAU = Math.PI * 2;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const wrap = value => value - Math.floor(value);

/**
 * Calculates perimeter position s in [0, 1) around a rounded rectangle
 */
const loopPosition = (x, y, halfX, halfY, r) => {
  const innerX = halfX - r;
  const innerY = halfY - r;
  const arc = (Math.PI / 2) * r;
  const quarter = innerX + innerY + arc;
  const ax = Math.abs(x);
  const ay = Math.abs(y);
  const qx = ax - innerX;
  const qy = ay - innerY;
  let s;
  if (qx > 0 && qy > 0) s = innerY + Math.atan2(qy, qx) * r;
  else if (qx > qy) s = Math.min(ay, innerY);
  else s = innerY + arc + innerX - Math.min(ax, innerX);
  if (x < 0) s = y >= 0 ? 2 * quarter - s : 2 * quarter + s;
  else if (y < 0) s = 4 * quarter - s;
  return wrap(s / Math.max(4 * quarter, 0.0001));
};

/**
 * Maps perimeter position s in [0, 1) back to (x, y) coordinates on the rounded rectangle edge
 */
const rimPoint = (position, halfX, halfY, r) => {
  const innerX = halfX - r;
  const innerY = halfY - r;
  const arc = (Math.PI / 2) * r;
  const quarter = innerX + innerY + arc;
  let s = wrap(position) * 4 * quarter;
  let signX = 1;
  let signY = 1;
  if (s > 3 * quarter) {
    s = 4 * quarter - s;
    signY = -1;
  } else if (s > 2 * quarter) {
    s -= 2 * quarter;
    signX = -1;
    signY = -1;
  } else if (s > quarter) {
    s = 2 * quarter - s;
    signX = -1;
  }
  let x = innerX - (s - innerY - arc);
  let y = halfY;
  if (s <= innerY) {
    x = halfX;
    y = s;
  } else if (s <= innerY + arc) {
    const angle = (s - innerY) / Math.max(r, 0.0001);
    x = innerX + Math.cos(angle) * r;
    y = innerY + Math.sin(angle) * r;
  }
  return [x * signX, y * signY];
};

/**
 * SpecularButton
 * Interactive edge-light specular highlight adapted from React Bits SpecularButton.
 * Features cursor proximity tracking, smooth border traversal, zero WebGL contention,
 * and strict preservation of brand styling.
 */
const SpecularButton = ({
  as: Component = 'button',
  children,
  radius = 8,
  lineColor = '#ffffff',
  baseColor = 'rgba(42, 177, 130, 0.4)',
  intensity = 0.8,
  idleIntensity = 0.15,
  shineSize = 10,
  shineFade = 34,
  thickness = 1.2,
  glow = 0.6,
  speed = 0.35,
  followMouse = true,
  proximity = 200,
  autoAnimate = false,
  disabled = false,
  className = '',
  style = {},
  href,
  target,
  rel,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const wakeRef = useRef(null);

  const Tag = href ? 'a' : Component;

  const settings = {
    radius: Math.max(0, radius),
    lineColor,
    baseColor,
    intensity: Math.max(0, intensity),
    idleIntensity: clamp(idleIntensity, 0, 1),
    shineSize: Math.max(0, shineSize),
    shineFade: Math.max(0, shineFade),
    thickness: Math.max(0, thickness),
    glow: Math.max(0, glow),
    speed,
    followMouse,
    proximity: Math.max(1, proximity),
    autoAnimate,
    disabled
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    if (!button || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const view = { width: 1, height: 1, ratio: 1 };
    const pointer = { x: 0, y: 0, known: false };
    const state = { spot: 0, level: 0, press: 0, ready: false };
    let raf = 0;
    let last = 0;
    let visible = true;

    const cornerRadius = s => Math.min(s.radius, view.width / 2, view.height / 2);

    const restSpot = s => {
      const r = cornerRadius(s);
      const inset = r * (1 - Math.SQRT1_2);
      return loopPosition(inset - view.width / 2, view.height / 2 - inset, view.width / 2, view.height / 2, r);
    };

    const aim = s => {
      if (!s.followMouse || s.disabled || !pointer.known) return null;
      const rect = button.getBoundingClientRect();
      const scale = rect.width / view.width || 1;
      const halfX = view.width / 2;
      const halfY = view.height / 2;
      const x = (pointer.x - rect.left - rect.width / 2) / scale;
      const y = (rect.top + rect.height / 2 - pointer.y) / scale;
      const distance = Math.hypot(Math.max(Math.abs(x) - halfX, 0), Math.max(Math.abs(y) - halfY, 0));
      const t = clamp(1 - distance / s.proximity, 0, 1);
      const near = t * t * (3 - 2 * t);
      const nearest = loopPosition(x, y, halfX, halfY, cornerRadius(s));
      if (distance > 0) return { spot: nearest, near };
      const depth = clamp(Math.min(halfX - Math.abs(x), halfY - Math.abs(y)) / (halfY * 0.8), 0, 1);
      const sway = restSpot(s) - (x / halfX) * 0.06 - (y / halfY) * 0.02;
      const offset = sway - nearest - Math.round(sway - nearest);
      return { spot: wrap(nearest + offset * depth * depth * (3 - 2 * depth)), near };
    };

    const draw = s => {
      const { width, height, ratio } = view;
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(ratio, ratio);

      const halfX = width / 2;
      const halfY = height / 2;
      const r = Math.min(s.radius, halfX, halfY);

      // Center offset inside the padded canvas
      const cx = PAD + halfX;
      const cy = PAD + halfY;

      // Map spot to 2D rim point (relative to button center)
      const [rimX, rimY] = rimPoint(state.spot, halfX, halfY, r);
      // Coordinate in canvas space (note: rimY has standard Cartesian where +Y is up)
      const spotCanvasX = cx + rimX;
      const spotCanvasY = cy - rimY;

      const currentIntensity = s.intensity * (state.level + state.press * 0.8);
      const beamRadius = (s.shineFade + s.shineSize * 2) * 1.5;

      // Draw rounded rectangle path
      const drawRoundedBox = (inset = 0) => {
        const x = PAD + inset;
        const y = PAD + inset;
        const w = width - inset * 2;
        const h = height - inset * 2;
        const radius = Math.max(1, r - inset);

        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, w, h, radius);
        } else {
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + w - radius, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
          ctx.lineTo(x + w, y + h - radius);
          ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
          ctx.lineTo(x + radius, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
        }
      };

      // 1. Ambient baseline edge light
      if (s.baseColor) {
        ctx.save();
        drawRoundedBox(0);
        ctx.lineWidth = s.thickness;
        ctx.strokeStyle = s.baseColor;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Dynamic Specular Rim Light
      if (currentIntensity > 0.01) {
        // Outer specular glow
        if (s.glow > 0) {
          ctx.save();
          drawRoundedBox(0);
          ctx.lineWidth = s.thickness + s.glow * 2.5;
          const glowGrad = ctx.createRadialGradient(
            spotCanvasX, spotCanvasY, 0,
            spotCanvasX, spotCanvasY, beamRadius * 1.2
          );
          glowGrad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * currentIntensity * s.glow})`);
          glowGrad.addColorStop(0.3, `rgba(42, 177, 130, ${0.35 * currentIntensity * s.glow})`);
          glowGrad.addColorStop(1, 'rgba(42, 177, 130, 0)');
          ctx.strokeStyle = glowGrad;
          ctx.stroke();
          ctx.restore();
        }

        // Crisp specular highlight stroke
        ctx.save();
        drawRoundedBox(0);
        ctx.lineWidth = s.thickness * 1.2;
        const beamGrad = ctx.createRadialGradient(
          spotCanvasX, spotCanvasY, 0,
          spotCanvasX, spotCanvasY, beamRadius
        );
        beamGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, 0.95 * currentIntensity)})`);
        beamGrad.addColorStop(0.35, `rgba(167, 243, 208, ${0.75 * currentIntensity})`);
        beamGrad.addColorStop(0.7, `rgba(42, 177, 130, ${0.3 * currentIntensity})`);
        beamGrad.addColorStop(1, 'rgba(42, 177, 130, 0)');
        ctx.strokeStyle = beamGrad;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 6 * s.glow;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    const frame = now => {
      raf = 0;
      if (!visible) return;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const target = aim(s);
      const spinning = s.autoAnimate && !reduce;
      const steering = !!target && target.near > 0;
      if (!state.ready) {
        state.spot = restSpot(s);
        state.level = s.autoAnimate ? 1 : s.idleIntensity;
        state.ready = true;
      }
      let diff = 0;
      if (spinning && !steering) state.spot = wrap(state.spot + (s.speed / TAU) * dt);
      else {
        diff = (steering ? target.spot : restSpot(s)) - state.spot;
        diff -= Math.round(diff);
        state.spot = wrap(state.spot + diff * (1 - Math.exp(-dt * 8)));
      }
      const level = s.autoAnimate ? 1 : s.idleIntensity + (1 - s.idleIntensity) * (target ? target.near : 0);
      state.level += (level - state.level) * (1 - Math.exp(-dt * 7));
      state.press *= Math.exp(-dt * 5);
      draw(s);
      const settling = Math.abs(diff) > 0.0002 || Math.abs(level - state.level) > 0.001 || state.press > 0.002;
      if (settling || (spinning && !steering)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const measure = entry => {
      const box = entry?.borderBoxSize?.[0];
      view.width = Math.max(1, box ? box.inlineSize : button.offsetWidth);
      view.height = Math.max(1, box ? box.blockSize : button.offsetHeight);
      view.ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round((view.width + PAD * 2) * view.ratio));
      canvas.height = Math.max(1, Math.round((view.height + PAD * 2) * view.ratio));
      if (state.ready) draw(settingsRef.current);
      wake();
    };

    const onPointerMove = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.known = true;
      wake();
    };

    const onPointerDown = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.known = true;
      if (!settingsRef.current.disabled) state.press = 1;
      wake();
    };

    const onPointerEnd = event => {
      if (event.pointerType === 'mouse') return;
      pointer.known = false;
      wake();
    };

    const onPointerLeave = () => {
      pointer.known = false;
      wake();
    };

    const resizeObserver = new ResizeObserver(entries => measure(entries[entries.length - 1]));
    resizeObserver.observe(button);
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) {
        last = 0;
        wake();
      }
    });
    intersection.observe(button);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerEnd, { passive: true });
    window.addEventListener('pointercancel', onPointerEnd, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    button.addEventListener('pointerdown', onPointerDown);
    measure();
    wakeRef.current = wake;

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      button.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  });

  return (
    <Tag
      ref={buttonRef}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={style}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute z-[5]"
        style={{
          top: -PAD,
          left: -PAD,
          right: -PAD,
          bottom: -PAD,
          width: `calc(100% + ${PAD * 2}px)`,
          height: `calc(100% + ${PAD * 2}px)`
        }}
        aria-hidden="true"
      />
      {children}
    </Tag>
  );
};

export default SpecularButton;
