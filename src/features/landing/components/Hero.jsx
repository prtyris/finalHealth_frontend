import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-teal-500 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your Healthcare Services
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
          Manage your clinic, schedule appointments, and organize healthcare seamlessly
        </p>
        
        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <select className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option>What do you want to do?</option>
              <option>Schedule Appointment</option>
              <option>Find a Doctor</option>
              <option>View Records</option>
            </select>
            <input
              type="text"
              placeholder="Your name?"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;