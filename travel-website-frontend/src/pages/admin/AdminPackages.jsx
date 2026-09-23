import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useApi } from "../../hooks/useApi";
import PackageFormModal from "../../components/admin/PackageFormModal";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatCurrency } from "../../utils/format";

export default function AdminPackages() {
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(null);
  const { data, loading, refetch } = useApi("/packages", { page, size: 10 });

  const remove = async (p) => {
    if (!confirm(`Delete package "${p.name}"?`)) return;
    try {
      await api.delete(`/packages/${p.id}`);
      toast.success("Deleted");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Packages</h1>
        <button onClick={() => setEditing("new")} className="btn-primary text-sm">+ Add Package</button>
      </div>

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
                  <th className="p-3">Destination</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.content?.length === 0 && (
                  <tr><td colSpan="7" className="p-8 text-center text-gray-500">No packages found</td></tr>
                )}
                {data?.content?.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">
                      <img src={p.imageUrl} alt={p.name} className="w-16 h-12 object-cover rounded" />
                    </td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3 text-gray-600">{p.destinationName}</td>
                    <td className="p-3">{p.duration} days</td>
                    <td className="p-3">{formatCurrency(p.price)}</td>
                    <td className="p-3">⭐ {p.rating?.toFixed(1) || "New"}</td>
                    <td className="p-3 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => setEditing(p)}
                        className="text-xs px-3 py-1 rounded border hover:bg-gray-50">Edit</button>
                      <button onClick={() => remove(p)}
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
        <PackageFormModal
          pkg={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); refetch(); }}
        />
      )}
    </div>
  );
}