import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          What Clinics Say About FinalHealth
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Hear from healthcare professionals who have transformed their clinic
          management
        </p>

        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg max-w-4xl mx-auto text-center">
          <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-6">
            "I've worked in oncology; everything is manageable for me. I would
            recommend it over for my staff to focus on their comfort there."
          </p>
          <p className="font-bold text-gray-800 dark:text-gray-200">
            - Dr. Carl from Sampson Family Health Clinic
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
