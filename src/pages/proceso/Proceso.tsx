import { Fragment, useEffect } from "react";
import { MessageSquare, Search, Code, CheckCircle, ChevronRight, ChevronDown } from "lucide-react";
import "./Proceso.css";

const steps = [
  {
    icon: <MessageSquare size={36} />,
    title: "Contacto Inicial",
    desc: "Nos cuentas tu problema y objetivos. Agendamos una llamada para entender a fondo tus necesidades.",
  },
  {
    icon: <Search size={36} />,
    title: "Análisis y Estrategia",
    desc: "Estudiamos la mejor solución técnica y diseñamos un plan de acción detallado para tu proyecto.",
  },
  {
    icon: <Code size={36} />,
    title: "Desarrollo Ágil",
    desc: "Construimos tu software en iteraciones, manteniéndote informado y permitiendo feedback constante.",
  },
  {
    icon: <CheckCircle size={36} />,
    title: "Entrega y Soporte",
    desc: "Implementamos la solución final y brindamos soporte continuo para que tu negocio siga creciendo.",
  },
];

const Proceso = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="proceso-container">
      <div className="proceso-content">
        <div className="proceso-header">
          <span className="proceso-tag">Metodología</span>
          <h1 className="proceso-title">Nuestro Flujo de Trabajo</h1>
          <p className="proceso-subtitle">De la idea a la realidad en 4 pasos sencillos.</p>
        </div>

        <div className="proceso-flow">
          {steps.map((step, index) => (
            <Fragment key={index}>
              <div className="step-card">
                <div className="step-number-badge">{index + 1}</div>
                <div className="step-icon-wrapper">{step.icon}</div>
                <h3 className="step-heading">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="flow-connector">
                  <ChevronRight className="connector-desktop" />
                  <ChevronDown className="connector-mobile" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proceso;
