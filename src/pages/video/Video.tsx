import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MuxPlayer from "@mux/mux-player-react";
import "./Video.css";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const [videoSrc] = useState("/videos/Agent_video_Pippit_20260519045219.mp4");
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.querySelector(".vdemo-heading"), {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(ref.current.querySelector(".vdemo-player-wrap"), {
      y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ref.current.querySelector(".vdemo-player-wrap"), start: "top 85%" },
    });
    gsap.from(ref.current.querySelector(".vdemo-cta"), {
      y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ref.current.querySelector(".vdemo-cta"), start: "top 90%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="vdemo-section">
      <div className="vdemo-glow" aria-hidden="true" />

      <div className="vdemo-inner">
        <div className="vdemo-heading">
          <span className="vdemo-label">Demo en vivo</span>
          <h2 className="vdemo-title">¿Listo para transformar tu negocio?</h2>
          <p className="vdemo-subtitle">
            Mira cómo nuestro software optimiza el flujo de trabajo de empresas reales.
          </p>
        </div>

        <div className="vdemo-player-wrap">
          <MuxPlayer
            playbackId=""
            src={videoSrc}
            metadata={{ video_title: "CustomSoft - Marketing Video", viewer_user_id: "guest" }}
            primaryColor="#38bdf8"
            secondaryColor="#ffffff"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="vdemo-cta">
          <p className="vdemo-cta-text">
            Agenda una llamada gratuita y cuéntame tu proyecto.
          </p>
          <a
            href="https://wa.me/528118474519"
            target="_blank"
            rel="noreferrer"
            className="vdemo-btn"
          >
            Comenzar ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Video;
