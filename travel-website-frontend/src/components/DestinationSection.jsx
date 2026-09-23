import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { getPage } from "../utils/response";
import "./DestinationSection.css";

export default function DestinationSection() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/destinations?size=4")
      .then((r) => setDestinations(getPage(r).content))
      .catch((e) => {
        console.warn("DestinationSection fetch failed:", e?.message);
        setDestinations([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || destinations.length === 0) return null;

  return (
    <section className="destination-section">
      <div className="section-heading">
        <p className="section-label">EXPLORE THE WORLD</p>
        <h2>
          Popular <span>Destinations</span>
        </h2>
        <p className="section-description">
          Discover beautiful places, unforgettable experiences and journeys worth remembering.
        </p>
      </div>

      <div className="destination-grid">
        {destinations.map((destination) => (
          <Link
            key={destination.id}
            to={`/destinations/${destination.id}`}
            className="destination-card"
          >
            <img src={destination.imageUrl} alt={destination.name} loading="lazy" />
            <div className="destination-overlay">
              <div>
                <p>{destination.country}</p>
                <h3>{destination.name}</h3>
              </div>
              <span className="explore-btn">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}