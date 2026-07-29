import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

const LOGO_HOLD_SEC = 1.2;

const SplashScreen = ({ onComplete, onExitStart }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    },
    { scope: containerRef }
  );

  const titleText = "Marco Dev";
  const titleChars = titleText.split("").map((char, i) => (
    <span key={i} className="splash-title-char" style={{ display: "inline-block" }}>
      {char === " " ? " " : char}
    </span>
  ));

  return (
    <div ref={containerRef} className="splash-screen">
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
    </div>
  );
};

export default SplashScreen;
