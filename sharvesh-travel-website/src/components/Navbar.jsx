import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>SHARVESH</span>
        <small>TOURS & TRAVELS</small>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>

      <Link to="/booking" className="nav-button">Book Now</Link>
    </nav>
  );
}

export default Navbar;