import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../services/api";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import "./Destinations.css";

export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const q = params.get("q") || "";
  const sort = params.get("sort") || "name";
  const page = Number(params.get("page") || 0);

  useEffect(() => {
    setLoading(true);
    api
      .get("/destinations", { params: { q: q || undefined, sort, page, size: 9 } })
      .then((r) => setData(r.data.data))
      .finally(() => setLoading(false));
  }, [q, sort, page]);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === "" || v == null) next.delete(k);
      else next.set(k, v);
    });
    setParams(next);
  };

  return (
    <main className="destinations-page">
      <section className="destinations-header">
        <p>EXPLORE THE WORLD</p>
        <h1>
          Discover Your Next <span>Destination</span>
        </h1>
        <p className="destinations-intro">
          Explore places worth discovering and find the perfect destination for
          your next journey.
        </p>
      </section>

      <section className="destinations-content">
        <div className="destination-search">
          <SearchBar
            placeholder="Search destinations..."
            initial={q}
            onSearch={(v) => update({ q: v, page: 0 })}
          />
          <select
            className="input"
            value={sort}
            onChange={(e) => update({ sort: e.target.value, page: 0 })}
          >
            <option value="name">Sort: Name (A-Z)</option>
            <option value="country">Sort: Country</option>
            <option value="estimatedCost">Sort: Cost (low → high)</option>
          </select>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : data?.content?.length === 0 ? (
          <EmptyState icon="🌍" title="No destinations found" message="Try a different search." />
        ) : (
          <>
            <div className="destinations-grid">
              {data.content.map((d) => (
                <article className="destination-page-card" key={d.id}>
                  <div className="destination-page-image">
                    <img src={d.imageUrl} alt={d.name} />
                  </div>
                  <div className="destination-page-info">
                    <span>{d.country}</span>
                    <h2>{d.name}</h2>
                    <p>{d.description}</p>
                    <Link to={`/destinations/${d.id}`}>
                      Explore Destination →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={(p) => update({ page: p })}
            />
          </>
        )}
      </section>
    </main>
  );
}