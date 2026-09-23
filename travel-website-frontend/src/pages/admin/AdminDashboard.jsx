import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatCurrency } from "../../utils/format";

export default function AdminDashboard() {
  const { data, loading } = useApi("/admin/stats");

  if (loading) return <LoadingSpinner />;
  if (!data) return <div className="card p-6">No stats available.</div>;

  const stats = [
    { label: "Total Users", value: data.totalUsers, icon: "👥", color: "bg-blue-50 text-blue-700" },
    { label: "Destinations", value: data.totalDestinations, icon: "🌍", color: "bg-emerald-50 text-emerald-700" },
    { label: "Packages", value: data.totalPackages, icon: "📦", color: "bg-purple-50 text-purple-700" },
    { label: "Total Bookings", value: data.totalBookings, icon: "📅", color: "bg-amber-50 text-amber-700" },
    { label: "Pending", value: data.pendingBookings, icon: "⏳", color: "bg-yellow-50 text-yellow-700" },
    { label: "Confirmed", value: data.confirmedBookings, icon: "✅", color: "bg-green-50 text-green-700" },
    { label: "Cancelled", value: data.cancelledBookings, icon: "❌", color: "bg-red-50 text-red-700" },
    { label: "Completed", value: data.completedBookings, icon: "🏁", color: "bg-slate-50 text-slate-700" },
    { label: "Reviews", value: data.totalReviews, icon: "⭐", color: "bg-orange-50 text-orange-700" },
    { label: "Pending Reviews", value: data.pendingReviews, icon: "🕵️", color: "bg-pink-50 text-pink-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="card p-6 mb-6 bg-gradient-to-r from-primary to-primary-dark text-white">
        <p className="text-sm opacity-90">Total Revenue (confirmed + completed)</p>
        <p className="text-3xl font-bold mt-1">{formatCurrency(data.totalRevenue)}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-2 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}