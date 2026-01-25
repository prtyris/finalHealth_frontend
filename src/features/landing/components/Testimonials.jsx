import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
            <i className="fas fa-comment-medical text-blue-500 dark:text-blue-400"></i>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Client Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            What Clinics Say About FinalHealth
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Hear from healthcare professionals who have transformed their clinic management
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="max-w-6xl mx-auto">
          {/* Main Testimonial */}
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-gray-700">
              <div className="md:flex">
                {/* Left Side - Quote Graphic */}
                <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-white">
                    <i className="fas fa-quote-left text-4xl mb-6 opacity-80"></i>
                    <h3 className="text-xl font-bold mb-2">Healthcare Professional</h3>
                    <p className="text-blue-100 dark:text-blue-200">Verified Clinic Partner</p>
                    <div className="mt-6 flex items-center gap-1">
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Testimonial Content */}
                <div className="md:w-2/3 p-8 md:p-12">
                  <div className="relative">
                    {/* Quote Mark */}
                    <div className="absolute -top-4 -left-2 text-blue-100 dark:text-gray-700 text-6xl">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-8 relative z-10 pl-8">
                      "I've worked in oncology; everything is manageable for me. I would recommend it for my staff to focus on their comfort there."
                    </blockquote>
                    
                    {/* Author Info */}
                    <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                        DC
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-lg">Dr. Carl</h4>
                        <p className="text-gray-600 dark:text-gray-400">Sampson Family Health Clinic</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Oncology Specialist</span>
                          <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                          <span className="text-sm text-blue-500 dark:text-blue-400 font-medium">Verified Partner</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Testimonials (Placeholder for future) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white">
                  <i className="fas fa-user-md"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">Clinic Administrator</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pediatric Care Center</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "Streamlined our appointment scheduling and reduced no-shows significantly."
              </p>
              <div className="flex items-center gap-1 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
                  <i className="fas fa-clinic-medical"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">Medical Director</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Multi-Specialty Hospital</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "Improved our patient management workflow by 40% in just three months."
              </p>
              <div className="flex items-center gap-1 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-blue-100 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">40%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">4.8/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clinics Trust Us</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg">
              <i className="fas fa-calendar-check"></i>
              <span className="font-semibold">Become Our Next Success Story</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              Join healthcare professionals transforming their practice management
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;