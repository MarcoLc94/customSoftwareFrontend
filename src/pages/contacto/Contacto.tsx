import { useEffect } from "react";
import "./Contacto.css";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const Contacto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contacto-container">
      <div className="contacto-card">
        <div className="contacto-info">
          <h1 className="contacto-title">Contáctanos</h1>
          <p className="contacto-desc">
            Estamos listos para escuchar tu proyecto. Visítanos o mándanos un mensaje directo.
          </p>

          <div className="contact-method">
            <MapPin className="contact-icon" />
            <span className="contact-text">Microndas, Guadalupe, CP 67199, NL, México</span>
          </div>

          <div className="contact-method">
            <Phone className="contact-icon" />
            <span className="contact-text">+52 81 18474519</span>
          </div>

          <div className="contact-method">
            <Mail className="contact-icon" />
            <span className="contact-text">mlop.dev@outlook.com</span>
          </div>

          <button 
            className="contact-cta"
            onClick={() => window.open("https://wa.me/528126991531", "_blank")}
          >
            <MessageCircle size={20} />
            Enviar WhatsApp
          </button>
        </div>

        <div className="contacto-map">
          <iframe 
            className="map-frame"
            src="https://maps.google.com/maps?q=Microndas,Guadalupe,CP67199,NuevoLeon,Mexico&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación CustomSoft"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
