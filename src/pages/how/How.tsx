import "./How.css";

const How = () => {
  return (
    <div className="how-container">
      <div className="how-card">
        <div className="how-content">
          <h3 className="how-tag">Our Process</h3>
          <hr />
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Consultation</h4>
                <p className="step-text">
                  We discuss your needs and understand your business pain points.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Proposal & Design</h4>
                <p className="step-text">
                  We propose a solution and design the perfect interface for you.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Development</h4>
                <p className="step-text">
                  Our expert team builds your custom software with agility.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Launch & Support</h4>
                <p className="step-text">
                  We deploy your system and provide ongoing support.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="how-image">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Team Collaboration"
            className="how-img"
          />
        </div>
      </div>
    </div>
  );
};

export default How;
