import React, { useEffect, useRef, useState } from 'react';

// Verified Geographic Coordinates
export const GLOBE_LOCATIONS = [
  {
    id: 'india',
    name: 'India: Headquarters',
    shortName: 'INDIA (HQ)',
    country: 'India',
    city: 'Chennai',
    lat: 13.0401,
    lng: 80.2351,
    isHQ: true,
  },
  {
    id: 'usa',
    name: 'United States',
    shortName: 'UNITED STATES',
    country: 'United States',
    lat: 38.0,
    lng: -97.0,
    isHQ: false,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    shortName: 'SINGAPORE',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    isHQ: false,
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    shortName: 'UNITED KINGDOM',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5074,
    lng: -0.1278,
    isHQ: false,
  },
];

export default function RealisticGlobe({
  activeLocationIndex = 0,
  globeOpacity = 1,
  className = '',
  style = {},
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    activeLocationIndex,
    targetRotY: 0,
    targetRotX: 0,
    currentRotY: 0,
    currentRotX: 0,
    mouseX: 0,
    mouseY: 0,
    mouseTiltX: 0,
    mouseTiltY: 0,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Keep stateRef in sync with props
  useEffect(() => {
    stateRef.current.activeLocationIndex = activeLocationIndex;
    if (activeLocationIndex >= 0 && activeLocationIndex < GLOBE_LOCATIONS.length) {
      const loc = GLOBE_LOCATIONS[activeLocationIndex];
      stateRef.current.targetRotY = loc.rotY;
      stateRef.current.targetRotX = loc.rotX;
    }
  }, [activeLocationIndex]);

  useEffect(() => {
    let isMounted = true;
    let animId = null;

    async function init() {
      // 1. Ensure THREE is available
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
            const cdn = document.createElement('script');
            cdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
            cdn.setAttribute('data-vanta-three', 'true');
            cdn.async = true;
            cdn.onload = () => resolve();
            cdn.onerror = reject;
            document.head.appendChild(cdn);
          };
          document.head.appendChild(script);
        });
      }

      if (!isMounted || !mountRef.current) return;
      const THREE = window.THREE;

      const container = mountRef.current;
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;
      const radius = 80; // Properly sized so continents, oceans & entire sphere are prominent and unclipped

      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2000);
      camera.position.set(0, 0, 310);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);

      // Lighting: Bright, natural front key light + ambient so continents and details are clearly visible
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
      keyLight.position.set(50, 70, 260);
      scene.add(keyLight);

      const cameraFillLight = new THREE.DirectionalLight(0xa7f3d0, 0.5);
      cameraFillLight.position.set(-80, 20, 220);
      scene.add(cameraFillLight);

      const rimLight = new THREE.DirectionalLight(0x2AB182, 0.7);
      rimLight.position.set(-140, -40, 100);
      scene.add(rimLight);

      const backLight = new THREE.DirectionalLight(0x10b981, 0.4);
      backLight.position.set(0, -180, -100);
      scene.add(backLight);

      // Outer Group for Mouse Parallax
      const outerGroup = new THREE.Group();
      scene.add(outerGroup);

      // Globe Group inside Outer Group
      const globeGroup = new THREE.Group();
      outerGroup.add(globeGroup);

      // Precalculate Target Quaternions for Each Location (q = qX * qY)
      const targetQuats = GLOBE_LOCATIONS.map((loc) => {
        const rotY = -(loc.lng + 90) * (Math.PI / 180);
        const rotX = (loc.lat - 15) * (Math.PI / 180); // Centers pin at upper-front sweet spot

        const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
        const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotX);
        return qX.clone().multiply(qY);
      });

      // Set initial orientation (India)
      if (targetQuats.length > 0) {
        globeGroup.quaternion.copy(targetQuats[0]);
      }

      // Texture Loader
      const textureLoader = new THREE.TextureLoader();

      // Earth base texture + bump map
      const earthTexture = textureLoader.load('/assets/earth-dark.jpg', () => {
        setIsLoaded(true);
      });
      const topoTexture = textureLoader.load('/assets/earth-topology.png');
      const nightTexture = textureLoader.load('/assets/earth-night.jpg');

      // Globe Sphere - High contrast, visible continents & deep oceans
      const sphereGeom = new THREE.SphereGeometry(radius, 64, 64);
      const sphereMat = new THREE.MeshStandardMaterial({
        map: earthTexture,
        bumpMap: topoTexture,
        bumpScale: 2.2,
        roughness: 0.52,
        metalness: 0.08,
        color: 0xffffff, // Full white so texture details, continents & oceans are crisp and distinct
        emissive: 0x071e14, // Subtle deep emerald night glow
        emissiveMap: nightTexture,
        emissiveIntensity: 0.40,
      });
      const globeMesh = new THREE.Mesh(sphereGeom, sphereMat);
      globeGroup.add(globeMesh);

      // Glowing Atmosphere Shell - Soft, subtle Invictus green rim (non-intrusive)
      const atmoGeom = new THREE.SphereGeometry(radius * 1.016, 48, 48);
      const atmoMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            // Soft, delicate edge rim without neon flare
            float intensity = pow(0.48 - dot(vNormal, vec3(0, 0, 1.0)), 3.5);
            gl_FragColor = vec4(0.165, 0.694, 0.510, 1.0) * intensity * 0.55;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      });
      const atmoMesh = new THREE.Mesh(atmoGeom, atmoMat);
      globeGroup.add(atmoMesh);

      // Lat/Lng helper
      function latLngToVec3(lat, lng, r) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const x = -(r * Math.sin(phi) * Math.cos(theta));
        const z = r * Math.sin(phi) * Math.sin(theta);
        const y = r * Math.cos(phi);
        return new THREE.Vector3(x, y, z);
      }

      // 3D Canvas Label Sprite Generator - Comfortable Medium Size, Crisp & Highly Readable
      function createLabelSprite(text, isHQ) {
        const canvas = document.createElement('canvas');
        canvas.width = 360;
        canvas.height = 90;
        const ctx = canvas.getContext('2d');

        // Dark pill background with high contrast against the globe
        ctx.fillStyle = isHQ ? 'rgba(5, 18, 12, 0.96)' : 'rgba(4, 14, 9, 0.94)';
        ctx.strokeStyle = '#2AB182';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(4, 4, 352, 82, 24);
        } else {
          ctx.rect(4, 4, 352, 82);
        }
        ctx.fill();
        ctx.stroke();

        // Vibrant green indicator dot
        ctx.fillStyle = '#2AB182';
        ctx.beginPath();
        ctx.arc(32, 45, 5.5, 0, Math.PI * 2);
        ctx.fill();

        // Label text - comfortable medium size, bold, crisp white
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 50, 46);

        const tex = new THREE.CanvasTexture(canvas);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(30, 7.5, 1);
        return sprite;
      }

      // Build 3D Pins & Pulse Rings - Vibrant, sharp & clearly visible
      const pinMeshes = [];
      const pulseRings = [];

      GLOBE_LOCATIONS.forEach((loc, i) => {
        const markerGroup = new THREE.Group();
        const surfacePos = latLngToVec3(loc.lat, loc.lng, radius);
        const normal = surfacePos.clone().normalize();

        // Pin Stem - Crisp emerald needle
        const stemHeight = loc.isHQ ? 6.5 : 5.0;
        const stemGeom = new THREE.CylinderGeometry(0.35, 0.35, stemHeight, 8);
        const stemMat = new THREE.MeshBasicMaterial({ color: 0x2AB182 });
        const stem = new THREE.Mesh(stemGeom, stemMat);
        stem.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(stemHeight / 2)));
        stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        markerGroup.add(stem);

        // Glowing Beacon Head - Pure white highlight
        const headRadius = loc.isHQ ? 2.2 : 1.8;
        const headGeom = new THREE.SphereGeometry(headRadius, 16, 16);
        const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const head = new THREE.Mesh(headGeom, headMat);
        head.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(stemHeight)));
        markerGroup.add(head);

        // Subtle Outer Beacon Glow Ring
        const ringGeom = new THREE.RingGeometry(headRadius * 1.1, headRadius * 1.65, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x2AB182,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        });
        const glowRing = new THREE.Mesh(ringGeom, ringMat);
        glowRing.position.copy(head.position);
        glowRing.lookAt(head.position.clone().add(normal));
        markerGroup.add(glowRing);

        // Surface Pulse Ring
        const rippleGeom = new THREE.RingGeometry(1.2, 2.8, 24);
        const rippleMat = new THREE.MeshBasicMaterial({
          color: 0x2AB182,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.60,
        });
        const ripple = new THREE.Mesh(rippleGeom, rippleMat);
        ripple.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.2)));
        ripple.lookAt(surfacePos.clone().add(normal));
        markerGroup.add(ripple);

        // Floating Medium-Sized 3D Label Sprite directly above pin
        const labelSprite = createLabelSprite(loc.shortName || loc.name, loc.isHQ);
        labelSprite.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(stemHeight + 5.6)));
        markerGroup.add(labelSprite);

        pulseRings.push({
          mesh: ripple,
          phase: i * 0.25,
        });

        globeGroup.add(markerGroup);

        pinMeshes.push({
          group: markerGroup,
          head,
          stem,
          glowRing,
          labelSprite,
          loc,
        });
      });

      // Mouse Parallax listener
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        stateRef.current.mouseTiltX = Math.max(-0.25, Math.min(0.25, dy * 0.2));
        stateRef.current.mouseTiltY = Math.max(-0.25, Math.min(0.25, dx * 0.2));
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Resize observer
      const resizeObserver = new ResizeObserver(() => {
        if (!container) return;
        const newW = container.clientWidth || 600;
        const newH = container.clientHeight || 600;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      });
      resizeObserver.observe(container);

      // Render Loop
      let clock = 0;
      const animate = () => {
        clock += 0.016;

        const state = stateRef.current;

        // Smooth Quaternion Slerp to Active Location or Idle Rotation
        if (state.activeLocationIndex < 0) {
          // Free idle rotation around Y
          const idleQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.003);
          globeGroup.quaternion.multiply(idleQ);
        } else {
          const tQuat = targetQuats[state.activeLocationIndex];
          if (tQuat) {
            globeGroup.quaternion.slerp(tQuat, 0.16);
          }
        }

        // Apply interactive mouse parallax tilt to outer group
        outerGroup.rotation.y = state.mouseTiltY;
        outerGroup.rotation.x = state.mouseTiltX;

        // Update Pins & Pulse Animations
        const activeIdx = state.activeLocationIndex;
        const pinWorldPos = new THREE.Vector3();

        pinMeshes.forEach((pin, idx) => {
          const isActive = idx === activeIdx;

          // Backface check: Hide pin and label if on the far side of the Earth
          pin.head.getWorldPosition(pinWorldPos);
          const isFacingFront = pinWorldPos.z > 5;

          pin.group.visible = isFacingFront;

          // Scale and color depending on active status
          const targetScale = isActive ? 1.2 : 0.85;
          pin.group.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.15
          );

          if (isActive) {
            pin.head.material.color.setHex(0xffffff);
            pin.glowRing.material.opacity = 0.85 + Math.sin(clock * 6) * 0.15;
            pin.stem.material.color.setHex(0x2AB182);
            if (pin.labelSprite) {
              pin.labelSprite.visible = isFacingFront;
              pin.labelSprite.material.opacity = 1.0;
              pin.labelSprite.scale.lerp(new THREE.Vector3(30, 7.5, 1), 0.15);
            }
          } else {
            pin.head.material.color.setHex(0x2AB182);
            pin.glowRing.material.opacity = 0.25;
            pin.stem.material.color.setHex(0x19664b);
            if (pin.labelSprite) {
              // Hide inactive labels to prevent visual clutter and overlapping on the globe
              pin.labelSprite.visible = false;
            }
          }
        });

        // Pulse radar rings expanding subtly on surface
        pulseRings.forEach((p, idx) => {
          const isActive = idx === activeIdx;
          if (isActive) {
            const cycle = (clock * 1.5 + p.phase) % 1;
            const s = 1 + cycle * 0.9;
            p.mesh.scale.set(s, s, s);
            p.mesh.material.opacity = (1 - cycle) * 0.45;
            p.mesh.visible = true;
          } else {
            p.mesh.visible = false;
          }
        });

        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        isMounted = false;
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        resizeObserver.disconnect();
        if (renderer && renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }

    init();

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      style={{
        opacity: globeOpacity,
        transition: 'opacity 0.4s ease-out',
        ...style,
      }}
    >
      <div
        ref={mountRef}
        className="w-full h-full max-w-[600px] max-h-[600px] aspect-square relative cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
