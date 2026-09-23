import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import PackageCard from "../components/PackageCard";
import DestinationCard from "../components/DestinationCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  setLoading(true);
  Promise.allSettled([
    api.get("/destinations?size=6"),
    api.get("/packages?size=6&sort=rating"),
    api.get("/reviews?status=APPROVED&size=3"),
  ])
    .then(([d, p, r]) => {
      if (d.status === "fulfilled") setDestinations(d.value.data.data?.content || []);
      if (p.status === "fulfilled") setPackages(p.value.data.data?.content || []);
      if (r.status === "fulfilled") setTestimonials(r.value.data.data?.content || []);
      // Log failures for debugging (silent to user)
      [d, p, r].forEach((res, i) => {
        if (res.status === "rejected") {
          console.warn(`Home load #${i} failed:`, res.reason?.message);
        }
      });
    })
    .finally(() => setLoading(false));
    }, []);

  const search = (e) => {
    e.preventDefault();
    navigate(`/destinations?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[520px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container-page h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Explore handpicked destinations and unforgettable tour packages.
          </p>
          <form onSubmit={search} className="flex w-full max-w-xl bg-white rounded-xl overflow-hidden shadow-lg">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations..."
              className="flex-1 px-5 py-4 text-gray-800 outline-none"
            />
            <button className="bg-primary hover:bg-primary-dark text-white px-6 font-semibold transition">
              Search
            </button>
          </form>
          <div className="mt-6 flex gap-4 flex-wrap justify-center">
            <Link to="/destinations" className="btn-primary">Explore Destinations</Link>
            <Link to="/packages" className="btn-primary">View Packages</Link>
          </div>
        </div>
      </section>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Popular Destinations */}
          <section className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl font-bold">Popular Destinations</h2>
              <Link to="/destinations" className="text-primary font-medium text-sm hover:underline">View all →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((d) => <DestinationCard key={d.id} destination={d} />)}
            </div>
          </section>

          {/* Featured Packages */}
          <section className="bg-gray-50 py-16">
            <div className="container-page">
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl font-bold">Featured Packages</h2>
                <Link to="/packages" className="text-primary font-medium text-sm hover:underline">
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((p) => <PackageCard key={p.id} pkg={p} />)}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="container-page py-16">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Choose TravelGo</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "💰", title: "Best Price", desc: "Guaranteed value for money." },
                { icon: "🤝", title: "Trusted Partners", desc: "Verified hotels and guides." },
                { icon: "⚡", title: "Easy Booking", desc: "Book in under 2 minutes." },
                { icon: "🔒", title: "Secure Payments", desc: "Bank-grade security." },
              ].map((f) => (
                <div key={f.title} className="card p-6 text-center">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <section className="bg-gray-50 py-16">
              <div className="container-page">
                <h2 className="text-3xl font-bold mb-10 text-center">What Our Travellers Say</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((r) => (
                    <div key={r.id} className="card p-6">
                      <div className="text-amber-500 mb-2">{"★".repeat(r.rating)}</div>
                      <p className="text-sm text-gray-700 italic mb-4">"{r.comment}"</p>
                      <p className="font-medium text-sm">— {r.userName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}