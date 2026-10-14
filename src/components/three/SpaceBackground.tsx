import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Persistent, full-page space scene rendered once behind every section.
 * The camera "flies" forward as the page scrolls, passing distant star
 * layers and a few floating wireframe bodies, so the whole page reads as
 * one continuous flight through space instead of separate per-section
 * effects.
 *
 * Camera depth is driven by actual section positions (measured with
 * getBoundingClientRect), not a flat scroll fraction, so each waypoint
 * mesh arrives when its matching section is centered in the viewport
 * instead of at an arbitrary point in the page. Section heights shift
 * once async data (projects/blogs/events) loads in, so positions are
 * re-measured on resize, on route change, and via a ResizeObserver on
 * <body> that catches those layout shifts. This is inherently a little
 * fragile against future markup/id changes in the sections below — if a
 * section's id changes, its anchor silently falls back to straight-line
 * interpolation between its neighbors.
 */

type Anchor = { scrollY: number; z: number };

const START_Z = 6;
const END_Z = -64;

// Vignette tuning — tweak these to experiment. Darkens the top and bottom
// edges of the viewport (where nav/footer sit) more than the center, as a
// contrast safety margin for text over the starfield. Edit and save to see
// changes instantly via HMR.
const VIGNETTE_TOP_OPACITY = 0.35; // 0 = invisible, 1 = fully opaque black
const VIGNETTE_BOTTOM_OPACITY = 0.55;
const VIGNETTE_COLOR = '#01000c'; // matches the html background base color

// Waypoint mesh depths, paired with the id of the section they should
// line up with. Keep these ids in sync with the `id` props in
// src/components/sections/*.tsx.
const SECTION_ANCHORS: { id: string; z: number }[] = [
  { id: 'about', z: -14 },
  { id: 'projects', z: -28 },
  { id: 'blogs', z: -40 },
  { id: 'events', z: -48 },
  { id: 'contact', z: -58 },
];

const ASTEROID_Z = -14; // matches 'about'
const RINGED_BODY_Z = -28; // matches 'projects'
const DESTINATION_PLANET_Z = -58; // matches 'contact'

function measureAnchors(): Anchor[] {
  const viewportHeight = window.innerHeight;
  const maxScroll = Math.max(document.documentElement.scrollHeight - viewportHeight, 0);

  const anchors: Anchor[] = [{ scrollY: 0, z: START_Z }];

  for (const { id, z } of SECTION_ANCHORS) {
    const el = document.getElementById(id);
    if (!el) continue; // section not present on this route (e.g. /blog)
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const center = top + rect.height / 2 - viewportHeight / 2;
    anchors.push({ scrollY: Math.min(Math.max(center, 0), maxScroll), z });
  }

  anchors.push({ scrollY: maxScroll, z: END_Z });

  // Anchors must be strictly increasing in scrollY for interpolation to
  // behave; sort and collapse any that land within a pixel of each other
  // (e.g. very short sections, or routes with no matching ids at all).
  anchors.sort((a, b) => a.scrollY - b.scrollY);
  const deduped: Anchor[] = [];
  for (const anchor of anchors) {
    const prev = deduped[deduped.length - 1];
    if (!prev || anchor.scrollY - prev.scrollY > 1) deduped.push(anchor);
  }
  return deduped;
}

function interpolateZ(scrollY: number, anchors: Anchor[]): number {
  if (anchors.length === 0) return START_Z;
  if (scrollY <= anchors[0].scrollY) return anchors[0].z;
  const last = anchors[anchors.length - 1];
  if (scrollY >= last.scrollY) return last.z;

  for (let i = 1; i < anchors.length; i++) {
    if (scrollY <= anchors[i].scrollY) {
      const a = anchors[i - 1];
      const b = anchors[i];
      const t = (scrollY - a.scrollY) / (b.scrollY - a.scrollY);
      return a.z + t * (b.z - a.z);
    }
  }
  return last.z;
}

// --- Star layers -----------------------------------------------------------

type LayerProps = {
  count: number;
  radius: number;
  size: number;
  color: string;
  zSpread: number;
  driftSpeed: number;
};

function StarLayer({ count, radius, size, color, zSpread, driftSpeed }: LayerProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = Math.sin(theta) * r * 0.6;
      // Spread stars along the flight path (negative z = further ahead)
      arr[i * 3 + 2] = (Math.random() - 0.5) * zSpread;
    }
    return arr;
  }, [count, radius, zSpread]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.z = state.clock.elapsedTime * driftSpeed;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

