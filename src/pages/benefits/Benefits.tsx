import "./Benefits.css";

const Benefits = () => {
  return (
    <div className="benefits-container">
      <div className="benefits-card">
        <div className="benefits-image">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Business Growth"
            className="benefits-img"
          />
        </div>
        <div className="benefits-content">
          <h3 className="benefits-tag">Why Choose Us?</h3>
          <hr />
          <div className="benefits-list">
            <div className="benefit-item">
              <h4 className="benefit-title">Tailored Solutions</h4>
              <p className="benefit-text">
                Software built exactly for your business processes, not the other way around.
              </p>
            </div>

            <div className="benefit-item">
              <h4 className="benefit-title">Efficiency</h4>
              <p className="benefit-text">
                Automate boring tasks and focus on growing your business.
              </p>
            </div>

            <div className="benefit-item">
              <h4 className="benefit-title">Modern Technology</h4>
              <p className="benefit-text">
                We use the latest tech stack to ensure speed, security, and scalability.
              </p>
            </div>

            <div className="benefit-item">
              <h4 className="benefit-title">Scalability</h4>
              <p className="benefit-text">
                Our systems grow with you. Add features as you expand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
