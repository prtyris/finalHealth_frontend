import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Blue Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Right Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        {/* Bottom Left Decoration */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
        {/* Pattern Dots */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <i className="fas fa-shield-alt text-blue-600 dark:text-blue-400"></i>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Trusted Healthcare Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight mb-6">
              Transform Healthcare Management
              <span className="text-blue-600 dark:text-blue-400 block">Today</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl">
              Streamline clinic operations, enhance patient care, and make data-driven decisions with our comprehensive platform designed specifically for healthcare providers.
            </p>

            {/* Search Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-blue-100 dark:border-gray-700 max-w-xl">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                <i className="fas fa-search text-blue-500 dark:text-blue-400 mr-2"></i>
                Find What You Need
              </h3>
              
              {/* What do you want to do? */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-tasks text-blue-500 dark:text-blue-400 mr-2"></i>
                  What do you want to do?
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 appearance-none text-gray-800 dark:text-white">
                    <option className="text-gray-800 dark:text-white">Select an option</option>
                    <option className="text-gray-800 dark:text-white">Manage patient records</option>
                    <option className="text-gray-800 dark:text-white">Schedule appointments</option>
                    <option className="text-gray-800 dark:text-white">Process billing</option>
                    <option className="text-gray-800 dark:text-white">Generate reports</option>
                    <option className="text-gray-800 dark:text-white">Inventory management</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="fas fa-chevron-down text-blue-500 dark:text-blue-400"></i>
                  </div>
                </div>
              </div>

              {/* Your name? */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-user text-blue-500 dark:text-blue-400 mr-2"></i>
                  Your name?
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
                  placeholder="Enter your name"
                />
              </div>

              {/* Search Button */}
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 shadow-md">
                <i className="fas fa-search mr-2"></i>
                Search Solutions
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clinics</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Patients</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">99%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            {/* Main Illustration Container */}
            <div className="relative">
              {/* Background Card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl transform -rotate-3"></div>
              
              {/* Illustration Content */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-blue-100 dark:border-gray-700">
                {/* Medical Icons Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <i className="fas fa-heartbeat text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Patient Care</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <i className="fas fa-calendar-check text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Appointments</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <i className="fas fa-chart-line text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Analytics</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <i className="fas fa-file-medical text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Records</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <i className="fas fa-pills text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Pharmacy</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <i className="fas fa-comments-dollar text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Billing</p>
                  </div>
                </div>

                {/* Dashboard Preview */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-blue-100 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Dashboard Preview</h4>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-300 dark:bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-300 dark:bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-300 dark:bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">Today's Appointments</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">24</span>
                    </div>
                    <div className="h-2 bg-blue-100 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full w-3/4"></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">Patient Satisfaction</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">98%</span>
                    </div>
                    <div className="h-2 bg-green-100 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 dark:bg-green-400 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full">
                    <i className="fas fa-play-circle text-blue-600 dark:text-blue-400"></i>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Watch Platform Demo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-stethoscope text-blue-600 dark:text-blue-400 text-3xl"></i>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-user-md text-blue-600 dark:text-blue-400 text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-600 dark:text-blue-400 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-blue-300 dark:border-blue-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-400 dark:bg-blue-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;