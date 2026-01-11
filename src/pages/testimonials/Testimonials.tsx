import "./Testimonials.css";

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h3 className="testimonials-tag">Casos de Éxito</h3>
        <hr />
        <p className="testimonials-subtitle">
          Lo que nuestros clientes dicen sobre CustomSoft
        </p>
      </div>

      <div className="testimonials-grid">
        {/* Testimonio 1 - CEO */}
        <div className="testimonial-card">
          <div className="testimonial-profile">
            <img
              src="/new-logo.jpeg"
              alt="David Torres"
              className="testimonial-image"
            />
            <h4 className="testimonial-name">David Torres</h4>
            <p className="testimonial-age">CEO, ATS Productos</p>
            <p className="testimonial-age">Salinas Victoria, NL.</p>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-text">
              "Necesitábamos un sistema de inventario a medida para nuestros almacenes. Las soluciones comerciales eran muy rígidas. CustomSoft entendió nuestro flujo y creó una herramienta perfecta. Redujimos pérdidas un 20% en el primer trimestre."
            </p>
            <div className="testimonial-rating">★★★★★</div>
          </div>
        </div>

        {/* Testimonio 2 - Gerente */}
        <div className="testimonial-card">
          <div className="testimonial-profile">
            <img src="/losreyes.png" alt="Joaquin Almaguer" className="testimonial-image" />
            <h4 className="testimonial-name">Joaquin Almaguer</h4>
            <p className="testimonial-age">CEO, Gruas Los Reyes</p>
            <p className="testimonial-age">Guadalupe, NL.</p>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-text">
              "Necesitabamos ayuda para atraer nuevos clientes y prospectos. El sitio web  que desarrollaron para nosotros aumento nuestro tráfico y ventas."
            </p>
            <div className="testimonial-rating">★★★★☆</div>
          </div>
        </div>

        {/* Testimonio 3 - Dueño Pyme */}
        <div className="testimonial-card">
          <div className="testimonial-profile">
            <img src="/autocerrajeria.jpg" alt="Humberto Lopez" className="testimonial-image" />
            <h4 className="testimonial-name">Humberto Lopez</h4>
            <p className="testimonial-age">Dueño, Autocerrajeria</p>
            <p className="testimonial-age">Guadalupe, NL.</p>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-text">
              "Quería un sitio web para mostrar mis servicios y mis productos. El equipo me entregó una solución rápida, bonita y fácil de usar para mis clientes. ¡El soporte es excelente!"
            </p>
            <div className="testimonial-rating">★★★★★</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
