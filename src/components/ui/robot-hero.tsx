"use client";

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { PiShoppingBagBold } from "react-icons/pi";

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  override getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}

const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({
  children,
  scale = 1,
}: {
  children: React.ReactNode;
  scale?: number;
}) {
  const { viewport } = useThree();
  const s = Math.min(1.1, viewport.width / 3.5) * scale;
  return <group scale={s}>{children}</group>;
}

function GlassCapsule({
  color,
  power = 2.5,
  intensity = 0.6,
}: {
  color: string;
  power?: number;
  intensity?: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      power: { value: power },
      intensity: { value: intensity },
    }),
    [],
  );

  useFrame(() => {
    if (materialRef.current?.uniforms) {
      const u = materialRef.current.uniforms;
      if (u["color"]?.value) {
        (u["color"].value as THREE.Color).set(color);
      }
      if (u["power"]) {
        u["power"].value = power;
      }
      if (u["intensity"]) {
        u["intensity"].value = intensity;
      }
    }
  });

  return (
    <mesh frustumCulled={false}>
      <sphereGeometry args={[0.285, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

const earBaseMat = new THREE.MeshStandardMaterial({
  color: "#f0f0f0",
  roughness: 0.5,
});
const earRingMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.3,
});
const earCenterMat = new THREE.MeshStandardMaterial({
  color: "#cccccc",
  roughness: 0.8,
});
const antennaBaseMat = new THREE.MeshStandardMaterial({
  color: "#999999",
  roughness: 0.4,
  metalness: 0.5,
});
const antennaStickMat = new THREE.MeshStandardMaterial({
  color: "#d0d0d0",
  roughness: 0.4,
  metalness: 0.2,
});
const antennaTipMat = new THREE.MeshStandardMaterial({
  color: "#ff3366",
  roughness: 0.2,
  emissive: "#ff3366",
  emissiveIntensity: 0.8,
  toneMapped: false,
});

function RobotEar({
  position,
  scale = 1,
  isLeft = false,
}: {
  position: [number, number, number];
  scale?: number;
  isLeft?: boolean;
}) {
  const dir = isLeft ? -1 : 1;

  return (
    <group position={position} scale={scale}>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earBaseMat}
      >
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earRingMat}
      >
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earCenterMat}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh
          position={[0, 0.01, 0]}
          castShadow
          receiveShadow
          material={antennaBaseMat}
        >
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh
          position={[0, 0.06, 0]}
          castShadow
          receiveShadow
          material={antennaStickMat}
        >
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh
          position={[0, 0.11, 0]}
          castShadow
          receiveShadow
          material={antennaTipMat}
        >
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

const eyeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(3, 3, 3),
  toneMapped: false,
  transparent: true,
});
const heartMat = new THREE.MeshBasicMaterial({
  color: "#ff3366",
  toneMapped: false,
});

function RobotEye({
  position,
  rotation,
  scale = 1,
  blinkDuration = 0.15,
  blinkCycle = 3.0,
  isLovedRef,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  blinkDuration?: number;
  blinkCycle?: number;
  isLovedRef: React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const normalEyesRef = useRef<THREE.Group>(null);
  const heartEyeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current)
      return;

    const isHeart = isLovedRef.current;

    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;

    let targetScaleY = 1;

    if (cycle < blinkDuration && !isHeart) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);
      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025;
    const h = 0.035;
    const r = 0.02;
    const g = 0.005;

    const tPath = new THREE.CurvePath<THREE.Vector3>();
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w, g, 0),
        new THREE.Vector3(-w, h - r, 0),
      ),
    );
    tPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-w, h - r, 0),
        new THREE.Vector3(-w, h, 0),
        new THREE.Vector3(-w + r, h, 0),
      ),
    );
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w + r, h, 0),
        new THREE.Vector3(w - r, h, 0),
      ),
    );
    tPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(w - r, h, 0),
        new THREE.Vector3(w, h, 0),
        new THREE.Vector3(w, h - r, 0),
      ),
    );
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(w, h - r, 0),
        new THREE.Vector3(w, g, 0),
      ),
    );

    const bPath = new THREE.CurvePath<THREE.Vector3>();
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w, -g, 0),
        new THREE.Vector3(-w, -(h - r), 0),
      ),
    );
    bPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-w, -(h - r), 0),
        new THREE.Vector3(-w, -h, 0),
        new THREE.Vector3(-w + r, -h, 0),
      ),
    );
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w + r, -h, 0),
        new THREE.Vector3(w - r, -h, 0),
      ),
    );
    bPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(w - r, -h, 0),
        new THREE.Vector3(w, -h, 0),
        new THREE.Vector3(w, -(h - r), 0),
      ),
    );
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(w, -(h - r), 0),
        new THREE.Vector3(w, -g, 0),
      ),
    );

    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>

      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 20, 0.0035, 8, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