// --- Floating waypoints ------------------------------------------------------

function Asteroid({ z }: { z: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;
  });
  return (
    <mesh ref={ref} position={[-1.6, 0.4, z]}>
      <icosahedronGeometry args={[0.55, 0]} />
      <meshBasicMaterial color="#7ed7ff" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function RingedBody({ z }: { z: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.05;
  });
  return (
    <group ref={groupRef} position={[1.8, -0.3, z]} rotation={[0.5, 0.3, 0]}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#c893ff" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.85, 0.02, 8, 48]} />
        <meshBasicMaterial color="#c893ff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function DestinationPlanet({ z }: { z: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.06;
  });
  return (
    <mesh ref={ref} position={[0, 0.2, z]}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshBasicMaterial color="#50d5ff" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

// --- Scroll-driven camera rig ------------------------------------------------

type TargetZRef = { current: number };

function ScrollCameraRig({ targetZRef }: { targetZRef: TargetZRef }) {
  useFrame((state) => {
    state.camera.position.z += (targetZRef.current - state.camera.position.z) * 0.06;

    // Gentle pointer parallax layered on top of the scroll dolly
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.25;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, state.camera.position.z - 10);
  });
  return null;
}

function Scene({ targetZRef }: { targetZRef: TargetZRef }) {
  return (
    <>
      <ScrollCameraRig targetZRef={targetZRef} />
      <StarLayer count={180} radius={10} size={0.026} color="#eaf6ff" zSpread={90} driftSpeed={0.004} />
      <StarLayer count={90} radius={8} size={0.04} color="#7ed7ff" zSpread={90} driftSpeed={-0.006} />
      <StarLayer count={30} radius={6} size={0.06} color="#c893ff" zSpread={90} driftSpeed={0.01} />
      <Asteroid z={ASTEROID_Z} />
      <RingedBody z={RINGED_BODY_Z} />
      <DestinationPlanet z={DESTINATION_PLANET_Z} />
    </>
  );
}

// --- Fallback handling -----------------------------------------------------

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);
  return reduced;
}

function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

const SpaceBackground = () => {
  const reducedMotion = useReducedMotion();
  const supportsWebGL = useWebGLSupport();
  const { pathname } = useLocation();
  const anchorsRef = useRef<Anchor[]>([{ scrollY: 0, z: START_Z }, { scrollY: 0, z: END_Z }]);
  const targetZRef = useRef(START_Z);

  useEffect(() => {
    if (reducedMotion || !supportsWebGL) return;

    let ticking = false;

    const remeasure = () => {
      anchorsRef.current = measureAnchors();
      targetZRef.current = interpolateZ(window.scrollY, anchorsRef.current);
    };

    const updateScroll = () => {
      targetZRef.current = interpolateZ(window.scrollY, anchorsRef.current);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateScroll);
    };
    const onResize = () => remeasure();

    // Initial measure, then once more shortly after mount/route change to
    // catch async project/blog/event data that lands after first paint.
    remeasure();
    const settleTimer = window.setTimeout(remeasure, 1200);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Catches section height changes from async content without needing
    // to poll (e.g. project/blog/event cards loading in after fetch).
    const resizeObserver = new ResizeObserver(() => remeasure());
    resizeObserver.observe(document.body);

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
    };
  }, [reducedMotion, supportsWebGL, pathname]);

  // Leave only the static CSS nebula gradient (already on <html>) for users
  // who prefer reduced motion or lack WebGL, instead of rendering nothing.
  if (reducedMotion || !supportsWebGL) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, START_Z], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene targetZRef={targetZRef} />
        </Suspense>
      </Canvas>

      {/* Vignette: see VIGNETTE_* constants above to tune. Two independent
          layers (top/bottom) so their opacities can differ. Sits above the
          canvas but is still behind all page content (same pointer-events
          -none wrapper), so it never blocks clicks. */}
      <div
        className="absolute inset-x-0 top-0 h-[28vh]"
        style={{
          background: `linear-gradient(to bottom, ${VIGNETTE_COLOR}, transparent)`,
          opacity: VIGNETTE_TOP_OPACITY,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background: `linear-gradient(to top, ${VIGNETTE_COLOR}, transparent)`,
          opacity: VIGNETTE_BOTTOM_OPACITY,
        }}
      />
    </div>
  );
};

export default SpaceBackground;
