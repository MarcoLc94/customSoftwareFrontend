import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../components/CustomButton/CustomButton";

import How from "../how/How";
import Testimonials from "../testimonials/Testimonials";
import Video from "../video/Video";
import Benefits from "../benefits/Benefits";
import Tip from "../tip/Tip";
import ServiciosSection from "./ServiciosSection";

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
            .from(q(".hero-grid"),  { opacity: 0,                     duration: 1.4,  ease: "power2.out"     }, 0)
            .from(q(".hero-badge"), { y: 28, opacity: 0, scale: 0.82, duration: 0.62, ease: "back.out(2.4)"  }, 0.25)
            .from(q(".title"),      { y: 68, opacity: 0,              duration: 0.88, ease: "power3.out"      }, 0.5)
            .from(q(".slogan"),     { y: 42, opacity: 0,              duration: 0.72, ease: "power2.out"      }, 0.72)
            .from(q(".button-div"), { y: 28, opacity: 0, scale: 0.88, duration: 0.62, ease: "back.out(1.9)"  }, 0.9);
    }, { scope: heroRef });

    // ── Scroll animations: useEffect runs after ALL useLayoutEffects ─────────
    // ── This guarantees ScrollSmoother (created in Layout's useGSAP) exists ──
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const q       = (s: string) => hero.querySelector<HTMLElement>(s);
        const badge   = q(".hero-badge");
        const title   = q(".title");
        const slogan  = q(".slogan");
        const btn     = q(".button-div");
        const orb1    = q(".hero-orb--1");
        const orb2    = q(".hero-orb--2");
        const orb3    = q(".hero-orb--3");

        ScrollTrigger.refresh();

        // Orb parallax — different scrub speeds simulate depth layers
        const p1 = gsap.to(orb1, { y: -120, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.6 } });
        const p2 = gsap.to(orb2, { y: -70,  ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 2.4 } });
        const p3 = gsap.to(orb3, { y: -40,  ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 3.2 } });

        // Exit (top→bottom stagger) / Reverse (bottom→top stagger)
        const exitST = ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: "bottom top",
            onLeave: () => {
                gsap.to(badge,  { y: -32, opacity: 0, scale: 0.88, duration: 0.30, ease: "power2.in", delay: 0,    overwrite: "auto" });
                gsap.to(title,  { y: -65, opacity: 0,              duration: 0.44, ease: "power2.in", delay: 0.06, overwrite: "auto" });
                gsap.to(slogan, { y: -40, opacity: 0,              duration: 0.36, ease: "power2.in", delay: 0.11, overwrite: "auto" });
                gsap.to(btn,    { y: -24, opacity: 0, scale: 0.94, duration: 0.28, ease: "power2.in", delay: 0.16, overwrite: "auto" });
            },
            onEnterBack: () => {
                gsap.to(btn,    { y: 0, opacity: 1, scale: 1, duration: 0.50, ease: "back.out(1.9)",       delay: 0,    overwrite: "auto" });
                gsap.to(slogan, { y: 0, opacity: 1,           duration: 0.58, ease: "back.out(1.6)",       delay: 0.08, overwrite: "auto" });
                gsap.to(title,  { y: 0, opacity: 1,           duration: 0.70, ease: "back.out(2.1)",       delay: 0.15, overwrite: "auto" });
                gsap.to(badge,  { y: 0, opacity: 1, scale: 1, duration: 0.60, ease: "elastic.out(1, 0.6)", delay: 0.24, overwrite: "auto" });
            },
        });

        return () => {
            exitST.kill();
            p1.scrollTrigger?.kill();
            p2.scrollTrigger?.kill();
            p3.scrollTrigger?.kill();
        };
    }, []);

    return (
        <div className="main-container" id="home">
            <div ref={heroRef} className="inicio-container">

                <div className="hero-bg" aria-hidden="true">
                    <div className="hero-orb hero-orb--1" />
                    <div className="hero-orb hero-orb--2" />
                    <div className="hero-orb hero-orb--3" />
                    <div className="hero-grid" />
                </div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge__dot" />
                        Desarrollo profesional de software
                    </div>

                    <h1 className="title">
                        Software, Páginas Web<br />
                        y Apps <span>a tu medida</span>
                    </h1>

                    <p className="slogan">
                        Deja tu proyecto en manos de un profesional.
                        <br />
                        Página web, aplicación móvil o de escritorio, Inteligencia Artificial.
                    </p>

                    <div className="button-div">
                        <a href="https://wa.me/528124493708" target="_blank" rel="noreferrer">
                            <Button className="button--shadow-small button--rounded-large">
                                Cotiza Gratis
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            <ServiciosSection />
            <Tip />
            <Benefits />
            <How />
            <Video />
            <Testimonials />
        </div>
    );
};

export default Inicio;
