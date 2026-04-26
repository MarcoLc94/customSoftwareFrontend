import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Navbar.css";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const navRef = useRef<HTMLElement>(null);

  // ── Scroll effect ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Route change → close menu + scroll to top ──────────────────────────────
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // ── Block body scroll while mobile menu is open ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // ── Entrance animation (mount only) ───────────────────────────────────────
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Logo slides in from left — always
    gsap.from(".navbar-logo", {
      x: -50,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
    });

    // Actions slide in from right — always
    gsap.from(".navbar-actions", {
      x: 50,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
    });

    // Desktop links drop down with stagger — desktop only
    mm.add("(min-width: 993px)", () => {
      gsap.from(".nav-link", {
        y: -20,
        opacity: 0,
        stagger: 0.09,
        duration: 0.55,
        ease: "power2.out",
        delay: 0.2,
      });
    });
  }, { scope: navRef });

  // ── Mobile menu: link stagger open / reverse on close ─────────────────────
  useEffect(() => {
    if (window.innerWidth > 992) return;
    if (!navRef.current) return;

    const links = navRef.current.querySelectorAll<HTMLElement>(".navbar-links .nav-link");

    if (mobileMenuOpen) {
      // Container slides in via CSS (left: 0). Links stagger after the slide starts.
      gsap.fromTo(
        links,
        { x: -35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.38,
          ease: "power2.out",
          delay: 0.28,        // gives CSS transition time to start sliding
          overwrite: true,
        }
      );
    } else {
      // Reverse stagger (last link first), then reset props for next open
      gsap.to(links, {
        x: -25,
        opacity: 0,
        stagger: { each: 0.06, from: "end" },
        duration: 0.22,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => gsap.set(links, { clearProps: "x,opacity" }),
      });
    }
  }, [mobileMenuOpen]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const isActive = (path: string) => location.pathname === path;

  const ThemeToggle = () => (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      <div className={`toggle-track ${theme}`}>
        <div className="toggle-thumb">
          <span className="material-symbols-outlined">
            {theme === "light" ? "light_mode" : "dark_mode"}
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <span className="logo-text">Desarrollo Web & Mobile</span>
        </Link>
      </div>

      <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
        <Link to="/"          className={`nav-link ${isActive("/")          ? "active" : ""}`}>Inicio</Link>
        <Link to="/servicios" className={`nav-link ${isActive("/servicios") ? "active" : ""}`}>Servicios</Link>
        <Link to="/proceso"   className={`nav-link ${isActive("/proceso")   ? "active" : ""}`}>Proceso</Link>
        <Link to="/contacto"  className={`nav-link ${isActive("/contacto")  ? "active" : ""}`}>Contacto</Link>
      </div>

      <div className="navbar-actions">
        <ThemeToggle />
        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
