import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import PackageCard from "../components/PackageCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage"; 


export default function Packages() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const read = (k, d = "") => params.get(k) ?? d;
  const filters = {
    destination: read("destination"),
    minPrice: read("minPrice"),
    maxPrice: read("maxPrice"),
    duration: read("duration"),
    minRating: read("minRating"),
    sort: read("sort", "rating"),
  };
  const page = Number(read("page", 0));

  const fetchPackages = () => {
    setLoading(true);
    setError(null);

    const query = { page, size: 9, sort: filters.sort };
    Object.entries(filters).forEach(([k, v]) => {
      if (k !== "sort" && v !== "") query[k] = v;
    });

    api.get("/packages", { params: query })
      .then((r) => {
        // The backend returns ApiResponse<Page<PackageResponse>>
        // So: r.data.data.content  →  array of packages
        setData(r.data.data || { content: [], totalPages: 0 });
      })
      .catch((e) => {
        setError(e.response?.data?.message || "Failed to load packages");
        setData({ content: [], totalPages: 0 });
      })
      .finally(() => setLoading(false));
  };
  const queryString = params.toString();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const query = { page, size: 9, sort: read("sort", "rating") };
    ["destination", "minPrice", "maxPrice", "duration", "minRating"].forEach((k) => {
      const v = read(k);
      if (v !== "") query[k] = v;
    });

    api.get("/packages", { params: query })
      .then((r) => {
        if (cancelled) return;
        setData(r.data?.data ?? null);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.response?.data?.message || "Failed to load packages");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === "" || v == null) next.delete(k);
      else next.set(k, String(v));
    });
    setParams(next);
  };

  // ... rest of the render ...

  return (
    <div className="container-page py-10 grid lg:grid-cols-4 gap-8">
      <aside className="card p-5 h-fit lg:sticky lg:top-24 space-y-4">
        <h3 className="font-bold text-lg">Filters</h3>

        <div>
          <label className="label">Destination</label>
          <input
            className="input"
            placeholder="e.g. Goa"
            value={read("destination")}
            onChange={(e) => update({ destination: e.target.value, page: 0 })}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">Min ₹</label>
            <input type="number" className="input"
              value={read("minPrice")}
              onChange={(e) => update({ minPrice: e.target.value, page: 0 })} />
          </div>
          <div>
            <label className="label">Max ₹</label>
            <input type="number" className="input"
              value={read("maxPrice")}
              onChange={(e) => update({ maxPrice: e.target.value, page: 0 })} />
          </div>
        </div>

        <div>
          <label className="label">Duration (days)</label>
          <input type="number" className="input"
            value={read("duration")}
            onChange={(e) => update({ duration: e.target.value, page: 0 })} />
        </div>

        <div>
          <label className="label">Minimum Rating</label>
          <select className="input"
            value={read("minRating")}
            onChange={(e) => update({ minRating: e.target.value, page: 0 })}>
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

      <main className="lg:col-span-3 min-w-0">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Travel Packages</h1>
          <select
            className="input w-52"
            value={read("sort", "rating")}
            onChange={(e) => update({ sort: e.target.value })}
          >
            <option value="rating">Sort: Rating</option>
            <option value="price">Sort: Price (low → high)</option>
            <option value="duration">Sort: Duration</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {loading && <LoadingSpinner text="Loading packages..." />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={() => setParams(new URLSearchParams(params))} />
        )}

        {!loading && !error && (!data || (data.content?.length ?? 0) === 0) && (
          <EmptyState
            icon="📦"
            title="No packages match your filters"
            message="Try widening your criteria."
            action={
              <button onClick={() => setParams(new URLSearchParams())} className="btn-primary">
                Clear Filters
              </button>
            }
          />
        )}

        {!loading && !error && data?.content?.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.content.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={data.totalPages ?? 0}
              onPageChange={(p) => update({ page: p })}
            />
          </>
        )}
      </main>
    </div>
  );
}