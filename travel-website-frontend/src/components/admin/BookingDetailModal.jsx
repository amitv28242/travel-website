import api from "../../services/api";
import { formatCurrency, formatDate, formatDateTime, statusColor } from "../../utils/format";

export default function BookingDetailModal({ booking, onClose, onChanged }) {
  const b = booking;

  const updateStatus = async (newStatus) => {
    if (!confirm(`Set status to ${newStatus}?`)) return;
    try {
      await api.put(`/admin/bookings/${b.id}/status?status=${newStatus}`);
      onChanged?.();
      onClose();
    } catch (e) {
      alert(e.response?.data?.message || "Failed");
    }
  };

  const cancel = async () => {
    const reason = prompt("Cancellation reason (optional):");
    if (reason === null) return;
    try {
      await api.put(`/admin/bookings/${b.id}/cancel`, null, { params: { reason } });
      onChanged?.();
      onClose();
    } catch (e) {
      alert(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Booking {b.bookingReference}</h2>
            <p className="text-sm text-gray-500">Created {formatDateTime(b.bookingDate)}</p>
          </div>
          <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Customer</p>
            <p className="font-semibold">{b.userName}</p>
            <p className="text-sm text-gray-600">{b.userEmail}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Package</p>
            <p className="font-semibold">{b.packageName}</p>
            <p className="text-sm text-gray-600">{b.destination}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Travel Date</p>
            <p className="font-semibold">{formatDate(b.travelDate)}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Travellers</p>
            <p className="font-semibold">{b.numberOfTravellers}</p>
          </div>
        </div>

        <div className="card p-4 mb-6 bg-gradient-to-r from-primary to-primary-dark text-white">
          <p className="text-xs opacity-90 uppercase tracking-wide">Total Amount</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(b.totalAmount)}</p>
        </div>

        {b.cancellationReason && (
          <div className="card p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-xs text-red-700 uppercase tracking-wide mb-1">Cancellation Reason</p>
            <p className="text-sm text-red-800">{b.cancellationReason}</p>
            {b.cancelledAt && (
              <p className="text-xs text-red-600 mt-1">Cancelled on {formatDateTime(b.cancelledAt)}</p>
            )}
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Traveller Details</h3>
          <div className="space-y-2">
            {b.travellers?.map((t, i) => (
              <div key={i} className="border rounded-lg p-3 text-sm grid md:grid-cols-2 gap-2">
                <div><span className="text-gray-500">Name: </span><span className="font-medium">{t.fullName}</span></div>
                <div><span className="text-gray-500">Age / Gender: </span><span>{t.age} / {t.gender}</span></div>
                <div><span className="text-gray-500">Phone: </span><span>{t.phone}</span></div>
                <div><span className="text-gray-500">Email: </span><span>{t.email}</span></div>
                {t.idNumber && (
                  <div className="md:col-span-2"><span className="text-gray-500">ID: </span><span>{t.idNumber}</span></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t">
          {["PENDING", "CONFIRMED", "COMPLETED"].map((s) => (
            <button
              key={s}
              disabled={b.status === s}
              onClick={() => updateStatus(s)}
              className={`text-xs px-3 py-1.5 rounded border transition ${
                b.status === s
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              Mark {s}
            </button>
          ))}
          {b.status !== "CANCELLED" && b.status !== "COMPLETED" && (
            <button
              onClick={cancel}
              className="text-xs px-3 py-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 ml-auto"
            >
              Cancel Booking
            </button>
          )}
          <button onClick={onClose} className="btn-outline text-xs">Close</button>
        </div>
      </div>
    </div>
  );
}