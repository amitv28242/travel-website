import { useState } from 'react';

function BookingPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    date: '',
    packageName: 'Dubai Explorer',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Booking request submitted for ${form.packageName}. Our team will contact you shortly.`);
  };

  return (
    <main className="page-shell booking-page">
      <section className="booking-card">
        <div className="booking-heading">
          <p>BOOK YOUR TRIP</p>
          <h1>Plan Your Next Adventure</h1>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-grid">
            <label>
              Full Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
            </label>

            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
            </label>

            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone" required />
            </label>

            <label>
              Package
              <select name="packageName" value={form.packageName} onChange={handleChange}>
                <option>Dubai Explorer</option>
                <option>Maldives Escape</option>
                <option>Paris Getaway</option>
                <option>Kerala Honeymoon</option>
              </select>
            </label>

            <label>
              Travel Date
              <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </label>

            <label>
              Number of Travellers
              <input type="number" min="1" max="10" name="travelers" value={form.travelers} onChange={handleChange} required />
            </label>
          </div>

          <div className="booking-summary">
            <h3>Trip Summary</h3>
            <p>{form.packageName}</p>
            <p>{form.travelers} traveller(s)</p>
            <p>{form.date || 'Select a travel date'}</p>
          </div>

          <button type="submit" className="primary-btn">Confirm Booking</button>
        </form>
      </section>
    </main>
  );
}

export default BookingPage;
