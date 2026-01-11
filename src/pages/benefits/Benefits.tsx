import "./Benefits.css";

import "./Benefits.css";
import { BoxSelect, Gauge, CloudLightning, TrendingUp } from "lucide-react";

const Benefits = () => {
  return (
    <div className="benefits-container">
      <div className="benefits-card hover-lift">
        <div className="benefits-image">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Crecimiento de Negocio"
            className="benefits-img"
          />
        </div>
        <div className="benefits-content">
          <div className="benefits-header-group">
            <h3 className="benefits-tag">¿Por Qué Elegirnos?</h3>
            <h2 className="benefits-headline">Soluciones que Escalan</h2>
            <div className="benefits-divider"></div>
          </div>

          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <BoxSelect className="benefit-icon" />
              </div>
              <div className="benefit-details">
                <h4 className="benefit-title">A Tu Medida</h4>
                <p className="benefit-text">Software diseñado para tus procesos únicos.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <Gauge className="benefit-icon" />
              </div>
              <div className="benefit-details">
                <h4 className="benefit-title">Eficiencia</h4>
                <p className="benefit-text">Automatiza tareas rutinarias y ahorra tiempo.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <CloudLightning className="benefit-icon" />
              </div>
              <div className="benefit-details">
                <h4 className="benefit-title">Tecnología Moderna</h4>
                <p className="benefit-text">Stack tecnológico rápido y seguro.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <TrendingUp className="benefit-icon" />
              </div>
              <div className="benefit-details">
                <h4 className="benefit-title">Escalabilidad</h4>
                <p className="benefit-text">Sistemas listos para crecer contigo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
