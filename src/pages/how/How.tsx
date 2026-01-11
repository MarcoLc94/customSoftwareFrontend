import "./How.css";

import "./How.css";
import { MessageCircle, PenTool, Code, Rocket } from "lucide-react";

const How = () => {
  return (
    <div className="how-container">
      <div className="how-card hover-lift">
        <div className="how-content">
          <div className="how-header-group">
            <h3 className="how-tag">Nuestro Proceso</h3>
            <h2 className="how-headline">De la Idea a la Realidad</h2>
            <div className="how-divider"></div>
          </div>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-icon-wrapper">
                <MessageCircle className="step-icon" />
              </div>
              <div className="step-details">
                <h4 className="step-title">Consulta</h4>
                <p className="step-text">Entendemos tus desafíos y definimos los objetivos.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon-wrapper">
                <PenTool className="step-icon" />
              </div>
              <div className="step-details">
                <h4 className="step-title">Diseño</h4>
                <p className="step-text">Prototipamos una solución visual atractiva y funcional.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon-wrapper">
                <Code className="step-icon" />
              </div>
              <div className="step-details">
                <h4 className="step-title">Desarrollo</h4>
                <p className="step-text">Construimos el software con las mejores prácticas.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon-wrapper">
                <Rocket className="step-icon" />
              </div>
              <div className="step-details">
                <h4 className="step-title">Lanzamiento</h4>
                <p className="step-text">Despliegue exitoso y soporte continuo garantizado.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="how-image">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Equipo Colaborando"
            className="how-img"
          />
        </div>
      </div>
    </div>
  );
};

export default How;
