import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Navbar.css";

gsap.registerPlugin(useGSAP);

const LOGO_LETTERS = "Marco Dev".split("");

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const idleCallRef = useRef<gsap.core.Tween | null>(null);
  const variantRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // ── 1. Entrance + idle loop ────────────────────────────────────────────────
  useGSAP(() => {
    if (!navRef.current) return;

    const getLetters = () => navRef.current!.querySelectorAll<HTMLElement>(".logo-letter");
    const getLinks = () => navRef.current!.querySelectorAll<HTMLElement>(".nav-link");

    // ── Logo variants (4) ──────────────────────────────────────────────────
    const playLogoVariant = (v: number) => {
      const letters = getLetters();
      if (!letters.length) return;
      switch (v % 4) {
        case 0: // Shimmer — each letter flashes accent color left→right
          gsap.fromTo(letters,
            { color: "#ffffff" },
            {
              color: "var(--color-accent, #38bdf8)", duration: 0.08, stagger: 0.06,
              yoyo: true, repeat: 1, ease: "none"
            }
          );
          break;
        case 1: // Wave — letters bounce up in sequence
          gsap.fromTo(letters,
            { y: 0 },
            {
              y: -7, duration: 0.18, stagger: 0.055,
              yoyo: true, repeat: 1, ease: "sine.inOut"
            }
          );
          break;
        case 2: // Glitch — chaotic horizontal displacement
          gsap.to(letters, {
            x: () => gsap.utils.random(-4, 4),
            duration: 0.06, stagger: 0.03,
            yoyo: true, repeat: 3, ease: "none",
            onComplete: () => { gsap.set(letters, { x: 0 }) },
          });
          break;
        case 3: // Scale pulse — letters stretch vertically one by one
          gsap.fromTo(letters,
            { scaleY: 1, transformOrigin: "bottom center" },
            {
              scaleY: 1.3, duration: 0.14, stagger: 0.05,
              yoyo: true, repeat: 1, ease: "power2.out"
            }
          );
          break;
      }
    };

    // ── Links variants (4) ─────────────────────────────────────────────────
    const playLinksVariant = (v: number) => {
      const items = getLinks();
      if (!items.length) return;
      switch (v % 4) {
        case 0: // Stagger wave up
          gsap.fromTo(items,
            { y: 0 },
            {
              y: -6, duration: 0.2, stagger: 0.1,
              yoyo: true, repeat: 1, ease: "sine.inOut"
            }
          );
          break;
        case 1: // Opacity flicker
          gsap.fromTo(items,
            { opacity: 1 },
            {
              opacity: 0.2, duration: 0.12, stagger: 0.08,
              yoyo: true, repeat: 1, ease: "none"
            }
          );
          break;
        case 2: // Stagger wave down
          gsap.fromTo(items,
            { y: 0 },
            {
              y: 5, duration: 0.18, stagger: 0.1,
              yoyo: true, repeat: 1, ease: "sine.inOut"
            }
          );
          break;
        case 3: // Scale subtle
          gsap.fromTo(items,
            { scale: 1 },
            {
              scale: 1.12, duration: 0.15, stagger: 0.08,
              yoyo: true, repeat: 1, ease: "back.out(2)"
            }
          );
          break;
      }
    };

    // Entrance — logo from left, links alternate top/bottom, actions from right
    const mm = gsap.matchMedia();

    gsap.from(".navbar-logo", {
      x: -32, opacity: 0, duration: 0.9, ease: "expo.out", delay: 0.2,
    });
    gsap.from(".navbar-actions", {
      x: 50, opacity: 0, duration: 0.75, ease: "power3.out",
    });

    mm.add("(min-width: 993px)", () => {
      Array.from(getLinks()).forEach((link, i) => {
        gsap.from(link, {
          y: i % 2 === 0 ? -48 : 48,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(2)",
          delay: 0.45 + i * 0.12,
        });
      });
    });

    // Idle loop — fires every 8s
    const scheduleIdle = (delay: number) => {
      idleCallRef.current = gsap.delayedCall(delay, () => {
        if (window.innerWidth > 992) {
          playLogoVariant(variantRef.current);
          playLinksVariant(variantRef.current);
          variantRef.current++;
        }
        scheduleIdle(8);
      });
    };
    scheduleIdle(8);

    return () => { idleCallRef.current?.kill(); };
  }, { scope: navRef });

  // ── 2. Scroll exit / reverse ───────────────────────────────────────────────
  useEffect(() => {
    if (!navRef.current) return;

    const logo = navRef.current.querySelector<HTMLElement>(".navbar-logo");
    const links = navRef.current.querySelectorAll<HTMLElement>(".nav-link");

    if (scrolled) {
      gsap.to(logo, { scale: 0.88, x: -6, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      gsap.to(links, { y: -4, stagger: 0.05, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    } else {
      gsap.to(logo, { scale: 1, x: 0, duration: 0.55, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
      gsap.to(links, { y: 0, stagger: 0.05, duration: 0.45, ease: "back.out(2)", overwrite: "auto" });
    }
  }, [scrolled]);

  // ── 3. Mobile menu link stagger ────────────────────────────────────────────
  useEffect(() => {
    if (window.innerWidth > 992 || !navRef.current) return;
    const links = navRef.current.querySelectorAll<HTMLElement>(".navbar-links .nav-link");

    if (mobileMenuOpen) {
      gsap.fromTo(links,
        { x: -35, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.38, ease: "power2.out", delay: 0.28, overwrite: true }
      );
    } else {
      gsap.to(links, {
        x: -25, opacity: 0,
        stagger: { each: 0.06, from: "end" },
        duration: 0.22, ease: "power2.in", overwrite: true,
        onComplete: () => { gsap.set(links, { clearProps: "x,opacity" }); },
      });
    }
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Marco Dev" className="navbar-logo-img" />
          <div className="logo-text-group">
            <span className="logo-text">
              {LOGO_LETTERS.map((char, i) => (
                <span key={i} className="logo-letter">
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
            <span className="logo-subtitle">Desarrollo web, Android &amp; IOS</span>
          </div>
        </Link>
      </div>

      <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Inicio</Link>
        <Link to="/servicios" className={`nav-link ${isActive("/servicios") ? "active" : ""}`}>Servicios</Link>
        <Link to="/proceso" className={`nav-link ${isActive("/proceso") ? "active" : ""}`}>Proceso</Link>
        <Link to="/contacto" className={`nav-link ${isActive("/contacto") ? "active" : ""}`}>Contacto</Link>
      </div>

      <div className="navbar-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
        >
          <div className={`toggle-track ${theme}`}>
            <div className="toggle-thumb">
              <span key={theme} className="material-symbols-outlined">
                {theme === "light" ? "light_mode" : "dark_mode"}
              </span>
            </div>
          </div>
        </button>

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
