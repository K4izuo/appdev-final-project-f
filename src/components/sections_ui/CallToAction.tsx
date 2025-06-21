import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Home } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-500 via-warm-400 to-gentle-500"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>
      
      {/* Floating hearts */}
      <div className="absolute top-20 left-1/4 animate-pulse delay-1000">
        <Heart className="w-6 h-6 text-white/30 fill-white/30" />
      </div>
      <div className="absolute bottom-32 right-1/3 animate-pulse delay-500">
        <Heart className="w-4 h-4 text-white/30 fill-white/30" />
      </div>
      <div className="absolute top-1/2 right-20 animate-pulse delay-700">
        <Home className="w-5 h-5 text-white/30" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Your Perfect Pet is
            <br />
            <span className="text-white/90">Waiting for You</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Don't wait another day to find your new best friend. Thousands of loving pets are ready to become part of your family today.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-warm-600 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              Start Adopting Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Browse Available Pets
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-white/90">
              <div className="text-2xl font-bold mb-2">Free to Browse</div>
              <div className="text-sm opacity-80">No hidden fees or charges</div>
            </div>
            <div className="text-white/90">
              <div className="text-2xl font-bold mb-2">Instant Matching</div>
              <div className="text-sm opacity-80">Find your pet in minutes</div>
            </div>
            <div className="text-white/90">
              <div className="text-2xl font-bold mb-2">24/7 Support</div>
              <div className="text-sm opacity-80">We're here to help always</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 37.5C672 45 768 60 864 67.5C960 75 1056 75 1152 67.5C1248 60 1344 45 1392 37.5L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  );
};

export default CallToAction;
