import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatCurrency, formatDate, statusColor } from "../utils/format";

export default function BookingConfirmation() {
  const { id } = useParams();
  const [b, setB] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/bookings/${id}`).then((r) => setB(r.data.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!b) return <div className="container-page py-10 text-center">Booking not found.</div>;

  return (
    <div className="container-page py-12 max-w-2xl">
      <div className="card p-8 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
        <p className="text-gray-600 mt-2">Thank you for booking with TravelGo.</p>

        <div className="mt-6 bg-primary/5 rounded-lg p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">Booking Reference</p>
          <p className="text-xl font-mono font-bold text-primary">{b.bookingReference}</p>
        </div>

        <div className="mt-6 text-left space-y-3">
          <Row label="Package" value={b.packageName} />
          <Row label="Destination" value={b.destination} />
          <Row label="Travel Date" value={formatDate(b.travelDate)} />
          <Row label="Travellers" value={b.numberOfTravellers} />
          <Row label="Total Amount" value={formatCurrency(b.totalAmount)} />
          <Row label="Status" value={
            <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
          } />
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
          <Link to={`/packages/${b.id}`} className="btn-outline">View Booking</Link>
          <button onClick={() => window.print()} className="btn-outline">Print</button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}