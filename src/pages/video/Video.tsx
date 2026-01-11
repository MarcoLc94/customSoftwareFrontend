import { useState, useEffect } from "react";
import "./Video.css";
import MuxPlayer from "@mux/mux-player-react"; 

const Video = () => {
  const [videoSrc, setVideoSrc] = useState("/videos/customsoftdesktop.mp4");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVideoSrc("/videos/customsoftmobile.mp4");
      } else {
        setVideoSrc("/videos/customsoftdesktop.mp4");
      }
    };

    // Set initial source
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="video-container">
      <div className="video-card">
        <div className="video-content">
          <h3 className="video-tag">¿Listo para Transformar tu Negocio?</h3>
          <hr />
          <p className="video-description">
            Únete a cientos de empresas que han optimizado su flujo de trabajo con nuestro software.
          </p>

          <div 
            className="video-wrapper"
            style={videoSrc.includes("mobile") ? { aspectRatio: "9/16", maxWidth: "280px", margin: "0 auto" } : {}}
          >
             <MuxPlayer
              playbackId=""
              src={videoSrc}
              metadata={{
                video_title: "CustomSoft - Marketing Video",
                viewer_user_id: "user-id-guest",
              }}
              primaryColor="#007bff"
              secondaryColor="#FFFFFF"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            />
          </div>

          <button
            className="video-cta"
            onClick={() => window.open("https://wa.me/528124493708", "_blank")}
          >
            ¡Comenzar Ahora!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
