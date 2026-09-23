import "./Testimonials.css";

const testimonials = [
  {
    name: "Ananya Menon",
    location: "Kerala, India",
    review:
      "The entire travel experience was smooth and well organized. Everything was planned beautifully, and we could simply enjoy our trip.",
  },
  {
    name: "Rahul Nair",
    location: "Kochi, India",
    review:
      "From planning to the actual journey, the support was excellent. The package was well organized and the experience was memorable.",
  },
  {
    name: "Meera Thomas",
    location: "Bangalore, India",
    review:
      "A wonderful travel experience with great planning and support. I would definitely consider them for my future trips.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section">

      <div className="testimonials-heading">
        <p className="testimonials-label">TRAVEL STORIES</p>

        <h2>
          What Our <span>Travellers Say</span>
        </h2>

        <p>
          Real experiences from travellers who chose to explore
          the world with us.
        </p>
      </div>

      <div className="testimonials-grid">

        {testimonials.map((testimonial) => (
          <article
            className="testimonial-card"
            key={testimonial.name}
          >
            <div className="quote-mark">“</div>

            <div className="stars">
              ★ ★ ★ ★ ★
            </div>

            <p className="testimonial-review">
              {testimonial.review}
            </p>

            <div className="testimonial-person">

              <div className="person-avatar">
                {testimonial.name.charAt(0)}
              </div>

              <div>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.location}</span>
              </div>

            </div>
          </article>
        ))}

      </div>

    </section>
  );
}

export default Testimonials;