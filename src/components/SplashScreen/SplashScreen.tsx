import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

const TOTAL_FRAMES     = 200;
const START_FRAME      = 29;
const FADE_START_FRAME = 160;
const FRAME_DURATION   = 1000 / 77; // 10% faster
const LOGO_HOLD_SEC    = 0.68;      // 15% faster

const SplashScreen = ({ onComplete, onExitStart }: SplashScreenProps) => {
  const containerRef       = useRef<HTMLDivElement>(null);
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const contentRef         = useRef<HTMLDivElement>(null);
  const onVideoCompleteRef = useRef<(() => void) | null>(null);

  // ── Frame playback ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    let loaded = 0;
    let rafId = 0;
    let currentFrame = START_FRAME;
    let lastTime = 0;
    let fadingStarted = false;

    function drawCover(img: HTMLImageElement) {
      const cw = canvas!.width;
      const ch = canvas!.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * 0.8;
      const sw = img.naturalWidth  * scale;
      const sh = img.naturalHeight * scale;
      ctx!.fillStyle = "#ffffff";
      ctx!.fillRect(0, 0, cw, ch);
      ctx!.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    function startPlayback() {
      function tick(now: number) {
        if (now - lastTime >= FRAME_DURATION) {
          lastTime = now;
          drawCover(images[currentFrame]);
          currentFrame++;

          if (currentFrame >= FADE_START_FRAME && !fadingStarted) {
            fadingStarted = true;
            const fadeDuration = (TOTAL_FRAMES - FADE_START_FRAME) * FRAME_DURATION / 1000;
            gsap.to(canvas, {
              opacity: 0,
              duration: fadeDuration,
              ease: "power2.in",
              onComplete: () => onVideoCompleteRef.current?.(),
            });
          }

          if (currentFrame >= TOTAL_FRAMES) return;
        }
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames_splash/frame_${String(i).padStart(4, "0")}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) startPlayback();
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) startPlayback();
      };
      images.push(img);
    }

    return () => { cancelAnimationFrame(rafId); };
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

      // Canvas faded — logo drops in, holds, then auto-exit
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
