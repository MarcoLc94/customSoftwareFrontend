import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

const PIECE_COUNT          = 12;   // one per icosahedron vertex
const ASSEMBLE_DURATION    = 1.4;  // seconds for pieces to fly into formation
const ASSEMBLE_STAGGER     = 0.45; // spread across pieces, added to duration
const HOLD_AFTER_ASSEMBLE  = 0.45;
const LOGO_HOLD_SEC        = 0.68;
const AUTO_TRIGGER_MS      = 4500; // don't strand visitors who never click

// Canonical icosahedron vertices (golden-ratio construction), normalized + scaled.
function icosahedronTargets(radius: number, yOffset: number) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ];
  const len = Math.sqrt(1 + phi * phi);
  return raw.map(([x, y, z]) => new THREE.Vector3(
    (x / len) * radius,
    (y / len) * radius + yOffset,
    (z / len) * radius
  ));
}

const SplashScreen = ({ onComplete, onExitStart }: SplashScreenProps) => {
  const containerRef       = useRef<HTMLDivElement>(null);
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const contentRef         = useRef<HTMLDivElement>(null);
  const onVideoCompleteRef = useRef<(() => void) | null>(null);
  const activateRef        = useRef<() => void>(() => {});
  const fallbackPiecesRef  = useRef<(HTMLDivElement | null)[]>([]);
  const fallbackGlowRef    = useRef<HTMLDivElement>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [webglOk, setWebglOk] = useState(true);

  // ── WebGL scene: dim scattered pieces → click lights them into formation ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      setWebglOk(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2.0, 5.5);
    camera.lookAt(0, 0.3, 0);

    // Dim ambience — pieces are barely-visible silhouettes until activated.
    const ambient = new THREE.AmbientLight("#1a2540", 0.35);
    scene.add(ambient);

    const pointLight = new THREE.PointLight("#FFD9A0", 0, 12, 2);
    pointLight.position.set(0, 3.2, 1.5);
    scene.add(pointLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshStandardMaterial({ color: "#0b1220", roughness: 0.95, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.3;
    scene.add(ground);

    const targets = icosahedronTargets(1.15, 0.45);
    const piecesGroup = new THREE.Group();
    const pieces: THREE.Mesh[] = [];
    const pieceGeometry = new THREE.OctahedronGeometry(0.22, 0);

    for (let i = 0; i < PIECE_COUNT; i++) {
      const color = new THREE.Color("#FF8300").lerp(new THREE.Color("#F5D19A"), Math.random());
      const material = new THREE.MeshStandardMaterial({ color, metalness: 0.45, roughness: 0.35 });
      const mesh = new THREE.Mesh(pieceGeometry, material);

      const angle = Math.random() * Math.PI * 2;
      const radius = 1.3 + Math.random() * 2.3;
      mesh.position.set(Math.cos(angle) * radius, -1.0 + Math.random() * 0.15, Math.sin(angle) * radius);
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
      mesh.userData.target = targets[i];

      piecesGroup.add(mesh);
      pieces.push(mesh);
    }
    scene.add(piecesGroup);

    let rafId = 0;
    let activated = false;
    let idleSpin = 0;
    const clock = new THREE.Clock();

    function render() {
      const delta = clock.getDelta();
      if (activated) {
        idleSpin += delta * 0.12;
        piecesGroup.rotation.y = idleSpin;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    }
    render();

    function triggerAssembly() {
      if (activated) return;
      activated = true;
      setShowPrompt(false);

      gsap.to(pointLight, { intensity: 3.4, duration: 0.9, ease: "power2.out" });

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
      });

      const totalDelay = ASSEMBLE_DURATION + ASSEMBLE_STAGGER;
      gsap.delayedCall(totalDelay + HOLD_AFTER_ASSEMBLE, () => {
        gsap.to(canvas, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
          onComplete: () => onVideoCompleteRef.current?.(),
        });
      });
    }

    activateRef.current = triggerAssembly;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(pointLight);
      pieces.forEach((mesh) => { gsap.killTweensOf(mesh.position); gsap.killTweensOf(mesh.rotation); });
      pieceGeometry.dispose();
      pieces.forEach((mesh) => (mesh.material as THREE.Material).dispose());
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  // ── CSS/DOM fallback: same "scattered → lit & assembled" beat, no WebGL needed ──
  useEffect(() => {
    if (webglOk) return;
    const pieces = fallbackPiecesRef.current.filter((el): el is HTMLDivElement => el !== null);

    pieces.forEach((el) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 110;
      gsap.set(el, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.6 - 10,
        rotation: Math.random() * 360,
        opacity: 0.3,
      });
    });

    activateRef.current = () => {
      setShowPrompt(false);
      gsap.to(fallbackGlowRef.current, { opacity: 1, duration: 0.9, ease: "power2.out" });

      pieces.forEach((el, i) => {
        const angle = (i / PIECE_COUNT) * Math.PI * 2;
        gsap.to(el, {
          x: Math.cos(angle) * 78,
          y: Math.sin(angle) * 78 * 0.55,
          rotation: 0,
          opacity: 1,
          duration: ASSEMBLE_DURATION,
          delay: (i / PIECE_COUNT) * ASSEMBLE_STAGGER,
          ease: "power3.out",
        });
      });

      gsap.delayedCall(ASSEMBLE_DURATION + ASSEMBLE_STAGGER + HOLD_AFTER_ASSEMBLE, () => {
        onVideoCompleteRef.current?.();
      });
    };
  }, [webglOk]);

  // ── Shared trigger: click/tap anywhere, or auto after a few seconds ──────
  useEffect(() => {
    const handlePointerDown = () => activateRef.current();
    containerRef.current?.addEventListener("pointerdown", handlePointerDown);
    const autoTimer = window.setTimeout(() => activateRef.current(), AUTO_TRIGGER_MS);

    return () => {
      containerRef.current?.removeEventListener("pointerdown", handlePointerDown);
      clearTimeout(autoTimer);
    };
  }, []);

  // ── GSAP splash content animations ───────────────────────────────────────
  useGSAP(
    (_ctx, contextSafe) => {
      gsap.set(contentRef.current, { opacity: 0 });

      const exitTl = gsap.timeline({
        paused: true,
        onStart: contextSafe!(() => onExitStart?.()),
        onComplete: contextSafe!(() => onComplete()),
      })
        .to(contentRef.current, {
          opacity: 0, duration: 0.76, ease: "power1.inOut",
        })
        .to(containerRef.current, {
          opacity: 0, duration: 0.34, ease: "power1.in",
        }, "-=0.2");

      // Pieces lit and assembled — logo drops in, holds, then auto-exit
      onVideoCompleteRef.current = contextSafe!(() => {
        gsap.timeline()
          .to(contentRef.current, {
            opacity: 1,
            duration: 0.42,
            ease: "power2.out",
          })
          .add(() => { exitTl.play(); }, `+=${LOGO_HOLD_SEC}`);
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="splash-screen">
      <canvas ref={canvasRef} className="splash-canvas" />

      {!webglOk && (
        <div className="splash-fallback-scene" aria-hidden="true">
          <div ref={fallbackGlowRef} className="splash-fallback-glow" />
          {Array.from({ length: PIECE_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { fallbackPiecesRef.current[i] = el; }}
              className="splash-fallback-piece"
            />
          ))}
        </div>
      )}

      {showPrompt && (
        <div className="splash-prompt">
          <span className="splash-prompt__ring" />
          <span className="splash-prompt__label">Toca para continuar</span>
        </div>
      )}

      <div ref={contentRef} className="splash-content">
        <div className="splash-brand">
          <img src="/images/Firefly.png" alt="Marco Dev" className="splash-logo" />
          <h1 className="splash-title">
            Marco <span>Dev</span>
          </h1>
        </div>

        <p className="splash-slogan">
          Soluciones web &amp; móvil
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
