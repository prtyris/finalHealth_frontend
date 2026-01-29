import React, { useState } from "react";

const ContactForm = ({ darkMode = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const response = await fetch("https://formspree.io/f/xdkabwoz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccessMessage(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccessMessage(false), 5000);
    } else {
      alert("There was an issue sending your message. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={`py-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Spacing - Added more space here */}
        <div className="mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold text-center ${darkMode ? "text-white" : "text-gray-900"} mb-3`}>
            Get in Touch
          </h2>
          <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
            Have questions about FinalHealth? We're here to help you streamline your healthcare management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info & Form */}
          <div className="space-y-8">
            {/* Email Display */}
            <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-blue-600 dark:text-blue-400 text-lg"></i>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email us at</p>
                  <p className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>support@finalhealth.com</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Contact Information
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Reach out to our team for support, inquiries, or to schedule a demo.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Suite 17, Abreeza Place, J.P. Laurel Avenue, Davao City, 8000
                    Davao del Sur, Philippines</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="fas fa-phone text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>(123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="fas fa-clock text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Mon-Fri: 8AM-6PM</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Quick Response
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"} mb-1`}>24/7</div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Support</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"} mb-1`}>1hr</div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Avg. Response</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`p-8 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Send Us a Message
            </h3>
            
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className={`w-full p-3 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-900 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className={`w-full p-3 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-900 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="How can we help you today?"
                  rows="4"
                  className={`w-full p-3 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-900 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 mt-2 ${isSubmitting ? "bg-blue-400" : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${darkMode ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </span>
                )}
              </button>
            </form>

            {successMessage && (
              <div className="mt-5 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-600 dark:text-green-400 text-lg mr-3"></i>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">Message sent successfully!</p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      We'll get back to you within 1 business day.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className={`mt-6 text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              We respect your privacy. Your information is secure and will never be shared.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      `}</style>
    </div>
  );
};

export default ContactForm;