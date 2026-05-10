import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Search, PenTool, Code, Rocket } from "lucide-react";
import "./Proceso.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    Icon: MessageSquare,
    num: "01",
    title: "Consulta Inicial",
    duration: "Día 1",
    desc: "Me cuentas tu proyecto, objetivos y presupuesto. Agenda una llamada gratuita sin compromiso para entender a fondo lo que necesitas.",
    details: ["Llamada de 30–60 minutos", "Sin costo ni compromiso", "Definición de requerimientos"],
  },
  {
    Icon: Search,
    num: "02",
    title: "Análisis y Propuesta",
    duration: "Días 2–4",
    desc: "Estudio tu industria, procesos y competencia. Te entrego una propuesta detallada con alcance, tiempos y precio fijo. Sin sorpresas.",
    details: ["Propuesta con precio fijo", "Cronograma detallado", "Revisión de alternativas"],
  },
  {
    Icon: PenTool,
    num: "03",
    title: "Diseño y Prototipo",
    duration: "Semana 1",
    desc: "Diseñamos la interfaz visual y la experiencia de usuario. Apruebas cada pantalla antes de escribir una línea de código.",
    details: ["Wireframes interactivos", "Diseño responsivo", "Revisiones incluidas"],
  },
  {
    Icon: Code,
    num: "04",
    title: "Desarrollo Ágil",
    duration: "Semanas 2–N",
    desc: "Construyo tu software en iteraciones cortas. Recibes demos regulares y puedes solicitar ajustes en cada etapa.",
    details: ["Demos semanales", "Feedback constante", "Código limpio y documentado"],
  },
  {
    Icon: Rocket,
    num: "05",
    title: "Entrega y Soporte",
    duration: "Final",
    desc: "Lanzamiento, configuración en producción, capacitación para tu equipo y soporte post-entrega. Tu inversión protegida.",
    details: ["Deploy y configuración", "Capacitación incluida", "Soporte continuo"],
  },
];

const Proceso = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".proc-header"), {
      y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
    });
    gsap.from(ref.current.querySelectorAll(".proc-step"), {
      x: -40, opacity: 0, stagger: 0.15, duration: 0.65, ease: "power3.out",
      delay: 0.3,
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="proc-page">
      <div className="proc-bg" aria-hidden="true">
        <div className="proc-orb proc-orb--1" />
        <div className="proc-orb proc-orb--2" />
      </div>

      <div className="proc-inner">
        <div className="proc-header">
          <span className="proc-label">Metodología</span>
          <h1 className="proc-title">Nuestro proceso</h1>
          <p className="proc-subtitle">
            Un método ágil, transparente y orientado a resultados. De la idea al producto en 5 etapas claras.
          </p>
        </div>

        <div className="proc-timeline">
          {steps.map(({ Icon, num, title, duration, desc, details }, i) => (
            <div key={num} className="proc-step">
              <div className="proc-step-left">
                <div className="proc-step-num">{num}</div>
                {i < steps.length - 1 && <div className="proc-step-line" />}
              </div>
              <div className="proc-step-card">
                <div className="proc-step-card-top">
                  <div className="proc-step-icon">
                    <Icon className="proc-icon-svg" />
                  </div>
                  <span className="proc-step-duration">{duration}</span>
                </div>
                <h3 className="proc-step-title">{title}</h3>
                <p className="proc-step-desc">{desc}</p>
                <ul className="proc-step-details">
                  {details.map((d) => (
                    <li key={d} className="proc-step-detail">
                      <span className="proc-detail-dot" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="proc-cta">
          <h2 className="proc-cta-title">¿Listo para comenzar?</h2>
          <p className="proc-cta-desc">El primer paso es una llamada gratuita. Sin compromiso.</p>
          <a
            href="https://wa.me/528118474519"
            target="_blank"
            rel="noreferrer"
            className="proc-cta-btn"
          >
            Agendar llamada gratuita
          </a>
        </div>
      </div>
    </div>
  );
};

export default Proceso;
