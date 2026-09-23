import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/destinations?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-tagline">DISCOVER • EXPLORE • EXPERIENCE</p>

        <h1>
          Your Journey,
          <br />
          <span>Our Passion.</span>
        </h1>

        <p className="hero-description">
          Discover unforgettable destinations and create beautiful memories
          with Sharvesh Tours &amp; Travels.
        </p>

        <form onSubmit={search} className="hero-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations..."
            className="hero-search-input"
          />
          <button type="submit" className="hero-search-btn">Search</button>
        </form>

        <div className="hero-buttons">
          <Link to="/packages" className="primary-btn">Explore Packages</Link>
          <Link to="/destinations" className="secondary-btn">Discover Destinations</Link>
        </div>
      </div>
    </section>
  );
}