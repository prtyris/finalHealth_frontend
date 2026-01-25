import React from "react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div>
      {/* Map & Contact Info Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Visit or Contact Us
          </h2>
          <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">
            Get in touch with our team for any questions or support
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">
                FinalHealth Headquarters
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <span className="text-xl">📍</span>
                  </div>
                  <p className="text-lg">
                    Suite 17, Abreeza Place, J.P. Laurel Avenue, Davao City, 8000
                    Davao del Sur, Philippines
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <span className="text-xl">📞</span>
                  </div>
                  <p className="text-lg">09 920 922 8257</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <span className="text-xl">✉️</span>
                  </div>
                  <p className="text-lg">support@finalhealth.com</p>
                </div>
              </div>

              {/* Map Instructions */}
              <div className="mt-10 pt-8 border-t border-white/30">
                <p className="text-blue-100 mb-4">
                  <strong>Use `ctrl + scroll` to zoom the map</strong>
                </p>
                <div className="flex space-x-4">
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    DIRECTIONS
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    VIEW LARGER MAP
                  </button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5605009319886!2d125.61165119999999!3d6.453465999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d9f1b1c8c9f%3A0x3a7b9f1c1c1c1c1c!2sAbreeza%20Place%2C%20J.P.%20Laurel%20Avenue%2C%20Davao%20City%2C%208000%20Davao%20del%20Sur%2C%20Philippines!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="FinalHealth Location - Abreeza Place, Davao City"
              ></iframe>
            </div>
          </div>

          {/* FINALHEALTH Note */}
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-blue-100 text-sm mb-2">FINALHEALTH</p>
            <p className="text-blue-200 text-xs">
              Davao City, Davao del Sur • Healthcare Management Solutions
            </p>
          </div>
        </div>
      </section>

      {/* White Space Separator */}
      <div className="h-8 bg-gradient-to-b from-teal-500 to-gray-50"></div>

      {/* Contact Form Section */}
      <div className="bg-gray-50">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;