import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

const PIECE_COUNT = 20;
const ASSEMBLE_DURATION = 2.2;
const ASSEMBLE_STAGGER = 0.6;
const HOLD_AFTER_ASSEMBLE = 0.8;
const LOGO_HOLD_SEC = 1.2;
const AUTO_TRIGGER_MS = 6000;

function icosahedronTargets(radius: number, yOffset: number) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ];
  const len = Math.sqrt(1 + phi * phi);
  const base = raw.map(([x, y, z]) => new THREE.Vector3(
    (x / len) * radius,
    (y / len) * radius + yOffset,
    (z / len) * radius
  ));
  // Duplicate for 20 pieces with slight jitter
  const targets: THREE.Vector3[] = [];
  for (let i = 0; i < PIECE_COUNT; i++) {
    const t = base[i % base.length].clone();
    t.x += (Math.random() - 0.5) * 0.08;
    t.y += (Math.random() - 0.5) * 0.08;
    t.z += (Math.random() - 0.5) * 0.08;
    targets.push(t);
  }
  return targets;
}

const SplashScreen = ({ onComplete, onExitStart }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const onVideoCompleteRef = useRef<(() => void) | null>(null);
  const activateRef = useRef<() => void>(() => {});
  const [showPrompt, setShowPrompt] = useState(true);
  const [phase, setPhase] = useState<"idle" | "assembling" | "revealing" | "exiting">("idle");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    let composer: EffectComposer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      setShowPrompt(false);
      onVideoCompleteRef.current?.();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#050810", 0.035);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.2, 7);
    camera.lookAt(0, 0.2, 0);

    // Post-processing
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.8, 0.6, 0.85
    );
    composer.addPass(bloomPass);

    // Lighting — dramatic cinematic setup
    const ambient = new THREE.AmbientLight("#1a2540", 0.2);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#FFD9A0", 2.5);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#FF6B35", 1.8);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight("#4A90D9", 0.8);
    fillLight.position.set(-2, -1, 3);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight("#FF9500", 0, 18, 2);
    pointLight.position.set(0, 2.5, 1);
    scene.add(pointLight);

    const coreLight = new THREE.PointLight("#FFFFFF", 0, 10, 2);
    coreLight.position.set(0, 0.5, 0);
    scene.add(coreLight);

    // Ground — reflective dark plane
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({
        color: "#060a12",
        roughness: 0.85,
        metalness: 0.4,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.2;
    scene.add(ground);

    // Central core sphere
    const coreGeometry = new THREE.IcosahedronGeometry(0.35, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: "#FF6B00",
      emissive: "#FF4500",
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.3,
      thickness: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.position.set(0, 0.5, 0);
    coreMesh.scale.set(0, 0, 0);
    scene.add(coreMesh);

    // Pieces
    const targets = icosahedronTargets(1.4, 0.5);
    const piecesGroup = new THREE.Group();
    const pieces: THREE.Mesh[] = [];
    const pieceGeometry = new THREE.OctahedronGeometry(0.18, 0);

    for (let i = 0; i < PIECE_COUNT; i++) {
      const hue = 0.08 + Math.random() * 0.06; // orange-gold range
      const color = new THREE.Color().setHSL(hue, 0.9, 0.55);
      const material = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.7,
        roughness: 0.25,
        emissive: color.clone().multiplyScalar(0.15),
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      });
      const mesh = new THREE.Mesh(pieceGeometry, material);

      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 3.5;
      const height = -1.5 + Math.random() * 3.0;
      mesh.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
      mesh.userData.target = targets[i];
      mesh.userData.initialPos = mesh.position.clone();
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      mesh.userData.floatSpeed = 0.3 + Math.random() * 0.5;

      piecesGroup.add(mesh);
      pieces.push(mesh);
    }
    scene.add(piecesGroup);

    // Particle field
    const particleCount = 400;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      particleSizes[i] = Math.random() * 2;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));
    const particleMaterial = new THREE.PointsMaterial({
      color: "#FFAA44",
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Connection lines (initially hidden)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#FF9500",
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    let rafId = 0;
    let activated = false;
    let idleSpin = 0;
    let assemblyTime = 0;
    const clock = new THREE.Clock();

    function updateConnections() {
      if (!activated) return;
      const positions: number[] = [];
      const threshold = 1.8;
      for (let i = 0; i < pieces.length; i++) {
        for (let j = i + 1; j < pieces.length; j++) {
          const dist = pieces[i].position.distanceTo(pieces[j].position);
          if (dist < threshold) {
            positions.push(
              pieces[i].position.x, pieces[i].position.y, pieces[i].position.z,
              pieces[j].position.x, pieces[j].position.y, pieces[j].position.z
            );
          }
        }
      }
      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      lineGeometry.attributes.position.needsUpdate = true;
    }

    function render() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!activated) {
        // Idle floating animation
        pieces.forEach((mesh) => {
          const off = mesh.userData.floatOffset;
          const speed = mesh.userData.floatSpeed;
          mesh.position.y = mesh.userData.initialPos.y + Math.sin(elapsed * speed + off) * 0.15;
          mesh.rotation.x += delta * 0.3;
          mesh.rotation.y += delta * 0.2;
        });
        // Slow camera orbit
        camera.position.x = Math.sin(elapsed * 0.15) * 0.5;
        camera.lookAt(0, 0.2, 0);
      } else {
        assemblyTime += delta;
        idleSpin += delta * 0.08;
        piecesGroup.rotation.y = idleSpin;

        // Core pulse
        const pulse = 1 + Math.sin(elapsed * 3) * 0.1;
        coreMesh.scale.setScalar(Math.min(1, assemblyTime * 0.8) * pulse);
        coreMesh.rotation.y += delta * 0.5;
        coreMesh.rotation.x += delta * 0.3;

        // Fade in connections
        if (lineMaterial.opacity < 0.25 && assemblyTime > 0.5) {
          lineMaterial.opacity = Math.min(0.25, (assemblyTime - 0.5) * 0.5);
        }
        updateConnections();

        // Particle swirl
        particles.rotation.y += delta * 0.02;
      }

      composer.render();
      rafId = requestAnimationFrame(render);
    }
    render();

    function triggerAssembly() {
      if (activated) return;
      activated = true;
      setShowPrompt(false);
      setPhase("assembling");

      // Dramatic light ramp-up
      gsap.to(pointLight, { intensity: 5, duration: 1.2, ease: "power2.out" });
      gsap.to(coreLight, { intensity: 3, duration: 1.0, ease: "power2.out" });
      gsap.to(bloomPass, { strength: 2.8, duration: 1.5, ease: "power2.out" });

      // Core reveal
      gsap.to(coreMesh.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.3 });

      // Camera dramatic zoom
      gsap.to(camera.position, {
        x: 0, y: 0.8, z: 4.5,
        duration: 2.5, ease: "power3.inOut",
      });

      // Pieces assemble with overshoot
      pieces.forEach((mesh, i) => {
        const target = mesh.userData.target as THREE.Vector3;
        const delay = (i / PIECE_COUNT) * ASSEMBLE_STAGGER;

        gsap.to(mesh.position, {
          x: target.x, y: target.y, z: target.z,
          duration: ASSEMBLE_DURATION, delay, ease: "power3.out",
        });
        gsap.to(mesh.rotation, {
          x: 0, y: 0, z: 0,
          duration: ASSEMBLE_DURATION, delay, ease: "power3.out",
        });
        // Material glow up
        gsap.to(mesh.material as THREE.MeshPhysicalMaterial, {
          emissiveIntensity: 0.6,
          duration: 1.5, delay: delay + 0.3, ease: "power2.out",
        });
      });

      const totalDelay = ASSEMBLE_DURATION + ASSEMBLE_STAGGER + HOLD_AFTER_ASSEMBLE;
      gsap.delayedCall(totalDelay, () => {
        setPhase("revealing");
        gsap.to(canvas, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => onVideoCompleteRef.current?.(),
        });
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    }

    activateRef.current = triggerAssembly;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloomPass.resolution.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(pointLight);
      gsap.killTweensOf(coreLight);
      gsap.killTweensOf(bloomPass);
      gsap.killTweensOf(coreMesh.scale);
      gsap.killTweensOf(camera.position);
      pieces.forEach((mesh) => {
        gsap.killTweensOf(mesh.position);
        gsap.killTweensOf(mesh.rotation);
      });
      pieceGeometry.dispose();
      pieces.forEach((mesh) => (mesh.material as THREE.Material).dispose());
      coreGeometry.dispose();
      coreMaterial.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Shared trigger
  useEffect(() => {
    const handlePointerDown = () => activateRef.current();
    const el = containerRef.current;
    el?.addEventListener("pointerdown", handlePointerDown);
    const autoTimer = window.setTimeout(() => activateRef.current(), AUTO_TRIGGER_MS);

    return () => {
      el?.removeEventListener("pointerdown", handlePointerDown);
      clearTimeout(autoTimer);
    };
  }, []);

  // GSAP content animations
  useGSAP(
    (_ctx, contextSafe) => {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
      gsap.set(".splash-title-char", { opacity: 0, y: 40, rotateX: -90 });
      gsap.set(".splash-slogan", { opacity: 0, y: 20 });
      gsap.set(".splash-divider", { scaleX: 0 });

      const exitTl = gsap.timeline({
        paused: true,
        onStart: contextSafe!(() => onExitStart?.()),
        onComplete: contextSafe!(() => onComplete()),
      })
        .to(contentRef.current, {
          opacity: 0, y: -40, duration: 0.9, ease: "power3.inOut",
        })
        .to(containerRef.current, {
          opacity: 0, duration: 0.5, ease: "power2.in",
        }, "-=0.3");

      onVideoCompleteRef.current = contextSafe!(() => {
        setPhase("revealing");
        gsap.timeline()
          .to(contentRef.current, {
            opacity: 1, y: 0,
            duration: 0.6, ease: "power3.out",
          })
          .to(".splash-title-char", {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7, stagger: 0.04, ease: "back.out(1.7)",
          }, "-=0.3")
          .to(".splash-divider", {
            scaleX: 1, duration: 0.8, ease: "power3.out",
          }, "-=0.4")
          .to(".splash-slogan", {
            opacity: 1, y: 0,
            duration: 0.6, ease: "power2.out",
          }, "-=0.5")
          .add(() => { exitTl.play(); }, `+=${LOGO_HOLD_SEC}`);
      });
    },
    { scope: containerRef }
  );

  const titleText = "Marco Dev";
  const titleChars = titleText.split("").map((char, i) => (
    <span key={i} className="splash-title-char" style={{ display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div ref={containerRef} className="splash-screen">
      <canvas ref={canvasRef} className="splash-canvas" />

      <div ref={overlayRef} className="splash-overlay" />

      {showPrompt && (
        <div className="splash-prompt">
          <div className="splash-prompt__orbit">
            <div className="splash-prompt__core" />
          </div>
          <span className="splash-prompt__label">Toca para continuar</span>
          <div className="splash-prompt__progress">
            <div className="splash-prompt__progress-bar" />
          </div>
        </div>
      )}

      <div ref={contentRef} className="splash-content">
        <div className="splash-brand">
          <div className="splash-logo-wrap">
            <img src="/images/Firefly.png" alt="Marco Dev" className="splash-logo" />
            <div className="splash-logo-glow" />
          </div>
          <h1 className="splash-title">
            {titleChars}
          </h1>
          <div className="splash-divider" />
        </div>

        <p className="splash-slogan">
          Soluciones web &amp; móvil
        </p>

        <div className="splash-meta">
          <span className="splash-meta__dot" />
          <span className="splash-meta__text">Desarrollo profesional</span>
        </div>
      </div>

      {phase === "assembling" && (
        <div className="splash-flash" />
      )}
    </div>
  );
};

export default SplashScreen;