import "./Rutines.css";

const Rutines = () => {
  return (
    <div className="rutines-container">
      <div className="rutines-header">
        <h2 className="rutines-title">Nuestras Rutinas de Entrenamiento</h2>
        <p className="rutines-subtitle">
          Programas personalizados para cada objetivo
        </p>
      </div>

      <div className="rutines-grid">
        {/* Rutina 1 */}
        <div className="rutine-card">
          <div className="rutine-image-container">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Rutina Principiante"
              className="rutine-image"
            />
          </div>
          <div className="rutine-content">
            <h3 className="rutine-name">Rutina Principiante</h3>
            <ul className="rutine-features">
              <li>Adaptada a nuevos en el gym</li>
              <li>Enfoque en técnica correcta</li>
              <li>3 días por semana</li>
              <li>Ejercicios básicos</li>
            </ul>
            <a
              href="https://wa.me/528124493708?text=Me%20interesa%20la%20Rutina%20Principiante"
              target="_blank"
              rel="noopener noreferrer"
              className="rutine-button"
            >
              Cotizar Rutina
            </a>
          </div>
        </div>

        {/* Rutina 2 */}
        <div className="rutine-card">
          <div className="rutine-image-container">
            <img
              src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Rutina Pérdida de Peso"
              className="rutine-image"
            />
          </div>
          <div className="rutine-content">
            <h3 className="rutine-name">Rutina Pérdida de Peso</h3>
            <ul className="rutine-features">
              <li>Combinación cardio y fuerza</li>
              <li>Quema de grasa efectiva</li>
              <li>5 días por semana</li>
              <li>Incluye plan alimenticio</li>
            </ul>
            <a
              href="https://wa.me/528124493708?text=Me%20interesa%20la%20Rutina%20Pérdida%20de%20Peso"
              target="_blank"
              rel="noopener noreferrer"
              className="rutine-button"
            >
              Cotizar Rutina
            </a>
          </div>
        </div>

        {/* Rutina 3 */}
        <div className="rutine-card">
          <div className="rutine-image-container">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Rutina Hipertrofia"
              className="rutine-image"
            />
          </div>
          <div className="rutine-content">
            <h3 className="rutine-name">Rutina Hipertrofia</h3>
            <ul className="rutine-features">
              <li>Enfoque en ganancia muscular</li>
              <li>Rutinas divididas por grupos</li>
              <li>5-6 días por semana</li>
              <li>Incluye progresión de cargas</li>
            </ul>
            <a
              href="https://wa.me/528124493708?text=Me%20interesa%20la%20Rutina%20Hipertrofia"
              target="_blank"
              rel="noopener noreferrer"
              className="rutine-button"
            >
              Cotizar Rutina
            </a>
          </div>
        </div>

        {/* Rutina 4 */}
        <div className="rutine-card">
          <div className="rutine-image-container">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Rutina Funcional"
              className="rutine-image"
            />
          </div>
          <div className="rutine-content">
            <h3 className="rutine-name">Rutina Funcional</h3>
            <ul className="rutine-features">
              <li>Mejora movilidad y fuerza</li>
              <li>Ejercicios con peso corporal</li>
              <li>4 días por semana</li>
              <li>Perfecta para deportistas</li>
            </ul>
            <a
              href="https://wa.me/528124493708?text=Me%20interesa%20la%20Rutina%20Funcional"
              target="_blank"
              rel="noopener noreferrer"
              className="rutine-button"
            >
              Cotizar Rutina
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rutines;
