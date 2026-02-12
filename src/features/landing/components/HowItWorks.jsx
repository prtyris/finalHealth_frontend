import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
            <i className="fas fa-cogs text-blue-500 dark:text-blue-400"></i>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            How FinalHealth Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Simple steps to get your clinic management system up and running
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-3/4 bg-gradient-to-b from-blue-400 to-purple-400"></div>

          {/* Steps Container */}
          <div className="relative">
            {/* Step 1 - Account Creation */}
            <div className="flex flex-col lg:flex-row items-center mb-16 lg:mb-24">
              {/* Step Content */}
              <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 lg:text-right">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full mb-4">
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Step 1</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Create Your Account
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Register as a doctor with your professional information
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Professional registration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Medical license verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Clinic information setup</span>
                  </li>
                </ul>
              </div>
              
              {/* Step Icon */}
              <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg relative z-10">
                  <i className="fas fa-user-md text-white text-2xl"></i>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                </div>
              </div>
              
              {/* Step Visualization */}
              <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <i className="fas fa-stethoscope text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Doctor Account</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Primary account holder</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-blue-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 dark:bg-blue-600 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Doctor profile completion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Secretary Account Setup */}
            <div className="flex flex-col lg:flex-row items-center mb-16 lg:mb-24">
              {/* Step Visualization */}
              <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <i className="fas fa-user-tie text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Secretary Account</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Delegated management access</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border border-purple-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <i className="fas fa-share-alt text-purple-600 dark:text-purple-400 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">Doctor Delegates Access</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Grant secretary permissions</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-b from-purple-500 to-purple-600 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <i className="fas fa-user-check text-white text-sm"></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Secretary Receives Access</p>
                          <p className="text-xs opacity-90">Can manage appointments & records</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step Icon */}
              <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg relative z-10">
                  <i className="fas fa-users-cog text-white text-2xl"></i>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">2</span>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full mb-4">
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Step 2</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  Set Up Secretary Access
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Doctor grants access to secretary for clinic management
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Doctor-controlled access delegation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Secretary gets appointment management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Patient records access control</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 - Subscription */}
            <div className="flex flex-col lg:flex-row items-center mb-16 lg:mb-24">
              {/* Step Content */}
              <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 lg:text-right">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 rounded-full mb-4">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">Step 3</span>
                </div>
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                  Choose Subscription Plan
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Subscribe to unlock premium features and advanced capabilities
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Advanced analytics and reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Extended patient record storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Priority support and features</span>
                  </li>
                </ul>
              </div>
              
              {/* Step Icon */}
              <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg relative z-10">
                  <i className="fas fa-gem text-white text-2xl"></i>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">3</span>
                  </div>
                </div>
              </div>
              
              {/* Step Visualization */}
              <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-green-100 dark:border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <i className="fas fa-crown text-green-600 dark:text-green-400"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Premium Features</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Subscription unlocks</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-chart-line text-green-500"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Advanced Analytics</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">Premium</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-database text-green-500"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Extended Storage</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">Premium</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-headset text-green-500"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Priority Support</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 - Start Managing */}
            <div className="flex flex-col lg:flex-row items-center">
              {/* Step Visualization */}
              <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-orange-100 dark:border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <i className="fas fa-tasks text-orange-600 dark:text-orange-400"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Clinic Management</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Doctor & Secretary Collaboration</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <i className="fas fa-user-md text-blue-600 dark:text-blue-400 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Doctor</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Medical decisions</p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400"></i>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <i className="fas fa-user-tie text-purple-600 dark:text-purple-400 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Secretary</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Administrative tasks</p>
                        </div>
                      </div>
                      <i className="fas fa-check-circle text-green-500"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step Icon */}
              <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg relative z-10">
                  <i className="fas fa-clinic-medical text-white text-2xl"></i>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">4</span>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full mb-4">
                  <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">Step 4</span>
                </div>
                <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                  Manage Your Clinic
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Doctor and secretary work together to manage clinic operations
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Doctor focuses on medical care</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Secretary handles appointments & admin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Subscription unlocks premium features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Start Now Button */}
          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <i className="fas fa-play-circle mr-2"></i>
              Get Started Now
            </button>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              No credit card required for trial • Setup in under 10 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;