import "./TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-page">
      <div className="terms-bg" aria-hidden="true">
        <div className="terms-orb terms-orb--1" />
        <div className="terms-orb terms-orb--2" />
        <div className="terms-grid-pat" />
      </div>

      <div className="terms-inner">
        <span className="terms-label">Legal</span>
        <h1 className="terms-title">Condiciones del Servicio</h1>
        <p className="terms-updated">Última actualización: 18 de mayo de 2025</p>

        <p className="terms-intro">
          Al acceder o utilizar el sitio web de <strong>Marco Dev</strong> y contratar
          cualquiera de nuestros servicios, usted acepta las presentes Condiciones del
          Servicio. Si no está de acuerdo, le pedimos que no utilice nuestros servicios.
        </p>

        <h2 className="terms-heading">1. Descripción del servicio</h2>
        <p>
          Marco Dev ofrece servicios de desarrollo de software a medida, diseño y
          desarrollo de sitios web, sistemas de gestión, aplicaciones móviles y
          consultoría tecnológica para empresas y particulares.
        </p>

        <h2 className="terms-heading">2. Uso aceptable</h2>
        <p>El usuario se compromete a:</p>
        <ul className="terms-list">
          <li>Utilizar el sitio web y los servicios conforme a la ley aplicable.</li>
          <li>No reproducir, distribuir ni explotar comercialmente el contenido de este
            sitio sin autorización escrita de Marco Dev.</li>
          <li>Proporcionar información veraz y actualizada al solicitar un servicio o
            ponerse en contacto con nosotros.</li>
          <li>No intentar acceder a sistemas, redes o datos sin autorización.</li>
        </ul>

        <h2 className="terms-heading">3. Propuestas y contratación</h2>
        <p>
          El envío de un formulario de contacto o mensaje por WhatsApp no constituye
          un contrato. La relación contractual se formaliza únicamente mediante una
          propuesta firmada o un acuerdo escrito entre ambas partes.
        </p>

        <h2 className="terms-heading">4. Propiedad intelectual</h2>
        <p>
          Todo el contenido de este sitio (textos, imágenes, logotipos, código) es
          propiedad de Marco Dev o de sus respectivos titulares. Una vez liquidado el
          proyecto, el cliente adquiere los derechos de uso del software desarrollado
          conforme a lo pactado en el contrato correspondiente.
        </p>

        <h2 className="terms-heading">5. Limitación de responsabilidad</h2>
        <p>
          Marco Dev no será responsable por daños indirectos, pérdida de datos o
          lucro cesante derivados del uso o imposibilidad de uso de los servicios,
          salvo en los casos previstos expresamente en el contrato firmado con el cliente.
        </p>

        <h2 className="terms-heading">6. Confidencialidad</h2>
        <p>
          Toda información compartida por el cliente durante el proceso de cotización
          o desarrollo será tratada con estricta confidencialidad y no será divulgada
          a terceros sin consentimiento previo.
        </p>

        <h2 className="terms-heading">7. Modificaciones</h2>
        <p>
          Marco Dev se reserva el derecho de modificar estas condiciones en cualquier
          momento. Los cambios serán publicados en esta página con la fecha de
          actualización correspondiente.
        </p>

        <h2 className="terms-heading">8. Ley aplicable</h2>
        <p>
          Estas condiciones se rigen por las leyes vigentes en los Estados Unidos
          Mexicanos. Cualquier controversia será sometida a los tribunales competentes
          de Guadalupe, Nuevo León, México.
        </p>

        <h2 className="terms-heading">9. Contacto</h2>
        <ul className="terms-list">
          <li><strong>Marco Dev</strong></li>
          <li>Guadalupe, Nuevo León, México</li>
          <li><a href="mailto:mlop.dev@outlook.com">mlop.dev@outlook.com</a></li>
          <li><a href="https://wa.me/528118474519" target="_blank" rel="noreferrer">+52 81 1847 4519</a></li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfService;
