import { useMemo, useState } from 'react';
import { destinations } from '../data/travelData';
import '../components/Destinations.css';

function DestinationsPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return destinations;

    return destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(text) ||
        destination.country.toLowerCase().includes(text) ||
        destination.activities.some((item) => item.toLowerCase().includes(text))
    );
  }, [query]);

  return (
    <main className="destinations-page">
      <section className="destinations-header">
        <p>EXPLORE THE WORLD</p>
        <h1>
          Discover Your Next
          <span> Destination</span>
        </h1>
        <p className="destinations-intro">
          Explore places worth discovering and find the perfect destination for your next journey.
        </p>
      </section>

      <section className="destinations-content">
        <div className="destination-search">
          <input
            type="text"
            placeholder="Search destinations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Search</button>
        </div>

        <div className="destinations-grid">
          {filtered.map((destination) => (
            <article className="destination-page-card" key={destination.id}>
              <div className="destination-page-image">
                <img src={destination.image} alt={destination.name} />
              </div>

              <div className="destination-page-info">
                <span>{destination.country}</span>
                <h2>{destination.name}</h2>
                <p>{destination.description}</p>

                <ul className="destination-tags">
                  {destination.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>

                <div className="destination-meta">
                  <strong>From ₹{destination.price.toLocaleString('en-IN')}</strong>
                  <button>Explore Destination →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DestinationsPage;
