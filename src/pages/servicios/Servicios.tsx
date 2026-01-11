import { useEffect } from "react";
import "./Servicios.css";
import { Code2, Globe, Wrench } from "lucide-react";

const Servicios = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Code2 className="servicio-icon" />,
      title: "Software a Medida",
      desc: "Desarrollamos soluciones personalizadas que se adaptan exactamente a los flujos de trabajo de tu empresa, aumentando la eficiencia y reduciendo errores.",
    },
    {
      icon: <Globe className="servicio-icon" />,
      title: "Sitios Web",
      desc: "Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para SEO que convierten visitantes en clientes.",
    },
    {
      icon: <Wrench className="servicio-icon" />,
      title: "Mantenimiento de Software",
      desc: "Aseguramos que tus sistemas sigan funcionando sin problemas con actualizaciones regulares, corrección de errores y soporte técnico continuo.",
    },
  ];

  return (
    <div className="servicios-container">
      <div className="servicios-content">
        <div className="servicios-header">
          <h1 className="servicios-title">Nuestros Servicios</h1>
          <p className="servicios-subtitle">
            Tecnología estratégica para impulsar el crecimiento de tu negocio.
          </p>
        </div>

        <div className="servicios-grid">
          {services.map((service, index) => (
            <div key={index} className="servicio-card">
              <div className="servicio-icon-wrapper">{service.icon}</div>
              <h3 className="servicio-title">{service.title}</h3>
              <p className="servicio-desc">{service.desc}</p>
              <button 
                className="servicio-btn"
                onClick={() => window.open("https://wa.me/528126991531", "_blank")}
              >
                Más Información
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;
