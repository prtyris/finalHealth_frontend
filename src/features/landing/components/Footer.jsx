import React from "react";

const Footer = () => {
  const footerSections = [
    {
      title: "FinalHealth",
      links: [
        "Comprehensive healthcare management solutions for modern clinics",
      ],
    },
    {
      title: "Quick Links",
      links: ["Home", "About", "Features", "Services", "Contact"],
    },
    {
      title: "Support",
      links: ["FAQ", "Help Center", "Privacy Policy", "Terms of Service"],
    },
    {
      title: "Contact Us",
      links: [
        "Email: support@finalHealth.com",
        "Phone: 09 920 922 8257",
        "Address: Davao St, X Village City",
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-teal-400 mb-4">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <div
                    key={linkIndex}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 FinalHealth. All rights reserved. GROUP 1 BSCS-501
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
