import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>SHARVESH</span>
            <small>TOURS &amp; TRAVELS</small>
          </Link>

          <p>
            Discover new destinations, experience different cultures, and
            create memories that last a lifetime.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="WhatsApp">W</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/dashboard">My Bookings</Link>
        </div>

        <div className="footer-column">
          <h3>Travel</h3>
          <Link to="/packages">Tour Packages</Link>
          <Link to="/destinations">Popular Destinations</Link>
          <Link to="/packages">Book a Trip</Link>
          <Link to="/dashboard">My Bookings</Link>
        </div>

        <div className="footer-column footer-contact">
          <h3>Get In Touch</h3>
          <p>📍 New Delhi, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@sharveshtours.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Sharvesh Tours &amp; Travels. All rights reserved. (Amit Verma)</p>
        <div>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}