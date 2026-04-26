import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "material-symbols/outlined.css";

// Add 'fonts-loaded' class once all fonts (including Material Symbols) are ready.
// Until then, CSS hides .material-symbols-outlined to prevent raw text flashing.
document.fonts.ready.then(() => {
  document.documentElement.classList.add("fonts-loaded");
});

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
