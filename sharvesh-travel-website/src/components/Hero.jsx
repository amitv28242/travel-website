import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-tagline">
          DISCOVER • EXPLORE • EXPERIENCE
        </p>

        <h1>
          Your Journey,
          <br />
          <span>Our Passion.</span>
        </h1>

        <p className="hero-description">
          Discover unforgettable destinations and create beautiful
          memories with Sharvesh Tours & Travels.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore Packages
          </button>

          <button className="secondary-btn">
            Discover Destinations
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;