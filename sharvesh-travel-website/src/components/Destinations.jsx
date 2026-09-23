import "./Destinations.css";

const destinations = [
  {
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    description:
      "Explore modern architecture, luxury experiences and unforgettable city attractions.",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience crystal-clear waters, beautiful beaches and peaceful island escapes.",
  },
  {
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    description:
      "Discover iconic landmarks, charming streets and the timeless beauty of Paris.",
  },
  {
    name: "Singapore",
    country: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",
    description:
      "Discover a vibrant city filled with modern attractions, culture and experiences.",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy tropical landscapes, cultural experiences and relaxing island adventures.",
  },
  {
    name: "Switzerland",
    country: "Europe",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience spectacular mountains, peaceful villages and breathtaking scenery.",
  },
];

function Destinations() {
  return (
    <main className="destinations-page">

      <section className="destinations-header">
        <p>EXPLORE THE WORLD</p>

        <h1>
          Discover Your Next
          <span> Destination</span>
        </h1>

        <p className="destinations-intro">
          Explore places worth discovering and find the perfect
          destination for your next journey.
        </p>
      </section>

      <section className="destinations-content">

        <div className="destination-search">
          <input
            type="text"
            placeholder="Search destinations..."
          />

          <button>Search</button>
        </div>

        <div className="destinations-grid">

          {destinations.map((destination) => (
            <article
              className="destination-page-card"
              key={destination.name}
            >
              <div className="destination-page-image">
                <img
                  src={destination.image}
                  alt={destination.name}
                />
              </div>

              <div className="destination-page-info">

                <span>{destination.country}</span>

                <h2>{destination.name}</h2>

                <p>{destination.description}</p>

                <button>
                  Explore Destination →
                </button>

              </div>
            </article>
          ))}

        </div>

      </section>

    </main>
  );
}

export default Destinations;