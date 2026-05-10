import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, PenTool, Code, Rocket } from "lucide-react";
import "./How.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { Icon: MessageCircle, num: "01", title: "Consulta",     desc: "Entendemos tus desafíos, definimos objetivos y planificamos la solución ideal." },
  { Icon: PenTool,       num: "02", title: "Diseño",       desc: "Prototipamos una interfaz visual atractiva, funcional y validada contigo." },
  { Icon: Code,          num: "03", title: "Desarrollo",   desc: "Construimos con código limpio, buenas prácticas y revisiones constantes." },
  { Icon: Rocket,        num: "04", title: "Lanzamiento",  desc: "Despliegue exitoso, capacitación y soporte continuo garantizado." },
];

const How = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".process-heading"), {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(ref.current.querySelectorAll(".process-step"), {
      y: 40, opacity: 0, stagger: 0.14, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: ref.current.querySelector(".process-steps"), start: "top 82%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="process-section">
      <div className="process-inner">
        <div className="process-heading">
          <span className="process-label">Nuestro proceso</span>
          <h2 className="process-title">De la idea a la realidad</h2>
          <p className="process-subtitle">
            Un método ágil, transparente y orientado a resultados en 4 pasos.
          </p>
        </div>

        <div className="process-steps">
          <div className="process-connector" aria-hidden="true" />
          {steps.map(({ Icon, num, title, desc }) => (
            <div key={num} className="process-step">
              <div className="process-step-top">
                <div className="process-step-num">{num}</div>
              </div>
              <div className="process-step-body">
                <div className="process-step-icon">
                  <Icon className="process-icon-svg" />
                </div>
                <h3 className="process-step-title">{title}</h3>
                <p className="process-step-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How;
