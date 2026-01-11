import Inicio from "./pages/inicio/Inicio";
import Layout from "./pages/layout/Layout";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Plans from "./pages/plans/Plans";
import Rutines from "./pages/rutines/Rutines";
import Test from "./pages/test/Test";
import AdminPanel from "./pages/adminPanel/AdminPanel";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/rutinas" element={<Rutines />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
