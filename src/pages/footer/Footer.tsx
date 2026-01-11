import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact-section">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">NutriOn</h3>
          <p className="footer-text">
            Nutrición personalizada que transforma planes en comidas listas para
            disfrutar.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Enlaces rápidos</h4>
          <ul className="footer-links">
            <li>
              <a href="/" className="footer-link">
                Inicio
              </a>
            </li>
            <li>
              <a href="/servicios" className="footer-link">
                Servicios
              </a>
            </li>
            <li>
              <a href="/menu" className="footer-link">
                Menú
              </a>
            </li>
            <li>
              <a href="/contacto" className="footer-link">
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
              info@nutrion.com
            </li>
            <li className="footer-contact-item">
              <span className="material-symbols-outlined">call</span> +52 81
              2449 3708
            </li>
            <li className="footer-contact-item">
              <span className="material-symbols-outlined">location_on</span>{" "}
              Mty, México
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} NutriOn. Todos los derechos reservados.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook">
            <span>facebook</span>
          </a>
          <a href="#" aria-label="Instagram">
            <span>instagram</span>
          </a>
          <a href="#" aria-label="Twitter">
            <span>twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
