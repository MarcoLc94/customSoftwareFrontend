import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SafeCanvas from "../SafeCanvas/SafeCanvas";
import "./HeroShowcase.css";

// Classic Ashima Arts / Stefan Gustavson 3D simplex noise (public domain-style,
// ubiquitous in shader work) — drives the organic surface displacement below.
const NOISE_GLSL = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying float vNoise;
  varying vec3 vViewPosition;

  ${NOISE_GLSL}

  void main() {
    float n = snoise(normal * 1.6 + uTime * 0.28);
    vec3 displaced = position + normal * n * 0.22;
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    vNoise = n;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying float vNoise;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.2);
    vec3 base = mix(uColorA, uColorB, clamp(vNoise * 0.5 + 0.5, 0.0, 1.0));
    vec3 color = base * (0.32 + 0.55 * fresnel) + vec3(1.0) * pow(fresnel, 4.0) * 0.6;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Core() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#FF8300") },
      uColorB: { value: new THREE.Color("#F5D19A") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh>
      <icosahedronGeometry args={[1.3, 5]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
      />
    </mesh>
  );
}

function Wireframe() {
  return (
    <mesh>
      <icosahedronGeometry args={[1.85, 1]} />
      <meshBasicMaterial color="#FF8C1A" wireframe transparent opacity={0.16} />
    </mesh>
  );
}

function Scene() {
  const spinRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.18;
      spinRef.current.rotation.x += delta * 0.05;
    }
    if (tiltRef.current) {
      const targetX = -state.pointer.y * 0.28;
      const targetY = state.pointer.x * 0.32;
      const ease = Math.min(delta * 2.5, 1);
      tiltRef.current.rotation.x += (targetX - tiltRef.current.rotation.x) * ease;
      tiltRef.current.rotation.y += (targetY - tiltRef.current.rotation.y) * ease;
    }
  });

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        <Core />
        <Wireframe />
      </group>
    </group>
  );
}

// Pure-CSS glow orb shown when WebGL isn't available — so the hero never looks empty.
const FallbackOrb = () => (
  <div className="hero-showcase-fallback">
    <div className="hero-showcase-fallback__ring" />
    <div className="hero-showcase-fallback__orb" />
  </div>
);

// Floating "code editor" card — makes the visual concrete ("real software") instead
// of purely decorative, and plays on the hero's own "sin intermediarios" headline.
const CodeCard = () => (
  <div className="hero-code-card">
    <div className="hero-code-card__bar">
      <span className="hero-code-card__dot hero-code-card__dot--red" />
      <span className="hero-code-card__dot hero-code-card__dot--yellow" />
      <span className="hero-code-card__dot hero-code-card__dot--green" />
      <span className="hero-code-card__file">cotizacion.ts</span>
    </div>
    <pre className="hero-code-card__body">
      <code>
        <span className="tok-kw">function</span> <span className="tok-fn">cotizar</span>(<span className="tok-param">proyecto</span>) {"{"}
        {"\n"}  <span className="tok-kw">return</span> {"{"}
        {"\n"}    tiempo: <span className="tok-str">"2–4 semanas"</span>,
        {"\n"}    contacto: <span className="tok-str">"directo"</span>,
        {"\n"}    intermediarios: <span className="tok-num">0</span>,
        {"\n"}  {"}"};
        {"\n"}{"}"}
        <span className="hero-code-card__cursor" />
      </code>
    </pre>
  </div>
);

const HeroShowcase = () => (
  <div className="hero-showcase" aria-hidden="true">
    <SafeCanvas
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
      fallback={<FallbackOrb />}
    >
      <Scene />
    </SafeCanvas>
    <CodeCard />
  </div>
);

export default HeroShowcase;
