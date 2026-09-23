import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import PackageCard from "../components/PackageCard";
import ReviewCard from "../components/ReviewCard";
import { formatCurrency } from "../utils/format";

export default function DestinationDetails() {
  const { id } = useParams();
  const [d, setD] = useState(null);
  const [packages, setPackages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      api.get(`/destinations/${id}`),
      api.get("/packages", { params: { destination: "", size: 6 } }),
      api.get("/reviews", { params: { destinationId: id, status: "APPROVED", size: 6 } }),
    ])
      .then(([dRes, pRes, rRes]) => {
        if (dRes.status === "fulfilled") setD(dRes.value.data.data);
        if (pRes.status === "fulfilled") {
          setPackages(
            (pRes.value.data.data.content || []).filter(
              (p) => p.destinationId === Number(id)
            )
          );
        }
        if (rRes.status === "fulfilled") setReviews(rRes.value.data.data.content || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error || !d) return <div className="container-page py-10"><ErrorMessage message={error || "Not found"} /></div>;

  const activities = (d.popularActivities || "").split(",").map((a) => a.trim()).filter(Boolean);

  return (
    <div>
      <div
        className="relative h-80 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('${d.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container-page h-full flex items-end pb-8">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold">{d.name}</h1>
            <p className="text-lg opacity-90 mt-1">📍 {d.country}</p>
          </div>
        </div>
      </div>

      <div className="container-page py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-3">About</h2>
            <p className="text-gray-700 leading-relaxed">{d.description}</p>
          </section>

          {activities.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-3">Popular Activities</h2>
              <div className="flex flex-wrap gap-2">
                {activities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}

          {packages.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Available Packages</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {packages.map((p) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
              </div>
            </section>
          )}

          {reviews.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card p-6">
            <p className="text-sm text-gray-500">Estimated Cost</p>
            <p className="text-2xl font-bold text-primary mt-1">
              {formatCurrency(d.estimatedCost)}
            </p>
            <p className="text-sm text-gray-500 mt-3">Best Time to Visit</p>
            <p className="font-medium mt-1">{d.bestTimeToVisit}</p>
            <Link to="/packages" className="btn-primary w-full mt-4">
              Browse Packages
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}