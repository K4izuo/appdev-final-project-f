import Header from "@/components/sections_ui/Header";
import Hero from "@/components/sections_ui/Hero";
import FeaturedPets from "@/components/sections_ui/FeaturedPets";
import Statistics from "@/components/sections_ui/Statistics";
import CallToAction from "@/components/sections_ui/CallToAction";
import Footer from "@/components/sections_ui/Footer";

export default function MainPage() {

  return (
    <div className="min-h-screen">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="featured-pets">
        <FeaturedPets />
      </div>
      <div id="statistics">
        <Statistics />
      </div>
      <div id="call-to-action">
        <CallToAction />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};