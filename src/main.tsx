import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "material-symbols/outlined.css";

// Prevent browser from restoring scroll position on reload — splash always starts at top
history.scrollRestoration = "manual";

// Wait specifically for Material Symbols before revealing icon spans.
// Fallback after 3s so icons never stay permanently hidden on slow connections.
const markFontsLoaded = () => document.documentElement.classList.add("fonts-loaded");
const fontTimeout = setTimeout(markFontsLoaded, 3000);
document.fonts.load('1em "Material Symbols Outlined"').then(() => {
  clearTimeout(fontTimeout);
  markFontsLoaded();
});

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
