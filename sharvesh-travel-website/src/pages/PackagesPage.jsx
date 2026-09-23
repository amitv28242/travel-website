import { useMemo, useState } from 'react';
import { packages } from '../data/travelData';
import '../components/PackageSection.css';

function PackagesPage() {
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [maxPrice, setMaxPrice] = useState(120000);
  const [durationFilter, setDurationFilter] = useState('All');

  const destinations = ['All', ...new Set(packages.map((pkg) => pkg.destination.split(',')[0]))];

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const destinationMatch =
        selectedDestination === 'All' || pkg.destination.includes(selectedDestination);
      const priceMatch = pkg.price <= maxPrice;
      const durationMatch =
        durationFilter === 'All' ||
        (durationFilter === 'Short' && pkg.duration.includes('3') || pkg.duration.includes('4')) ||
        (durationFilter === 'Medium' && pkg.duration.includes('5')) ||
        (durationFilter === 'Long' && pkg.duration.includes('6'));

      return destinationMatch && priceMatch && durationMatch;
    });
  }, [selectedDestination, maxPrice, durationFilter]);

  return (
    <main className="package-section page-shell">
      <div className="package-heading">
        <div>
          <p className="package-label">TRAVEL WITH US</p>
          <h2>
            Featured <span>Packages</span>
          </h2>
        </div>
      </div>

      <div className="filter-bar">
        <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
          {destinations.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)}>
          <option value="All">All Durations</option>
          <option value="Short">Short (3-4 Days)</option>
          <option value="Medium">Medium (5 Days)</option>
          <option value="Long">Long (6+ Days)</option>
        </select>

        <label className="price-filter">
          Max Budget: ₹{maxPrice.toLocaleString('en-IN')}
          <input
            type="range"
            min="20000"
            max="120000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="package-grid">
        {filteredPackages.map((pkg) => (
          <article className="package-card" key={pkg.id}>
            <div className="package-image">
              <img src={pkg.image} alt={pkg.title} />
              <span className="package-duration">{pkg.duration}</span>
            </div>

            <div className="package-content">
              <p className="package-destination">{pkg.destination}</p>
              <h3>{pkg.title}</h3>
              <p className="package-description">{pkg.description}</p>

              <ul className="package-list">
                {pkg.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="package-bottom">
                <div>
                  <small>Starting from</small>
                  <strong>₹{pkg.price.toLocaleString('en-IN')}</strong>
                </div>

                <button className="details-btn">View Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default PackagesPage;
