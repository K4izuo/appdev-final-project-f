import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Star, Users } from "lucide-react";

const Hero = () => {
  // Add a scroll function
  const scrollToFeaturedPets = () => {
    const featuredPetsSection = document.getElementById("featured-pets");
    if (featuredPetsSection) {
      featuredPetsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-warm"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gentle-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-warm-200/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-10 animate-pulse delay-700">
        <Heart className="w-8 h-8 text-warm-400/60 fill-warm-400/60" />
      </div>
      <div className="absolute top-1/3 right-16 animate-pulse delay-300">
        <Star className="w-6 h-6 text-gentle-400/60 fill-gentle-400/60" />
      </div>
      <div className="absolute bottom-32 left-20 animate-pulse delay-1000">
        <Users className="w-7 h-7 text-warm-500/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-warm-800 leading-tight">
            Find Your Perfect
            <br />
            <span className="text-gentle-600">Furry Companion</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with adorable pets waiting for their forever homes. Our trusted platform makes pet adoption simple, safe, and joyful for everyone involved.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-warm-500 hover:bg-warm-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              onClick={scrollToFeaturedPets}
            >
              Browse Available Pets
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gentle-500 text-gentle-600 hover:bg-gentle-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Learn About Adoption
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Heart className="w-8 h-8 text-warm-500 fill-warm-500" />
              </div>
              <div className="text-warm-700 font-semibold">10,000+ Happy Matches</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Star className="w-8 h-8 text-gentle-500 fill-gentle-500" />
              </div>
              <div className="text-gentle-600 font-semibold">Verified Shelters</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Users className="w-8 h-8 text-warm-600" />
              </div>
              <div className="text-warm-700 font-semibold">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 37.5C672 45 768 60 864 67.5C960 75 1056 75 1152 67.5C1248 60 1344 45 1392 37.5L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
