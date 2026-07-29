import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

const LOGO_HOLD_SEC = 0.9;

const SplashScreen = ({ onComplete, onExitStart }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      gsap.set(contentRef.current, { opacity: 0, y: 16 });

      const exitTl = gsap.timeline({
        paused: true,
        onStart: contextSafe!(() => onExitStart?.()),
        onComplete: contextSafe!(() => onComplete()),
      })
        .to(contentRef.current, {
          opacity: 0, duration: 0.6, ease: "power1.inOut",
        })
        .to(containerRef.current, {
          opacity: 0, duration: 0.34, ease: "power1.in",
        }, "-=0.2");

      gsap.timeline()
        .to(contentRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        })
        .add(() => { exitTl.play(); }, `+=${LOGO_HOLD_SEC}`);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="splash-screen">
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
