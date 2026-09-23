import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import { statusColor, formatDate } from "../../utils/format";

export default function AdminReviews() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const { data, loading, refetch } = useApi("/reviews", {
    status: status || undefined, page, size: 10,
  });

  const moderate = async (r, newStatus) => {
    if (!confirm(`Set review to ${newStatus}?`)) return;
    try {
      await api.put(`/reviews/${r.id}/moderate?status=${newStatus}`);
      toast.success("Updated");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  const remove = async (r) => {
    if (!confirm("Delete this review permanently?")) return;
    try {
      await api.delete(`/reviews/${r.id}`);
      toast.success("Deleted");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>

      <div className="card p-4 mb-4 flex flex-wrap gap-3">
        <select className="input w-52" value={status}
          onChange={(e) => { setPage(0); setStatus(e.target.value); }}>
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="HIDDEN">Hidden</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-3">
          {data?.content?.length === 0 && (
            <div className="card p-8 text-center text-gray-500">No reviews found</div>
          )}
          {data?.content?.map((r) => (
            <div key={r.id} className="card p-5">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <div>
                  <p className="font-semibold">{r.userName}</p>
                  <p className="text-xs text-gray-500">
                    {r.packageName ? `Package: ${r.packageName}` : `Destination: ${r.destinationName}`}
                    {" · "}{formatDate(r.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">
                    {"★".repeat(r.rating)}
                    <span className="text-gray-300">{"★".repeat(5 - r.rating)}</span>
                  </span>
                  <span className={`badge ${statusColor(r.status)}`}>{r.status}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{r.comment}</p>
              <div className="flex gap-2 mt-3 pt-3 border-t flex-wrap">
                {r.status !== "APPROVED" && (
                  <button onClick={() => moderate(r, "APPROVED")}
                    className="text-xs px-3 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100">
                    Approve
                  </button>
                )}
                {r.status !== "HIDDEN" && (
                  <button onClick={() => moderate(r, "HIDDEN")}
                    className="text-xs px-3 py-1 rounded bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                    Hide
                  </button>
                )}
                <button onClick={() => remove(r)}
                  className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 ml-auto">
                  Delete
                </button>
              </div>
            </div>
          ))}
          <Pagination page={page} totalPages={data?.totalPages || 0} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}