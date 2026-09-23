import { Link } from "react-router-dom";
import "./TravelCTA.css";

export default function TravelCTA() {
  return (
    <section className="travel-cta">
      <div className="travel-cta-overlay"></div>
      <div className="travel-cta-content">
        <p className="travel-cta-label">YOUR NEXT ADVENTURE AWAITS</p>
        <h2>
          Where Will Your
          <span> Journey Take You?</span>
        </h2>
        <p>
          Tell us where you want to go, and let us help you create a journey
          filled with unforgettable moments.
        </p>
        <div className="travel-cta-buttons">
          <Link to="/packages" className="cta-primary">Plan My Trip</Link>
          <Link to="/destinations" className="cta-secondary">Explore Packages</Link>
        </div>
      </div>
    </section>
  );
}