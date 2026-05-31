import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Globe, Monitor, ShoppingBag, Users, FileText, Wrench, ArrowRight, Megaphone, Bot } from "lucide-react";
import "./Servicios.css";

const services = [
  {
    Icon: Globe,
    tag: "Web",
    title: "Páginas Web",
    desc: "Sitios modernos, rápidos y optimizados para SEO que convierten visitantes en clientes. Diseño responsivo y profesional.",
  },
  {
    Icon: Monitor,
    tag: "Software",
    title: "Software a Medida",
    desc: "Sistemas personalizados para tus procesos únicos. Mayor eficiencia, menos errores y control total sobre tu operación.",
  },
  {
    Icon: ShoppingBag,
    tag: "Retail",
    title: "Inventarios y POS",
    desc: "Control de existencias, ventas y caja desde una sola plataforma. Reportes en tiempo real y alertas automáticas.",
  },
  {
    Icon: Users,
    tag: "RRHH",
    title: "Gestión de Empleados",
    desc: "Asistencia, nómina, permisos y evaluaciones. Todo integrado para que tu equipo funcione sin fricción.",
  },
  {
    Icon: FileText,
    tag: "Admin",
    title: "Cotizaciones y Facturación",
    desc: "Genera presupuestos y facturas en segundos. Historial de clientes, seguimiento de pagos y reportes automáticos.",
  },
  {
    Icon: Wrench,
    tag: "Soporte",
    title: "Mantenimiento de Software",
    desc: "Soporte continuo, corrección de errores y actualizaciones. Tu sistema siempre funcionando al 100%.",
  },
  {
    Icon: Megaphone,
    tag: "Marketing",
    title: "Marketing Digital",
    desc: "Campañas de publicidad en Meta orientadas a generar contactos reales. Alcanzá miles de personas y recibí conversaciones por WhatsApp cada semana.",
  },
  {
    Icon: Bot,
    tag: "IA",
    title: "Chatbots con IA",
    desc: "Automatizá tu atención al cliente con chatbots inteligentes para WhatsApp. Respuestas 24/7, historial de clientes, agendamiento y más.",
  },
];

const Servicios = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".srv-header"), {
      y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
    });
    gsap.from(ref.current.querySelectorAll(".srv-card"), {
      y: 60, opacity: 0, scale: 0.95, stagger: 0.09, duration: 0.6,
      ease: "back.out(1.3)", delay: 0.35,
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="srv-page">
      <div className="srv-bg" aria-hidden="true">
        <div className="srv-orb srv-orb--1" />
        <div className="srv-orb srv-orb--2" />
        <div className="srv-grid-pat" />
      </div>

      <div className="srv-inner">
        <div className="srv-header">
          <span className="srv-label">Lo que ofrezco</span>
          <h1 className="srv-title">Servicios</h1>
          <p className="srv-subtitle">
            Soluciones digitales a medida para impulsar el crecimiento real de tu negocio.
          </p>
        </div>

        <div className="srv-grid">
          {services.map(({ Icon, tag, title, desc }) => (
            <div key={title} className="srv-card">
              <div className="srv-card-top">
                <div className="srv-card-icon">
                  <Icon className="srv-icon-svg" />
                </div>
                <span className="srv-card-tag">{tag}</span>
              </div>
              <h3 className="srv-card-title">{title}</h3>
              <p className="srv-card-desc">{desc}</p>
              <a
                href="https://wa.me/528118474519"
                target="_blank"
                rel="noreferrer"
                className="srv-card-link"
              >
                Cotizar <ArrowRight className="srv-arrow" />
              </a>
            </div>
          ))}
        </div>

        <div className="srv-cta">
          <h2 className="srv-cta-title">¿Tienes un proyecto diferente en mente?</h2>
          <p className="srv-cta-desc">Cuéntame tu idea y encontramos la solución ideal juntos.</p>
          <a
            href="https://wa.me/528118474519"
            target="_blank"
            rel="noreferrer"
            className="srv-cta-btn"
          >
            Hablemos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
