
import { useState } from "react";
import Layout from "./pages/layout/Layout";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Plans from "./pages/plans/Plans";
import Test from "./pages/test/Test";
import Servicios from "./pages/servicios/Servicios";
import Proceso from "./pages/proceso/Proceso";
import Contacto from "./pages/contacto/Contacto";
import Inicio from "./pages/inicio/Inicio";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import TermsOfService from "./pages/terms/TermsOfService";
import DataDeletion from "./pages/datadeletion/DataDeletion";


const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [navReady, setNavReady] = useState(false);

  return (
    <div>
      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
          onExitStart={() => setNavReady(true)}
        />
      )}
      <Routes>
        <Route path="/" element={<Layout navReady={navReady} />}>
          <Route index element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/proceso" element={<Proceso />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/test" element={<Test />} />
          <Route path="/aviso-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-de-servicio" element={<TermsOfService />} />
          <Route path="/eliminacion-de-datos" element={<DataDeletion />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
