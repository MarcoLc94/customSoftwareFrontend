import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="prv-page">
      <div className="prv-bg" aria-hidden="true">
        <div className="prv-orb prv-orb--1" />
        <div className="prv-orb prv-orb--2" />
        <div className="prv-grid-pat" />
      </div>

      <div className="prv-inner">
        <span className="prv-label">Legal</span>
        <h1 className="prv-title">Aviso de Privacidad</h1>
        <p className="prv-updated">Última actualización: 18 de mayo de 2025</p>

        <p className="prv-intro">
          Marco Dev, con domicilio en Guadalupe, Nuevo León, México, es responsable del
          tratamiento de los datos personales que usted nos proporcione a través de este
          sitio web y nuestros canales de contacto. El presente aviso describe qué datos
          recopilamos, cómo los usamos y cuáles son sus derechos.
        </p>

        <h2 className="prv-heading">1. Datos personales que recopilamos</h2>
        <p>Podemos recopilar la siguiente información cuando usted interactúa con nosotros:</p>
        <ul className="prv-list">
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono / WhatsApp</li>
          <li>Nombre de empresa (si aplica)</li>
          <li>Descripción del proyecto o consulta que nos envíe</li>
          <li>Datos de navegación (dirección IP, tipo de navegador, páginas visitadas)
            recopilados de forma automática mediante cookies y herramientas de análisis</li>
        </ul>

        <h2 className="prv-heading">2. Finalidades del tratamiento</h2>
        <p>Utilizamos sus datos para:</p>
        <ul className="prv-list">
          <li>Responder solicitudes de cotización y consultas de desarrollo de software</li>
          <li>Enviar propuestas, presupuestos y actualizaciones de proyecto</li>
          <li>Mejorar la experiencia de navegación en nuestro sitio web</li>
          <li>Medir el rendimiento de nuestras campañas de marketing digital</li>
          <li>Cumplir con obligaciones legales y fiscales</li>
        </ul>

        <h2 className="prv-heading">3. Uso de Meta Pixel y servicios de terceros</h2>
        <p>
          Este sitio web utiliza <strong>Meta Pixel (Facebook Pixel)</strong>, una
          herramienta de análisis de Meta Platforms, Inc., que nos permite medir la
          eficacia de nuestra publicidad. Meta Pixel puede recopilar información sobre
          su visita (páginas vistas, acciones realizadas) y asociarla con su cuenta de
          Facebook/Instagram si la tiene activa.
        </p>
        <p>
          Adicionalmente podemos utilizar servicios como <strong>Google Analytics</strong>,{" "}
          <strong>WhatsApp Business</strong> y herramientas de alojamiento web. Estos
          terceros tienen sus propias políticas de privacidad y pueden estar ubicados
          fuera de México.
        </p>
        <p>
          No vendemos ni cedemos sus datos personales a terceros con fines comerciales
          ajenos a los descritos en este aviso.
        </p>

        <h2 className="prv-heading">4. Cookies</h2>
        <p>
          Utilizamos cookies propias y de terceros para fines estadísticos y
          publicitarios. Al continuar navegando en nuestro sitio, usted acepta el uso
          de cookies conforme a este aviso. Puede desactivarlas en la configuración
          de su navegador, aunque esto podría afectar algunas funciones del sitio.
        </p>

        <h2 className="prv-heading">5. Transferencia de datos</h2>
        <p>
          Sus datos podrán ser compartidos con prestadores de servicios que actúen en
          nuestro nombre (hosting, herramientas de análisis, plataformas de
          comunicación) bajo acuerdos de confidencialidad. No realizamos transferencias
          a terceros con fines distintos a los señalados.
        </p>

        <h2 className="prv-heading">6. Derechos ARCO</h2>
        <p>
          Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong>{" "}
          (derechos ARCO) al tratamiento de sus datos personales. Para ejercerlos,
          envíe una solicitud a:
        </p>
        <ul className="prv-list">
          <li>Correo: <a href="mailto:mlop.dev@outlook.com">mlop.dev@outlook.com</a></li>
          <li>WhatsApp: <a href="https://wa.me/528118474519" target="_blank" rel="noreferrer">+52 81 1847 4519</a></li>
        </ul>
        <p>
          Responderemos su solicitud en un plazo máximo de 20 días hábiles conforme
          a la Ley Federal de Protección de Datos Personales en Posesión de los
          Particulares (LFPDPPP).
        </p>

        <h2 className="prv-heading">7. Conservación de datos</h2>
        <p>
          Conservamos sus datos mientras exista una relación comercial activa o durante
          el tiempo necesario para cumplir las finalidades descritas y las obligaciones
          legales aplicables.
        </p>

        <h2 className="prv-heading">8. Cambios a este aviso</h2>
        <p>
          Nos reservamos el derecho de modificar este aviso en cualquier momento. La
          versión vigente siempre estará disponible en esta página con la fecha de
          última actualización.
        </p>

        <h2 className="prv-heading">9. Contacto</h2>
        <p>Para cualquier duda relacionada con este aviso de privacidad:</p>
        <ul className="prv-list">
          <li><strong>Marco Dev</strong></li>
          <li>Guadalupe, Nuevo León, México</li>
          <li><a href="mailto:mlop.dev@outlook.com">mlop.dev@outlook.com</a></li>
          <li><a href="https://wa.me/528118474519" target="_blank" rel="noreferrer">+52 81 1847 4519</a></li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
