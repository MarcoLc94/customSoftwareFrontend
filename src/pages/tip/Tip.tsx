import "./Tip.css";


import { CheckCircle2, Code2, Rocket } from "lucide-react";

const Tip = () => {
  return (
    <div className="tip-container">
      <div className="tip-card hover-lift">
        <div className="tip-content">
          <div className="tip-header-group">
            <h3 className="tip-tag">Sobre CustomSoft</h3>
            <h2 className="tip-headline">Impulsando tu Éxito Digital</h2>
            <div className="tip-divider"></div>
          </div>
          
          <div className="tips-mini">
            <p className="tip-description">
              Somos más que desarrolladores; somos tus socios estratégicos. Transformamos tus desafíos operativos en software elegante y eficiente.
            </p>

            <div className="tip-features">
              <div className="tip-feature">
                <Code2 className="tip-icon" />
                <span>Desarrollo de Código Limpio y Escalable</span>
              </div>
              <div className="tip-feature">
                <CheckCircle2 className="tip-icon" />
                <span>Soluciones Enfocadas en el ROI</span>
              </div>
              <div className="tip-feature">
                <Rocket className="tip-icon" />
                <span>Implementación Rápida y Soporte Continuo</span>
              </div>
            </div>
          </div>
        </div>
        <div className="tip-image">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Equipo de Desarrollo Colaborando"
            className="tip-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Tip;
