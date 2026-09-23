import "./DestinationSection.css";

const destinations = [
  {
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Singapore",
    country: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
  },
];

function DestinationSection() {
  return (
    <section className="destination-section">

      <div className="section-heading">
        <p className="section-label">EXPLORE THE WORLD</p>

        <h2>
          Popular <span>Destinations</span>
        </h2>

        <p className="section-description">
          Discover beautiful places, unforgettable experiences and
          journeys worth remembering.
        </p>
      </div>

      <div className="destination-grid">
        {destinations.map((destination) => (
          <div className="destination-card" key={destination.name}>

            <img
              src={destination.image}
              alt={destination.name}
            />

            <div className="destination-overlay">
              <div>
                <p>{destination.country}</p>
                <h3>{destination.name}</h3>
              </div>

              <button>Explore →</button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default DestinationSection;