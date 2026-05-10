import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Code2, Rocket } from "lucide-react";
import "./Tip.css";

gsap.registerPlugin(ScrollTrigger);

const Tip = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".about-text"), {
      x: -60, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
    gsap.from(ref.current.querySelector(".about-visual"), {
      x: 60, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="about-section">
      <div className="about-inner">
        <div className="about-text">
          <span className="about-label">Sobre Marco Dev</span>
          <h2 className="about-title">
            Desarrollo web & mobile<br />
            <span className="about-title-accent">a otro nivel</span>
          </h2>
          <p className="about-desc">
            Somos más que desarrolladores — somos tus socios estratégicos. Transformamos desafíos operativos en software elegante, eficiente y que hace crecer tu negocio.
          </p>
          <ul className="about-feats">
            <li className="about-feat">
              <Code2 className="about-feat-icon" />
              <span>Código limpio, modular y escalable</span>
            </li>
            <li className="about-feat">
              <CheckCircle2 className="about-feat-icon" />
              <span>Soluciones enfocadas en ROI real</span>
            </li>
            <li className="about-feat">
              <Rocket className="about-feat-icon" />
              <span>Implementación rápida y soporte continuo</span>
            </li>
          </ul>
        </div>

        <div className="about-visual">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Desarrollo de software"
            className="about-img"
          />
          <div className="about-badge">
            <span className="about-badge-num">5+</span>
            <span className="about-badge-text">años de<br />experiencia</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tip;
