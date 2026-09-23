import Hero from '../components/Hero';
import DestinationSection from '../components/DestinationSection';
import PackageSection from '../components/PackageSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import TravelCTA from '../components/TravelCTA';

function HomePage() {
  return (
    <>
      <Hero />
      <DestinationSection />
      <PackageSection />
      <WhyChooseUs />
      <Testimonials />
      <TravelCTA />
    </>
  );
}

export default HomePage;
