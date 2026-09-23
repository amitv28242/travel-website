import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { initials } from "../utils/format";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLink = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition ${
      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  const links = (
    <>
      <NavLink to="/" end className={navLink}>Home</NavLink>
      <NavLink to="/destinations" className={navLink}>Destinations</NavLink>
      <NavLink to="/packages" className={navLink}>Packages</NavLink>
      {user && <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>}
      {user?.role === "ADMIN" && <NavLink to="/admin" className={navLink}>Admin</NavLink>}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm">
      <div className="container-page flex items-center justify-between py-3">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-1">
          ✈ TravelGo
        </Link>

        <div className="hidden md:flex items-center gap-1">{links}</div>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {initials(user.name)}
                </div>
                <span className="text-sm text-gray-700 max-w-[100px] truncate">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn-outline text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Sign Up</Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 flex flex-col gap-1">
          {links}
          <div className="border-t mt-2 pt-3 flex flex-col gap-2">
            {user ? (
              <button onClick={handleLogout} className="btn-outline w-full">Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn-outline w-full text-center">Login</Link>
                <Link to="/register" className="btn-primary w-full text-center">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}