import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { initials } from "../utils/format";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span>SHARVESH</span>
          <small>TOURS &amp; TRAVELS</small>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/destinations" className={({ isActive }) => (isActive ? "active" : "")}>Destinations</NavLink>
          <NavLink to="/packages" className={({ isActive }) => (isActive ? "active" : "")}>Packages</NavLink>
          {user && (
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
          )}
          {user?.role === "ADMIN" && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>Admin</NavLink>
          )}
        </div>

        <div className="nav-auth">
          {user ? (
            <>
              <div className="nav-user">
                <div className="nav-avatar">{initials(user.name)}</div>
                <span className="nav-username">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="nav-button secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button secondary">Login</Link>
              <Link to="/packages" className="nav-button">Book Now</Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/destinations" onClick={closeMenu}>Destinations</NavLink>
          <NavLink to="/packages" onClick={closeMenu}>Packages</NavLink>
          {user && <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>}
          {user?.role === "ADMIN" && <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>}
          <div className="nav-mobile-divider" />
          {user ? (
            <button onClick={handleLogout} className="nav-button secondary">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-button secondary" onClick={closeMenu}>Login</Link>
              <Link to="/packages" className="nav-button" onClick={closeMenu}>Book Now</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}