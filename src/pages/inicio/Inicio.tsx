import { useEffect } from "react";
import Button from "../../components/CustomButton/CustomButton";
import Benefits from "../benefits/Benefits";
import How from "../how/How";
import Testimonials from "../testimonials/Testimonials";
import Tip from "../tip/Tip";
import Video from "../video/Video";
import "./Inicio.css";
import { Monitor,  ShoppingBag, Users, FileText } from "lucide-react";

const Inicio = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        { icon: <Monitor className="service-icon" />, title: "Custom Software", desc: "Tailored solutions for your unique business needs." },
        { icon: <ShoppingBag className="service-icon" />, title: "Inventory & POS", desc: "Manage stock and sales efficiently." },
        { icon: <Users className="service-icon" />, title: "Employee Mgmt", desc: "Streamline HR and team coordination." },
        { icon: <FileText className="service-icon" />, title: "Quotes & Billing", desc: "Professional invoicing and estimates." },
    ];

  return (
    <div className="main-container" id="home">
      <div className="inicio-container">
        <div className="hero-content">
            <h1 className="title">Custom Software Solutions</h1>
            <p className="slogan">
                Grow your business with specialized software. 
                <br />
                Inventory, Point of Sale, Employee Management, and more.
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
                Get a Free Quote
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
