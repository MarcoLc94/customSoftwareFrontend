import { useEffect } from "react";
import "./Proceso.css";
import { MessageSquare, Search, Code, CheckCircle } from "lucide-react";

const Proceso = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      icon: <MessageSquare size={32} />,
      title: "Contacto Inicial",
      desc: "Nos cuentas tu problema y objetivos. Agendamos una llamada para entender a fondo tus necesidades.",
    },
    {
      icon: <Search size={32} />,
      title: "Análisis y Estrategia",
      desc: "Estudiamos la mejor solución técnica y diseñamos un plan de acción detallado para tu proyecto.",
    },
    {
      icon: <Code size={32} />,
      title: "Desarrollo Ágil",
      desc: "Construimos tu software en iteraciones, manteniéndote informado y permitiendo feedback constante.",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Solución y Entrega",
      desc: "Implementamos la solución final, asegurando que tu problema esté resuelto y tu negocio optimizado.",
    },
  ];

  return (
    <div className="proceso-container">
      <div className="proceso-content">
        <div className="proceso-header">
          <h1 className="proceso-title">Nuestro Flujo de Trabajo</h1>
          <p>De la idea a la realidad en 4 pasos sencillos.</p>
        </div>

        <div className="proceso-timeline">
          {steps.map((step, index) => (
            <div key={index} className="proceso-step">
              <div className="step-dot"></div>
              <div className="step-card">
                <span className="step-number">{index + 1}</span>
                <div className="step-icon-container">{step.icon}</div>
                <h3 className="step-heading">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proceso;
