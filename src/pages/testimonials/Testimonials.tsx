import "./Testimonials.css";

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h3 className="testimonials-tag">Historias de Éxito</h3>
        <hr />
        <p className="testimonials-subtitle">
          Lo que nuestros clientes dicen sobre NutriOn
        </p>
      </div>

      <div className="testimonials-grid">
        {/* Testimonio 1 - Anciano */}
        <div className="testimonial-card">
          <div className="testimonial-profile">
            <img
              src="/anciano.jpg"
              alt="Don José"
              className="testimonial-image"
            />
            <h4 className="testimonial-name">Don José</h4>
            <p className="testimonial-age">72 años</p>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-text">
              "A mi edad, tenía problemas de azúcar y presión. Con NutriOn no
              solo mejoré mis niveles, sino que recuperé energía. Mis médicos no
              pueden creer el cambio. ¡La comida es deliciosa y me siento como
              hace 20 años!"
            </p>
            <div className="testimonial-rating">★★★★★</div>
          </div>
        </div>

        {/* Testimonio 2 - Mujer obesa */}
        <div className="testimonial-card">
          <div className="testimonial-profile">
            <img src="/obesa.jpeg" alt="María" className="testimonial-image" />
            <h4 className="testimonial-name">María</h4>
            <p className="testimonial-age">38 años</p>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-text">
              "Perdí 28 kg en 8 meses sin pasar hambre. Antes probé todas las
              dietas, pero NutriOn fue diferente. La comida es abundante y
              sabrosa, y mi nutrióloga ajustaba el plan según mi progreso. ¡Por
              fin me siento bien en mi cuerpo!"
            </p>
            <div className="testimonial-rating">★★★★☆</div>
          </div>
        </div>

        {/* Testimonio 3 - Joven flaco */}
        <div className="testimonial-card">
          <div className="testimonial-profile">
            <img src="/guy.jpg" alt="Carlos" className="testimonial-image" />
            <h4 className="testimonial-name">Carlos</h4>
            <p className="testimonial-age">25 años</p>
          </div>
          <div className="testimonial-content">
            <p className="testimonial-text">
              "Siempre fui muy delgado y por más que comía no ganaba masa. Con
              NutriOn y el gimnasio logré subir 9 kg de músculo en 5 meses. Las
              comidas tienen exactamente las proteínas y calorías que necesito.
              ¡Totalmente recomendado!"
            </p>
            <div className="testimonial-rating">★★★★★</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
