import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <span className={`logo-text ${scrolled ? "scrolled-text" : ""}`}>
            CustomSoft
          </span>
          <span
            className={`material-symbols-outlined  ${
              scrolled ? "scrolled-text" : ""
            }`}
          >
            mode_off_on
          </span>
        </Link>
      </div>

      <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
        <Link
          to="/"
          className={`nav-link ${scrolled ? "scrolled-text" : ""}`}
          onClick={handleHomeClick}
        >
          Home
        </Link>
        <Link
          to="/"
          className={`nav-link ${scrolled ? "scrolled-text" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Services
        </Link>
        <Link
          to="/"
          className={`nav-link ${scrolled ? "scrolled-text" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Process
        </Link>
        <Link
          to="/"
          className={`nav-link ${scrolled ? "scrolled-text" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          to="/admin"
          className={`nav-link ${scrolled ? "scrolled-text" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Admin
        </Link>
      </div>
      <div className="navbar-cta">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Cambiar a modo ${
            theme === "light" ? "oscuro" : "claro"
          }`}
        >
          <div className={`toggle-track ${theme}`}>
            <div className="toggle-thumb">
              {theme === "light" ? (
                <span className="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )}
            </div>
          </div>
        </button>
      </div>

      <div
        className={`mobile-menu-button ${scrolled ? "scrolled-text" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <button
          className="theme-toggle"
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
          aria-label={`Cambiar a modo ${
            theme === "light" ? "oscuro" : "claro"
          }`}
        >
          <div className={`toggle-track ${theme}`}>
            <div className="toggle-thumb">
              {theme === "light" ? (
                <span className="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )}
            </div>
          </div>
        </button>
      </div>
      <div
        className={`mobile-menu-button ${scrolled ? "scrolled-text" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </div>
    </nav>
  );
};

export default Navbar;
