import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact-section">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">CustomSoft</h3>
          <p className="footer-text">
            Desarrollo de software a medida que transforma procesos complejos en soluciones simples y eficientes.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li>
              <a href="/" className="footer-link">
                Inicio
              </a>
            </li>
            <li>
              <a href="/" className="footer-link">
                Servicios
              </a>
            </li>
            <li>
              <a href="/" className="footer-link">
                Proceso
              </a>
            </li>
            <li>
              <a href="/" className="footer-link">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contacto</h4>
          <ul className="footer-contact">
            <li className="footer-contact-item">
              <span className="material-symbols-outlined">mail</span>{" "}
              mlop.dev@outlook.com
            </li>
            <li className="footer-contact-item">
              <span className="material-symbols-outlined">call</span> +52 81
              18474519
            </li>
            <li className="footer-contact-item">
              <span className="material-symbols-outlined">location_on</span>{" "}
              Guadalupe, Nuevo León, México
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} CustomSoft. Todos los derechos reservados.
        </p>
        {/* <div className="footer-social">
          <a href="#" aria-label="Facebook">
            <span>facebook</span>
          </a>
          <a href="#" aria-label="Instagram">
            <span>instagram</span>
          </a>
          <a href="#" aria-label="Twitter">
            <span>twitter</span>
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
