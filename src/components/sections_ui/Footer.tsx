import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-warm-500 to-gentle-500 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">GentlePaws</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connecting loving families with pets in need of homes. Every adoption creates a story of love and companionship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-warm-100 hover:bg-warm-200 rounded-full flex items-center justify-center transition-colors duration-300">
                <Facebook className="w-5 h-5 text-warm-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-warm-100 hover:bg-warm-200 rounded-full flex items-center justify-center transition-colors duration-300">
                <Instagram className="w-5 h-5 text-warm-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-warm-100 hover:bg-warm-200 rounded-full flex items-center justify-center transition-colors duration-300">
                <Twitter className="w-5 h-5 text-warm-600" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Browse Pets", "Adoption Process", "Success Stories", "Pet Care Tips", "FAQs"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-warm-600 transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {["Help Center", "Contact Us", "Volunteer", "Donate", "Partner Shelters"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-warm-600 transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-warm-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">hello@gentlepaws.com</p>
                  <p className="text-sm text-gray-500">General inquiries</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-warm-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-warm-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">123 Pet Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="bg-gradient-to-r from-warm-50 to-gentle-50 rounded-2xl p-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6">Get notified about new pets available for adoption and helpful pet care tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent"
              />
              <button className="bg-warm-500 hover:bg-warm-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 sm:mb-0">
              <p>&copy; 2024 GentlePaws. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-warm-600 transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-warm-600 transition-colors duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-warm-600 transition-colors duration-300 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
