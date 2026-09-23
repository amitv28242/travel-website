import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useApi } from "../../hooks/useApi";
import BookingDetailModal from "../../components/admin/BookingDetailModal";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatCurrency, formatDate, statusColor } from "../../utils/format";

export default function AdminBookings() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);

  const { data, loading, refetch } = useApi("/admin/bookings", {
    q: q || undefined,
    status: status || undefined,
    page,
    size: 10,
  });

  const updateStatus = async (b, newStatus) => {
    if (!confirm(`Set booking ${b.bookingReference} to ${newStatus}?`)) return;
    try {
      await api.put(`/admin/bookings/${b.id}/status?status=${newStatus}`);
      toast.success("Updated");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  const cancel = async (b) => {
    const reason = prompt(`Cancel ${b.bookingReference}? Optional reason:`);
    if (reason === null) return;
    try {
      await api.put(`/admin/bookings/${b.id}/cancel`, null, { params: { reason } });
      toast.success("Cancelled");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <div className="card p-4 mb-4 flex flex-wrap gap-3">
        <input value={q} onChange={(e) => { setPage(0); setQ(e.target.value); }}
          placeholder="Search reference / user / package" className="input flex-1 min-w-[220px]" />
        <select className="input w-44" value={status}
          onChange={(e) => { setPage(0); setStatus(e.target.value); }}>
          <option value="">All statuses</option>
          <option>PENDING</option><option>CONFIRMED</option>
          <option>CANCELLED</option><option>COMPLETED</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Package</th>
                  <th className="p-3">Travel</th>
                  <th className="p-3">Travellers</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.content?.length === 0 && (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">No bookings found</td></tr>
                )}
                {data?.content?.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="p-3 font-mono text-xs">
                      <button onClick={() => setSelected(b)} className="text-primary hover:underline">
                        {b.bookingReference}
                      </button>
                    </td>
                    <td className="p-3">
                      <p className="font-medium">{b.userName}</p>
                      <p className="text-xs text-gray-500">{b.userEmail}</p>
                    </td>
                    <td className="p-3">
                      <p>{b.packageName}</p>
                      <p className="text-xs text-gray-500">{b.destination}</p>
                    </td>
                    <td className="p-3">{formatDate(b.travelDate)}</td>
                    <td className="p-3">{b.numberOfTravellers}</td>
                    <td className="p-3">{formatCurrency(b.totalAmount)}</td>
                    <td className="p-3">
                      <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <select className="text-xs border rounded px-2 py-1"
                        value={b.status}
                        onChange={(e) => updateStatus(b, e.target.value)}>
                        <option>PENDING</option><option>CONFIRMED</option>
                        <option>CANCELLED</option><option>COMPLETED</option>
                      </select>
                      {b.status !== "CANCELLED" && b.status !== "COMPLETED" && (
                        <button onClick={() => cancel(b)}
                          className="ml-2 text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100">
                          Cancel
                        </button>
                      )}
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

      {selected && (
        <BookingDetailModal
          booking={selected}
          onClose={() => setSelected(null)}
          onChanged={refetch}
        />
      )}
    </div>
  );
}