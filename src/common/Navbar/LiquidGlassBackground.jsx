import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

/**
 * LiquidGlassBackground
 * WebGL-powered Liquid Glass effect inspired by https://github.com/dashersw/liquid-glass-js
 * Renders real-time optical refraction, multi-tap blur, subtle ripple distortion,
 * and translucent glass sheen behind navbar content while preserving brand colors.
 */
const vsSource = `
  attribute vec2 a_position;
  attribute vec2 a_texcoord;
  varying vec2 v_texcoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texcoord = a_texcoord;
  }
`;

const fsSource = `
  precision mediump float;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_textureSize;
  uniform float u_scrollY;
  uniform float u_blurRadius;
  uniform float u_borderRadius;
  uniform vec2 u_containerPosition;
  uniform float u_edgeIntensity;
  uniform float u_rimIntensity;
  uniform float u_baseIntensity;
  uniform float u_edgeDistance;
  uniform float u_rimDistance;
  uniform float u_baseDistance;
  uniform float u_cornerBoost;
  uniform float u_rippleEffect;
  uniform float u_tintOpacity;
  uniform vec3 u_tintColor;
  uniform vec3 u_accentColor;
  uniform float u_time;
  varying vec2 v_texcoord;

  // Distance function for rounded rectangle from dashersw/liquid-glass-js
  float roundedRectDistance(vec2 coord, vec2 size, float radius) {
    vec2 center = size * 0.5;
    vec2 pixelCoord = coord * size;
    vec2 toCorner = abs(pixelCoord - center) - (center - radius);
    float outsideCorner = length(max(toCorner, 0.0));
    float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
    return (outsideCorner + insideCorner - radius);
  }

  void main() {
    vec2 coord = v_texcoord;
    float scrollY = u_scrollY;
    vec2 containerSize = u_resolution;
    vec2 textureSize = max(u_textureSize, vec2(1.0, 1.0));

    // Convert container coordinates to page coordinates
    vec2 containerCenter = u_containerPosition + vec2(0.0, scrollY);
    vec2 containerOffset = (coord - 0.5) * containerSize;
    vec2 pagePixel = containerCenter + containerOffset;
    vec2 textureCoord = pagePixel / textureSize;

    // Glass refraction calculations from dashersw/liquid-glass-js
    float distFromEdgeShape = -roundedRectDistance(coord, u_resolution, max(u_borderRadius, 1.0));
    distFromEdgeShape = max(distFromEdgeShape, 0.0);

    vec2 center = vec2(0.5, 0.5);
    vec2 shapeNormal = normalize(coord - center);

    float minDim = max(min(u_resolution.x, u_resolution.y), 1.0);
    float distFromEdge = distFromEdgeShape / minDim;
    float normalizedDistance = distFromEdge * minDim;

    float baseIntensity = 1.0 - exp(-normalizedDistance * u_baseDistance);
    float edgeIntensity = exp(-normalizedDistance * u_edgeDistance);
    float rimIntensity = exp(-normalizedDistance * u_rimDistance);

    float totalIntensity = baseIntensity * u_baseIntensity + edgeIntensity * u_edgeIntensity + rimIntensity * u_rimIntensity;
    vec2 baseRefraction = shapeNormal * totalIntensity;

    // Corner proximity & boost
    float distFromLeft = coord.x;
    float distFromRight = 1.0 - coord.x;
    float distFromTop = coord.y;
    float distFromBottom = 1.0 - coord.y;
    float cornerProximityX = min(distFromLeft, distFromRight);
    float cornerProximityY = min(distFromTop, distFromBottom);
    float cornerDistance = max(cornerProximityX, cornerProximityY);
    float cornerNormalized = cornerDistance * minDim;
    float cornerBoost = exp(-cornerNormalized * 0.3) * u_cornerBoost;
    vec2 cornerRefraction = shapeNormal * cornerBoost;

    // Wave / ripple refraction along perpendicular vector
    vec2 perpendicular = vec2(-shapeNormal.y, shapeNormal.x);
    float ripple = sin(distFromEdge * 28.0 + u_time * 0.6) * u_rippleEffect * rimIntensity;
    vec2 textureRefraction = perpendicular * ripple;

    vec2 totalRefraction = baseRefraction + cornerRefraction + textureRefraction;
    textureCoord += totalRefraction;

    // Multi-tap Gaussian blur sampling from dashersw/liquid-glass-js
    vec4 color = vec4(0.0);
    vec2 texelSize = 1.0 / textureSize;
    float sigma = max(u_blurRadius / 2.0, 1.0);
    vec2 blurStep = texelSize * sigma;
    float totalWeight = 0.0;

    for(float i = -4.0; i <= 4.0; i += 1.0) {
      for(float j = -4.0; j <= 4.0; j += 1.0) {
        float d = length(vec2(i, j));
        if(d > 4.5) continue;
        float weight = exp(-(d * d) / (2.0 * sigma * sigma));
        vec2 offset = vec2(i, j) * blurStep;
        color += texture2D(u_image, textureCoord + offset) * weight;
        totalWeight += weight;
      }
    }
    color /= max(totalWeight, 0.0001);

    // Subtle gradient tinting preserving corporate background
    vec3 topTint = u_tintColor * 1.05;
    vec3 bottomTint = u_tintColor * 0.95;
    vec3 gradientTint = mix(topTint, bottomTint, coord.y);
    vec3 tintedColor = mix(color.rgb, gradientTint, clamp(u_tintOpacity, 0.0, 1.0));

    // Liquid glass light reflections:
    // Top specular bevel highlight
    float topHighlight = exp(-distFromTop * u_resolution.y * 0.35) * 0.25;
    // Bottom border reflection with green brand accent
    float bottomHighlight = exp(-distFromBottom * u_resolution.y * 0.25) * 0.20;
    // Rim reflection
    float rimReflection = pow(rimIntensity, 2.0) * 0.28;

    vec3 specularColor = mix(vec3(1.0, 1.0, 1.0), u_accentColor, 0.35);
    vec3 finalColor = tintedColor + specularColor * (topHighlight + rimReflection) + u_accentColor * bottomHighlight;

    // Output with glass translucency
    float alpha = clamp(0.85 + rimIntensity * 0.12, 0.0, 0.96);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function createProceduralBackdrop(width, height, isDark = true) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(Math.floor(width || 1200), 400);
  canvas.height = Math.max(Math.floor(height || 800), 400);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background tone matching site theme
  ctx.fillStyle = isDark ? '#0E0E0E' : '#F0F4F8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft emerald glowing orbs (matches site BackgroundAnimation)
  const grad1 = ctx.createRadialGradient(160, 120, 10, 160, 120, 260);
  grad1.addColorStop(0, 'rgba(42, 177, 130, 0.35)');
  grad1.addColorStop(1, 'rgba(42, 177, 130, 0)');
  ctx.fillStyle = grad1;
  ctx.beginPath();
  ctx.arc(160, 120, 260, 0, Math.PI * 2);
  ctx.fill();

  const grad2 = ctx.createRadialGradient(canvas.width - 200, 100, 10, canvas.width - 200, 100, 280);
  grad2.addColorStop(0, 'rgba(34, 149, 109, 0.30)');
  grad2.addColorStop(1, 'rgba(34, 149, 109, 0)');
  ctx.fillStyle = grad2;
  ctx.beginPath();
  ctx.arc(canvas.width - 200, 100, 280, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

export default function LiquidGlassBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup WebGL
    let gl = null;
    try {
      gl = canvas.getContext('webgl', {
        preserveDrawingBuffer: true,
        alpha: true,
        premultipliedAlpha: false,
        antialias: true
      });
    } catch {
      gl = null;
    }

    if (!gl) {
      setSupported(false);
      return;
    }

    // Compile Shaders
    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('LiquidGlass shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      setSupported(false);
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('LiquidGlass program link error:', gl.getProgramInfoLog(program));
      setSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering clip space)
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    const aTex = gl.getAttribLocation(program, 'a_texcoord');

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.enableVertexAttribArray(aTex);
    gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTextureSize = gl.getUniformLocation(program, 'u_textureSize');
    const uScrollY = gl.getUniformLocation(program, 'u_scrollY');
    const uBlurRadius = gl.getUniformLocation(program, 'u_blurRadius');
    const uBorderRadius = gl.getUniformLocation(program, 'u_borderRadius');
    const uContainerPosition = gl.getUniformLocation(program, 'u_containerPosition');
    const uEdgeIntensity = gl.getUniformLocation(program, 'u_edgeIntensity');
    const uRimIntensity = gl.getUniformLocation(program, 'u_rimIntensity');
    const uBaseIntensity = gl.getUniformLocation(program, 'u_baseIntensity');
    const uEdgeDistance = gl.getUniformLocation(program, 'u_edgeDistance');
    const uRimDistance = gl.getUniformLocation(program, 'u_rimDistance');
    const uBaseDistance = gl.getUniformLocation(program, 'u_baseDistance');
    const uCornerBoost = gl.getUniformLocation(program, 'u_cornerBoost');
    const uRippleEffect = gl.getUniformLocation(program, 'u_rippleEffect');
    const uTintOpacity = gl.getUniformLocation(program, 'u_tintOpacity');
    const uTintColor = gl.getUniformLocation(program, 'u_tintColor');
    const uAccentColor = gl.getUniformLocation(program, 'u_accentColor');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uImage = gl.getUniformLocation(program, 'u_image');

    // Create & initialize texture
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(uImage, 0);

    // Immediate instant backdrop so glass is immediately visible
    const initialTexture = createProceduralBackdrop(window.innerWidth, window.innerHeight, theme !== 'light');
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, initialTexture);
    gl.uniform2f(uTextureSize, initialTexture.width, initialTexture.height);

    // Color theme values
    const isDark = theme !== 'light';
    const tintRgb = isDark ? [14 / 255, 14 / 255, 14 / 255] : [240 / 255, 244 / 255, 248 / 255];
    const accentRgb = [42 / 255, 177 / 255, 130 / 255]; // #2AB182 brand accent

    // Set uniform defaults using dashersw/liquid-glass-js parameters
    gl.uniform1f(uBlurRadius, 5.0);
    gl.uniform1f(uBorderRadius, 0.0);
    gl.uniform1f(uEdgeIntensity, 0.02);
    gl.uniform1f(uRimIntensity, 0.06);
    gl.uniform1f(uBaseIntensity, 0.015);
    gl.uniform1f(uEdgeDistance, 0.15);
    gl.uniform1f(uRimDistance, 0.8);
    gl.uniform1f(uBaseDistance, 0.1);
    gl.uniform1f(uCornerBoost, 0.02);
    gl.uniform1f(uRippleEffect, prefersReducedMotion ? 0.0 : 0.08);
    gl.uniform1f(uTintOpacity, isDark ? 0.25 : 0.35);
    gl.uniform3f(uTintColor, tintRgb[0], tintRgb[1], tintRgb[2]);
    gl.uniform3f(uAccentColor, accentRgb[0], accentRgb[1], accentRgb[2]);

    let animId = null;
    let startTime = performance.now();

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(Math.floor(rect.width * dpr), 100);
      const height = Math.max(Math.floor(rect.height * dpr), 40);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform2f(uResolution, rect.width, rect.height);
      gl.uniform2f(uContainerPosition, rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    updateSize();

    // Render loop
    const render = (now) => {
      if (!gl) return;
      const elapsed = (now - startTime) / 1000;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      gl.uniform1f(uScrollY, scrollY);
      gl.uniform1f(uTime, prefersReducedMotion ? 0.0 : elapsed);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    // Scroll listener for real-time position updates
    const handleScroll = () => {
      if (prefersReducedMotion) {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        gl.uniform1f(uScrollY, scrollY);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    };

    // Resize listener
    const handleResize = () => {
      updateSize();
      if (prefersReducedMotion) {
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Asynchronously capture real page background with html2canvas (as in dashersw/liquid-glass-js)
    let isCancelled = false;
    const captureTimeout = setTimeout(() => {
      if (isCancelled || typeof window === 'undefined') return;
      import('html2canvas')
        .then((module) => {
          const html2canvas = module.default || module;
          return html2canvas(document.body, {
            scale: 0.5,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: null,
            ignoreElements: (element) => {
              return (
                element.tagName === 'NAV' ||
                element.id === 'mobile-navigation' ||
                element.classList?.contains('liquid-glass-layer')
              );
            }
          });
        })
        .then((snapshot) => {
          if (isCancelled || !gl || !snapshot) return;
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, snapshot);
          gl.uniform2f(uTextureSize, snapshot.width, snapshot.height);
          if (prefersReducedMotion) {
            gl.drawArrays(gl.TRIANGLES, 0, 6);
          }
        })
        .catch(() => {
          // Fallback procedural texture is already running cleanly
        });
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(captureTimeout);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Clean WebGL resources
      try {
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(texBuffer);
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      } catch {
        // cleanup safe
      }
    };
  }, [theme]);

  if (!supported) return null;

  return (
    <div
      aria-hidden="true"
      className="liquid-glass-layer absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.95
        }}
      />
    </div>
  );
}
