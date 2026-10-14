import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Persistent, full-page space scene rendered once behind every section.
 * The camera "flies" forward as the page scrolls (scroll progress -> camera
 * depth), passing distant star layers and a few floating wireframe bodies,
 * so the whole page reads as one continuous flight through space instead of
 * separate per-section effects.
 *
 * Scroll progress is tracked in a plain mutable ref (not React state) and
 * read directly inside useFrame, so scrolling never triggers a re-render.
 */

type ScrollRef = { current: number };

function getScrollProgress() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(Math.max(window.scrollY / scrollable, 0), 1);
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
        opacity={0.9}
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

const START_Z = 6;
const END_Z = -60;

function ScrollCameraRig({ scrollRef }: { scrollRef: ScrollRef }) {
  useFrame((state) => {
    const targetZ = START_Z + scrollRef.current * (END_Z - START_Z);
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.06;

    // Gentle pointer parallax layered on top of the scroll dolly
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.25;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, state.camera.position.z - 10);
  });
  return null;
}

function Scene({ scrollRef }: { scrollRef: ScrollRef }) {
  return (
    <>
      <ScrollCameraRig scrollRef={scrollRef} />
      <StarLayer count={500} radius={10} size={0.028} color="#eaf6ff" zSpread={90} driftSpeed={0.004} />
      <StarLayer count={320} radius={8} size={0.045} color="#7ed7ff" zSpread={90} driftSpeed={-0.006} />
      <StarLayer count={120} radius={6} size={0.07} color="#c893ff" zSpread={90} driftSpeed={0.01} />
      <Asteroid z={-16} />
      <RingedBody z={-34} />
      <DestinationPlanet z={-54} />
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
  const scrollRef = useRef(0);

  useEffect(() => {
    if (reducedMotion || !supportsWebGL) return;

    let ticking = false;
    const update = () => {
      scrollRef.current = getScrollProgress();
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion, supportsWebGL]);

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
          <Scene scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
