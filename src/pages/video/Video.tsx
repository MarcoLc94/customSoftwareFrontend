import "./Video.css";
// import MuxPlayer from "@mux/mux-player-react"; 

const Video = () => {
  return (
    <div className="video-container">
      <div className="video-card">
        <div className="video-content">
          <h3 className="video-tag">Ready to Transform Your Business?</h3>
          <hr />
          <p className="video-description">
            Join hundreds of companies that have optimized their workflow with our custom software solutions.
          </p>

          <div className="video-wrapper" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', backgroundColor: '#f0f0f0', borderRadius: '10px'}}>
             {/* <MuxPlayer playbackId="" ... /> */}
             <div style={{color: '#555'}}>
                 <span style={{fontSize: '48px'}}>🚀</span>
                 <p>Software Demo Placeholder</p>
             </div>
          </div>

          <button
            className="video-cta"
            onClick={() => window.open("https://wa.me/528124493708", "_blank")}
          >
            Get Started Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
