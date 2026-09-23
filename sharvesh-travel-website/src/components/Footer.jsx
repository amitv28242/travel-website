import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* Company */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>SHARVESH</span>
            <small>TOURS & TRAVELS</small>
          </div>

          <p>
            Discover new destinations, experience different cultures
            and create memories that last a lifetime.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="WhatsApp">W</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h3>Travel</h3>

          <Link to="/packages">Tour Packages</Link>
          <Link to="/destinations">Popular Destinations</Link>
          <Link to="/booking">Book a Trip</Link>
          <Link to="/dashboard">My Bookings</Link>
          <Link to="/contact">Travel Assistance</Link>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>Get In Touch</h3>

          <p>
            📍 Kerala, India
          </p>

          <p>
            📞 +91 XXXXX XXXXX
          </p>

          <p>
            ✉️ info@sharveshtours.com
          </p>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Sharvesh Tours & Travels. All rights reserved.
        </p>

        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;