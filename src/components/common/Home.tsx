import FeaturedSection from './FeaturedSection';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
// import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      
        <Navbar />
        <Hero />
      

      {/* Other sections with normal background */}
      <FeaturedSection />
      <Footer />
    </>
  );
};

export default Home;
