import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BookNowButton from "./BookNowButton";
import { getPage } from "../utils/response";
import "./PackageSection.css";

export default function PackageSection() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/packages?size=3&sort=rating")
      .then((r) => setPackages(getPage(r).content))
      .catch((e) => {
        console.warn("PackageSection fetch failed:", e?.message);
        setPackages([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || packages.length === 0) return null;

  return (
    <section className="package-section">
      <div className="package-heading">
        <div>
          <p className="package-label">TRAVEL WITH US</p>
          <h2>
            Featured <span>Packages</span>
          </h2>
        </div>

        <Link to="/packages" className="view-all-btn">
          View All Packages →
        </Link>
      </div>

      <div className="package-grid">
        {packages.map((pkg) => (
          <article className="package-card" key={pkg.id}>
            <div className="package-image">
              <img src={pkg.imageUrl} alt={pkg.name} loading="lazy" />
              <span className="package-duration">{pkg.duration} Days</span>
            </div>

            <div className="package-content">
              <p className="package-destination">
                {pkg.destinationName}
                {pkg.destinationCountry ? `, ${pkg.destinationCountry}` : ""}
              </p>

              <h3>{pkg.name}</h3>

              <p className="package-description">{pkg.description}</p>

              <div className="package-bottom">
                <div>
                  <small>Starting from</small>
                  <strong>₹{Number(pkg.price).toLocaleString("en-IN")}</strong>
                </div>

                <div className="package-actions">
                  <Link to={`/packages/${pkg.id}`} className="details-btn">
                    View Details
                  </Link>
                  <BookNowButton pkg={pkg} className="book-btn" label="Book Now" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}