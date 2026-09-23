import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-3">✈ TravelGo</h3>
          <p className="text-sm leading-relaxed">
            Discover handpicked destinations and unforgettable tour packages —
            book with confidence, travel with joy.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link to="/packages" className="hover:text-white">Packages</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">My Bookings</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Popular</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/destinations?q=Goa" className="hover:text-white">Goa</Link></li>
            <li><Link to="/destinations?q=Manali" className="hover:text-white">Manali</Link></li>
            <li><Link to="/destinations?q=Kerala" className="hover:text-white">Kerala</Link></li>
            <li><Link to="/destinations?q=Rajasthan" className="hover:text-white">Rajasthan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📧 support@travelgo.example</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Mumbai, India</li>
            <li className="flex gap-3 pt-2">
              <a href="#" className="hover:text-white" aria-label="Facebook">FB</a>
              <a href="#" className="hover:text-white" aria-label="Instagram">IG</a>
              <a href="#" className="hover:text-white" aria-label="Twitter">TW</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container-page py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} TravelGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}