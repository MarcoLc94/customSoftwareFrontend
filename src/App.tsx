
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


const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/proceso" element={<Proceso />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
