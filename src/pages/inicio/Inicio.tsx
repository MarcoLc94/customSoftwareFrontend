import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../components/CustomButton/CustomButton";

import How from "../how/How";
import Testimonials from "../testimonials/Testimonials";

import Video from "../video/Video";
import "./Inicio.css";
import { Monitor, ShoppingBag, Users, FileText, Globe, Wrench } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import Benefits from "../benefits/Benefits";
import Tip from "../tip/Tip";

gsap.registerPlugin(ScrollTrigger);

function TorusKnot() {
    const meshRef = useRef<Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.z += 0.01;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[25, 8, 100, 16]} />
            <meshNormalMaterial wireframe={true} />
        </mesh>
    );
}

const Inicio = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        if (!heroRef.current) return;

        const title     = heroRef.current.querySelector<HTMLElement>(".title");
        const slogan    = heroRef.current.querySelector<HTMLElement>(".slogan");
        const cards     = heroRef.current.querySelectorAll<HTMLElement>(".service-card");
        const buttonDiv = heroRef.current.querySelector<HTMLElement>(".button-div");

        // ── 1. Entrance timeline ──────────────────────────────────────────────
        gsap.timeline()
            .from(title,     { y: 55,  opacity: 0, duration: 0.75, ease: "power3.out" })
            .from(slogan,    { y: 35,  opacity: 0, duration: 0.65, ease: "power2.out" }, "-=0.35")
            .from(cards,     { y: 45,  opacity: 0, scale: 0.94, stagger: 0.08, duration: 0.55, ease: "back.out(1.5)" }, "-=0.2")
            .from(buttonDiv, { y: 20,  opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.15");

        // ── 2. Exit (scroll down) / Reverse (scroll back up) ──────────────────
        ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            onLeave: () => {
                gsap.to(title,     { y: -45, opacity: 0, duration: 0.42, ease: "power2.in", overwrite: "auto" });
                gsap.to(slogan,    { y: -30, opacity: 0, duration: 0.36, ease: "power2.in", delay: 0.05, overwrite: "auto" });
                gsap.to(cards,     { y: -32, opacity: 0, scale: 0.96, stagger: 0.04, duration: 0.30, ease: "power2.in", overwrite: "auto" });
                gsap.to(buttonDiv, { y: -20, opacity: 0, duration: 0.26, ease: "power2.in", overwrite: "auto" });
            },
            onEnterBack: () => {
                gsap.to(title,     { y: 0, opacity: 1, duration: 0.62, ease: "back.out(2)",       overwrite: "auto" });
                gsap.to(slogan,    { y: 0, opacity: 1, duration: 0.55, ease: "back.out(1.7)", delay: 0.05, overwrite: "auto" });
                gsap.to(cards,     { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.50, ease: "back.out(1.5)", overwrite: "auto" });
                gsap.to(buttonDiv, { y: 0, opacity: 1, duration: 0.48, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
            },
        });
    }, { scope: heroRef });

    const services = [
        { icon: <Globe className="service-icon" />, title: "Páginas Web", desc: "Sitios web rápidos y modernos." },
        { icon: <Wrench className="service-icon" />, title: "Mantenimiento de Software", desc: "Soporte y actualizaciones para tu sistema." },
        { icon: <Monitor className="service-icon" />, title: "Software a Medida", desc: "Soluciones adaptadas a las necesidades únicas de tu negocio." },
        { icon: <ShoppingBag className="service-icon" />, title: "Inventarios y POS", desc: "Gestiona existencias y ventas eficientemente." },
        { icon: <Users className="service-icon" />, title: "Gestión de Empleados", desc: "Optimiza RRHH y la coordinación del equipo." },
        { icon: <FileText className="service-icon" />, title: "Cotizaciones y Facturación", desc: "Facturación y presupuestos profesionales." },
    ];

    return (
        <div className="main-container" id="home">
            <div ref={heroRef} className="inicio-container" style={{ position: 'relative', overflow: 'hidden' }}>

                <div className="canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <Canvas camera={{ position: [0, 0, 30], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                        <ambientLight intensity={2.8} />
                        <directionalLight position={[0, 0, 5]} intensity={2.2} />
                        <TorusKnot />
                    </Canvas>
                </div>

                <div className="bg-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 0 }}></div>

                <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 className="title">Soluciones de Software a Medida</h1>
                    <p className="slogan">
                        Haz crecer tu negocio con software especializado.
                        <br />
                        Inventarios, Punto de Venta, Gestión de Empleados y más.
                    </p>

                    <div className="services-grid">
                        {services.map((s, i) => (
                            <div key={i} className="service-card">
                                {s.icon}
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="button-div">
                        <a href="https://wa.me/528124493708" target="_blank" rel="noreferrer">
                            <Button className="button--shadow-small button--rounded-large">
                                Cotiza Gratis
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
            <Tip />
            <Benefits />
            <How />
            <Video />
            <Testimonials />
        </div>
    );
};

export default Inicio;
