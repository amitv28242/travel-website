import { bookings, profile } from '../data/travelData';

function DashboardPage() {
  return (
    <main className="page-shell dashboard-page">
      <section className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <p className="auth-label">MY ACCOUNT</p>
            <h1>Welcome, {profile.name}</h1>
          </div>
          <button className="secondary-btn">Logout</button>
        </div>

        <div className="profile-section">
          <h3>Profile Details</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Member Since:</strong> {profile.memberSince}</p>
        </div>

        <div className="booking-history">
          <h3>Booking History</h3>

          {bookings.map((booking) => (
            <div className="history-card" key={booking.id}>
              <div>
                <strong>{booking.packageName}</strong>
                <p>{booking.id}</p>
              </div>
              <div>
                <span>{booking.date}</span>
                <p>{booking.travelers} travellers</p>
              </div>
              <span className="status-badge">{booking.status}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
