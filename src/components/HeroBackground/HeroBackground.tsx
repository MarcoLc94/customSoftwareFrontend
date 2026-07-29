import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import SafeCanvas from "../SafeCanvas/SafeCanvas";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Three soft radial "blobs" combined additively — a GPU-native stand-in for the
// old blurred divs. No CSS filter, no repaint-on-scroll cost: just a plane shader.
const FRAGMENT_SHADER = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform float uScroll;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  float blob(vec2 uv, vec2 center, float radius) {
    vec2 p = uv - center;
    p.x *= uAspect;
    float d = length(p);
    return smoothstep(radius, 0.0, d);
  }

  void main() {
    vec2 uv = vUv;
    float scroll = uScroll * 0.14;

    vec2 c1 = vec2(0.08, 0.92 + scroll * 1.1) + vec2(sin(uTime * 0.055), cos(uTime * 0.05)) * 0.05;
    vec2 c2 = vec2(0.92, 0.08 - scroll * 0.8) + vec2(cos(uTime * 0.045), sin(uTime * 0.05)) * 0.045;
    vec2 c3 = vec2(0.62, 0.55 - scroll * 1.6) + vec2(sin(uTime * 0.07 + 1.5), cos(uTime * 0.06)) * 0.035;

    float pulse = 0.85 + 0.15 * sin(uTime * 0.25);

    float b1 = blob(uv, c1, 0.42);
    float b2 = blob(uv, c2, 0.38);
    float b3 = blob(uv, c3, 0.30 * pulse);

    vec3 color = uColor1 * b1 * 0.55 + uColor2 * b2 * 0.6 + uColor3 * b3 * 0.5;
    float alpha = clamp(b1 * 0.55 + b2 * 0.6 + b3 * 0.5, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

function Blobs() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uScroll: { value: 0 },
      uColor1: { value: new THREE.Color("#FF8300") },
      uColor2: { value: new THREE.Color("#001B4E") },
      uColor3: { value: new THREE.Color("#F5D19A") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uAspect.value = viewport.width / viewport.height;

    targetScrollRef.current = window.scrollY / window.innerHeight;
    scrollRef.current += (targetScrollRef.current - scrollRef.current) * Math.min(delta * 4, 1);
    materialRef.current.uniforms.uScroll.value = scrollRef.current;
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

const HeroBackground = () => (
  <SafeCanvas
    orthographic
    gl={{ alpha: true, antialias: false }}
    dpr={[1, 1.75]}
    frameloop="always"
    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
  >
    <Blobs />
  </SafeCanvas>
);

export default HeroBackground;
