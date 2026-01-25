import React from "react";

const Journey = () => {
  const milestones = [
    {
      year: "2025",
      quarter: "Q4",
      title: "Project Inception",
      subtitle: "Concept Development",
      phase: "Research Phase",
      description: "Initial research and conceptualization of the FinalHealth system. Identified healthcare management challenges and defined solution scope.",
      icon: "fas fa-rocket",
      iconColor: "text-purple-600",
      iconBg: "from-purple-500 to-purple-700",
      badgeColor: "from-purple-100 to-purple-50",
      borderColor: "border-purple-200",
      contentIcon: "fas fa-lightbulb",
      textColor: "text-purple-600",
      order: "default"
    },
    {
      year: "2025",
      quarter: "Q4",
      title: "Development Kickoff",
      subtitle: "System Development",
      phase: "Building Phase",
      description: "Officially started building the comprehensive healthcare management platform. Established development team and project infrastructure.",
      icon: "fas fa-code",
      iconColor: "text-blue-600",
      iconBg: "from-blue-500 to-blue-700",
      badgeColor: "from-blue-100 to-blue-50",
      borderColor: "border-blue-200",
      contentIcon: "fas fa-play-circle",
      textColor: "text-blue-600",
      order: "reversed"
    },
    {
      year: "2025",
      quarter: "Q4",
      title: "System Design Phase",
      subtitle: "Architecture & Design",
      phase: "Design Phase",
      description: "Completed system architecture design and initial development iterations. Created wireframes, prototypes, and established design system.",
      icon: "fas fa-palette",
      iconColor: "text-green-600",
      iconBg: "from-green-500 to-green-700",
      badgeColor: "from-green-100 to-green-50",
      borderColor: "border-green-200",
      contentIcon: "fas fa-vector-square",
      textColor: "text-green-600",
      order: "default"
    },
    {
      year: "2026",
      quarter: "Q1",
      title: "Current Development",
      subtitle: "Active Development",
      phase: "Implementation Phase",
      description: "Actively developing core features and user interfaces. Building authentication, patient management, and appointment systems.",
      icon: "fas fa-heartbeat",
      iconColor: "text-orange-600",
      iconBg: "from-orange-500 to-orange-700",
      badgeColor: "from-orange-100 to-orange-50",
      borderColor: "border-orange-200",
      contentIcon: "fas fa-cogs",
      textColor: "text-orange-600",
      order: "reversed"
    },
    {
      year: "2026",
      quarter: "Q2",
      title: "Future Launch",
      subtitle: "Platform Release",
      phase: "Launch Phase",
      description: "Planned platform release and first pilot implementation. Expected deployment and onboarding of initial healthcare providers.",
      icon: "fas fa-users",
      iconColor: "text-pink-600",
      iconBg: "from-pink-500 to-pink-700",
      badgeColor: "from-pink-100 to-pink-50",
      borderColor: "border-pink-200",
      contentIcon: "fas fa-calendar-check",
      textColor: "text-pink-600",
      order: "default",
      opacity: "opacity-90"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">FinalHealth</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Development Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From concept to creation - tracking our progress in revolutionizing healthcare management
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-400"></div>

          <div className="relative">
            {milestones.map((milestone, index) => (
              <div key={index} className="mb-16 md:mb-20">
                <div className={`flex flex-col md:flex-row items-center ${milestone.order === 'reversed' ? 'md:flex-row-reverse' : ''}`}>
                  {/* Date Badge */}
                  <div className={`mb-4 md:mb-0 md:w-1/2 ${milestone.order === 'reversed' ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'}`}>
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${milestone.badgeColor} px-4 py-2 rounded-full border ${milestone.borderColor}`}>
                      <i className={`${milestone.icon} ${milestone.iconColor}`}></i>
                      <span className="font-bold text-gray-800">{milestone.year}</span>
                      <span className="text-gray-600 font-medium">{milestone.quarter}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mt-2">{milestone.title}</h3>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${milestone.order === 'reversed' ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 ${milestone.opacity || ''}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.iconBg} flex items-center justify-center`}>
                          <i className={`${milestone.contentIcon} text-white text-lg`}></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{milestone.subtitle}</h4>
                          <p className={`${milestone.textColor} font-medium`}>{milestone.phase}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Current Status</h3>
                <p className="text-gray-600">
                  We're actively developing FinalHealth since October 2025
                </p>
              </div>
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-800">In Development</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            FinalHealth is developed as part of BSCS 601 - Software Engineering Project
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Development started in October 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journey;