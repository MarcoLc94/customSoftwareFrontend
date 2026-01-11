import "./Plans.css";

const Plans = () => {
  return (
    <div className="plans-container">
      <div className="plans-header">
        <h2 className="plans-title">Nuestros Planes Nutricionales</h2>
        <p className="plans-subtitle">
          Elige el que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="plans-grid">
        {/* Plan Básico */}
        <div className="plan-card">
          <div className="plan-image-container">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Plan Básico"
              className="plan-image"
            />
          </div>
          <div className="plan-content">
            <h3 className="plan-name">Plan Básico</h3>
            <p className="plan-price">$699 MXN/semana</p>
            <ul className="plan-features">
              <li>1 comida principal diaria</li>
              <li>5 comidas por semana</li>
              <li>Apoyo nutricional básico</li>
              <li>Ideal para inicio de cambio</li>
            </ul>
            <a
              href="https://wa.me/528124493708?text=Me%20interesa%20el%20Plan%20Básico%20de%20NutriOn"
              target="_blank"
              rel="noopener noreferrer"
              className="plan-button"
            >
              Adquirir Plan
            </a>
          </div>
        </div>

        {/* Plan Premium */}
        <div className="plan-card featured">
          <div className="plan-image-container">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Plan Premium"
              className="plan-image"
            />
          </div>
          <div className="plan-content">
            <h3 className="plan-name">Plan Premium</h3>
            <p className="plan-price">$1,299 - $1,399 MXN/semana</p>
            <ul className="plan-features">
              <li>2 comidas + 1 snack diario</li>
              <li>15 productos semanales</li>
              <li>Régimen saludable constante</li>
              <li>Seguimiento nutricional</li>
            </ul>
            <a
              href="https://wa.me/528124493708?text=Me%20interesa%20el%20Plan%20Premium%20de%20NutriOn"
              target="_blank"
              rel="noopener noreferrer"
              className="plan-button"
            >
              Adquirir Plan
            </a>
          </div>
        </div>

        {/* Plan Ultra */}
        <div className="plan-card">
          <div className="plan-image-container">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Plan Ultra"
              className="plan-image"
            />
          </div>
          <div className="plan-content">
            <h3 className="plan-name">Plan Ultra</h3>
            <p className="plan-price">$1,599 - $1,699 MXN/semana</p>
            <ul className="plan-features">
              <li>4 comidas al día (desayuno, comida, cena y snack)</li>
              <li>20 productos semanales</li>
              <li>Plan de entrenamiento personalizado</li>
              <li>Acompañamiento completo</li>
            </ul>
            <a
              href="https://wa.me/528124493708?text=Me%20interesa%20el%20Plan%20Ultra%20de%20NutriOn"
              target="_blank"
              rel="noopener noreferrer"
              className="plan-button"
            >
              Adquirir Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
