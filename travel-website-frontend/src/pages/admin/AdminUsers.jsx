import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useApi } from "../../hooks/useApi";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatDate, statusColor } from "../../utils/format";

export default function AdminUsers() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);

  const { data, loading, refetch } = useApi("/admin/users", {
    q: q || undefined,
    role: role || undefined,
    status: status || undefined,
    page,
    size: 10,
  });

  const toggleStatus = async (u) => {
    const next = u.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
    if (!confirm(`Set ${u.name} to ${next}?`)) return;
    try {
      await api.put(`/admin/users/${u.id}/status?status=${next}`);
      toast.success("Status updated");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  const remove = async (u) => {
    if (!confirm(`Delete ${u.name}? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/users/${u.id}`);
      toast.success("User deleted");
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="card p-4 mb-4 flex flex-wrap gap-3">
        <input value={q} onChange={(e) => { setPage(0); setQ(e.target.value); }}
          placeholder="Search name/email" className="input flex-1 min-w-[200px]" />
        <select className="input w-40" value={role} onChange={(e) => { setPage(0); setRole(e.target.value); }}>
          <option value="">All roles</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <select className="input w-40" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }}>
          <option value="">All status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="DISABLED">DISABLED</option>
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
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Bookings</th>
                  <th className="p-3">Joined</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.content?.length === 0 && (
                  <tr><td colSpan="7" className="p-8 text-center text-gray-500">No users found</td></tr>
                )}
                {data?.content?.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3 font-medium">{u.name}</td>
                    <td className="p-3 text-gray-600">{u.email}</td>
                    <td className="p-3">
                      <span className={`badge ${u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : ""}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`badge ${statusColor(u.status)}`}>{u.status}</span>
                    </td>
                    <td className="p-3">{u.totalBookings}</td>
                    <td className="p-3 text-gray-500">{formatDate(u.createdAt)}</td>
                    <td className="p-3 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => toggleStatus(u)}
                        className="text-xs px-3 py-1 rounded border hover:bg-gray-50">
                        {u.status === "ACTIVE" ? "Disable" : "Enable"}
                      </button>
                      <button onClick={() => remove(u)}
                        className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100">
                        Delete
                      </button>
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
    </div>
  );
}