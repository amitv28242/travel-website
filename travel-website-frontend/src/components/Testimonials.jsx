import { useEffect, useState } from "react";
import api from "../services/api";
import { getPage } from "../utils/response";
import "./Testimonials.css";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/reviews?status=APPROVED&size=3")
      .then((r) => setTestimonials(getPage(r).content))
      .catch((e) => {
        console.warn("Testimonials fetch failed:", e?.message);
        setTestimonials([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="testimonials-section">
      <div className="testimonials-heading">
        <p className="testimonials-label">TRAVEL STORIES</p>
        <h2>
          What Our <span>Travellers Say</span>
        </h2>
        <p>Real experiences from travellers who chose to explore the world with us.</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <article className="testimonial-card" key={t.id}>
            <div className="quote-mark">“</div>
            <div className="stars">
              {"★".repeat(t.rating || 0)}
              <span>{"★".repeat(5 - (t.rating || 0))}</span>
            </div>
            <p className="testimonial-review">{t.comment}</p>
            <div className="testimonial-person">
              <div className="person-avatar">
                {(t.userName || "?").charAt(0)}
              </div>
              <div>
                <h3>{t.userName || "Anonymous"}</h3>
                <span>Traveller</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}