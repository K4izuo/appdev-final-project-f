import { Badge } from "@/components/ui/badge";
import { Heart, Home, Users, Award, Shield, Clock } from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: Heart,
      number: "2,847",
      label: "Successful Adoptions",
      description: "Pets found their forever homes"
    },
    {
      icon: Home,
      number: "1,200+",
      label: "Partner Shelters",
      description: "Trusted rescue organizations"
    },
    {
      icon: Users,
      number: "15,000+",
      label: "Happy Families",
      description: "Lives transformed through adoption"
    },
    {
      icon: Award,
      number: "4.9★",
      label: "Average Rating",
      description: "From our satisfied adopters"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Health Guaranteed",
      description: "All pets are health-checked"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support Available",
      description: "We're here when you need us"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gentle-50 via-white to-warm-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-gentle-100 text-gentle-700 hover:bg-gentle-200">
            Our Impact
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Making a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gentle-500 to-warm-500 ml-3">
              Real Difference
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every number tells a story of love, hope, and new beginnings. Join thousands of families who have found their perfect companion through our platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-warm-100 to-gentle-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-warm-600" />
                </div>
                
                <div className="mb-2">
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-warm-600 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm border border-warm-200/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community of pet lovers and help us continue creating happy endings for pets in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-warm-500 hover:bg-warm-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Your Search
              </button>
              <button className="border-2 border-gentle-300 text-gentle-700 hover:bg-gentle-50 px-6 py-3 rounded-full font-semibold transition-all duration-300">
                Volunteer With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
