import React from "react";

const Values = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
            <i className="fas fa-star text-blue-500 dark:text-blue-400"></i>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Our Principles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            The principles that guide every decision we make at FinalHealth
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Value 1: Patient-Centered */}
          <div className="group">
            <div className="h-full p-8 rounded-2xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-red-100/50 dark:group-hover:shadow-red-900/20">
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <i className="fas fa-heart-circle-check text-white text-3xl"></i>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-red-600 dark:text-red-400">01</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Patient-Centered
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Everything we do is focused on improving patient care and outcomes.
              </p>

              {/* Decorative Line */}
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mb-6"></div>

              {/* Feature Tag */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Core Principle
                </span>
              </div>
            </div>
          </div>

          {/* Value 2: Innovation */}
          <div className="group">
            <div className="h-full p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-blue-100/50 dark:group-hover:shadow-blue-900/20">
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <i className="fas fa-lightbulb text-white text-3xl"></i>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-blue-600 dark:text-blue-400">02</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We continuously evolve our platform to meet changing healthcare needs.
              </p>

              {/* Decorative Line */}
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6"></div>

              {/* Feature Tag */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Core Principle
                </span>
              </div>
            </div>
          </div>

          {/* Value 3: Partnership */}
          <div className="group">
            <div className="h-full p-8 rounded-2xl border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-green-100/50 dark:group-hover:shadow-green-900/20">
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <i className="fas fa-handshake text-white text-3xl"></i>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-green-600 dark:text-green-400">03</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                Partnership
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We work closely with healthcare providers to understand their challenges.
              </p>

              {/* Decorative Line */}
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6"></div>

              {/* Feature Tag */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Core Principle
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Highlight */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-full border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Built on these values</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">FinalHealth</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;