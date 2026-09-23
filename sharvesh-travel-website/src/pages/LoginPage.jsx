import { useState } from 'react';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Login successful. This is a frontend prototype.');
  };

  return (
    <main className="page-shell auth-page">
      <section className="auth-card">
        <p className="auth-label">WELCOME BACK</p>
        <h1>Login to Your Account</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          <button type="submit" className="primary-btn">Login</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
