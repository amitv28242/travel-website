import "./PackageSection.css";

const packages = [
  {
    title: "Dubai Explorer",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: "₹49,999",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience the highlights of Dubai with a carefully planned travel experience.",
  },
  {
    title: "Maldives Escape",
    destination: "Maldives",
    duration: "4 Days / 3 Nights",
    price: "₹39,999",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    description:
      "Relax among beautiful beaches and experience a peaceful island getaway.",
  },
  {
    title: "Paris Getaway",
    destination: "Paris, France",
    duration: "6 Days / 5 Nights",
    price: "₹89,999",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    description:
      "Explore iconic landmarks, charming streets and the beauty of Paris.",
  },
];

function PackageSection() {
  return (
    <section className="package-section">

      <div className="package-heading">
        <div>
          <p className="package-label">TRAVEL WITH US</p>

          <h2>
            Featured <span>Packages</span>
          </h2>
        </div>

        <button className="view-all-btn">
          View All Packages →
        </button>
      </div>

      <div className="package-grid">
        {packages.map((pkg) => (
          <article className="package-card" key={pkg.title}>

            <div className="package-image">
              <img src={pkg.image} alt={pkg.title} />

              <span className="package-duration">
                {pkg.duration}
              </span>
            </div>

            <div className="package-content">

              <p className="package-destination">
                {pkg.destination}
              </p>

              <h3>{pkg.title}</h3>

              <p className="package-description">
                {pkg.description}
              </p>

              <div className="package-bottom">

                <div>
                  <small>Starting from</small>
                  <strong>{pkg.price}</strong>
                </div>

                <button className="details-btn">
                  View Details
                </button>

              </div>

            </div>

          </article>
        ))}
      </div>

    </section>
  );
}

export default PackageSection;