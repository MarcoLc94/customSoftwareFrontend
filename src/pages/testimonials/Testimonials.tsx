import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    img: "/new-logo.jpeg",
    name: "David Torres",
    role: "CEO, ATS Productos",
    location: "Salinas Victoria, NL",
    stars: 5,
    text: "Necesitábamos un sistema de inventario a medida para nuestros almacenes. Las soluciones comerciales eran muy rígidas. Marco Dev entendió nuestro flujo y creó una herramienta perfecta. Redujimos pérdidas un 20% en el primer trimestre.",
  },
  {
    img: "/losreyes.jpg",
    name: "Joaquin Almaguer",
    role: "CEO, Gruas Los Reyes",
    location: "Guadalupe, NL",
    stars: 4,
    text: "Necesitábamos ayuda para atraer nuevos clientes y prospectos. El sitio web que desarrollaron para nosotros aumentó nuestro tráfico y ventas considerablemente.",
  },
  {
    img: "/autocerrajeria.jpg",
    name: "Humberto Lopez",
    role: "Dueño, Autocerrajería",
    location: "Guadalupe, NL",
    stars: 5,
    text: "Quería un sitio web para mostrar mis servicios y productos. El equipo me entregó una solución rápida, bonita y fácil de usar para mis clientes. ¡El soporte es excelente!",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="testi-stars" aria-label={`${count} de 5 estrellas`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "star star--on" : "star star--off"}>★</span>
    ))}
  </div>
);

const Testimonials = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".testi-heading"), {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(ref.current.querySelectorAll(".testi-card"), {
      y: 50, opacity: 0, stagger: 0.14, duration: 0.65, ease: "back.out(1.3)",
      scrollTrigger: { trigger: ref.current.querySelector(".testi-grid"), start: "top 82%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="testi-section">
      <div className="testi-inner">
        <div className="testi-heading">
          <span className="testi-label">Casos de éxito</span>
          <h2 className="testi-title">Lo que dicen mis clientes</h2>
          <p className="testi-subtitle">
            Empresas reales que confiaron en Marco Dev para crecer.
          </p>
        </div>

        <div className="testi-grid">
          {reviews.map((r, i) => (
            <div key={i} className="testi-card">
              <span className="testi-quote" aria-hidden="true">"</span>
              <p className="testi-text">{r.text}</p>
              <Stars count={r.stars} />
              <div className="testi-author">
                <img src={r.img} alt={r.name} className="testi-avatar" />
                <div className="testi-author-info">
                  <span className="testi-name">{r.name}</span>
                  <span className="testi-role">{r.role}</span>
                  <span className="testi-location">{r.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
