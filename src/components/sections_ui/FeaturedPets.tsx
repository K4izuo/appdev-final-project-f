import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar } from "lucide-react";

const FeaturedPets = () => {
  const pets = [
    {
      id: 1,
      name: "Luna",
      type: "Cat",
      breed: "Persian",
      age: "2 years",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop&crop=face",
      description: "Sweet and gentle, loves cuddles",
      tags: ["Friendly", "Indoor", "Vaccinated"]
    },
    {
      id: 2,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=face",
      description: "Energetic and loyal companion",
      tags: ["Active", "Trained", "Great with kids"]
    },
    {
      id: 3,
      name: "Mochi",
      type: "Cat",
      breed: "British Shorthair",
      age: "1 year",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop&crop=face",
      description: "Playful kitten with beautiful eyes",
      tags: ["Playful", "Young", "Healthy"]
    },
    {
      id: 4,
      name: "Buddy",
      type: "Dog",
      breed: "Labrador Mix",
      age: "4 years",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&crop=face",
      description: "Calm and affectionate family dog",
      tags: ["Gentle", "Family-friendly", "Neutered"]
    },
    {
      id: 5,
      name: "Whiskers",
      type: "Cat",
      breed: "Maine Coon",
      age: "5 years",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop&crop=face",
      description: "Majestic and independent spirit",
      tags: ["Independent", "Mature", "Beautiful"]
    },
    {
      id: 6,
      name: "Bailey",
      type: "Dog",
      breed: "Border Collie",
      age: "2 years",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop&crop=face",
      description: "Intelligent and loves to learn",
      tags: ["Smart", "Energetic", "Obedient"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-warm-100 text-warm-700 hover:bg-warm-200">
            Featured Pets
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Meet Your New
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-500 to-gentle-500 ml-3">
              Best Friend
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These adorable pets are looking for their forever homes. Each one has been health-checked and is ready to bring joy to your family.
          </p>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pets.map((pet, index) => (
            <Card key={pet.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative overflow-hidden">
                <img 
                  src={pet.image} 
                  alt={pet.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary" className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white shadow-lg">
                    <Heart className="w-4 h-4 text-warm-500" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 text-gray-700 font-medium">
                    {pet.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h3>
                    <p className="text-sm text-gray-600">{pet.breed}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {pet.age}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {pet.location}
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {pet.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pet.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gentle-50 text-gentle-700 hover:bg-gentle-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button className="w-full bg-warm-500 hover:bg-warm-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                  Meet {pet.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="border-2 border-warm-300 text-warm-700 hover:bg-warm-50 px-8 py-3 rounded-full font-semibold transition-all duration-300">
            View All Available Pets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;
