import "./WhyChooseUs.css";

const benefits = [
  {
    number: "01",
    title: "Personalized Journeys",
    description:
      "Travel experiences designed around your interests, schedule and expectations.",
  },
  {
    number: "02",
    title: "Handpicked Experiences",
    description:
      "Carefully planned destinations and experiences to make every journey memorable.",
  },
  {
    number: "03",
    title: "Trusted Service",
    description:
      "From planning your trip to returning home, we're here to make travel easier.",
  },
  {
    number: "04",
    title: "Dedicated Support",
    description:
      "Get assistance throughout your journey whenever you need it.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="why-content">

        <div className="why-heading">
          <p className="why-label">WHY TRAVEL WITH US</p>

          <h2>
            More Than A Trip,
            <br />
            <span>It's An Experience.</span>
          </h2>

          <p className="why-description">
            We believe travel is more than visiting a destination.
            It's about discovering new places, experiencing different
            cultures and creating memories that stay with you.
          </p>

          <button className="why-button">
            Discover More →
          </button>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <div className="benefit-card" key={benefit.number}>

              <span className="benefit-number">
                {benefit.number}
              </span>

              <div className="benefit-line"></div>

              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;