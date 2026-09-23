import "./TravelCTA.css";

function TravelCTA() {
  return (
    <section className="travel-cta">

      <div className="travel-cta-overlay"></div>

      <div className="travel-cta-content">

        <p className="travel-cta-label">
          YOUR NEXT ADVENTURE AWAITS
        </p>

        <h2>
          Where Will Your
          <span> Journey Take You?</span>
        </h2>

        <p>
          Tell us where you want to go, and let us help you
          create a journey filled with unforgettable moments.
        </p>

        <div className="travel-cta-buttons">
          <button className="cta-primary">
            Plan My Trip
          </button>

          <button className="cta-secondary">
            Explore Packages
          </button>
        </div>

      </div>

    </section>
  );
}

export default TravelCTA;