import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import DestinationCard from "../components/DestinationCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const q = params.get("q") || "";
  const sort = params.get("sort") || "name";
  const page = Number(params.get("page") || 0);

  useEffect(() => {
    setLoading(true);
    api.get("/destinations", { params: { q: q || undefined, sort, page, size: 9 } })
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
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Destinations</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <SearchBar
            placeholder="Search by name or country..."
            initial={q}
            onSearch={(v) => update({ q: v, page: 0 })}
          />
        </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.content.map((d) => <DestinationCard key={d.id} destination={d} />)}
          </div>
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={(p) => update({ page: p })}
          />
        </>
      )}
    </div>
  );
}