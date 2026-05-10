import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BoxSelect, Gauge, CloudLightning, TrendingUp } from "lucide-react";
import "./Benefits.css";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { Icon: BoxSelect,     num: "01", title: "A Tu Medida",       desc: "Software diseñado exactamente para tus procesos únicos, sin concesiones ni funciones innecesarias." },
  { Icon: Gauge,         num: "02", title: "Eficiencia",         desc: "Automatiza tareas rutinarias, reduce errores humanos y recupera horas valiosas de trabajo." },
  { Icon: CloudLightning,num: "03", title: "Tecnología Moderna", desc: "Stack rápido, seguro y actualizado para estar un paso adelante de tu competencia." },
  { Icon: TrendingUp,    num: "04", title: "Escalabilidad",      desc: "Sistemas construidos para crecer contigo sin requerir reconstrucciones costosas en el futuro." },
];

const Benefits = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".bene-heading"), {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(ref.current.querySelectorAll(".bene-item"), {
      y: 50, opacity: 0, scale: 0.96, stagger: 0.12, duration: 0.6, ease: "back.out(1.4)",
      scrollTrigger: { trigger: ref.current.querySelector(".bene-grid"), start: "top 83%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="bene-section">
      <div className="bene-inner">
        <div className="bene-heading">
          <span className="bene-label">¿Por qué elegirnos?</span>
          <h2 className="bene-title">Soluciones que Escalan</h2>
          <p className="bene-subtitle">
            Cada decisión de diseño y código está orientada a hacer crecer tu negocio.
          </p>
        </div>

        <div className="bene-grid">
          {items.map(({ Icon, num, title, desc }) => (
            <div key={num} className="bene-item">
              <span className="bene-item-num" aria-hidden="true">{num}</span>
              <div className="bene-item-icon">
                <Icon className="bene-icon-svg" />
              </div>
              <h3 className="bene-item-title">{title}</h3>
              <p className="bene-item-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
