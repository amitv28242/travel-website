import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useApi } from "../../hooks/useApi";
import DestinationFormModal from "../../components/admin/DestinationFormModal";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatCurrency } from "../../utils/format";

export default function AdminDestinations() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(null);

  const { data, loading, refetch } = useApi("/destinations", {
    q: q || undefined, page, size: 10,
  });

  const remove = async (d) => {
    if (!confirm(`Delete destination "${d.name}"? This will also remove its packages.`)) return;
    try {
      await api.delete(`/destinations/${d.id}`);
      toast.success("Deleted");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Destinations</h1>
        <button onClick={() => setEditing("new")} className="btn-primary text-sm">+ Add Destination</button>
      </div>

      <input
        value={q}
        onChange={(e) => { setPage(0); setQ(e.target.value); }}
        placeholder="Search destinations..."
        className="input mb-4 max-w-md"
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Cost</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.content?.length === 0 && (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-500">No destinations found</td></tr>
                )}
                {data?.content?.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-3">
                      <img src={d.imageUrl} alt={d.name} className="w-16 h-12 object-cover rounded" />
                    </td>
                    <td className="p-3 font-medium">{d.name}</td>
                    <td className="p-3 text-gray-600">{d.country}</td>
                    <td className="p-3">{formatCurrency(d.estimatedCost)}</td>
                    <td className="p-3 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => setEditing(d)}
                        className="text-xs px-3 py-1 rounded border hover:bg-gray-50">Edit</button>
                      <button onClick={() => remove(d)}
                        className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t">
            <Pagination page={page} totalPages={data?.totalPages || 0} onPageChange={setPage} />
          </div>
        </div>
      )}

      {editing && (
        <DestinationFormModal
          destination={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); refetch(); }}
        />
      )}
    </div>
  );
}