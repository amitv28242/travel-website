import { NavLink, Outlet, Link } from "react-router-dom";

const links = [
  { to: "/admin", end: true, label: "Dashboard", icon: "📊" },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/destinations", label: "Destinations", icon: "🌍" },
  { to: "/admin/packages", label: "Packages", icon: "📦" },
  { to: "/admin/bookings", label: "Bookings", icon: "📅" },
  { to: "/admin/reviews", label: "Reviews", icon: "⭐" },
];

export default function AdminLayout() {
  return (
    <div className="container-page py-6 grid lg:grid-cols-5 gap-6">
      <aside className="lg:col-span-1">
        <div className="card p-4 lg:sticky lg:top-24">
          <h2 className="font-bold text-lg mb-3">Admin Panel</h2>
          <nav className="space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    isActive ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`
                }
              >
                <span>{l.icon}</span>{l.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/" className="block mt-4 text-xs text-center text-gray-500 hover:text-primary">
            ← Back to site
          </Link>
        </div>
      </aside>
      <section className="lg:col-span-4 min-w-0">
        <Outlet />
      </section>
    </div>
  );
}