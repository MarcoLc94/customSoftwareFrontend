import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, ShoppingBag, Users, FileText, Globe, Wrench } from "lucide-react";
import "./ServiciosSection.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
    { icon: <Globe className="ss-icon" />,       title: "Páginas Web",                desc: "Sitios web rápidos, modernos y optimizados para convertir visitantes en clientes." },
    { icon: <Monitor className="ss-icon" />,     title: "Software a Medida",          desc: "Soluciones adaptadas exactamente a los flujos de trabajo únicos de tu negocio." },
    { icon: <ShoppingBag className="ss-icon" />, title: "Inventarios y POS",          desc: "Gestiona existencias, ventas y caja desde una sola plataforma." },
    { icon: <Users className="ss-icon" />,       title: "Gestión de Empleados",       desc: "Optimiza RRHH, asistencia y coordinación de tu equipo." },
    { icon: <FileText className="ss-icon" />,    title: "Cotizaciones y Facturación", desc: "Genera presupuestos y facturas profesionales en segundos." },
    { icon: <Wrench className="ss-icon" />,      title: "Mantenimiento de Software",  desc: "Soporte continuo, actualizaciones y corrección de errores para tus sistemas." },
];

const ServiciosSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const heading = sectionRef.current.querySelector<HTMLElement>(".ss-heading");
        const cards = sectionRef.current.querySelectorAll<HTMLElement>(".ss-card");

        gsap.from(heading, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
            },
        });

        gsap.from(cards, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            stagger: 0.09,
            duration: 0.55,
            ease: "back.out(1.4)",
            scrollTrigger: {
                trigger: cards[0],
                start: "top 88%",
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="ss-section" id="servicios-home">
            <div className="ss-inner">
                <div className="ss-heading">
                    <span className="ss-label">Lo que ofrezco</span>
                    <h2 className="ss-title">Servicios</h2>
                    <p className="ss-subtitle">
                        Tecnología a medida para impulsar el crecimiento de tu negocio.
                    </p>
                </div>

                <div className="ss-grid">
                    {services.map((s, i) => (
                        <div key={i} className="ss-card">
                            <div className="ss-icon-wrap">{s.icon}</div>
                            <h3 className="ss-card-title">{s.title}</h3>
                            <p className="ss-card-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiciosSection;
