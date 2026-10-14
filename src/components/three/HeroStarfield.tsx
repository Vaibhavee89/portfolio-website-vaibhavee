import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated starfield with gentle parallax, rendered inside the Hero section.
 * Three independent star layers move at different speeds relative to the
 * pointer/scroll to create a sense of depth (near stars drift more).
 */

type LayerProps = {
  count: number;
  radius: number;
  size: number;
  color: string;
  parallaxStrength: number;
  driftSpeed: number;
};

function StarLayer({ count, radius, size, color, parallaxStrength, driftSpeed }: LayerProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute roughly within a disc so stars stay near the visible area
      const r = Math.random() * radius;
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = Math.sin(theta) * r * 0.6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { pointer, clock } = state;

    // Pointer-driven parallax: closer layers (higher parallaxStrength) move more
    const targetX = pointer.x * parallaxStrength;
    const targetY = pointer.y * parallaxStrength * 0.6;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.04;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.04;

    // Slow continuous drift so the field never looks frozen
    pointsRef.current.rotation.z = clock.elapsedTime * driftSpeed;
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

function Scene() {
  return (
    <>
      <StarLayer count={420} radius={9} size={0.028} color="#eaf6ff" parallaxStrength={0.25} driftSpeed={0.004} />
      <StarLayer count={260} radius={7} size={0.045} color="#7ed7ff" parallaxStrength={0.5} driftSpeed={-0.007} />
      <StarLayer count={90} radius={5} size={0.07} color="#c893ff" parallaxStrength={0.85} driftSpeed={0.012} />
    </>
  );
}

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

const HeroStarfield = () => {
  const reducedMotion = useReducedMotion();
  const [supportsWebGL, setSupportsWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupportsWebGL(!!gl);
    } catch {
      setSupportsWebGL(false);
    }
  }, []);

  // Fall back to the existing CSS star layer for reduced-motion preference
  // or when WebGL isn't available, instead of rendering nothing.
  if (reducedMotion || !supportsWebGL) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroStarfield;
