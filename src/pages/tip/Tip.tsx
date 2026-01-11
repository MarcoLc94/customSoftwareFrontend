import "./Tip.css";

const Tip = () => {
  return (
    <div className="tip-container">
      <div className="tip-card">
        <div className="tip-content">
          <h3 className="tip-tag">About CustomSoft</h3>
          <hr />
          <div className="tips-mini">
            <p className="tip-text">
              We are a dedicated team of developers ensuring your business runs smoothly with tailored software solutions. 
              From inventory management to custom point-of-sale systems, we build what you need.
            </p>

            <p className="tip-text">
              Don't settle for generic software. Get tools designed for your specific workflow.
            </p>
          </div>
        </div>
        <div className="tip-image">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Software Development Team"
            className="tip-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Tip;
