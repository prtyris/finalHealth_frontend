import React, { useState } from "react";

const Hero = () => {
  const [patientName, setPatientName] = useState("");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Medical-themed Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Abstract Medical Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 10 L30 50 M10 30 L50 30" stroke="#2563eb" strokeWidth="1.5"/>
              <circle cx="30" cy="30" r="8" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
              <path d="M20 20 L40 40 M40 20 L20 40" stroke="#2563eb" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#medical-pattern)"/>
        </svg>
      </div>

      {/* Decorative Elements - Waiting Room Inspired */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Queue Number Decorations */}
        <div className="absolute top-20 right-[10%] text-8xl font-bold text-blue-100 dark:text-blue-900/20 select-none">
          #124
        </div>
        <div className="absolute bottom-20 left-[5%] text-8xl font-bold text-blue-100 dark:text-blue-900/20 select-none">
          #089
        </div>
        
        {/* Floating Medical Icons */}
        <div className="absolute top-1/4 left-[15%] animate-pulse">
          <i className="fas fa-stethoscope text-4xl text-blue-200 dark:text-blue-800/30"></i>
        </div>
        <div className="absolute bottom-1/3 right-[20%] animate-bounce">
          <i className="fas fa-clock text-4xl text-blue-200 dark:text-blue-800/30"></i>
        </div>
        <div className="absolute top-2/3 left-[25%] animate-pulse">
          <i className="fas fa-notes-medical text-4xl text-blue-200 dark:text-blue-800/30"></i>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Queue Management Focus */}
          <div>
            {/* Clinic System Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-6 border border-blue-200 dark:border-blue-800">
              <i className="fas fa-hospital-user text-blue-600 dark:text-blue-400"></i>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Clinic Queue Management System
              </span>
            </div>

            {/* Main Heading - Queue Focused */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight mb-6">
              Smart Queue Management
              <span className="text-blue-600 dark:text-blue-400 block">for Modern Clinics</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl">
              Empower your doctors and secretaries with real-time queue tracking, 
              seamless patient flow, and intelligent clinic scheduling. No more waiting room chaos.
            </p>

            {/* Trial Registration Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-blue-200 dark:border-gray-700 max-w-xl transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 w-2 h-8 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  <i className="fas fa-gift text-blue-500 dark:text-blue-400 mr-2"></i>
                  Start Your 7 Days Free Trial
                </h3>
              </div>
              
              {/* Rules of Trial - NOT CLICKABLE, NOT SELECTABLE */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-scale-balanced text-blue-500 dark:text-blue-400 mr-2"></i>
                  Rules of Trial
                </label>
                <div 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-blue-100 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white font-medium pointer-events-none select-none"
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="flex items-center justify-between">
                    <span>7-Day Full Access • No Credit Card Required</span>
                    <i className="fas fa-chevron-down text-blue-500 dark:text-blue-400 opacity-50"></i>
                  </div>
                </div>
              </div>

              {/* Your Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-user text-blue-500 dark:text-blue-400 mr-2"></i>
                  Your Name
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-blue-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" 
                    placeholder="Enter your name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i className="fas fa-pen text-blue-400"></i>
                  </div>
                </div>
              </div>

              {/* Trial Button */}
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white font-bold rounded-xl hover:from-blue-900 hover:to-blue-950 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  <i className="fas fa-gift mr-2"></i>
                  Start 7 Days Free Trial
                </button>
                <button className="px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 border-2 border-gray-200 dark:border-gray-600">
                  <i className="fas fa-qrcode"></i>
                </button>
              </div>

              {/* Live Queue Preview */}
              {patientName && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">YOUR QUEUE NUMBER</p>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-blue-800 dark:text-blue-300">#142</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">in queue</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Estimated wait</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">~15 mins</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <i className="fas fa-users mr-1"></i> 8 patients ahead of you
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    <i className="fas fa-gift mr-1"></i> 7 days free trial included
                  </p>
                </div>
              )}
            </div>

            {/* Clinic Stats - Queue Focused */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-blue-500 shadow-md">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">150+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Clinics</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-indigo-500 shadow-md">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">2.5K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Doctors</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-green-500 shadow-md">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">30s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Queue Time</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-purple-500 shadow-md">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">99%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clinic Efficiency</div>
              </div>
            </div>
          </div>

          {/* Right Content - Queue Dashboard Visualization */}
          <div className="relative">
            {/* Main Dashboard Container */}
            <div className="relative">
              {/* Background Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-3xl blur-xl"></div>
              
              {/* Queue Dashboard */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-blue-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <i className="fas fa-chart-simple text-white text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Live Queue Dashboard</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Real-time clinic status</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75"></span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></span>
                  </div>
                </div>

                {/* Queue Status Grid */}
                <div className="space-y-4 mb-6">
                  {/* Clinic 1 */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <i className="fas fa-stethoscope text-blue-600 dark:text-blue-400"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">Dr. Sarah Johnson</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Cardiology</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">in queue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-xs">
                        Current: #124
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs">
                        Next: #125
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">~8 min wait</span>
                    </div>
                  </div>

                  {/* Clinic 2 */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <i className="fas fa-user-md text-indigo-600 dark:text-indigo-400"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">Dr. Michael Chen</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Pediatrics</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">15</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">in queue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-xs">
                        Current: #089
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs">
                        Next: #090
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">~15 min wait</span>
                    </div>
                  </div>

                  {/* Clinic 3 */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600 opacity-75">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <i className="fas fa-heartbeat text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">Dr. Maria Santos</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Neurology</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">in queue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-xs">
                        Current: #042
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs">
                        Next: #043
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">~5 min wait</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600">
                    <i className="fas fa-user-plus text-blue-600 dark:text-blue-400 mr-2"></i>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Patient</span>
                  </button>
                  <button className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600">
                    <i className="fas fa-clock-rotate-left text-indigo-600 dark:text-indigo-400 mr-2"></i>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View Queue</span>
                  </button>
                </div>

                {/* Secretary Badge */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-user-tie text-blue-500"></i>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Secretary Dashboard</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                      <i className="fas fa-circle mr-1 text-xs"></i>
                      Live Now
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Queue Cards */}
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex flex-col items-center justify-center shadow-2xl transform rotate-6">
              <i className="fas fa-gift text-white text-2xl mb-1"></i>
              <span className="text-white text-xl font-bold">7</span>
              <span className="text-white text-xs">Days Free</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center shadow-2xl transform -rotate-3">
              <i className="fas fa-clock text-white text-xl mb-1"></i>
              <span className="text-white text-lg font-bold">8.5m</span>
              <span className="text-white text-xs">Avg. Wait</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Medical Themed */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-600 dark:text-blue-400 mb-2">Start 7 Days Free Trial</span>
            <div className="relative">
              <div className="w-7 h-12 border-2 border-blue-300 dark:border-blue-600 rounded-full flex justify-center">
                <div className="w-1.5 h-3 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mt-2 animate-bounce"></div>
              </div>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-arrow-right text-blue-400 dark:text-blue-500 text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;