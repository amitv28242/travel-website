import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import PackageCard from "../components/PackageCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { getPage } from "../utils/response";

export default function Packages() {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState({
    content: [],
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const read = (k, d = "") => params.get(k) ?? d;
  const filters = {
    destination: read("destination"),
    minPrice: read("minPrice"),
    maxPrice: read("maxPrice"),
    duration: read("duration"),
    minRating: read("minRating"),
    sort: read("sort", "rating"),
  };
  const pageNum = Number(read("page", 0));

  useEffect(() => {
    setLoading(true);
    setError(null);

    const query = { page: pageNum, size: 9, sort: filters.sort };
    Object.entries(filters).forEach(([k, v]) => {
      if (k !== "sort" && v !== "") query[k] = v;
    });

    api
      .get("/packages", { params: query })
      .then((r) => setPage(getPage(r)))
      .catch((e) => {
        console.warn("Packages fetch failed:", e?.message);
        setPage({ content: [], totalPages: 0 });
        setError("Failed to load packages");
      })
      .finally(() => setLoading(false));
  }, [params]);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === "" || v == null) next.delete(k);
      else next.set(k, v);
    });
    setParams(next);
  };

  return (
    <div className="container-page py-10 grid lg:grid-cols-4 gap-8">
      <aside className="card p-5 h-fit lg:sticky lg:top-24 space-y-4">
        <h3 className="font-bold text-lg">Filters</h3>

        <div>
          <label className="label">Destination</label>
          <input
            className="input"
            placeholder="e.g. Goa"
            value={filters.destination}
            onChange={(e) => update({ destination: e.target.value, page: 0 })}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">Min ₹</label>
            <input
              type="number"
              className="input"
              value={filters.minPrice}
              onChange={(e) => update({ minPrice: e.target.value, page: 0 })}
            />
          </div>
          <div>
            <label className="label">Max ₹</label>
            <input
              type="number"
              className="input"
              value={filters.maxPrice}
              onChange={(e) => update({ maxPrice: e.target.value, page: 0 })}
            />
          </div>
        </div>

        <div>
          <label className="label">Duration (days)</label>
          <input
            type="number"
            className="input"
            value={filters.duration}
            onChange={(e) => update({ duration: e.target.value, page: 0 })}
          />
        </div>

        <div>
          <label className="label">Minimum Rating</label>
          <select
            className="input"
            value={filters.minRating}
            onChange={(e) => update({ minRating: e.target.value, page: 0 })}
          >
            <option value="">Any</option>
            <option value="3">3+ ⭐</option>
            <option value="4">4+ ⭐</option>
            <option value="4.5">4.5+ ⭐</option>
          </select>
        </div>

        <button
          onClick={() => setParams(new URLSearchParams())}
          className="btn-outline w-full text-sm"
        >
          Clear Filters
        </button>
      </aside>

      <main className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Travel Packages</h1>
          <select
            className="input w-52"
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value })}
          >
            <option value="rating">Sort: Rating</option>
            <option value="price">Sort: Price (low → high)</option>
            <option value="duration">Sort: Duration</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <EmptyState icon="⚠️" title={error} message="Please try again." />
        ) : page.content.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No packages match your filters"
            message="Try widening your criteria."
          />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {page.content.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
            <Pagination
              page={pageNum}
              totalPages={page.totalPages}
              onPageChange={(p) => update({ page: p })}
            />
          </>
        )}
      </main>
    </div>
  );
}