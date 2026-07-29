import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Portfolio.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    img: "/autocerrajeria.jpg",
    name: "Autocerrajería",
    type: "Landing Page",
    label: "Ver proyecto",
    href: "https://autocerrajeria.com.mx/home",
    external: true,
  },
  {
    img: "/losreyes.jpg",
    name: "Grúas Los Reyes",
    type: "Landing Page",
    label: "Ver proyecto",
    href: "https://losreyesgruas.com/",
    external: true,
  },
  {
    img: "/new-logo.jpeg",
    name: "Software de Inventarios",
    type: "Aplicación Web",
    label: "Solicitar Demo",
    href: "https://wa.me/528118474519?text=Hola%2C%20me%20interesa%20una%20demo%20del%20Software%20de%20Inventarios",
    external: true,
  },
];

const Portfolio = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".portfolio-heading"), {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });

    gsap.from(ref.current.querySelectorAll(".portfolio-card"), {
      y: 60, opacity: 0, stagger: 0.15, duration: 0.7, ease: "back.out(1.4)",
      scrollTrigger: { trigger: ref.current.querySelector(".portfolio-grid"), start: "top 82%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="portfolio-section">
      <div className="portfolio-inner">

        <div className="portfolio-heading">
          <span className="portfolio-label">Portafolio</span>
          <h2 className="portfolio-title">Proyectos realizados</h2>
          <p className="portfolio-subtitle">
            Soluciones reales entregadas a empresas que confiaron en Marco Dev.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((p, i) => (
            <div key={i} className="portfolio-card">
              <div className="portfolio-card__img-wrap">
                <img src={p.img} alt={p.name} className="portfolio-card__img" />
                <span className="portfolio-card__type">{p.type}</span>
              </div>
              <div className="portfolio-card__body">
                <h3 className="portfolio-card__name">{p.name}</h3>
                <a
                  href={p.href}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noreferrer" : undefined}
                  className="portfolio-card__btn"
                >
                  {p.label}
                  <svg viewBox="0 0 16 16" fill="none" className="portfolio-card__btn-icon" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
