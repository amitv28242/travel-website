import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ReviewCard from "../components/ReviewCard";
import BookNowButton from "../components/BookNowButton";
import { formatCurrency } from "../utils/format";

export default function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/packages/${id}`),
      api.get("/reviews", { params: { packageId: id, status: "APPROVED", size: 6 } }),
    ])
      .then(([pRes, rRes]) => {
        setPkg(pRes.data.data);
        setReviews(rRes.data.data.content || []);
      })
      .catch((e) => setError(e.response?.data?.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="container-page py-10"><ErrorMessage message={error} /></div>;
  if (!pkg) return null;

  const list = (str) =>
    (str || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div>
      <div
        className="relative h-80 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('${pkg.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container-page h-full flex items-end pb-8">
          <div className="text-white">
            <p className="text-sm opacity-90">
              📍 {pkg.destinationName}, {pkg.destinationCountry}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">{pkg.name}</h1>
            <p className="mt-2">
              ⭐ {pkg.rating?.toFixed(1) || "New"} · {pkg.duration} days · Up to{" "}
              {pkg.maxTravellers} travellers
            </p>
          </div>
        </div>
      </div>

      <div className="container-page py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
          </section>

          {list(pkg.inclusions).length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-3">Inclusions</h2>
              <ul className="grid md:grid-cols-2 gap-2">
                {list(pkg.inclusions).map((i) => (
                  <li key={i} className="text-sm text-gray-700">✅ {i}</li>
                ))}
              </ul>
            </section>
          )}

          {list(pkg.exclusions).length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-3">Exclusions</h2>
              <ul className="grid md:grid-cols-2 gap-2">
                {list(pkg.exclusions).map((i) => (
                  <li key={i} className="text-sm text-gray-700">❌ {i}</li>
                ))}
              </ul>
            </section>
          )}

          {pkg.itineraries?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Day-wise Itinerary</h2>
              <div className="space-y-4">
                {pkg.itineraries.map((it) => (
                  <div key={it.id || it.dayNumber} className="card p-4 border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded">
                        Day {it.dayNumber}
                      </span>
                      <h3 className="font-semibold">{it.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700">{it.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {pkg.termsAndConditions && (
            <section>
              <h2 className="text-2xl font-bold mb-3">Terms & Conditions</h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {pkg.termsAndConditions}
              </p>
            </section>
          )}

          {reviews.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
          <div className="card p-6">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {formatCurrency(pkg.price)}
            </p>
            <p className="text-xs text-gray-500 mt-1">per person</p>

            <div className="mt-4 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium">{pkg.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Max Travellers</span>
                <span className="font-medium">{pkg.maxTravellers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rating</span>
                <span className="font-medium">
                  ⭐ {pkg.rating?.toFixed(1) || "New"}
                </span>
              </div>
            </div>

            <BookNowButton pkg={pkg} className="btn-primary w-full mt-5" />

            <Link
              to={`/destinations/${pkg.destinationId}`}
              className="btn-outline w-full mt-2 text-sm"
            >
              View Destination
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}