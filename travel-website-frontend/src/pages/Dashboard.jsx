import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { formatCurrency, formatDate, statusColor } from "../utils/format";

export default function Dashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get("/bookings"),
      api.get("/users/profile"),
    ]).then(([bRes, pRes]) => {
      setBookings(bRes.data.data || []);
      setProfile({ name: pRes.data.data.name, phone: pRes.data.data.phone });
    }).finally(() => setLoading(false));
  }, []);

  const cancelBooking = async (b) => {
    if (!confirm(`Cancel booking ${b.bookingReference}?`)) return;
    try {
      await api.put(`/bookings/${b.id}/cancel`);
      toast.success("Booking cancelled");
      setBookings((prev) => prev.map((x) => x.id === b.id ? { ...x, status: "CANCELLED" } : x));
    } catch (e) {
      toast.error(e.response?.data?.message || "Cancel failed");
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/users/profile", profile);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-page py-10 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hi, {user.name} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your bookings and profile</p>
      </div>

      <div className="flex gap-2 border-b mb-6 overflow-x-auto">
        <TabBtn active={tab === "bookings"} onClick={() => setTab("bookings")}>My Bookings</TabBtn>
        <TabBtn active={tab === "profile"} onClick={() => setTab("profile")}>Profile</TabBtn>
      </div>

      {tab === "bookings" && (
        <>
          {bookings.length === 0 ? (
            <EmptyState
              icon="🎒"
              title="No bookings yet"
              message="Start exploring our packages."
              action={<Link to="/packages" className="btn-primary">Browse Packages</Link>}
            />
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="card p-5">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <p className="font-mono text-xs text-gray-500">{b.bookingReference}</p>
                      <h3 className="font-semibold text-lg">{b.packageName}</h3>
                      <p className="text-sm text-gray-500">📍 {b.destination}</p>
                    </div>
                    <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <Info label="Travel Date" value={formatDate(b.travelDate)} />
                    <Info label="Travellers" value={b.numberOfTravellers} />
                    <Info label="Total" value={formatCurrency(b.totalAmount)} />
                    <Info label="Booked" value={formatDate(b.bookingDate)} />
                  </div>

                  {b.status === "CONFIRMED" && (
                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                      <button onClick={() => cancelBooking(b)} className="btn-danger text-sm">
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "profile" && (
        <form onSubmit={saveProfile} className="card p-6 max-w-lg space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" value={user.email} disabled />
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium border-b-2 -mb-px whitespace-nowrap transition ${
        active ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}