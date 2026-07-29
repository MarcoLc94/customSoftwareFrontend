import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../components/CustomButton/CustomButton";
import HeroBackground from "../../components/HeroBackground/HeroBackground";
import HeroShowcase from "../../components/HeroShowcase/HeroShowcase";

import How from "../how/How";
import Testimonials from "../testimonials/Testimonials";
import Benefits from "../benefits/Benefits";
import Tip from "../tip/Tip";
import ServiciosSection from "./ServiciosSection";
import Portfolio from "../../components/Portfolio/Portfolio";

import "./Inicio.css";

gsap.registerPlugin(ScrollTrigger);

const Inicio = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ── Entrance: useGSAP (= useLayoutEffect) — no scroll dependency ──────────
    useGSAP(() => {
        if (!heroRef.current) return;
        const q = (s: string) => heroRef.current!.querySelector<HTMLElement>(s);

        gsap.timeline()
            .from(q(".hero-grid"),     { opacity: 0,                     duration: 1.4,  ease: "power2.out"     }, 0)
            .from(q(".hero-showcase"), { opacity: 0, scale: 0.8,         duration: 1.1,  ease: "power3.out"      }, 0.15)
            .from(q(".title"),         { y: 68, opacity: 0,              duration: 0.88, ease: "power3.out"      }, 0.5)
            .from(q(".slogan"),        { y: 42, opacity: 0,              duration: 0.72, ease: "power2.out"      }, 0.72)
            .from(q(".button-div"),    { y: 28, opacity: 0, scale: 0.88, duration: 0.62, ease: "back.out(1.9)"  }, 0.9);
    }, { scope: heroRef });

    // ── Scroll animations: useEffect runs after ALL useLayoutEffects ─────────
    // ── This guarantees ScrollSmoother (created in Layout's useGSAP) exists ──
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const q       = (s: string) => hero.querySelector<HTMLElement>(s);
        const title   = q(".title");
        const slogan  = q(".slogan");
        const btn     = q(".button-div");

        ScrollTrigger.refresh();

        // Exit (top→bottom stagger) / Reverse (bottom→top stagger)
        const exitST = ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: "bottom top",
            onLeave: () => {
                gsap.to(title,  { y: -65, opacity: 0,              duration: 0.44, ease: "power2.in", delay: 0.06, overwrite: "auto" });
                gsap.to(slogan, { y: -40, opacity: 0,              duration: 0.36, ease: "power2.in", delay: 0.11, overwrite: "auto" });
                gsap.to(btn,    { y: -24, opacity: 0, scale: 0.94, duration: 0.28, ease: "power2.in", delay: 0.16, overwrite: "auto" });
            },
            onEnterBack: () => {
                gsap.to(btn,    { y: 0, opacity: 1, scale: 1, duration: 0.50, ease: "back.out(1.9)",       delay: 0,    overwrite: "auto" });
                gsap.to(slogan, { y: 0, opacity: 1,           duration: 0.58, ease: "back.out(1.6)",       delay: 0.08, overwrite: "auto" });
                gsap.to(title,  { y: 0, opacity: 1,           duration: 0.70, ease: "back.out(2.1)",       delay: 0.15, overwrite: "auto" });
            },
        });

        return () => {
            exitST.kill();
        };
    }, []);

    return (
        <div className="main-container" id="home">
            <div ref={heroRef} className="inicio-container">

                <div className="hero-bg" aria-hidden="true">
                    <HeroBackground />
                    <div className="hero-grid" />
                </div>

                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="title">
                            De la idea al producto,<br />
                            <span>sin intermediarios</span>
                        </h1>

                        <p className="slogan">
                            Trabajas directo conmigo: un desarrollador experimentado.
                            Software, páginas web, apps moviles e Inteligencia Artificial
                        </p>

                        <div className="button-div">
                            <a href="https://wa.me/528118474519" target="_blank" rel="noreferrer">
                                <Button className="button--shadow-small button--rounded-large">
                                    Cotiza Gratis
                                </Button>
                            </a>
                        </div>
                    </div>

                    <HeroShowcase />
                </div>
            </div>

            <Portfolio />
            <ServiciosSection />
            <Tip />
            <Benefits />
            <How />
            <Testimonials />
        </div>
    );
};

export default Inicio;
