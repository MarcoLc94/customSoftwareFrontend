import "./DataDeletion.css";

const DataDeletion = () => {
  return (
    <div className="del-page">
      <div className="del-bg" aria-hidden="true">
        <div className="del-orb del-orb--1" />
        <div className="del-orb del-orb--2" />
        <div className="del-grid-pat" />
      </div>

      <div className="del-inner">
        <span className="del-label">Legal</span>
        <h1 className="del-title">Eliminación de Datos de Usuario</h1>
        <p className="del-updated">Última actualización: 18 de mayo de 2025</p>

        <p className="del-intro">
          En Marco Dev respetamos su derecho a controlar sus datos personales. Si desea
          que eliminemos la información que hemos recopilado sobre usted, siga las
          instrucciones a continuación.
        </p>

        <h2 className="del-heading">¿Qué datos podemos tener sobre usted?</h2>
        <ul className="del-list">
          <li>Nombre y datos de contacto proporcionados a través de nuestros formularios.</li>
          <li>Información de interacción recopilada mediante Meta Pixel u otras herramientas
            de análisis vinculadas a su actividad en nuestro sitio.</li>
          <li>Mensajes o consultas enviadas por WhatsApp o correo electrónico.</li>
        </ul>

        <h2 className="del-heading">Cómo solicitar la eliminación de sus datos</h2>
        <p>Envíenos una solicitud de eliminación por cualquiera de estos medios:</p>

        <div className="del-card">
          <h3 className="del-card-title">Por correo electrónico</h3>
          <p>
            Envíe un correo a{" "}
            <a href="mailto:mlop.dev@outlook.com">mlop.dev@outlook.com</a>{" "}
            con el asunto <strong>"Solicitud de eliminación de datos"</strong> e
            indique el nombre y correo electrónico asociados a su información.
          </p>
        </div>

        <div className="del-card">
          <h3 className="del-card-title">Por WhatsApp</h3>
          <p>
            Escríbanos a{" "}
            <a href="https://wa.me/528118474519" target="_blank" rel="noreferrer">
              +52 81 1847 4519
            </a>{" "}
            indicando su nombre y solicitando la eliminación de sus datos personales.
          </p>
        </div>

        <h2 className="del-heading">Proceso y tiempos</h2>
        <ul className="del-list">
          <li>Confirmaremos la recepción de su solicitud en un plazo de <strong>3 días hábiles</strong>.</li>
          <li>Procederemos a eliminar su información en un máximo de <strong>20 días hábiles</strong>
            conforme a la LFPDPPP.</li>
          <li>Le notificaremos por el mismo medio cuando el proceso haya concluido.</li>
        </ul>

        <h2 className="del-heading">Datos de Meta / Facebook</h2>
        <p>
          Si su solicitud está relacionada con datos recopilados a través de Meta
          Pixel o la plataforma de Facebook, también puede gestionar sus preferencias
          directamente desde la configuración de su cuenta de Facebook en:{" "}
          <a href="https://www.facebook.com/help/contact/540977946302970" target="_blank" rel="noreferrer">
            Centro de Ayuda de Meta
          </a>.
        </p>

        <h2 className="del-heading">Contacto</h2>
        <ul className="del-list">
          <li><strong>Marco Dev</strong></li>
          <li>Guadalupe, Nuevo León, México</li>
          <li><a href="mailto:mlop.dev@outlook.com">mlop.dev@outlook.com</a></li>
          <li><a href="https://wa.me/528118474519" target="_blank" rel="noreferrer">+52 81 1847 4519</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DataDeletion;
