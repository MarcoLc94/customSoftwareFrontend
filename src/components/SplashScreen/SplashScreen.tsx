import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

const TOTAL_FRAMES     = 193;
const START_FRAME      = 29;
const FADE_START_FRAME = 120;
const FRAME_DURATION   = 1000 / 140;
const LOGO_HOLD_SEC    = 0.68;      // 15% faster

const SplashScreen = ({ onComplete, onExitStart }: SplashScreenProps) => {
  const containerRef       = useRef<HTMLDivElement>(null);
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const contentRef         = useRef<HTMLDivElement>(null);
  const loaderRef          = useRef<HTMLDivElement>(null);
  const loaderBarRef       = useRef<HTMLDivElement>(null);
  const loaderPctRef       = useRef<HTMLSpanElement>(null);
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
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * 0.4;
      const sw = img.naturalWidth  * scale;
      const sh = img.naturalHeight * scale;
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    function updateLoader(n: number) {
      const pct = Math.round((n / TOTAL_FRAMES) * 100);
      if (loaderBarRef.current) loaderBarRef.current.style.width = `${pct}%`;
      if (loaderPctRef.current) loaderPctRef.current.textContent = `${pct}%`;
    }

    function hideLoader(cb: () => void) {
      const el = loaderRef.current;
      if (!el) { cb(); return; }
      el.style.transition = "opacity 0.4s ease";
      el.style.opacity = "0";
      setTimeout(() => { el.style.display = "none"; cb(); }, 420);
    }

    function startPlayback() {
      function tick(now: number) {
        while (now - lastTime >= FRAME_DURATION && currentFrame < TOTAL_FRAMES) {
          lastTime += FRAME_DURATION;
          drawCover(images[currentFrame]);
          currentFrame++;

          if (currentFrame >= FADE_START_FRAME && !fadingStarted) {
            fadingStarted = true;
            gsap.to(canvas, {
              opacity: 0,
              duration: 0.45,
              ease: "power2.in",
              onComplete: () => onVideoCompleteRef.current?.(),
            });
          }
        }
        if (currentFrame < TOTAL_FRAMES) rafId = requestAnimationFrame(tick);
      }
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames_splash/frame_${String(i).padStart(4, "0")}_nobg.png`;
      img.onload = () => {
        loaded++;
        updateLoader(loaded);
        if (loaded === TOTAL_FRAMES) hideLoader(startPlayback);
      };
      img.onerror = () => {
        loaded++;
        updateLoader(loaded);
        if (loaded === TOTAL_FRAMES) hideLoader(startPlayback);
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
      <div ref={loaderRef} className="splash-loader">
        <div className="splash-loader__logo">Marco<span>Dev</span></div>
        <div className="splash-loader__bar-wrap">
          <div ref={loaderBarRef} className="splash-loader__bar" />
        </div>
        <span ref={loaderPctRef} className="splash-loader__pct">0%</span>
      </div>

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
