import React, { useState } from "react";

const ContactForm = ({ darkMode = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the form submission, e.g., using Formspree API
    const response = await fetch("https://formspree.io/f/xdkabwoz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccessMessage(true);
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } else {
      alert("There was an issue sending your message. Please try again.");
    }
  };

  return (
    <div
      className={`flex justify-center mt-10 p-5 ${
        darkMode ? "bg-gray-900" : ""
      }`}
    >
      <div
        className={`w-full max-w-4xl p-8 rounded-lg shadow-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-center text-3xl font-bold mb-4">Reach Us</h2>
        <p className="text-center text-lg mb-6 text-gray-500">
          Have questions? We're here to help!
        </p>

        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="mt-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={`w-full p-4 border border-gray-300 rounded-md text-lg ${
                darkMode
                  ? "bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  : "bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
              }`}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-6">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className={`w-full p-4 border border-gray-300 rounded-md text-lg ${
                darkMode
                  ? "bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  : "bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
              }`}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-6">
            <textarea
              name="message"
              placeholder="Your Message"
              className={`w-full p-4 border border-gray-300 rounded-md text-lg h-40 ${
                darkMode
                  ? "bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  : "bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
              }`}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full mt-6 py-4 text-xl font-bold ${
              darkMode ? "bg-blue-600 text-white" : "bg-blue-700 text-white"
            } rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            Send Message
          </button>
        </form>

        {successMessage && (
          <p className="text-center mt-6 text-green-500 text-xl">
            Message sent successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
