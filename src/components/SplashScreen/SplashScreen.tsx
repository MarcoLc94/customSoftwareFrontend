import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
}

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const containerRef     = useRef<HTMLDivElement>(null);
  const brandRef         = useRef<HTMLDivElement>(null);
  const sloganRef        = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const ringRef          = useRef<SVGCircleElement>(null);
  const clickHandlerRef  = useRef<(() => void) | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      gsap.set(ringRef.current, {
        strokeDasharray: CIRCUMFERENCE,
        strokeDashoffset: CIRCUMFERENCE,
      });

      let exiting = false;

      // ── Exit timeline ──────────────────────────────────────────────────────
      const exitTl = gsap.timeline({
        paused: true,
        onComplete: contextSafe!(() => onComplete()),
      })
        .to(
          [brandRef.current, sloganRef.current, buttonWrapperRef.current],
          { y: -28, opacity: 0, duration: 0.26, stagger: 0.07, ease: "power2.in" }
        )
        .to(containerRef.current, {
          opacity: 0, duration: 0.18, ease: "power1.in",
        }, "-=0.06");

      const triggerExit = contextSafe!(() => {
        if (exiting) return;
        exiting = true;
        gsap.killTweensOf(ringRef.current);
        exitTl.play();
      });

      clickHandlerRef.current = triggerExit;

      // ── Entry + ring-fill timeline ─────────────────────────────────────────
      gsap.timeline()
        .from(brandRef.current, {
          y: 30, opacity: 0, duration: 0.45, ease: "power3.out",
        })
        .from(sloganRef.current, {
          y: 22, opacity: 0, duration: 0.30, ease: "power2.out",
        }, "-=0.15")
        .from(buttonWrapperRef.current, {
          opacity: 0, scale: 0.78, duration: 0.35, ease: "back.out(1.8)",
        }, "-=0.10")
        .to(ringRef.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "none",
          onComplete: triggerExit,
        });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="splash-screen">
      <div className="splash-content">

        <div ref={brandRef} className="splash-brand">
          <img src="/images/logo.png" alt="Marco Dev" className="splash-logo" />
          <h1 className="splash-title">
            Marco <span>Dev</span>
          </h1>
        </div>

        <p ref={sloganRef} className="splash-slogan">
          Desarrollo web &amp; mobile
        </p>

        <div ref={buttonWrapperRef} className="splash-button-wrapper">
          <svg className="splash-ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle className="splash-ring-track" cx="50" cy="50" r={RADIUS} />
            <circle ref={ringRef} className="splash-ring-fill" cx="50" cy="50" r={RADIUS} />
          </svg>

          <button
            className="splash-button"
            onClick={() => clickHandlerRef.current?.()}
            aria-label="Entrar al sitio"
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
