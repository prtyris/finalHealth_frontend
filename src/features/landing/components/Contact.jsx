import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-br from-blue-600 to-teal-500 text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Visit or Contact Us
        </h2>
        <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">
          Get in touch with our team for any questions or support
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              FinalHealth Headquarters
            </h3>
            <div className="space-y-4">
              <p className="flex items-center">
                <span className="text-2xl mr-4">📍</span>
                Suite 17, Lorma Ave., corner Aguila, Lapu-lapu City, 9923
                Palawan de Sur, Philippines
              </p>
              <p className="flex items-center">
                <span className="text-2xl mr-4">📞</span>
                09 920 922 8257
              </p>
              <p className="flex items-center">
                <span className="text-2xl mr-4">✉️</span>
                support@finalHealth.com
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-300 dark:bg-gray-600 rounded-xl overflow-hidden h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31403.17175735!2d125.6089!3d7.0731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d9f1b1c8c9f%3A0x3a7b9f1c1c1c1c1c!2sDavao%20City%2C%20Davao%20del%20Sur!5e0!3m2!1sen!2sph!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              title="FinalHealth Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
