import { useEffect, useRef } from "react";
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
      {/* Container is relative to hold the canvas background */}
      <div className="inicio-container" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Canvas fits 100% of this specific container */}
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
                <Button className="button--primary button--shadow-small button--rounded-large">
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