export interface NeckParams {
  baseR: number;
  baseH: number;
  midR: number;
  midH: number;
  lipBottomR: number;
  lipBottomH: number;
  lipTopR: number;
  lipTopH: number;
  innerR: number;
  innerDropH: number;
}

export interface BodyParams {
  bodyBevelR: number;
  bodyBevelY: number;
  bodyBevelT: number;
}

const DEFAULT_NECK_PARAMS: NeckParams = {
  baseR: 0.25,
  baseH: -0.01,
  midR: 0.23,
  midH: 0.02,
  lipBottomR: 0.27,
  lipBottomH: 0.025,
  lipTopR: 0.28,
  lipTopH: 0.05,
  innerR: 0.24,
  innerDropH: 0.03,
};

const DEFAULT_BODY_PARAMS: BodyParams = {
  bodyBevelR: 0.21,
  bodyBevelY: 0.38,
  bodyBevelT: 0.015,
};

function RobotPrototype({
  neckParams,
  bodyParams,
  color = "#c4c4c4",
  pantallaColor = "#00ffc6",
  pantallaBrillo = 1.2,
  blinkCycle = 3.0,
  metalness = 0.0,
  isLovedRef,
  triggerHeartReaction,
}: {
  neckParams?: Partial<NeckParams>;
  bodyParams?: Partial<BodyParams>;
  color?: string;
  pantallaColor?: string;
  pantallaBrillo?: number;
  blinkCycle?: number;
  metalness?: number;
  isLovedRef: React.MutableRefObject<boolean>;
  triggerHeartReaction: () => void;
}) {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const neck = useMemo(() => ({ ...DEFAULT_NECK_PARAMS, ...neckParams }), [neckParams]);
  const body = useMemo(() => ({ ...DEFAULT_BODY_PARAMS, ...bodyParams }), [bodyParams]);

  const design = {
    pantallaColor: pantallaColor,
    pantallaGrosor: 3.8,
    pantallaBrillo: pantallaBrillo,
    separacionOjos: 0.07,
    tamañoOrejas: 1.3,
    escalaOjos: 1.1,
    parpadeoFrecuencia: blinkCycle,
    parpadeoDuracion: 0.45,
    colorChasis: color,
    alturaCabeza: 0.6,
  };

  const config = {
    moveSpeed: 0.4,
    bodyRotSpeed: 10.0,
    headRotSpeed: 18.0,
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;

    const dt = Math.min(delta, 0.1);

    const rawTx = state.pointer.x !== 0 ? state.pointer.x : mousePos.current.x;
    const rawTy = state.pointer.y !== 0 ? state.pointer.y : mousePos.current.y;

    const tx = Math.max(-1, Math.min(1, rawTx));
    const ty = Math.max(-1, Math.min(1, rawTy));

    // Bounded subtle horizontal position shift (never leaves frame)
    const targetPosX = tx * 0.2;
    bodyRef.current.position.x = THREE.MathUtils.lerp(
      bodyRef.current.position.x,
      targetPosX,
      config.moveSpeed * dt * 3.0,
    );

    const relativeX = tx - bodyRef.current.position.x;

    const bodyTargetRotY = -relativeX * 0.3;
    const bodyTargetRotX = -ty * 0.12;

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(
      bodyRef.current.rotation.y,
      bodyTargetRotY,
      config.bodyRotSpeed * dt,
    );
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(
      bodyRef.current.rotation.x,
      bodyTargetRotX,
      config.bodyRotSpeed * dt,
    );

    // Natural head tracking (max turn 30 deg)
    const headTargetRotY = Math.max(-0.55, Math.min(0.55, relativeX * 0.8));
    const headTargetRotX = Math.max(-0.3, Math.min(0.3, -ty * 0.45));

    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      headTargetRotY,
      config.headRotSpeed * dt,
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      headTargetRotX,
      config.headRotSpeed * dt,
    );
  });

  const neckProfile = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(neck.innerR, neck.baseH));
    points.push(new THREE.Vector2(neck.baseR, neck.baseH));
    points.push(new THREE.Vector2(neck.midR, neck.midH));
    points.push(new THREE.Vector2(neck.lipBottomR, neck.lipBottomH));
    points.push(new THREE.Vector2(neck.lipTopR, neck.lipTopH));
    points.push(new THREE.Vector2(neck.innerR, neck.lipTopH));
    points.push(new THREE.Vector2(neck.innerR, neck.lipTopH - neck.innerDropH));
    return points;
  }, [neck]);

  const headMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#111111",
      roughness: 0.9,
      metalness: 0.0,
    });
  }, []);

  const bodyMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: design.colorChasis,
      roughness: 0.5,
      metalness: metalness,
    });
  }, [design.colorChasis, metalness]);

  return (
    <group
      ref={bodyRef}
      position={[0, -0.3, 0]}
      frustumCulled={false}
      onPointerDown={(e) => {
        e.stopPropagation();
        triggerHeartReaction();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh castShadow receiveShadow material={bodyMat} frustumCulled={false}>
        <sphereGeometry
          args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]}
        />
      </mesh>

      {body.bodyBevelT > 0 && (
        <mesh
          position={[0, body.bodyBevelY, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
          material={bodyMat}
          frustumCulled={false}
        >
          <torusGeometry
            args={[body.bodyBevelR, body.bodyBevelT, 32, 64]}
          />
        </mesh>
      )}

      <mesh position={[0, 0.38, 0]} receiveShadow castShadow material={bodyMat} frustumCulled={false}>
        <latheGeometry args={[neckProfile, 64]} />
      </mesh>

      <group ref={headRef} position={[0, design.alturaCabeza, 0]} frustumCulled={false}>
        <mesh material={headMat} castShadow receiveShadow frustumCulled={false}>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <GlassCapsule
          color={isLovedRef.current ? "#ff3366" : design.pantallaColor}
          intensity={isLovedRef.current ? 2.5 : design.pantallaBrillo}
        />

        <group position={[0, -0.02, 0.29]}>
          <RobotEye
            position={[-design.separacionOjos, 0, 0]}
            rotation={[0, -0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
          <RobotEye
            position={[design.separacionOjos, 0, 0]}
            rotation={[0, 0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
        </group>

        <RobotEar
          position={[-0.29, 0, 0]}
          isLeft={true}
          scale={design.tamañoOrejas}
        />
        <RobotEar
          position={[0.29, 0, 0]}
          isLeft={false}
          scale={design.tamañoOrejas}
        />
      </group>
    </group>
  );
}

export interface NavItem {
  label: string;
  href: string;
  target?: string;
}

export interface RobotHeroProps {
  backgroundText?: string;
  navItemsLeft?: NavItem[];
  contactText?: string;
  contactHref?: string;
  contactTarget?: string | undefined;
  ctaText?: string;
  onCtaClick?: (() => void) | undefined;
  color?: string;
  scale?: number;
  pantallaColor?: string;
  pantallaBrillo?: number;
  blinkCycle?: number;
  metalness?: number;
  hideNavbar?: boolean;
}

function AntennaNavbar({
  leftItems,
  contactText,
  contactHref,
  contactTarget,
  ctaText,
  onCtaClick,
}: {
  leftItems: NavItem[];
  contactText: string;
  contactHref: string;
  contactTarget?: string | undefined;
  ctaText: string;
  onCtaClick?: (() => void) | undefined;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const lineOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  return (
    <nav className="sticky top-0 z-50 w-full pt-8 px-8 pointer-events-none">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col relative pointer-events-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between relative gap-4 lg:gap-0">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 sm:gap-3 z-20">
            {leftItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                rel={
                  item.target === "_blank" ? "noopener noreferrer" : undefined
                }
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-7 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-bold transition-all overflow-hidden shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
              >
                {item.label}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navbar-indicator-left"
                    className="absolute inset-0 border-b-[3px] border-black"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-auto cursor-pointer group z-10">
            <div className="relative flex items-center justify-center h-12 w-16">
              <div className="absolute left-2 w-1.5 h-4 bg-zinc-300 rounded-l-md transition-transform duration-300 group-hover:-translate-x-1" />
              <div className="absolute right-2 w-1.5 h-4 bg-zinc-300 rounded-r-md transition-transform duration-300 group-hover:translate-x-1" />

              <div className="z-10 w-10 h-10 bg-white/10 border-2 border-white/20 backdrop-blur-md rounded-[12px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_4px_25px_rgba(255,255,255,0.15)]">
                <div className="w-[70%] h-[60%] bg-[#0a0a0a] rounded-lg flex items-center justify-center gap-1.5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                  <div className="w-1.5 h-3 bg-[#00ffc6] rounded-[2px] shadow-[0_0_8px_#00ffc6] transition-transform duration-200 group-hover:scale-y-[0.2]" />
                  <div className="w-1.5 h-3 bg-[#00ffc6] rounded-[2px] shadow-[0_0_8px_#00ffc6] transition-transform duration-200 group-hover:scale-y-[0.2]" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2 sm:gap-3 w-full lg:w-auto mt-4 lg:mt-0 z-20">
            <a
              href={contactHref}
              target={contactTarget}
              rel={
                contactTarget === "_blank" ? "noopener noreferrer" : undefined
              }
              className="px-5 sm:px-7 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-bold transition-all shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
            >
              {contactText}
            </a>
            <button
              onClick={onCtaClick}
              className="px-5 sm:px-7 py-2.5 rounded-full bg-[#00ffc6] text-black text-xs sm:text-sm font-black hover:bg-[#00e5b2] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,198,0.4)]"
            >
              {ctaText}
              <PiShoppingBagBold size={18} />
            </button>
          </div>
        </div>

        <motion.div
          style={{ opacity: lineOpacity }}
          className="w-full mt-6 border-b-2 border-dotted border-white/30"
        />
      </div>
    </nav>
  );
}

export function RobotHero({
  backgroundText = "UITHEFACTORY",
  navItemsLeft = [
    { label: "Product", href: "#" },
    { label: "About", href: "#" },
    { label: "Specs", href: "#" },
    { label: "Reviews", href: "#" },
  ],
  contactText = "Contact",
  contactHref = "#",
  contactTarget,
  ctaText = "Buy Now",
  onCtaClick,
  color = "#cbd5e1",
  scale = 1,
  pantallaColor = "#0F52FF",
  pantallaBrillo = 1.4,
  blinkCycle = 3.0,
  metalness = 0.2,
  hideNavbar = false,
}: RobotHeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const isLovedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const triggerHeartReaction = () => {
    isLovedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
    }, 2800);
  };

  return (
    <section
      ref={containerRef}
      onClick={triggerHeartReaction}
      className="relative w-full h-[520px] sm:h-[620px] overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl cursor-pointer group select-none bg-gradient-to-b from-slate-50 via-white to-slate-100/90"
    >
      {/* Background Text Positioned TOP ABOVE THE ROBOT (Matching Image 1) */}
      <div
        className="absolute inset-x-0 top-0 pt-8 sm:pt-12 flex items-start justify-center pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="flex whitespace-nowrap font-black font-sans tracking-tighter text-slate-900/10 text-[clamp(4rem,14vw,10rem)] leading-none uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45,
          }}
        >
          <span className="pr-12">
            AGENTS • AI WEB APPS • ENTERPRISE SAAS • AUTOMATION •
          </span>
          <span className="pr-12">
            AGENTS • AI WEB APPS • ENTERPRISE SAAS • AUTOMATION •
          </span>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-auto">
        {mounted && (
          <Canvas shadows camera={{ position: [0, 0.2, 5.5], fov: 40 }}>
          <ambientLight intensity={1.2} color="#ffffff" />
          <directionalLight position={[5, 6, 4]} intensity={1.6} color="#ffffff" castShadow />
          <directionalLight position={[-5, 4, -3]} intensity={0.8} color="#93c5fd" />
          <pointLight position={[0, -2, 4]} intensity={0.6} color="#38bdf8" />

          <Suspense fallback={null}>
            <ResponsiveGroup scale={scale}>
              <ContactShadows
                position={[0, -0.79, 0]}
                opacity={0.7}
                scale={15}
                resolution={1024}
                blur={1.5}
                far={2.5}
                color="#0f172a"
              />
              <RobotPrototype
                neckParams={{
                  baseR: 0.215,
                  baseH: -0.05,
                  midR: 0.28,
                  midH: 0.02,
                  lipBottomR: 0.295,
                  lipBottomH: 0.045,
                  lipTopR: 0.27,
                  lipTopH: 0.055,
                  innerR: 0.1,
                  innerDropH: 0.0,
                }}
                bodyParams={{
                  bodyBevelR: 0.235,
                  bodyBevelY: 0.34,
                  bodyBevelT: 0.025,
                }}
                color={color}
                pantallaColor={pantallaColor}
                pantallaBrillo={pantallaBrillo}
                blinkCycle={blinkCycle}
                metalness={metalness}
                isLovedRef={isLovedRef}
                triggerHeartReaction={triggerHeartReaction}
              />
            </ResponsiveGroup>
          </Suspense>
        </Canvas>
        )}
      </div>

      {!hideNavbar && (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col">
          <AntennaNavbar
            leftItems={navItemsLeft}
            contactText={contactText}
            contactHref={contactHref}
            contactTarget={contactTarget}
            ctaText={ctaText}
            onCtaClick={onCtaClick}
          />
        </div>
      )}
    </section>
  );
}

export default RobotHero;
