"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Holographic Earth Sphere with Glowing Connection Nodes
 */
function HolographicGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Mouse tilt effect
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
      // Gentle floating animation
      globeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.05;
      wireframeRef.current.rotation.x += delta * 0.02;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.04;
    }
  });

  // Generate random glowing particle points around globe
  const particlesCount = 280;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const radius = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <group ref={globeRef} position={[1.4, 0, -0.5]} scale={1.1}>
      {/* Outer Holographic Glow Sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 36, 36]} />
        <meshBasicMaterial
          color="#0F52FF"
          wireframe={true}
          transparent={true}
          opacity={0.12}
        />
      </mesh>

      {/* Inner Glowing Wireframe Sphere */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial
          color="#60A5FA"
          wireframe={true}
          transparent={true}
          opacity={0.22}
        />
      </mesh>

      {/* Core Solid Blue Glow */}
      <mesh>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshBasicMaterial
          color="#2563EB"
          transparent={true}
          opacity={0.05}
        />
      </mesh>

      {/* Ambient Floating Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#93C5FD"
          transparent={true}
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>

      {/* Floating City Target Nodes (Chicago HQ & Global Hubs) */}
      <mesh position={[0.8, 0.9, 1.2]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
      <mesh position={[-1.1, 0.4, 1.0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#3B82F6" />
      </mesh>
      <mesh position={[0.2, -0.8, 1.3]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>
    </group>
  );
}

/**
 * 3D Canvas Background Component with fallback for mobile devices
 */
export function Hero3DBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Glowing Soft Background Gradient Mesh */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/12 blur-[130px] pointer-events-none" />

      {/* Interactive Three.js 3D Holographic Globe Canvas */}
      <div className="absolute inset-0 opacity-80 sm:opacity-100">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <HolographicGlobe />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Hero3DBackground;
