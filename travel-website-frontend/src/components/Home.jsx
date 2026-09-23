import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import DestinationSection from "../components/DestinationSection";
import PackageSection from "../components/PackageSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import TravelCTA from "../components/TravelCTA";

export default function Home() {
  // Small delay to avoid layout shift — every section fetches on its own.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Trigger re-render after mount so all sections fetch in parallel
    setReady(true);
  }, []);

  return (
    <div className="home-page">
      <Hero />
      {ready && (
        <>
          <DestinationSection />
          <PackageSection />
          <WhyChooseUs />
          <Testimonials />
          <TravelCTA />
        </>
      )}
    </div>
  );
}